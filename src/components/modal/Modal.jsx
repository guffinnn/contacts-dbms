import './Modal.css';
import React, {useState} from "react";
import {ROWS, CONTACTS, TYPES} from "../../data";

function Modal({ isOpen, setIsOpen }) {
    // Storage contact data, default - empty object
    const [contact, setContact] = useState(
        Object.keys(ROWS).reduce((obj, key) => ({...obj, [key]: TYPES[key] === 'number' ? 0 : ''}), {})
    );

    // Data validation
    const isValidData = (data) => {
        // Проверка номера телефона: должен начинаться с 7 и содержать 11 цифр
        if (data.phoneNumber[0] !== '7' || data.phoneNumber.length !== 11) {
            return false;
        }

        return Object.keys(data).every(key =>
            TYPES[key] === 'number' ? !isNaN(data[key]) : typeof data[key] === 'string'
        );
    }

    // Update contact data when user adding info in input
    const handleChange = (e) => {
        setContact({...contact, [e.target.id]: e.target.value});
    }

    // Add contact and delete data from form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidData(contact)) {
            CONTACTS.push(contact);
            // Reset data to default values
            setContact(Object.keys(ROWS).reduce((obj, key) => ({...obj, [key]: TYPES[key] === 'number' ? 0 : ''}), {}));
            setIsOpen(false);
        } else {
            alert('Неверный формат данных');
        }
    }

    return isOpen ? (
        <>
            <div className="modal__container">
                <p className="head__text">Добавить контакт</p>
                <p className="info__text">Введите нужные данные по контакту</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="labels__frame">
                        {Object.keys(ROWS).map(key => (
                            <label className="label" htmlFor={key}>{ROWS[key]}</label>
                        ))}
                    </div>
                    <div className="inputs__frame">
                        {Object.keys(ROWS).map(key => (
                            <input className="input"
                                   type={TYPES[key]==="date" ? "date" : "text"}
                                   id={key}
                                   placeholder="Ввести данные"
                                   onChange={handleChange} />
                        ))}
                    </div>
                    <button className="submit__button" type="submit">Сохранить данные</button>
                </form>
            </div>
            <div className="modal__wrapper" onClick={() => setIsOpen(false)}></div>
        </>
    ) : null;
}

export default Modal;
