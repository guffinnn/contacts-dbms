import './Table.css';
import {ROWS} from "../../data";
import edit from '../../assets/edit.svg';
import trash from '../../assets/delete.svg';
import error from '../../assets/error.svg';
import Select from "../select/Select";
import CellForDays from "../cellForDays/CellForDays";

function Table({ routes, onEditClick, onDeleteClick, routeOptions }) {
    return (routes.length > 0) ? (
        <div className="table__container">
            <table className="table">
                <thead>
                <tr>
                    {Object.keys(ROWS).map(index => (
                        <th key={index}>
                            <Select name={ROWS[index]}
                                    options={routeOptions[ROWS[index]]}
                            />
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {routes.map((item, index) => (
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
                        <td>{item.from}</td>
                        <td>{item.to}</td>
                        <td>
                            {item.stops.split(' - ').length > 1 &&
                                <ul className="stops__for__routes">
                                    {item.stops.split(' - ').map((stop, stopIndex) => (
                                        <li id="stops__name" className="list__value" key={stopIndex}>
                                            {stop}
                                        </li>
                                    ))}
                                </ul>
                            }
                        </td>
                        <CellForDays item={item} />
                        <td>{item.type_of_transport}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="error__container">
            <div className="error__image">
                <img alt="Error" src={error} className="image__content"/>
            </div>
            <div className="error__info">
                <p className="error__head">По вашему запросу ничего не найдено</p>
                <p className="error__text">Введите другие данные</p>
            </div>
        </div>
    );
}

export default Table;