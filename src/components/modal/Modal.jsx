import './Modal.css';

function Modal() {
    return (
        <div className="modal__container">
            <p className="head__text">Добавить контакт</p>
            <p className="info__text">Введите нужные данные по контакту</p>
            <form className="form">
                <div className="labels__frame">
                    <label className="label" htmlFor="date">Дата внесения</label>
                    <label className="label" htmlFor="initials">ФИО</label>
                    <label className="label" htmlFor="age">Возраст</label>
                    <label className="label" htmlFor="address">Адрес</label>
                    <label className="label" htmlFor="name1">[name]</label>
                    <label className="label" htmlFor="name2">[name]</label>
                    <label className="label" htmlFor="name3">[name]</label>
                    <label className="label" htmlFor="name4">[name]</label>
                    <label className="label" htmlFor="name5">[name]</label>
                </div>
                <div className="inputs__frame">
                    <input className="input" type="text" id="date" placeholder="Ввести данные" />
                    <input className="input" type="text" id="initials" placeholder="Ввести данные" />
                    <input className="input" type="text" id="age" placeholder="Ввести данные" />
                    <input className="input" type="text" id="address" placeholder="Ввести данные" />
                    <input className="input" type="text" id="name1" placeholder="Ввести данные" />
                    <input className="input" type="text" id="name2" placeholder="Ввести данные" />
                    <input className="input" type="text" id="name3" placeholder="Ввести данные" />
                    <input className="input" type="text" id="name4" placeholder="Ввести данные" />
                    <input className="input" type="text" id="name5" placeholder="Ввести данные" />
                </div>
            </form>
            <button className="submit__button">Сохранить данные</button>
        </div>
    );
}

export default Modal;
