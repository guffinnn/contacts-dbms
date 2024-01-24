import './HomePage.css';
import React, {useState} from "react";
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";
import {CONTACTS, OPTIONS} from "../../data";

function HomePage() {
    // Storage a modal state
    const [isOpen, setIsOpen] = useState(false);
    // Storage a filtered contacts
    const [filteredContacts, setFilteredContacts] = useState(CONTACTS);
    // Storage an option state
    const [option, setOption] = useState("по номеру");

    // Filter a table by user response
    const filterByResponse = e => {
        const query = e.target.value;
        let updatedContacts = [...CONTACTS];

        const key = OPTIONS[option]; // Key for selected option

        updatedContacts = updatedContacts.filter((item) => {
            return item[key].indexOf(query) !== -1; // Use this key for filter
        });

        setFilteredContacts(updatedContacts);
    };

    return (
        <div className="home__fluid">
            <header className="header">
                <Header option={option} setOption={setOption} onChange={filterByResponse} />
            </header>
            <main className="main">
                <div className="buttons__container">
                    <Button name='1' onChange={() => setIsOpen(true)} />
                    <Button name='2' />
                    <Button name='3' />
                </div>
                <div className="table__container">
                    <Table contacts={filteredContacts} />
                </div>
            </main>
            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
    );
}

export default HomePage;
