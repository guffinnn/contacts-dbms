import './Select.css';
import { useState } from 'react';

function Select({ name, options }) {
    const [selected, setSelected] = useState(name);

    const handleChange = (event) => {
        setSelected(event.target.value);
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