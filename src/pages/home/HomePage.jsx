import './HomePage.css';
import React, {useState, useEffect, useRef} from "react";
import {auth, db} from '../../firebase';
import {collection, getDocs, query, startAfter, limit, where} from 'firebase/firestore';
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";
import {OPTIONS, MODAL_TYPES, ROWS} from "../../data";
import {onDeleteClick} from "../../features/deleteContact";
import {onEditClick} from "../../features/editContact";
import {onAuthStateChanged} from "firebase/auth";

function HomePage() {
    // Storage a modal state
    const [isOpen, setIsOpen] = useState(false);
    // Storage a modal type
    const [type, setType] = useState(MODAL_TYPES[0]);
    // Storage a filtered contacts
    const [filteredContacts, setFilteredContacts] = useState([]);
    // Storage an option state
    const [option, setOption] = useState("по номеру");
    // State for selected contact
    const [selectedContact, setSelectedContact] = useState(null);
    // Storage a user account data
    const [user, setUser] = useState({});
    // Storage a state of loading
    const [isLoading, setIsLoading] = useState(false);
    // Storage a current document from firestore
    const lastDoc = useRef(null);
    // Options for Select component (filter)
    const [contactOptions, setContactOptions] = useState([]);

    // Fetch a contacts from firebase to Table component
    const fetchContacts = async () => {
        setIsLoading(true);
        let contactsQuery = query(collection(db, "contacts"),  limit(25));

        if (lastDoc.current) {
            contactsQuery = query(collection(db, "contacts"), startAfter(lastDoc.current), limit(25));
        }

        const contactsSnapshot = await getDocs(contactsQuery);
        const contactsList = contactsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

        if (contactsSnapshot.docs.length > 0) {
            lastDoc.current = contactsSnapshot.docs[contactsSnapshot.docs.length - 1];
        }

        setFilteredContacts(prevContacts => [...prevContacts, ...contactsList]);
        setIsLoading(false);
    };

    useEffect(() => fetchContacts, []);

    useEffect(() => {
        // Check an auth status
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                setIsOpen(true);
                setType(MODAL_TYPES[2]);
            }
        });
    }, []);

    useEffect(() => {
        // Fetch a unique data from firebase to Select component
        const fetchData = async () => {
            const data = await getDocs(collection(db, 'uniqueValues'));
            const options = {};
            Object.keys(ROWS).forEach(key => {
                options[ROWS[key]] = [...new Set(data.docs.flatMap(doc => doc.data()[key]))];
            });
            setContactOptions(options);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
            if (bottom && !isLoading) {
                // Fetch more contacts
                fetchContacts();
            }
        };

        // Add timer for handleScroll
        const throttle = (callee, timeout) => {
            let timer = null

            return function perform(...args) {
                if (timer) return

                timer = setTimeout(() => {
                    callee(...args)

                    clearTimeout(timer)
                    timer = null
                }, timeout)
            }
        }

        window.addEventListener('scroll', throttle(handleScroll, 250));

        // Delete listener after scroll
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    // Filter a table by user response
    const filterByResponse = async (e) => {
        const searchQuery = e.target.value;

        if(searchQuery > 0) {
            const key = OPTIONS[option]; // Key for selected option

            let contactsQuery = query(
                collection(db, "contacts"),
                where(key, ">=", searchQuery),
                limit(50)
            );

            if(key === 'age') {
                contactsQuery = query(
                    collection(db, "contacts"),
                    where(key, ">=", Number(searchQuery)),
                    limit(50)
                );
            }

            const contactsSnapshot = await getDocs(contactsQuery);
            const contactsList = contactsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

            setFilteredContacts(contactsList);
        }
    };

    return user ? (
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
                <p className="info__text" style={{"margin": "0 0 -14px 0"}}>Отображается: {filteredContacts.length} из INF</p>
                <div className="table__container">
                    <Table contacts={filteredContacts}
                           onEditClick={(item) => {
                               onEditClick(item, setSelectedContact, setIsOpen, setType);
                           }}
                           onDeleteClick={(item) => {
                               onDeleteClick(item, setFilteredContacts, fetchContacts);
                           }}
                           contactOptions={contactOptions} />
                </div>
            </main>
            {isOpen && <Modal isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              type={type}
                              selectedContact={selectedContact}
                              setSelectedContact={setSelectedContact}
                              user={user}
                              setUser={setUser} />}
        </div>
    ) : (
        <>
            {isOpen && <Modal isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              type={type}
                              selectedContact={selectedContact}
                              setSelectedContact={setSelectedContact}
                              user={user}
                              setUser={setUser} />}
        </>
    );
}

export default HomePage;