import {db} from '../firebase';
import {doc, deleteDoc} from "firebase/firestore";


// Delete route
export const onDeleteClick = async (route, setFilteredRoutes, fetchRoutes) => {
    if (window.confirm(`Удалить маршрут ${route.from} - ${route.to}?`)) {
        const docRef = doc(db, 'routes', route.id);

        // Delete doc from routes
        await deleteDoc(docRef);
        setFilteredRoutes([]);
        fetchRoutes();
    }
}