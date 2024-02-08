import './Select.css';

function Select({ name, options, onOptionChange }) {
    const handleChange = (event) => {
        onOptionChange(name, event.target.value);
    };

    return (
        <div className="select__frame">
            <select className="select" onChange={handleChange}>
                <option>{name}</option>
                {options.length > 0 && options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;