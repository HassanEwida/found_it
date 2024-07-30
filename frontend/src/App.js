import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import Logo from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import SearchItem from './pages/SearchItem/SearchItem';
import ListItem from './pages/ListItem/ListItem';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile'
import './App.css';
import { AppContext } from './app-context';

function App() {
  const location = useLocation();
  const { pathname } = location;

  const [state, setState] = useState({ token: undefined, user: undefined });
  
  return (
    <AppContext.Provider value={{ state, setState }}>
      <div className='App'>
        <Logo path={pathname} className="header"/>
        <main className='content-wrapper'>
          <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />
            <Route exact path='/home' element={<Home />} />
            <Route path='/SearchItem' element={<SearchItem />} />
            <Route path='/home/Profile' element={<Profile />} />
            <Route path='/ListItem' element={<ListItem />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </main>
        <Footer />
        <ParticlesBg type="cobweb" num={50} bg={true} />
      </div>
    </AppContext.Provider>
    
  );
}

export default App;


