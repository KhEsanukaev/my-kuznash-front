import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Carpets from './components/Carpets';
import Cart from './components/Cart';
import './App.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <div>
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<Carpets searchQuery={searchQuery} />} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
