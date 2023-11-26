import React, {Component, useContext} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './pages/Home';
import Models from './pages/Models';
import Account from './pages/Account';
import AddModel from './pages/AddModel';
import Navbar from "./components/Navbar";
import Model from './pages/Model';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CommunityModels from "./pages/CommunityModels";
import CommunityModel from "./pages/CommunityModels";

const App = () => {

  return (
      <>
          <div className="column" m-5 is-two-thirds >
                      <div>
                          <Router>
                              <Navbar/>
                                  <Routes>
                                      <Route path='/' element={<Home/>}/>
                                      <Route path='/models' element={<Models/>}/>
                                      <Route path='/communitymodels' element={<CommunityModels/>}/>
                                      <Route path='/addmodel' element={<AddModel/>}/>
                                      <Route path='/myaccount' element={<Account/>}/>
                                      <Route path='/models/:id' element={<Model/>}/>
                                      <Route path='/communitymodels/:id' element={<CommunityModel/>}/>
                                  </Routes>
                          </Router>
                      </div>
          </div>
      </>

  );
}


export default App;
