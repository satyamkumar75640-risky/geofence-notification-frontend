# Geofencing Notification System - User Guide

## 📱 What is This System?

The Geofencing Notification System is a real-time location-based application that allows you to:
- **Create virtual geographic boundaries** (geofences) on a map
- **Track your location** in real-time
- **Receive notifications** when you enter or exit a geofence
- **Manage multiple geofences** for different locations
- **View location history** and track entry/exit events

## 🎯 Use Cases

### 1. **Personal Safety**
- Set geofences around your home, work, or school
- Get notified when family members arrive or leave
- Track children's location for safety

### 2. **Business & Logistics**
- Monitor delivery personnel entering/exiting zones
- Track field employees' locations
- Manage warehouse entry/exit notifications

### 3. **Event Management**
- Create geofences for event venues
- Track attendee check-ins
- Send location-based notifications

### 4. **Travel & Tourism**
- Set reminders for tourist attractions
- Get notified when near points of interest
- Track visited locations

## 🚀 Getting Started

### Step 1: Access the Application

1. Open your web browser
2. Navigate to the application URL:
   - **Local:** `http://localhost:5173`
   - **Production:** Your deployed frontend URL

### Step 2: Login/Register

#### For New Users:
1. Click on **"Register"** or **"Sign Up"**
2. Enter your details:
   - Email address
   - Password (min 8 characters)
   - Confirm password
3. Click **"Create Account"**
4. You'll be automatically logged in

#### For Existing Users:
1. Enter your email and password
2. Click **"Login"**
3. You'll be redirected to the main dashboard

**Test Credentials:**
- Email: `adminsatyam@gmail.com`
- Password: `@Satyam4653`

## 🗺️ Main Dashboard Overview

Once logged in, you'll see:

### 1. **Interactive Map** (Center)
- Displays your current location (blue marker)
- Shows all created geofences
- Supports zoom in/out
- Pan to explore different areas

### 2. **Geofence Creator** (Left Panel)
Create new geofences with:
- **Name:** Give your geofence a meaningful name
- **Type:** Choose between Circular or Polygon
- **Radius:** For circular geofences (in meters)
- **Coordinates:** Click on map to set center/vertices

### 3. **Location Tracker** (Top Right)
Shows:
- Your current coordinates
- Real-time location updates
- Active tracking status

### 4. **Geofence List** (Right Panel)
Displays:
- All your created geofences
- Edit/Delete options
- Active status indicators

## 📍 How to Create a Geofence

### Method 1: Circular Geofence

1. **Click on the map** where you want the center
2. In the **Geofence Creator** panel:
   - Enter a name (e.g., "Home", "Office", "School")
   - Select **"Circle"** as type
   - Set radius (e.g., 500 meters)
3. Click **"Create Geofence"**
4. A circular boundary appears on the map

**Example:**
```
Name: My Home
Type: Circle
Radius: 300 meters
Center: Your clicked location
```

### Method 2: Polygon Geofence

1. In the **Geofence Creator** panel:
   - Enter a name
   - Select **"Polygon"** as type
2. **Click multiple points** on the map to create vertices
3. The system connects the points automatically
4. Click **"Create Geofence"** when done
5. A custom-shaped boundary appears

**Example:**
```
Name: Office Campus
Type: Polygon
Vertices: Click 4-10 points around the area
```

## 🎯 How Location Tracking Works

### Automatic Tracking

1. **Permission:** Browser will ask for location access
2. **Allow** location permissions
3. Your position updates every few seconds
4. Blue marker shows your current location

### Entry/Exit Detection

The system automatically:

✅ **When you ENTER a geofence:**
- Triggers entry event
- Displays notification: "Entered [Geofence Name]"
- Logs entry time
- Can trigger custom actions

✅ **When you EXIT a geofence:**
- Triggers exit event  
- Displays notification: "Exited [Geofence Name]"
- Logs exit time
- Updates location history

## 🔔 Notifications

You'll receive notifications for:

1. **Geofence Entry**
   ```
   🎯 You entered "Home"
   Time: 6:30 PM
   ```

2. **Geofence Exit**
   ```
   👋 You left "Office"
   Time: 5:45 PM
   ```

3. **System Events**
   - Geofence created successfully
   - Geofence deleted
   - Location tracking started/stopped

## ⚙️ Managing Your Geofences

### View All Geofences

1. Check the **Geofence List** panel
2. Each geofence shows:
   - Name
   - Type (Circle/Polygon)
   - Status (Active/Inactive)
   - Created date

