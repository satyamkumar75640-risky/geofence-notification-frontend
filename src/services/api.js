// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.geofencenotify.com'
  : 'http://localhost:3001';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Set token to localStorage
const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Remove token from localStorage
const removeToken = () => {
  localStorage.removeItem('authToken');
};

// API request helper with authentication
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const response = await apiRequest('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    if (response.token) {
      setToken(response.token);
    }
    
    return response;
  },
  
  logout: () => {
    removeToken();
  },
  
  isAuthenticated: () => {
    return !!getToken();
  },
};

// Geofence API
export const geofenceAPI = {
  getAll: async () => {
    return await apiRequest('/api/geofences', {
      method: 'GET',
    });
  },
  
  create: async (geofence) => {
    // Transform frontend format to backend format
    const payload = {
      type: geofence.type,
      name: geofence.name,
    };
    
    if (geofence.type === 'circle') {
      payload.center = [geofence.center.lat, geofence.center.lng];
      payload.radius = geofence.radius;
    } else if (geofence.type === 'polygon') {
      payload.coordinates = geofence.points.map(p => [p.lat, p.lng]);
    }
    
    return await apiRequest('/api/geofences', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  
  delete: async (id) => {
    return await apiRequest(`/api/geofences/${id}`, {
      method: 'DELETE',
    });
  },
};

// Location API
export const locationAPI = {
  sendLocation: async (lat, lng) => {
    return await apiRequest('/api/locations', {
      method: 'POST',
      body: JSON.stringify({
        lat,
        lng,
        timestamp: Math.floor(Date.now() / 1000),
      }),
    });
  },
};

// Events API
export const eventsAPI = {
  getEvents: async () => {
    return await apiRequest('/api/events', {
      method: 'GET',
    });
  },
};

export { getToken, setToken, removeToken };