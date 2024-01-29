import {CONTACTS} from "../../../data";
import {isValidData} from './addContact';

// Update contact data when user edits info in input
export const handleEditChange = (e, selectedContact, setSelectedContact) => {
    setSelectedContact({...selectedContact, [e.target.id]: e.target.value});
}

// Edit contact and close modal
export const handleEditSubmit = (e, selectedContact, setSelectedContact, setIsOpen) => {
    try {
        e.preventDefault();
        if (isValidData(selectedContact)) {
            // Find the index of the contact in the CONTACTS array
            const index = CONTACTS.findIndex(contact => contact.phoneNumber === selectedContact.phoneNumber);
            if (index !== -1) {
                // Replace the old contact data with the new data
                CONTACTS[index] = selectedContact;
            }
            setSelectedContact(null);
            setIsOpen(false);
        } else {
            alert('Неверный формат данных');
        }
    } catch(error) {
        alert('Ошибка, закройте модальное окно');
    }
}