### Edit a Geofence

1. Click **"Edit"** button on the geofence
2. Modify:
   - Name
   - Radius (for circles)
   - Vertices (for polygons)
3. Click **"Save Changes"**

### Delete a Geofence

1. Click **"Delete"** button
2. Confirm deletion
3. Geofence removed from map and database

## 📊 Location History

### View Your History

1. Click **"History"** or **"Location History"**
2. See a timeline of:
   - Geofence entries
   - Geofence exits
   - Timestamps
   - Duration spent in each geofence

### Example History Entry:
```
📍 Office
   Entry: 9:00 AM
   Exit:  5:30 PM
   Duration: 8h 30m

📍 Gym  
   Entry: 6:00 PM
   Exit:  7:15 PM
   Duration: 1h 15m
```

## 🛠️ Advanced Features

### 1. **Custom Notifications**
- Set different notification sounds
- Configure notification frequency
- Enable/disable specific geofence alerts

### 2. **Sharing Geofences**
- Share geofence boundaries with others
- Collaborate on location tracking
- Family/team monitoring

### 3. **Analytics Dashboard**
- Time spent in each geofence
- Most visited locations
- Entry/exit patterns
- Daily/weekly reports

### 4. **Privacy Controls**
- Toggle location tracking on/off
- Delete location history
- Control who can see your geofences
- Set tracking hours

## 💡 Pro Tips

### Optimize Battery Life
- Use larger geofences (reduces GPS checks)
- Disable tracking when not needed
- Set tracking intervals (e.g., every 30 seconds)

### Accurate Geofences
- Use GPS for outdoor geofences
- Allow 50-100m buffer for GPS accuracy
- Test geofences before relying on them

### Better Organization
- Use descriptive names ("Home - Main Entrance")
- Color-code different categories
- Group related geofences

## 🔒 Privacy & Security

### Your Data is Protected
✅ Location data encrypted in transit
✅ Secure JWT authentication  
✅ Password hashing with bcrypt
✅ No third-party data sharing
✅ HTTPS connections only

### You Control Your Data
- Delete your account anytime
- Export location history
- Clear tracking data
- Revoke app permissions

## 📱 Mobile Browser Support

### Supported Browsers
✅ Chrome (Android/iOS)
✅ Safari (iOS)
✅ Firefox (Android)
✅ Edge (Android/iOS)

### Mobile Tips
1. Enable location services on your device
2. Allow browser location permissions
3. Keep app open for real-time tracking
4. Add to home screen for quick access

## ❓ Troubleshooting

### Location Not Updating?
1. Check browser location permissions
2. Enable device GPS/location services
3. Refresh the page
4. Check internet connection

### Notifications Not Working?
1. Allow browser notification permissions
2. Check notification settings
3. Ensure geofence is active
4. Verify you're inside/outside boundary

### Can't Create Geofence?
1. Ensure you're logged in
2. Check map is loaded
3. Click on valid coordinates
4. Enter all required fields

### Map Not Loading?
1. Check internet connection
2. Clear browser cache
3. Try different browser
4. Verify API keys are configured

## 🎓 Example Scenarios

### Scenario 1: Family Safety

**Goal:** Monitor when kids arrive home from school

1. Create circular geofence around home (radius: 100m)
2. Name it "Home Sweet Home"
3. Share with family members
4. Receive notification when anyone enters
5. View history to see arrival times

### Scenario 2: Work Attendance

**Goal:** Track office check-ins

1. Create polygon geofence around office building
2. Name it "Office - Main Campus"
3. System logs entry time automatically
4. View history for attendance records
5. Export data for reports

### Scenario 3: Delivery Tracking

**Goal:** Monitor delivery zones

1. Create geofences for each delivery zone
2. Assign to delivery personnel
3. Get notified on entry/exit
4. Track time spent in each zone
5. Optimize delivery routes

## 📞 Support & Help

### Need Help?
- **Documentation:** Check INTEGRATION.md
- **Issues:** Report on GitHub
- **Updates:** Check repository for latest features

### Quick Links
- 📂 Frontend: https://github.com/satyamkumar75640-risky/geofence-notification-frontend
- 🔧 Backend: https://github.com/satyamkumar75640-risky/geofence-notification-backend
- 📖 Integration Guide: INTEGRATION.md

## 🎉 Enjoy Your Geofencing Experience!

You're all set! Start creating geofences, track your location, and receive smart notifications based on your movements.

Happy Geofencing! 🗺️📍
