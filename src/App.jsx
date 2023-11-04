import React, {Component}  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import Models from './pages/Models';
import Account from './pages/Account';
import AddModel from './pages/AddModel';
import Navbar from "./components/Navbar";
import Model from './pages/Model';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {

  return (
      <>
          <Router>
              <Navbar/>
              <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/models' element={<Models/>}/>
                  <Route path='/addmodel' element={<AddModel/>}/>
                  <Route path='/myaccount' element={<Account/>}/>
                  <Route path='/models/:id' element={<Model/>}/>
              </Routes>
          </Router>
      </>

  );
}


export default App;
