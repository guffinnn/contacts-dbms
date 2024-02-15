import './Modal.css';
import React, {useState} from "react";
import {handleInputChange, logIn, logOut} from "../../features/auth";
import {handleAddChange, handleAddSubmit} from '../../features/addRoute';
import {handleEditChange, handleEditSubmit} from "../../features/editRoute";
import {ROWS, TYPES, AUTH_ROWS, MODAL_TYPES} from "../../data";

// Initialise empty object for user data
const initialRouteState = Object.keys(ROWS).reduce((obj, key) => ({...obj, [key]: TYPES[key] === 'number' ? 0 : ''}), {});

function Modal({ isOpen, setIsOpen, type, selectedRoute, setSelectedRoute, setFilteredRoutes, fetchRoutes, user }) {
    // Storage route data, default - empty object
    const [route, setRoute] = useState(initialRouteState);
    // Storage a user email
    const [login, setLogin] = useState("");
    // Storage a user password
    const [password, setPassword] = useState("");

    return isOpen ? (
        <>
            <div className="modal__container">
                <p className="head__text">
                    {type === MODAL_TYPES[0] && "Добавить маршрут"}
                    {type === MODAL_TYPES[1] && "Редактировать маршрут"}
                    {type === MODAL_TYPES[2] && !user && "Войти в аккаунт"}
                    {type === MODAL_TYPES[2] && user && "Выполнен вход"}
                </p>
                <p className="info__text">
                    {type === MODAL_TYPES[0] && "Введите нужные по маршруту данные"}
                    {type === MODAL_TYPES[1] && "Измените данные по маршруту"}
                    {type === MODAL_TYPES[2] && !user && "Введите данные аккаунта"}
                </p>
                <form className="form"
                      onSubmit={type === MODAL_TYPES[0] && ((e) => {
                          handleAddSubmit(e, route, setRoute, setIsOpen)
                      }) || type === MODAL_TYPES[1] && ((e) => {
                          alert('Пока что нельзя редактировать маршруты 🥲');
                          /*handleEditSubmit(e, selectedRoute, setSelectedRoute, setIsOpen, selectedRoute.oldId)*/
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
                                {ROWS[key] && (
                                    <input
                                        className="input"
                                        type={TYPES[key] !== "string" ? TYPES[key] : "text"}
                                        id={key}
                                        placeholder={"Ввести данные"}
                                        onChange={(e) => {
                                            handleAddChange(e, route, setRoute)
                                        }} />
                                )}
                            </div>
                        ))}
                        {type === MODAL_TYPES[1] && Object.keys(ROWS).map(key => (
                            <div key={key}>
                                {ROWS[key] && (
                                    <input className="input"
                                           type={TYPES[key] === "number" ? TYPES[key] : "text"}
                                           id={key}
                                           placeholder={"\"\""}
                                           value={selectedRoute[key]}
                                           onChange={(e) => {
                                               handleEditChange(e, selectedRoute, setSelectedRoute, setFilteredRoutes, fetchRoutes)
                                           }}/>
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
                                   }}/>
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
