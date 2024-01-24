import './Table.css';
import Select from "../select/Select";
import {ROWS} from "../../data";

function Table({ contacts }) {
    return (contacts.length > 0) ? (
        <table className="table">
            <thead>
            <tr>
                {Object.keys(ROWS).map(key => (
                    <th><Select name={ROWS[key]} /></th>
                ))}
            </tr>
            </thead>
            <tbody>
                {contacts.map((item, index) => (
                    <tr key={index}>
                        <td className="head__cell">{item.phoneNumber}</td>
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
