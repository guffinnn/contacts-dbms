import {ROWS, CONTACTS, TYPES} from "../../../data";

// Data validation
export const isValidData = (data) => {
    // Phone validation
    if (data.phoneNumber[0] !== '7' || data.phoneNumber.length !== 11) {
        return false;
    }

    return Object.keys(data).every(key =>
        TYPES[key] === 'number' ? !isNaN(data[key]) : typeof data[key] === 'string'
    );
}

// Update contact data when user adding info in input
export const handleAddChange = (e, contact, setContact) => {
    setContact({...contact, [e.target.id]: e.target.value});
}

// Add contact and delete data from form
export const handleAddSubmit = (e, contact, setContact, setIsOpen) => {
    try {
        e.preventDefault();
        if (isValidData(contact)) {
            CONTACTS.push(contact);
            // Reset data to default values
            setContact(Object.keys(ROWS).reduce((obj, key) => ({...obj, [key]: TYPES[key] === 'number' ? 0 : ''}), {}));
            setIsOpen(false);
        } else {
            alert('Неверный формат данных');
        }
    } catch(error) {
        alert('Ошибка, закройте модальное окно');
    }
}