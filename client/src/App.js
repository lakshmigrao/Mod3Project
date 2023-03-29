import './App.css';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import MenuDetails from './components/MenuDetails';
import Nav from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let [menu, setMenu] = useState({})
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<SearchForm menu={menu} setMenu={setMenu} />} />
        <Route path="/menu/:idMeal" element={<MenuDetails menu={menu} setMenu={setMenu} />} />
      </Routes>
    </div>
  );
}

export default App;
