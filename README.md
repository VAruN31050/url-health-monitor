# URL Health Monitor

A modern full-stack application to monitor and track the health status of multiple URLs in real-time. Built with React for the frontend and Node.js + Express for the backend, featuring automatic health checks and historical data tracking.

## Features

- 🌐 Monitor multiple URLs simultaneously
- ⚡ Real-time health status updates
- 📊 Response time tracking
- 📝 Historical data logging
- 🔄 Automatic health checks every 30 minutes
- 💾 SQLite database for persistent storage
- 🎨 Modern, responsive UI design

## Tech Stack

### Frontend
- React
- Modern CSS with gradient styling
- Responsive design for all devices

### Backend
- Node.js
- Express.js
- SQLite3 for database
- Cron jobs for automated checks

## Project Structure

```
url-health-monitor/
├── frontend/           # React frontend application
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Express backend server
│   ├── server.js      # Main server file
│   ├── cron.js        # Automated health checks
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will run on http://localhost:3000

### Backend Setup
```bash
cd backend
npm install
node server.js
```
The backend will run on http://localhost:5000

## API Endpoints

- `POST /check-urls` - Check health status of provided URLs
- `GET /history/:url` - Get health check history for a specific URL

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License
