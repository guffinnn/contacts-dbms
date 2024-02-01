import {auth} from "../../../firebase";
import {signInWithEmailAndPassword, signOut} from 'firebase/auth';

export const handleInputChange = (e, type, setLogin, setPassword) => {
    if(type === "email") {
        setLogin(e.target.value);
    } else {
        setPassword(e.target.value);
    }
};

export const logIn = async (e, login, password) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, login, password);
    } catch (error) {
        alert("Такого пользователя не существует");
    }
};

export const logOut = async (e) => {
    e.preventDefault();
    try {
        await signOut(auth);
    } catch (error) {
        alert("Не получилось выйти из аккаунта. Повторите попытку позже");
    }
}