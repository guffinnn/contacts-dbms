import './Select.css';

function Select({ name }) {
    return (
        <div className="select__frame">
            <select className="select">
                <option selected>{name}</option>
            </select>
        </div>
    );
}

export default Select;
