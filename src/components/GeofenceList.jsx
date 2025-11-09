import React from 'react';

function GeofenceList({ geofences, onGeofenceDelete }) {
  if (!geofences || geofences.length === 0) {
    return (
      <div style={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#666'
      }}>
        <p>No geofences created yet. Create one above!</p>
      </div>
    );
  }

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h2 style={{ marginTop: 0 }}>Geofence List</h2>
      
      <div>
        {geofences.map((geofence) => (
          <div
            key={geofence.id}
            style={{
              backgroundColor: 'white',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '4px',
              borderLeft: `4px solid ${geofence.color || '#3388ff'}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                {geofence.name}
              </h3>
              <div style={{ fontSize: '14px', color: '#666' }}>
                <p style={{ margin: '5px 0' }}>
                  <strong>Type:</strong> {geofence.type === 'circle' ? 'Circle' : 'Polygon'}
                </p>
                {geofence.type === 'circle' && (
                  <>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Center:</strong> ({geofence.center.lat.toFixed(4)}, {geofence.center.lng.toFixed(4)})
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>Radius:</strong> {geofence.radius}m
                    </p>
                  </>
                )}
                {geofence.type === 'polygon' && (
                  <p style={{ margin: '5px 0' }}>
                    <strong>Points:</strong> {geofence.points.length}
                  </p>
                )}
              </div>
            </div>
            
            <button
              onClick={() => onGeofenceDelete(geofence.id)}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeofenceList;