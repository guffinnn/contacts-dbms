import './Modal.css';
import React, {useState} from "react";
import {ROWS, TYPES, AUTH_ROWS, MODAL_TYPES} from "../../data";
import {handleAddChange, handleAddSubmit} from './features/addContact';
import {handleEditChange, handleEditSubmit} from "./features/editContact";

const initialContactState = Object.keys(ROWS).reduce((obj, key) => ({...obj, [key]: TYPES[key] === 'number' ? 0 : ''}), {});

function Modal({ isOpen, setIsOpen, type, selectedContact, setSelectedContact, setFilteredContacts, fetchContacts }) {
    // Storage contact data, default - empty object
    const [contact, setContact] = useState(initialContactState);

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
                <form className="form"
                      onSubmit={type === MODAL_TYPES[0] && ((e) => {
                          handleAddSubmit(e, contact, setContact, setIsOpen)
                      }) || type === MODAL_TYPES[1] && ((e) => {
                          handleEditSubmit(e, selectedContact, setSelectedContact, setIsOpen, selectedContact.oldId)
                      }) || type === MODAL_TYPES[2] && ((e) => {
                          e.preventDefault();
                          alert("Функция пока недоступна");
                      })}>
                    <div className="labels__frame">
                        {type !== MODAL_TYPES[2] && Object.keys(ROWS).map(index => (
                            <label key={index} className="label" htmlFor={index}>{ROWS[index]}</label>
                        ))}
                        {type === MODAL_TYPES[2] && Object.keys(AUTH_ROWS).map(index => (
                            <label key={index} className="label" htmlFor={index}>{AUTH_ROWS[index]}</label>
                        ))}
                    </div>
                    <div className="inputs__frame">
                        {type === MODAL_TYPES[0] && Object.keys(ROWS).map(key => (
                            <input key={key}
                                   className="input"
                                   type={TYPES[key]==="date" ? "date" : "text"}
                                   id={key}
                                   placeholder="Ввести данные"
                                   onChange={(e) => {
                                       handleAddChange(e, contact, setContact)
                                   }} />
                        ))}
                        {type === MODAL_TYPES[1] && Object.keys(ROWS).map(key => (
                            <input key={key}
                                   className="input"
                                   type={TYPES[key]==="date" ? "date" : "text"}
                                   id={key}
                                   placeholder={"\"\""}
                                   value={selectedContact[key]}
                                   onChange={(e) => {
                                       handleEditChange(e, selectedContact, setSelectedContact, setFilteredContacts, fetchContacts)
                                   }} />
                        ))}
                        {type === MODAL_TYPES[2] && Object.keys(AUTH_ROWS).map(key => (
                            <input className="input"
                                   type={key}
                                   id={key}
                                   placeholder="Ввести данные"
                                   /*onChange={handleChange}*/ />
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
