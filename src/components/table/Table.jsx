import './Table.css';
import Select from "../select/Select";

function Table() {
    return (
        <table className="table">
            <thead>
            <tr>
                <th className="head__cell">Контакты</th>
                <th><Select name={'Дата внесения'} /></th>
                <th><Select name={'ФИО'} /></th>
                <th><Select name={'Возраст'} /></th>
                <th><Select name={'Адрес'} /></th>
                <th><Select name={'[name]'} /></th>
                <th><Select name={'[name]'} /></th>
                <th><Select name={'[name]'} /></th>
                <th><Select name={'[name]'} /></th>
                <th><Select name={'[name]'} /></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="head__cell">+7 ...</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="head__cell">+7 ...</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td className="head__cell">+7 ...</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
    );
}

export default Table;
