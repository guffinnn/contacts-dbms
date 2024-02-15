import {isValidData} from './addRoute';
import {db} from '../firebase';
import {doc, getDoc, updateDoc} from "firebase/firestore";
import {MODAL_TYPES, TYPES} from "../data";

// Update contact data when user edits info in input
export const handleEditChange = (e, selectedContact, setSelectedContact) => {
    const value = TYPES[e.target.id] === 'number' ? Number(e.target.value) : e.target.value;
    setSelectedContact({...selectedContact, [e.target.id]: value});
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
            const oldDocRef = doc(db, 'routes', oldId);

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