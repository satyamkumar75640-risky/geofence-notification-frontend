// Geofencing utility functions

/**
 * Calculate distance between two points using Haversine formula
 * @param {Object} point1 - {lat, lng}
 * @param {Object} point2 - {lat, lng}
 * @returns {number} - Distance in meters
 */
export const calculateDistance = (point1, point2) => {
  const R = 6371e3; // Earth's radius in meters
  const lat1 = point1.lat * Math.PI / 180;
  const lat2 = point2.lat * Math.PI / 180;
  const deltaLat = (point2.lat - point1.lat) * Math.PI / 180;
  const deltaLng = (point2.lng - point1.lng) * Math.PI / 180;

  const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng/2) * Math.sin(deltaLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
  return R * c;
};

/**
 * Check if a point is inside a circular geofence
 * @param {Object} point - {lat, lng}
 * @param {Object} circle - {center: {lat, lng}, radius}
 * @returns {boolean}
 */
export const isInsideCircle = (point, circle) => {
  const distance = calculateDistance(point, circle.center);
  return distance <= circle.radius;
};

/**
 * Check if a point is inside a polygon geofence using ray casting algorithm
 * @param {Object} point - {lat, lng}
 * @param {Array} polygon - Array of {lat, lng} points
 * @returns {boolean}
 */
export const isInsidePolygon = (point, polygon) => {
  let inside = false;
  const { lat, lng } = point;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat, yi = polygon[i].lng;
    const xj = polygon[j].lat, yj = polygon[j].lng;

    const intersect = ((yi > lng) !== (yj > lng))
      && (lat < (xj - xi) * (lng - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
};

/**
 * Check if a point is inside any geofence
 * @param {Object} point - {lat, lng}
 * @param {Object} geofence - Geofence object
 * @returns {boolean}
 */
export const isInsideGeofence = (point, geofence) => {
  if (geofence.type === 'circle') {
    return isInsideCircle(point, geofence);
  } else if (geofence.type === 'polygon') {
    return isInsidePolygon(point, geofence.points);
  }
  return false;
};

/**
 * Get all geofences that contain a point
 * @param {Object} point - {lat, lng}
 * @param {Array} geofences - Array of geofence objects
 * @returns {Array} - Array of geofences containing the point
 */
export const getContainingGeofences = (point, geofences) => {
  return geofences.filter(geofence => isInsideGeofence(point, geofence));
};

/**
 * Calculate the center point of a polygon
 * @param {Array} points - Array of {lat, lng} points
 * @returns {Object} - {lat, lng} center point
 */
export const getPolygonCenter = (points) => {
  let latSum = 0;
  let lngSum = 0;
  
  points.forEach(point => {
    latSum += point.lat;
    lngSum += point.lng;
  });
  
  return {
    lat: latSum / points.length,
    lng: lngSum / points.length
  };
};

/**
 * Format coordinates for display
 * @param {number} coord - Latitude or longitude
 * @param {number} decimals - Number of decimal places
 * @returns {string}
 */
export const formatCoordinate = (coord, decimals = 6) => {
  return coord.toFixed(decimals);
};

/**
 * Save geofences to localStorage
 * @param {Array} geofences - Array of geofence objects
 */
export const saveGeofencesToStorage = (geofences) => {
  try {
    localStorage.setItem('geofences', JSON.stringify(geofences));
  } catch (error) {
    console.error('Error saving geofences to storage:', error);
  }
};

/**
 * Load geofences from localStorage
 * @returns {Array} - Array of geofence objects
 */
export const loadGeofencesFromStorage = () => {
  try {
    const stored = localStorage.getItem('geofences');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading geofences from storage:', error);
    return [];
  }
};