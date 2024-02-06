import {isValidData} from './addContact';
import {db} from '../firebase';
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {MODAL_TYPES, TYPES} from "../data";

// Update contact data when user edits info in input
export const handleEditChange = (e, selectedContact, setSelectedContact) => {
    const value = TYPES[e.target.id] === 'number' ? Number(e.target.value) : e.target.value;
    setSelectedContact({...selectedContact, [e.target.id]: value});
}

export const updateUniqueValue = async (contact, oldContact) => {
    // Add unique values to Firestore
    const uniqueValuesRef = doc(db, 'uniqueValues/rows');
    let uniqueValuesSnap = await getDoc(uniqueValuesRef);

    // If the document exists, update it with the new unique values
    let uniqueValuesData = uniqueValuesSnap.data();
    for (let key of Object.keys(contact)) {
        if (key !== 'id' && contact[key] !== "" && contact[key] !== 0) {
            // If the value has changed, update the unique values
            if (oldContact[key] !== contact[key]) {
                // Remove the old value
                if(uniqueValuesData[key]) {
                    uniqueValuesData[key] = uniqueValuesData[key].filter(value => value !== oldContact[key]);
                }

                // Add the new value if it's not already in the unique values
                if (!uniqueValuesData[key]?.includes(contact[key])) {
                    uniqueValuesData[key].push(contact[key]);
                }
            }
        }
    }

    await updateDoc(uniqueValuesRef, uniqueValuesData);
}

// Edit contact and close modal
export const handleEditSubmit = async (e, selectedContact, setSelectedContact, setIsOpen, oldId) => {
    try {
        e.preventDefault();
        if (isValidData(selectedContact)) {
            // Check for uniqueness of phoneNumber
            const newDocRef = doc(db, 'contacts', selectedContact.id);
            const newDocSnap = await getDoc(newDocRef);

            if (newDocSnap.exists() && newDocSnap.id !== oldId) {
                alert(`Номер телефона ${newDocSnap.id} уже существует`);
                return;
            }

            // Get old contact data
            const oldDocRef = doc(db, 'contacts', oldId);
            const oldDocSnap = await getDoc(oldDocRef);
            const oldContact = oldDocSnap.data();

            // Update unique values with new contact data
            await updateUniqueValue(selectedContact, oldContact);

            // Update the contact in Firestore
            await updateDoc(oldDocRef, selectedContact);

            setSelectedContact(null);
            setIsOpen(false);
        } else {
            alert('Неверный формат данных');
        }
    } catch(error) {
        alert(error.message);
    }
}

export const onEditClick = async (contact, setSelectedContact, setIsOpen, setType) => {
    setSelectedContact({...contact, oldId: contact.id});
    setIsOpen(true);
    setType(MODAL_TYPES[1]);
}