import {isValidData} from './addContact';
import {db} from '../../../firebase';
import {deleteDoc, doc, getDoc, setDoc} from "firebase/firestore";
import {MODAL_TYPES} from "../../../data";

// Update contact data when user edits info in input
export const handleEditChange = (e, selectedContact, setSelectedContact) => {
    setSelectedContact({...selectedContact, [e.target.id]: e.target.value});
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
            // Delete old contact in Firestore
            const oldDocRef = doc(db, 'contacts', oldId);
            await deleteDoc(oldDocRef);
            // Add new contact to Firestore
            await setDoc(newDocRef, selectedContact);
            setSelectedContact(null);
            setIsOpen(false);
        } else {
            alert('Неверный формат данных');
        }
    } catch(error) {
        alert('Ошибка, закройте модальное окно');
    }
}


export const onEditClick = async (contact, setSelectedContact, setIsOpen, setType) => {
    setSelectedContact({...contact, oldId: contact.id});
    setIsOpen(true);
    setType(MODAL_TYPES[1]);
}