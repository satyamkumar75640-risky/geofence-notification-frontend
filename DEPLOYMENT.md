# GitHub Deployment Instructions

## Step 1: Create a Repository on GitHub

1. Go to https://github.com/new
2. Create a new repository named `geofence-notification-frontend`
3. DO NOT initialize with README, .gitignore, or license
4. Copy the repository URL (e.g., https://github.com/yourusername/geofence-notification-frontend.git)

## Step 2: Add Remote and Push

Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPO_NAME` with your actual values:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/geofence-notification-frontend.git

# Rename branch to main (optional but recommended)
git branch -M main

# Push the code to GitHub
git push -u origin main
```

## Step 3: Setup GitHub Pages (Optional)

To deploy the application on GitHub Pages:

1. Update `vite.config.js` to set the base path
2. Build the project: `npm run build`
3. Push the dist folder to gh-pages branch
4. Enable GitHub Pages in repository settings

## Git Commands Reference

```bash
# Check git status
git status

# View commit history
git log --oneline

# Add changes
git add .

# Commit changes
git commit -m "Describe your changes"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

## Project Information

- **Repository**: geofence-notification-frontend
- **Technology**: React + Vite
- **Dependencies**: leaflet, react-leaflet
- **License**: MIT

## Support

For questions or issues, please create an issue on the GitHub repository.
