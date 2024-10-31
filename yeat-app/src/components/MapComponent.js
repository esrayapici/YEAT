import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapComponent.css'; // Import your CSS for styling

const MapComponent = () => {
    const position = [44.4268, 26.1025]; // Bucharest coordinates
    const mapRef = useRef(); // Create a ref to store the map instance

    // Component to handle resize event
    const ResizeMap = () => {
        const map = useMap(); // Get the map instance

        useEffect(() => {
            const handleResize = () => {
                map.invalidateSize(); // This method forces the map to recalculate its size
            };

            window.addEventListener('resize', handleResize); // Add event listener for resize

            return () => {
                window.removeEventListener('resize', handleResize); // Clean up the event listener
            };
        }, [map]);

        return null; // This component does not render anything
    };

    return (
        <div id="map-container">
            <MapContainer
                id="map"
                center={position}
                zoom={13}
                style={{ height: '100%', width: '100%' }} // Set height to 100% to fill the container
                whenCreated={mapInstance => { mapRef.current = mapInstance }} // Store the map instance
            >
                <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <ResizeMap /> {/* Include the resize component */}
            </MapContainer>
        </div>
    );
};

export default MapComponent;
