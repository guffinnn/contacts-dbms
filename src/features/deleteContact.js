import {db} from '../firebase';
import { doc, deleteDoc } from "firebase/firestore";

// Delete contact
export const onDeleteClick = async (contact, setFilteredContacts, fetchContacts) => {
    if (window.confirm(`Удалить номер ${contact.id}?`)) {
        const docRef = doc(db, 'contacts', contact.id);
        await deleteDoc(docRef);
        setFilteredContacts([]);
        fetchContacts();
    }
}