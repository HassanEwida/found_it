import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParticlesBg from 'particles-bg';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import SearchItem from './pages/SearchItem/SearchItem';
import ListItem from './pages/ListItem/ListItem';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header className="header"/>
        <main className='content-wrapper'>
          <Routes>
            <Route exact path='/home' element={<Home />} />
            <Route path='/SearchItem' element={<SearchItem />} />
            <Route path='/ListItem' element={<ListItem />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </main>
        <Footer />
        <ParticlesBg type="cobweb" num={50} bg={true} />
      </div>
    </Router>
    
  );
}

export default App;
