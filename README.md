# Geofence Notification System - Frontend

## Overview
A modern React-based geofencing frontend application for real-time location tracking and geofence management using Leaflet maps and JWT authentication.

## Features
- **Authentication**: Secure login with JWT tokens
- **Map Display**: Interactive maps powered by Leaflet
- **Geofence Management**: Create, view, and delete geofences
- **Location Tracking**: Real-time GPS location tracking
- **Location History**: Track entry/exit events for geofences
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack
- React 18+ with Hooks
- Vite (Fast build tool)
- Leaflet & React-Leaflet (Interactive maps)
- JWT Authentication
- ES6+ JavaScript

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/geofence-notification-frontend.git
cd geofence-notification-frontend

# Install dependencies
npm install

# Install map dependencies
npm install leaflet react-leaflet
```

## Development

```bash
# Start development server
npm run dev

# Server runs on http://localhost:3000
```

## Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Login.jsx              # Authentication component
│   ├── GeoMap.jsx             # Map display component
│   ├── GeofenceCreator.jsx    # Create geofences
│   ├── LocationTracker.jsx    # GPS tracking
│   └── GeofenceList.jsx       # Manage geofences
├── services/
│   └── api.js                 # Backend API integration
├── utils/
│   └── geofenceUtils.js       # Utility functions
├── App.jsx                    # Main app component
└── index.css
```

## Configuration

### Backend API
Update the API base URL in `src/services/api.js`:
- Development: `http://localhost:3001`
- Production: `https://api.geofencenotify.com`

### Credentials
Default test credentials:
- Email: `adminsatyam@gmail.com`
- Password: `@Satyam4653`

## API Endpoints

The application communicates with the backend API:

- `POST /api/login` - User authentication
- `GET /api/geofences` - List all geofences
- `POST /api/geofences` - Create geofence
- `DELETE /api/geofences/:id` - Delete geofence
- `POST /api/locations` - Send location
- `GET /api/events` - Get entry/exit events

## Contributing

Contributions are welcome! Please feel free to submit pull requests.

## License

MIT License - see LICENSE file for details

## Contact

For questions or support, contact: developer@geofence.com
