import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppCategories from "../appCategories/appCategories";
import AppServises from '../appServises/appServises';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            <Route path="/" element={<AppCategories/>}></Route>
            <Route path="/servises/:categoryID" element={<AppServises/>}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
