import './Table.css';
import {db} from '../../firebase';
import {collection, getDocs, query, limit, where} from 'firebase/firestore';
import {ROWS} from "../../data";
import edit from '../../assets/edit.svg';
import trash from '../../assets/delete.svg';
import error from '../../assets/error.svg';
import Select from "../select/Select";

function Table({ contacts, setContacts, onEditClick, onDeleteClick, contactOptions }) {
    // Getting key of object by value
    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === (value === 'Регион' || value === 'Улица' ? "Адрес" : value));
    }

    // Filter by column
    const handleFilterChange = async (name, value) => {
        const key = getKeyByValue(ROWS, name);
        let condition = key === 'address' ? ">=" : "==";
        let queryValue = value;

        // Если был выбран изначальный option - то фильтр не срабатывает,
        if ((ROWS[key] === name && value === name) || (key === 'address' && (value === "Регион" || value === "Улица"))) {
            queryValue = null;
        } else if (key === 'age') {
            queryValue = Number(value);
        }

        const contactsQuery = query(
            collection(db, "contacts"),
            ...(queryValue !== null ? [where(key, condition, queryValue)] : []),
            limit(50)
        );

        const contactsSnapshot = await getDocs(contactsQuery);
        const contactsList = contactsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        setContacts(contactsList);
    };

    return (contacts.length > 0) ? (
        <div className="table__container">
            <table className="table">
                <thead>
                <tr>
                    {Object.keys(ROWS).map(index => (
                        ROWS[index] === "Адрес" ? (
                            <>
                                <th key={index}>
                                    <Select name="Регион"
                                            options={contactOptions[ROWS[index]].map(option => option.split(',')[0])}
                                            onOptionChange={handleFilterChange}
                                    />
                                </th>
                                <th>
                                    <Select name="Улица"
                                            options={contactOptions[ROWS[index]].map(option => option.split(',')[1])}
                                            onOptionChange={handleFilterChange}
                                    />
                                </th>
                            </>
                        ) : (
                            <th key={index}>
                                <Select name={ROWS[index]}
                                        options={contactOptions[ROWS[index]]}
                                        onOptionChange={handleFilterChange}
                                />
                            </th>
                        )
                    ))}
                </tr>
                </thead>
                <tbody>
            {contacts.map((item, index) => (
                <tr key={index}>
                    <td className="head__cell">
                        {item.id}
                        <div className="icon__frame">
                            <img className="head__icon"
                                 alt="Edit"
                                 src={edit}
                                 onClick={() => onEditClick(item)}/>
                            <img className="head__icon"
                                 alt="Delete"
                                 src={trash}
                                 onClick={() => onDeleteClick(item)}/>
                        </div>
                    </td>
                    <td>{item.dateAdded}</td>
                    <td>{item.fullName}</td>
                    <td>{item.age}</td>
                    {item.address.split(',').length > 1 && (
                        item.address.split(',').map((addressValue, addressIndex) => (
                            <td key={addressIndex}>{addressValue}</td>
                        ))
                    )}
                    {item.address.split(',').length <= 1 && (
                        <>
                            <td>{item.address}</td>
                            <td>{}</td>
                        </>
                    )}
                    <td>{item.customField1}</td>
                    <td>{item.customField2}</td>
                    <td>{item.customField3}</td>
                    <td>{item.customField4}</td>
                    <td>{item.customField5}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </div>
    ) : (
        <div className="error__container">
            <div className="error__image">
                <img alt="Error" src={error} className="image__content" />
            </div>
            <div className="error__info">
                <p className="error__head">По вашему запросу ничего не найдено</p>
                <p className="error__text">Введите другие данные</p>
            </div>
        </div>
    );
}

export default Table;
