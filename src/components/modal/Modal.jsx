import './Modal.css';
import React, {useState} from "react";
import {IMaskInput} from 'react-imask';
import {handleInputChange, logIn, logOut} from "../../features/auth";
import {handleAddChange, handleAddSubmit} from '../../features/addContact';
import {handleEditChange, handleEditSubmit} from "../../features/editContact";
import {ROWS, TYPES, AUTH_ROWS, MODAL_TYPES} from "../../data";

// Initialise empty object for user data
const initialContactState = Object.keys(ROWS).reduce((obj, key) => ({...obj, [key]: TYPES[key] === 'number' ? 0 : ''}), {});

function Modal({ isOpen, setIsOpen, type, selectedContact, setSelectedContact, setFilteredContacts, fetchContacts, user }) {
    // Storage contact data, default - empty object
    const [contact, setContact] = useState(initialContactState);
    // Storage a user email
    const [login, setLogin] = useState("");
    // Storage a user password
    const [password, setPassword] = useState("");

    return isOpen ? (
        <>
            <div className="modal__container">
                <p className="head__text">
                    {type === MODAL_TYPES[0] && "Добавить контакт"}
                    {type === MODAL_TYPES[1] && "Редактировать аккаунт"}
                    {type === MODAL_TYPES[2] && !user && "Войти в аккаунт"}
                    {type === MODAL_TYPES[2] && user && "Выполнен вход"}
                </p>
                <p className="info__text">
                    {type === MODAL_TYPES[0] && "Введите нужные по контакту данные"}
                    {type === MODAL_TYPES[1] && "Измените данные по контакту"}
                    {type === MODAL_TYPES[2] && !user && "Введите данные аккаунта"}
                </p>
                <form className="form"
                      onSubmit={type === MODAL_TYPES[0] && ((e) => {
                          handleAddSubmit(e, contact, setContact, setIsOpen)
                      }) || type === MODAL_TYPES[1] && ((e) => {
                          handleEditSubmit(e, selectedContact, setSelectedContact, setIsOpen, selectedContact.oldId)
                      }) || type === MODAL_TYPES[2] && !user && ((e) => {
                          logIn(e, login, password);
                      }) || type === MODAL_TYPES[2] && user && ((e) => {
                          logOut(e, login, password);
                      })}>
                    <div className="labels__frame">
                        {type !== MODAL_TYPES[2] && Object.keys(ROWS).map(index => (
                            <label key={index} className="label" htmlFor={index}>{ROWS[index]}</label>
                        ))}
                        {type === MODAL_TYPES[2] && !user && Object.keys(AUTH_ROWS).map(index => (
                            <label key={index} className="label" htmlFor={index}>{AUTH_ROWS[index]}</label>
                        ))}
                        {type === MODAL_TYPES[2] && user && <label className="label" htmlFor="email">{AUTH_ROWS.email}</label>}
                    </div>
                    <div className="inputs__frame">
                        {type === MODAL_TYPES[0] && Object.keys(ROWS).map(key => (
                            <div key={key}>
                                {ROWS[key] === "Контакт" ? (
                                    <IMaskInput
                                        mask="+{7} (000) 000-00-00"
                                        unmask={true}
                                        value={contact[key]}
                                        onAccept={(value) => {
                                            handleAddChange({target: {value, id: key}}, contact, setContact)
                                        }                                        }
                                        placeholder="+7 (111) 222-33-44"
                                        id={key}
                                        className="input"
                                    />
                                ) : (
                                    <input
                                        className="input"
                                        type={TYPES[key] !== "string" ? TYPES[key] : "text"}
                                        id={key}
                                        placeholder="Ввести данные"
                                        onChange={(e) => {
                                            handleAddChange(e, contact, setContact)
                                        }} />
                                )}
                            </div>
                        ))}
                        {type === MODAL_TYPES[1] && Object.keys(ROWS).map(key => (
                            <div key={key}>
                                {ROWS[key] === "Контакт" ? (
                                    <IMaskInput
                                        mask="+{7} (000) 000-00-00"
                                        unmask={true}
                                        value={selectedContact[key]}
                                        onAccept={(value) => {
                                            handleAddChange({target: {value, id: key}}, contact, setContact)
                                        }                                        }
                                        placeholder="+7 (111) 222-33-44"
                                        id={key}
                                        className="input"
                                    />
                                ) : (
                                    <input className="input"
                                           type={TYPES[key] === "number" ? TYPES[key] : "text"}
                                           id={key}
                                           placeholder={"\"\""}
                                           value={selectedContact[key]}
                                           onChange={(e) => {
                                               handleEditChange(e, selectedContact, setSelectedContact, setFilteredContacts, fetchContacts)
                                           }} />
                                )}
                            </div>
                        ))}
                        {type === MODAL_TYPES[2] && !user && Object.keys(AUTH_ROWS).map(key => (
                            <input className="input"
                                   type={key}
                                   id={key}
                                   placeholder="Ввести данные"
                                   onChange={(e) => {
                                       handleInputChange(e, key, setLogin, setPassword)
                                   }} />
                        ))}
                        {type === MODAL_TYPES[2] && user && (
                            <input className="input"
                                   id="email"
                                   type="email"
                                   value={user.email} />
                        )}
                    </div>
                    {(type === MODAL_TYPES[2] && user) ? (
                        <button className="submit__button" type="submit">Выйти</button>
                    ) : (
                        <button className="submit__button" type="submit">Подтвердить</button>
                    )}
                </form>
            </div>
            <div className="modal__wrapper" onClick={() => user ? setIsOpen(false) : null} />
        </>
    ) : null;
}

export default Modal;
