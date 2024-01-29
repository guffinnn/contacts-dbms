import './Table.css';
import edit from '../../assets/edit.svg';
import trash from '../../assets/delete.svg';
import Select from "../select/Select";
import {ROWS} from "../../data";

function Table({ contacts, onEditClick, onDeleteClick }) {
    return (contacts.length > 0) ? (
        <table className="table">
            <thead>
            <tr>
                {Object.keys(ROWS).map(index => (
                    <th key={index}><Select name={ROWS[index]} /></th>
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
                                     onClick={() => onEditClick(item)} />
                                <img className="head__icon"
                                     alt="Delete"
                                     src={trash}
                                     onClick={() => onDeleteClick(item)} />
                            </div>
                        </td>
                        <td>{item.dateAdded}</td>
                        <td>{item.fullName}</td>
                        <td>{item.age}</td>
                        <td>{item.address}</td>
                        <td>{item.customField1}</td>
                        <td>{item.customField2}</td>
                        <td>{item.customField3}</td>
                        <td>{item.customField4}</td>
                        <td>{item.customField5}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    ) : null;
}

export default Table;
