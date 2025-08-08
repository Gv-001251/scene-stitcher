cd # Frontend-Backend Integration

This document explains how the React frontend connects to the Flask backend for image composition.

## Architecture

- **Frontend**: React + TypeScript + Vite (port 8080)
- **Backend**: Flask + Pillow (port 5001)
- **Communication**: HTTP POST requests with JSON payloads

## API Integration

### Frontend Changes

1. **API Service** (`src/services/api.ts`)
   - Handles HTTP communication with Flask backend
   - Converts image selections to filenames
   - Processes blob responses from backend

2. **FinalResult Component** (`src/components/FinalResult.tsx`)
   - Updated to call real API instead of simulation
   - Handles errors gracefully with toast notifications
   - Downloads actual stitched images

### Backend Endpoint

- **URL**: `POST http://localhost:5001/compose`
- **Request Body**: `{ "layers": ["ceiling-1.jpg", "chairs-1.jpg", "stage-1.jpg"] }`
- **Response**: PNG image blob

## Setup Instructions

### 1. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Start Both Servers
Option A: Use the convenience script
```bash
./start-servers.sh
```

Option B: Start manually
```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend
npm run dev
```

### 3. Test the Integration
1. Open http://localhost:8080
2. Complete the event design wizard
3. Click "Create My Event"
4. The frontend will call the backend API
5. View the stitched result

## Error Handling

- **Missing Images**: Backend returns 404 with error message
- **Invalid Request**: Backend returns 400 with validation error
- **Network Issues**: Frontend shows error toast
- **Processing Errors**: Backend returns 500 with error details

## Development Notes

- Backend images are in `backend/assets/`
- Frontend images are in `src/assets/`
- CORS is enabled for localhost development
- Image filenames must match between frontend selections and backend assets 