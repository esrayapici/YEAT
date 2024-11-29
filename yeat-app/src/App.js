import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import Banner from './components/Banner.js';
import SearchBar from './components/SearchBar.js';
import MapComponent from './components/MapComponent.js';
import BackToTop from "./components/BackToTop";
import './App.css';
import GeolocationComponent from './components/GeolocationComponent'; // Adjust path as needed

function App() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <div className="App">
            <GeolocationComponent />
            <Navbar />
            <Banner />
            <header className="App-header">
                <div className="search-bar">
                    <SearchBar onLocationSelect={setSelectedLocation} />
                </div>
            </header>
            <main className="App-body">
                <div className="map">
                    <MapComponent onLocationSelect={setSelectedLocation} />
                </div>
                </main>
            <BackToTop />
        </div>
    );
}

export default App;
