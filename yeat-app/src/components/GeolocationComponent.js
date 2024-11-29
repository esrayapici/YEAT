import React, { useEffect, useState } from 'react';

export default function GeolocationHandler() {
    const [location, setLocation] = useState(null); // Store latitude and longitude
    const [error, setError] = useState(null); // Store error messages

    useEffect(() => {
        if (navigator.geolocation) {
            // Request user location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Store location in state
                    setLocation({ latitude, longitude });

                    // Optionally, save location in local storage for persistence
                    localStorage.setItem(
                        'userLocation',
                        JSON.stringify({ latitude, longitude })
                    );

                    console.log('Location saved:', { latitude, longitude });
                },
                (err) => {
                    setError(err.message); // Handle error
                    console.error('Geolocation error:', err.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 } // High-accuracy settings
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    }, []);

    return (
        <div>
            {/* Optionally show error */}
            {error && <p className="text-red-500">Error: {error}</p>}
        </div>
    );
}
