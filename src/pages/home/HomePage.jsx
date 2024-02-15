import './HomePage.css';
import React, {useState, useEffect, useRef} from "react";
import {auth, db} from '../../firebase';
import {collection, getDocs, query, startAfter,  limit, where} from 'firebase/firestore';
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";
import {OPTIONS, MODAL_TYPES} from "../../data";
import {onDeleteClick} from "../../features/deleteRoute";
import {onEditClick} from "../../features/editRoute";
import {onAuthStateChanged} from "firebase/auth";

function HomePage() {
    // Storage a modal state
    const [isOpen, setIsOpen] = useState(false);
    // Storage a modal type
    const [type, setType] = useState(MODAL_TYPES[0]);
    // Storage an option state
    const [option, setOption] = useState("по номеру");
    // State for selected route
    const [selectedRoute, setSelectedRoute] = useState(null);
    // Storage a user account data
    const [user, setUser] = useState({});
    // Storage a state of loading
    const [isLoading, setIsLoading] = useState(false);

    // Options for Select component (filter)
    const [routeOptions, setRouteOptions] = useState([]);
    // Storage a filtered routes
    const [filteredRoutes, setFilteredRoutes] = useState([]);

    // Storage a current document from firestore
    const lastDoc = useRef(null);
    // Fetch a routes from firebase to Table component
    const fetchRoutes = async () => {
        setIsLoading(true);
        let routesQuery = query(collection(db, "routes"),  limit(25));

        if (lastDoc.current) {
            routesQuery = query(collection(db, "routes"), startAfter(lastDoc.current), limit(25));
        }

        const routesSnapshot = await getDocs(routesQuery);
        const routesList = routesSnapshot.docs.map(doc => ({id: doc.id, doc: doc, ...doc.data()}));

        setFilteredRoutes(prevRoutes => {
            return [...prevRoutes, ...routesList];
        });
    };

    useEffect(() => {
        if (filteredRoutes.length > 0) {
            lastDoc.current = filteredRoutes[filteredRoutes.length - 1].doc;
        }
    }, [filteredRoutes]);

    // Pagination
    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
            if (bottom && !isLoading) {
                // Fetch more routes
                fetchRoutes();
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

        if(searchQuery.length > 0) {
            // Reset the lastDoc for the original query
            lastDoc.current = null;

            const key = OPTIONS[option]; // Key for selected option

            let routesQuery = query(
                collection(db, "routes"),
                where(key, ">=", String(searchQuery)),
                limit(25)
            );

            const routesSnapshot = await getDocs(routesQuery);
            const routesList = routesSnapshot.docs.map(doc => ({id: doc.id, doc: doc, ...doc.data()}));

            setFilteredRoutes(routesList);
        }
    };

    // Auth
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
                <p className="info__text" style={{"margin": "0 0 -14px 0"}}>Отображается: {filteredRoutes.length} из INF</p>
                <Table routes={filteredRoutes}
                       onEditClick={(item) => {
                           onEditClick(item, setSelectedRoute, setIsOpen, setType);
                       }}
                       onDeleteClick={(item) => {
                           onDeleteClick(item, setFilteredRoutes, fetchRoutes);
                       }}
                       routeOptions={routeOptions} />
            </main>
            {isOpen && <Modal isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              type={type}
                              selectedRoute={selectedRoute}
                              setSelectedRoute={setSelectedRoute}
                              user={user}
                              setUser={setUser} />}
        </div>
    ) : (
        <>
            {isOpen && <Modal isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              type={type}
                              selectedRoute={selectedRoute}
                              setSelectedRoute={setSelectedRoute}
                              user={user}
                              setUser={setUser} />}
        </>
    );
}

export default HomePage;