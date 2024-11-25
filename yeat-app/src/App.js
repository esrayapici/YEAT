import React from 'react';
import Navbar from './components/Navbar.js';
import Banner from './components/Banner.js';
import SearchBar from './components/SearchBar.js';
import MapComponent from './components/MapComponent.js';
import BackToTop from "./components/BackToTop";
import './App.css';

function App() {
    return (
        <div className="App">
            <Navbar />
            <Banner />
            <header className="App-header">
                <div className="search-bar">
                    <SearchBar />
                </div>
            </header>
            <main className="App-body">
                <div className="map">
                    <MapComponent />
                </div>
                </main>
            <BackToTop />
        </div>
    );
}

export default App;
