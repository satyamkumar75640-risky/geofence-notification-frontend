import React, { useState, useEffect } from 'react';
import GeoMap from './components/GeoMap';
import GeofenceCreator from './components/GeofenceCreator';
import LocationTracker from './components/LocationTracker';
import GeofenceList from './components/GeofenceList';
import { loadGeofencesFromStorage, saveGeofencesToStorage } from './utils/geofenceUtils';
import Login from './components/Login';
import { isAuthenticated, logout } from './services/api';
import './App.css';

function App() {
  const [isAuth, setIsAuth] = useState(isAuthenticated());
  const [geofences, setGeofences] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = loadGeofencesFromStorage();
    if (stored) {
      setGeofences(stored);
    }
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
  };

  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  const handleGeofenceCreate = (newGeofence) => {
    const updated = [...geofences, newGeofence];
    setGeofences(updated);
    saveGeofencesToStorage(updated);
  };

  const handleGeofenceDelete = (id) => {
    const updated = geofences.filter(g => g.id !== id);
    setGeofences(updated);
    saveGeofencesToStorage(updated);
  };

  const handleLocationUpdate = (location) => {
    setCurrentLocation(location);
  };

  if (!isAuth) {
    return <Login onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>Geofence Notification System</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
      <div className="app-container">
        <div className="left-panel">
          <GeoMap geofences={geofences} currentLocation={currentLocation} />
          <LocationTracker onLocationUpdate={handleLocationUpdate} />
        </div>
        <div className="right-panel">
          <GeofenceCreator onGeofenceCreate={handleGeofenceCreate} />
          <GeofenceList geofences={geofences} onDelete={handleGeofenceDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;