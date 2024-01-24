import './HomePage.css';
import React, {useState} from "react";
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";
import Modal from "../../components/modal/Modal";

function HomePage() {
    // Storage a modal state
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="home__fluid">
            <header className="header">
                <Header />
            </header>
            <main className="main">
                <div className="buttons__container">
                    <Button name='1' onChange={() => setIsOpen(true)} />
                    <Button name='2' />
                    <Button name='3' />
                </div>
                <div className="table__container">
                    <Table />
                </div>
            </main>
            {isOpen && <Modal isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
    );
}

export default HomePage;
