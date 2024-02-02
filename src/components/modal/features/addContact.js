import {ROWS, TYPES} from "../../../data";
import {db} from '../../../firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";

// Data validation
export const isValidData = (data) => {
    // Phone validation
    if (data.id[0] !== '7' || data.id.length !== 11) {
        return false;
    }

    return Object.keys(data).every(key =>
        TYPES[key] === 'number' ? !isNaN(Number(data[key])) && typeof Number(data[key]) === 'number' :
            TYPES[key] === 'string' ? typeof data[key] === 'string' :
                true
    );
}

// Update contact data when user adding info in input
export const handleAddChange = (e, contact, setContact) => {
    const value = TYPES[e.target.id] === 'number' ? Number(e.target.value) : e.target.value;
    setContact({...contact, [e.target.id]: value});
}

// Add contact and delete data from form
export const handleAddSubmit = async (e, contact, setContact, setIsOpen) => {
    try {
        e.preventDefault();
        if (isValidData(contact)) {
            // Check for uniqueness of phoneNumber
            const docRef = doc(db, 'contacts', contact.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                alert('Номер телефона уже существует');
                return;
            }
            // Add contact to Firestore
            await setDoc(docRef, contact);
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
