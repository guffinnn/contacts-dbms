import './HomePage.css';
import Header from "../../components/header/Header";
import Button from "../../components/button/Button";
import Table from "../../components/table/Table";

function HomePage() {
    return (
        <div className="home__fluid">
            <header className="header">
                <Header />
            </header>
            <main className="main">
                <div className="buttons__container">
                    <Button name={'1'} />
                    <Button name={'2'} />
                    <Button name={'3'} />
                </div>
                <div className="table__container">
                    <Table />
                </div>
            </main>
        </div>
    );
}

export default HomePage;
