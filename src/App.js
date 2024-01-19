import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/home/HomePage";

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/contacts-dbms" element={<HomePage />} />
          </Routes>
      </Router>
  );
}

export default App;
