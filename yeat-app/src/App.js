import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import React Router components
import History from './components/History.js';
import Navbar from './components/Navbar.js';
import Banner from './components/Banner.js';
import SearchBar from './components/SearchBar.js';
import MapComponent from './components/MapComponent.js';
import BackToTop from "./components/BackToTop";
import GeolocationComponent from './components/GeolocationComponent'; // Adjust path as needed
import ProfilePage from './ProfilePage.js'; // New ProfilePage component
import DetaliiRestaurant from './components/DetaliiRestaurant.js';
import './App.css';

function App() {
    const [selectedLocation, setSelectedLocation] = useState(null);

    return (
        <Router>
            <div className="App">
                {/* Shared components like Navbar can be outside Routes */}
                <GeolocationComponent />
                <Navbar />

                {/* Define routes for your pages */}
                <Routes>
                    {/* Main page route */}
                    <Route
                        path="/"
                        element={
                            <>
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
                            </>
                        }
                    />

                    {/* Profile page route */}
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
            {/*<DetaliiRestaurant />*/}
        </Router>
    );
}

export default App;
