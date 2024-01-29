import './Select.css';

function Select({ name }) {
    return (
        <div className="select__frame">
            <select className="select">
                <option>{name}</option>
            </select>
        </div>
    );
}

export default Select;
