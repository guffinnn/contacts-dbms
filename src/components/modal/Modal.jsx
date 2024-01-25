import './Modal.css';
import React, {useState} from "react";
import {ROWS, CONTACTS, TYPES, AUTH_ROWS, MODAL_TYPES} from "../../data";

function Modal({ isOpen, setIsOpen, type }) {
    // Storage contact data, default - empty object
    const [contact, setContact] = useState(
        Object.keys(ROWS).reduce((obj, key) => ({...obj, [key]: TYPES[key] === 'number' ? 0 : ''}), {})
    );

    // Data validation
    const isValidData = data => {
        // Contact validation
        if (type !== MODAL_TYPES[2] && (data.phoneNumber[0] !== '7' || data.phoneNumber.length !== 11)) {
            return false;
        }

        return Object.keys(data).every(key =>
            TYPES[key] === 'number' ? !isNaN(data[key]) : typeof data[key] === 'string'
        );
    }

    // Update contact data when user adding info in input
    const handleChange = e => {
        setContact({...contact, [e.target.id]: e.target.value});
    }

    // Add contact and delete data from form
    const handleSubmit = e => {
        e.preventDefault();
        if (isValidData(contact)) {
            switch (type) {
                case MODAL_TYPES[0]:
                    CONTACTS.push(contact);
                    break;
                case MODAL_TYPES[1]:
                    const index = CONTACTS.findIndex(c => c.id === contact.id);
                    if (index !== -1) {
                        CONTACTS[index] = contact;
                    }
                    break;
                case MODAL_TYPES[2]:
                    // Здесь должна быть логика для входа в систему
                    break;
                default:
                    console.error('Неизвестный тип модального окна');
            }
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
                <p className="head__text">
                    {type === MODAL_TYPES[0] && "Добавить контакт"}
                    {type === MODAL_TYPES[1] && "Редактировать аккаунт"}
                    {type === MODAL_TYPES[2] && "Войти в аккаунт"}
                </p>
                <p className="info__text">
                    {type === MODAL_TYPES[0] && "Введите нужные по контакту данные"}
                    {type === MODAL_TYPES[1] && "Измените данные по контакту"}
                    {type === MODAL_TYPES[2] && "Введите данные аккаунта"}
                </p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="labels__frame">
                        {type !== MODAL_TYPES[2] && Object.keys(ROWS).map(key => (
                            <label className="label" htmlFor={key}>{ROWS[key]}</label>
                        ))}
                        {type === MODAL_TYPES[2] && Object.keys(AUTH_ROWS).map(key => (
                            <label className="label" htmlFor={key}>{AUTH_ROWS[key]}</label>
                        ))}
                    </div>
                    <div className="inputs__frame">
                        {type === MODAL_TYPES[0] && Object.keys(ROWS).map(key => (
                            <input className="input"
                                   type={TYPES[key]==="date" ? "date" : "text"}
                                   id={key}
                                   placeholder="Ввести данные"
                                   onChange={handleChange} />
                        ))}
                        {type === MODAL_TYPES[1] && Object.keys(ROWS).map(key => (
                            <input className="input"
                                   type={TYPES[key]==="date" ? "date" : "text"}
                                   id={key}
                                   placeholder="DATA"
                                   onChange={handleChange} />
                        ))}
                        {type === MODAL_TYPES[2] && Object.keys(AUTH_ROWS).map(key => (
                            <input className="input"
                                   type={key}
                                   id={key}
                                   placeholder="Ввести данные"
                                   onChange={handleChange} />
                        ))}
                    </div>
                    <button className="submit__button" type="submit">Подтвердить</button>
                </form>
            </div>
            <div className="modal__wrapper" onClick={() => setIsOpen(false)}></div>
        </>
    ) : null;
}

export default Modal;
