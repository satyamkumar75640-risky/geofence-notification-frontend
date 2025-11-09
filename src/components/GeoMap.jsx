import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Circle, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position }) {
  return position ? (
    <Marker position={[position.lat, position.lng]}>
      <Popup>Your current location</Popup>
    </Marker>
  ) : null;
}

function GeoMap({ geofences, currentLocation, onGeofenceCreate }) {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState([40.7128, -74.0060]); // Default to NYC

  useEffect(() => {
    if (currentLocation) {
      setCenter([currentLocation.lat, currentLocation.lng]);
    }
  }, [currentLocation]);

  return (
    <div style={{ height: '600px', width: '100%', position: 'relative' }}>
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render current location */}
        <LocationMarker position={currentLocation} />
        
        {/* Render geofences */}
        {geofences.map((geofence) => {
          if (geofence.type === 'circle') {
            return (
              <Circle
                key={geofence.id}
                center={[geofence.center.lat, geofence.center.lng]}
                radius={geofence.radius}
                pathOptions={{
                  color: geofence.color || 'blue',
                  fillColor: geofence.color || 'blue',
                  fillOpacity: 0.2
                }}
              >
                <Popup>{geofence.name}</Popup>
              </Circle>
            );
          } else if (geofence.type === 'polygon') {
            return (
              <Polygon
                key={geofence.id}
                positions={geofence.points.map(p => [p.lat, p.lng])}
                pathOptions={{
                  color: geofence.color || 'green',
                  fillColor: geofence.color || 'green',
                  fillOpacity: 0.2
                }}
              >
                <Popup>{geofence.name}</Popup>
              </Polygon>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
}

export default GeoMap;