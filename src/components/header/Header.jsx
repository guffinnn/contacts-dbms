import './Header.css';
import {useState} from "react";
import filter from '../../assets/filter.svg';
import account from '../../assets/account.png';
import {OPTIONS} from "../../data";

function Header({ option, setOption, onInputChange, onImgClick }) {
    // Storage a state of filter box
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="header__fluid">
            <div className="search__frame">
                <input className="search__input"
                       type="text"
                       placeholder={`Поиск ${option}`}
                       onChange={onInputChange} />
                <div className="filter__box"
                     onMouseEnter={() => setIsHovered(true)}
                     onMouseLeave={() => setIsHovered(false)}>
                    <img alt="Filter" src={filter} />
                    {isHovered && (
                        <div className="dropdown">
                            {Object.keys(OPTIONS).map((item, index) => (
                                <div key={index} className="dropdown__option" onClick={() => {
                                    setIsHovered(false);
                                    setOption(item);
                                }}>{item}</div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="account__box">
                <img className="account__img" alt="Account" src={account} onClick={onImgClick} />
            </div>
        </div>
    );
}

export default Header;
