import './Header.css';
import filter from '../../assets/filter.svg';
import account from '../../assets/account.png';

function Header() {
    return (
        <div className="header__fluid">
            <div className="search__frame">
                <input className="search__input" type="text" placeholder="Поиск по фразе" />
                <div className="filter__box">
                    <img alt="Filter" src={filter} />
                </div>
            </div>
            <div className="account__box">
                <img alt="Account" src={account} />
            </div>
        </div>
    );
}

export default Header;
