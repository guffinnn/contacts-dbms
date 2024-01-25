import './HomePage.css';
import React, {useState, useEffect} from "react";
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";
import {CONTACTS, OPTIONS, MODAL_TYPES} from "../../data";
import {db} from '../../firebase';
import {collection, getDocs} from 'firebase/firestore';

function HomePage() {
    // Storage a modal state
    const [isOpen, setIsOpen] = useState(false);
    // Storage a modal type
    const [type, setType] = useState(MODAL_TYPES[0]);
    // Storage a filtered contacts
    const [filteredContacts, setFilteredContacts] = useState([]);
    // Storage an option state
    const [option, setOption] = useState("по номеру");

    useEffect(() => {
        const fetchContacts = async () => {
            const contactsCollection = collection(db, "contacts");
            const contactsSnapshot = await getDocs(contactsCollection);
            const contactsList = contactsSnapshot.docs.map(doc => doc.data());
            setFilteredContacts(contactsList);
        };
        /*fetchContacts();*/

        setFilteredContacts(CONTACTS);
    }, []);

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
                <Header option={option}
                        setOption={setOption}
                        onInputChange={filterByResponse}
                        onImgClick={() => {
                            setType(MODAL_TYPES[2]);
                            setIsOpen(true);
                        }} />
            </header>
            <main className="main">
                <div className="buttons__container">
                    <Button name='1'
                            onChange={() => {
                                setType(MODAL_TYPES[0]);
                                setIsOpen(true);
                            }} />
                    <Button name='2' />
                    <Button name='3' />
                </div>
                <div className="table__container">
                    <Table contacts={filteredContacts}
                           /*onEditClick={}
                           onDeleteClick={}*/ />
                </div>
            </main>
            {isOpen && <Modal isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              type={type} />}
        </div>
    );
}

export default HomePage;
