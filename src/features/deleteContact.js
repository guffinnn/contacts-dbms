import {db} from '../firebase';
import {query, collection, where, doc, getDoc, getDocs, deleteDoc, updateDoc} from "firebase/firestore";

// Delete uniqueValues in firestore
export const deleteUniqueValues = async (contact) => {
    // Add unique values to Firestore
    const uniqueValuesRef = doc(db, 'uniqueValues/rows');
    let uniqueValuesSnap = await getDoc(uniqueValuesRef);

    // If the document exists, update it with the new unique values
    let uniqueValuesData = uniqueValuesSnap.data();
    for (let key of Object.keys(contact)) {
        if (key !== 'id' && contact[key] !== "" && contact[key] !== 0) {
            let querySnapshot = await getDocs(query(collection(db, 'contacts'), where(key, '==', contact[key])));
            let numMatches = querySnapshot.size;
            if (numMatches > 1 && !uniqueValuesData[key].includes(contact[key])) {
                uniqueValuesData[key].push(contact[key]);
            } else if (numMatches <= 1) {
                uniqueValuesData[key] = uniqueValuesData[key].filter(value => value !== contact[key]);
            }
        }
    }

    await updateDoc(uniqueValuesRef, uniqueValuesData);
}

// Delete contact
export const onDeleteClick = async (contact, setFilteredContacts, fetchContacts) => {
    if (window.confirm(`Удалить номер ${contact.id}?`)) {
        // Delete a data from uniqueValues
        deleteUniqueValues(contact);
        const docRef = doc(db, 'contacts', contact.id);

        // Delete doc from contacts
        await deleteDoc(docRef);
        setFilteredContacts([]);
        fetchContacts();
    }
}