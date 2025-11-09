import React, { useState, useEffect } from 'react';

function LocationTracker({ onLocationUpdate, geofences, onGeofenceEvent }) {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState(null);
  const [insideZones, setInsideZones] = useState(new Set());

  // Function to check if a point is inside a circle
  const isInsideCircle = (point, circle) => {
    const R = 6371e3; // Earth's radius in meters
    const lat1 = point.lat * Math.PI / 180;
    const lat2 = circle.center.lat * Math.PI / 180;
    const deltaLat = (circle.center.lat - point.lat) * Math.PI / 180;
    const deltaLng = (circle.center.lng - point.lng) * Math.PI / 180;

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;

    return distance <= circle.radius;
  };

  // Function to check if a point is inside a polygon
  const isInsidePolygon = (point, polygon) => {
    let inside = false;
    const { lat, lng } = point;
    const points = polygon.points;

    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].lat, yi = points[i].lng;
      const xj = points[j].lat, yj = points[j].lng;

      const intersect = ((yi > lng) !== (yj > lng))
        && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }

    return inside;
  };

  // Check geofence violations
  useEffect(() => {
    if (!currentLocation || !geofences) return;

    const newInsideZones = new Set();

    geofences.forEach(geofence => {
      let isInside = false;

      if (geofence.type === 'circle') {
        isInside = isInsideCircle(currentLocation, geofence);
      } else if (geofence.type === 'polygon') {
        isInside = isInsidePolygon(currentLocation, geofence);
      }

      if (isInside) {
        newInsideZones.add(geofence.id);
        // Entry event
        if (!insideZones.has(geofence.id)) {
          onGeofenceEvent?.({
            type: 'enter',
            geofence,
            location: currentLocation,
            timestamp: new Date()
          });
        }
      } else {
        // Exit event
        if (insideZones.has(geofence.id)) {
          onGeofenceEvent?.({
            type: 'exit',
            geofence,
            location: currentLocation,
            timestamp: new Date()
          });
        }
      }
    });

    setInsideZones(newInsideZones);
  }, [currentLocation, geofences]);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setCurrentLocation(location);
        onLocationUpdate?.(location);
        setError(null);
      },
      (err) => {
        setError(`Error: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    setWatchId(id);
    setTracking(true);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setTracking(false);
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h2 style={{ marginTop: 0 }}>Location Tracker</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={tracking ? stopTracking : startTracking}
          style={{
            backgroundColor: tracking ? '#f44336' : '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%'
          }}
        >
          {tracking ? 'Stop Tracking' : 'Start Tracking'}
        </button>
      </div>

      {error && (
        <div style={{
          padding: '10px',
          backgroundColor: '#ffebee',
          color: '#c62828',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          {error}
        </div>
      )}

      {currentLocation && (
        <div style={{
          padding: '15px',
          backgroundColor: 'white',
          borderRadius: '4px',
          marginBottom: '15px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '10px' }}>Current Location</h3>
          <p style={{ margin: '5px 0' }}>
            <strong>Latitude:</strong> {currentLocation.lat.toFixed(6)}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Longitude:</strong> {currentLocation.lng.toFixed(6)}
          </p>
          <p style={{ margin: '5px 0' }}>
            <strong>Accuracy:</strong> {currentLocation.accuracy?.toFixed(2)} meters
          </p>
        </div>
      )}

      {insideZones.size > 0 && (
        <div style={{
          padding: '15px',
          backgroundColor: '#e3f2fd',
          color: '#1565c0',
          borderRadius: '4px'
        }}>
          <strong>Inside {insideZones.size} geofence zone(s)</strong>
        </div>
      )}
    </div>
  );
}

export default LocationTracker;