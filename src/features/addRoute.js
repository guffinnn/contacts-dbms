import {ROWS, TYPES} from "../data";
import {db} from '../firebase';
import {doc, getDoc, setDoc} from "firebase/firestore";

// Data validation
export const isValidData = (data) => {
    return Object.keys(data).every(key =>
        TYPES[key] === 'number' ? !isNaN(Number(data[key])) && typeof Number(data[key]) === 'number' :
            TYPES[key] === 'string' ? typeof data[key] === 'string' :
                true
    );
}

// Update route data when user adding info in input
export const handleAddChange = (e, route, setRoute) => {
    const value = TYPES[e.target.id] === 'number' ? Number(e.target.value) : e.target.value;
    setRoute({...route, [e.target.id]: value});
}

// Add route and delete data from form
export const handleAddSubmit = async (e, route, setRoute, setIsOpen) => {
    try {
        e.preventDefault();
        if (isValidData(route)) {
            // Check for uniqueness of phoneNumber
            const docRef = doc(db, 'routes', route.id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                alert(`Транспорт ${route.id} с таким сообщением уже существует`);
                return;
            }

            // Add route to Firestore
            await setDoc(docRef, route);

            // Reset data to default values
            setRoute(Object.keys(ROWS).reduce((obj, key) => ({...obj, [key]: TYPES[key] === 'number' ? 0 : ''}), {}));
            setIsOpen(false);
        } else {
            alert('Неверный формат данных');
        }
    } catch(error) {
        alert(`${error.message} Ошибка, закройте модальное окно`);
    }
}
