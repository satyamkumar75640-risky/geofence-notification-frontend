import React, { useState } from 'react';

function GeofenceCreator({ onGeofenceCreate }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('circle');
  const [centerLat, setCenterLat] = useState('');
  const [centerLng, setCenterLng] = useState('');
  const [radius, setRadius] = useState('500');
  const [color, setColor] = useState('#3388ff');
  const [polygonPoints, setPolygonPoints] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name) {
      alert('Please enter a geofence name');
      return;
    }

    if (type === 'circle') {
      if (!centerLat || !centerLng || !radius) {
        alert('Please fill all circle geofence fields');
        return;
      }
      
      const geofence = {
        id: Date.now().toString(),
        name,
        type: 'circle',
        center: {
          lat: parseFloat(centerLat),
          lng: parseFloat(centerLng)
        },
        radius: parseFloat(radius),
        color
      };
      
      onGeofenceCreate(geofence);
    } else if (type === 'polygon') {
      if (!polygonPoints) {
        alert('Please enter polygon coordinates');
        return;
      }
      
      // Parse polygon points format: "lat1,lng1;lat2,lng2;lat3,lng3"
      const points = polygonPoints.split(';').map(point => {
        const [lat, lng] = point.trim().split(',');
        return { lat: parseFloat(lat), lng: parseFloat(lng) };
      });
      
      if (points.length < 3) {
        alert('Polygon must have at least 3 points');
        return;
      }
      
      const geofence = {
        id: Date.now().toString(),
        name,
        type: 'polygon',
        points,
        color
      };
      
      onGeofenceCreate(geofence);
    }
    
    // Reset form
    setName('');
    setCenterLat('');
    setCenterLng('');
    setRadius('500');
    setPolygonPoints('');
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h2 style={{ marginTop: 0 }}>Create Geofence</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Geofence Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
              placeholder="e.g., Home Zone"
            />
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Geofence Type:
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="circle">Circle</option>
              <option value="polygon">Polygon</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                height: '40px'
              }}
            />
          </label>
        </div>

        {type === 'circle' && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Center Latitude:
                <input
                  type="number"
                  step="any"
                  value={centerLat}
                  onChange={(e) => setCenterLat(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                  placeholder="e.g., 40.7128"
                />
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Center Longitude:
                <input
                  type="number"
                  step="any"
                  value={centerLng}
                  onChange={(e) => setCenterLng(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                  placeholder="e.g., -74.0060"
                />
              </label>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>
                Radius (meters):
                <input
                  type="number"
                  value={radius}
                  onChange={(e) => setRadius(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                  }}
                  placeholder="e.g., 500"
                />
              </label>
            </div>
          </>
        )}

        {type === 'polygon' && (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Polygon Points:
              <textarea
                value={polygonPoints}
                onChange={(e) => setPolygonPoints(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  minHeight: '80px'
                }}
                placeholder="Format: lat1,lng1;lat2,lng2;lat3,lng3&#10;Example: 40.7128,-74.0060;40.7138,-74.0050;40.7118,-74.0040"
              />
            </label>
          </div>
        )}

        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            width: '100%'
          }}
        >
          Create Geofence
        </button>
      </form>
    </div>
  );
}

export default GeofenceCreator;