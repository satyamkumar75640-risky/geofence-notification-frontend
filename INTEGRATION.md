# Frontend-Backend Integration Guide

## Overview
This document explains how to connect the Geofencing Notification Frontend with the Backend API.

## Backend Repository
**URL:** https://github.com/satyamkumar75640-risky/geofence-notification-backend

## Configuration Steps

### 1. Environment Setup

Create a `.env` file in the root of the frontend project:

```env
VITE_API_BASE_URL=http://localhost:3000/api
# For production:
# VITE_API_BASE_URL=https://your-backend-domain.com/api
```

### 2. API Endpoint Configuration

The frontend uses the following API base URL configured in `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
```

### 3. Available API Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout

#### Geofences
- `GET /geofences` - Get all geofences
- `POST /geofences` - Create new geofence
- `PUT /geofences/:id` - Update geofence
- `DELETE /geofences/:id` - Delete geofence

#### Location
- `POST /location/track` - Track user location
- `GET /location/history` - Get location history

### 4. Running Both Services

#### Start Backend (Port 3000)
```bash
cd geofence-notification-backend
npm install
npm start
```

#### Start Frontend (Port 5173)
```bash
cd geofence-notification-frontend
npm install
npm run dev
```

### 5. CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- Your production frontend URL

### 6. Authentication Flow

1. User logs in via `Login.jsx` component
2. Backend returns JWT token
3. Token stored in localStorage
4. All subsequent API requests include token in Authorization header

### 7. Deployment Considerations

#### Frontend Deployment (Vercel/Netlify)
1. Set environment variable: `VITE_API_BASE_URL`
2. Point to your deployed backend URL

#### Backend Deployment (Heroku/Railway/AWS)
1. Deploy backend first
2. Note the backend URL
3. Update frontend env variable

## Testing the Connection

1. Start both services
2. Open frontend: `http://localhost:5173`
3. Try logging in with test credentials
4. Check browser console for API requests
5. Verify data flows between frontend and backend

## Troubleshooting

### Connection Refused
- Ensure backend is running on port 3000
- Check CORS settings in backend
- Verify API_BASE_URL is correct

### Authentication Errors
- Check JWT token in localStorage
- Verify token expiration
- Ensure credentials are correct

### CORS Errors
- Add frontend URL to backend CORS whitelist
- Check backend CORS configuration in `src/app.js`

## Production Setup

### Environment Variables

**Frontend (.env.production)**
```env
VITE_API_BASE_URL=https://your-backend.herokuapp.com/api
```

**Backend (.env)**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend.vercel.app
PORT=3000
```

## API Response Format

All API responses follow this structure:

```json
{
  "success": true|false,
  "data": {},
  "message": "Success message",
  "error": "Error message if any"
}
```

## Next Steps

1. ✅ Clone both repositories
2. ✅ Install dependencies
3. ✅ Configure environment variables
4. ✅ Start backend server
5. ✅ Start frontend development server
6. ✅ Test the connection
7. ✅ Deploy to production

## Support

For issues or questions:
- Frontend: Check `geofence-notification-frontend` repository
- Backend: Check `geofence-notification-backend` repository
- Create an issue on the respective repository
