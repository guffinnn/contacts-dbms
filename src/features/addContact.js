import {ROWS, TYPES} from "../data";
import {db} from '../firebase';
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";

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

// Add uniqueValues in firestore
export const addUniqueValues = async (contact) => {
    // Add unique values to Firestore
    const uniqueValuesRef = doc(db, 'uniqueValues/rows');
    let uniqueValuesSnap = await getDoc(uniqueValuesRef);

    // If the document exists, update it with the new unique values
    let uniqueValuesData = uniqueValuesSnap.data();
    Object.keys(contact).forEach(key => {
        if (key !== 'id' && contact[key] !== "" && contact[key] !== 0 && !uniqueValuesData[key].includes(contact[key])) {
            uniqueValuesData[key].push(contact[key]);
        }
    });

    await updateDoc(uniqueValuesRef, uniqueValuesData);
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

            addUniqueValues(contact);

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
