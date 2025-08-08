#!/bin/bash

# Start the Flask backend server
echo "Starting Flask backend server..."
cd backend
python app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start the React frontend server
echo "Starting React frontend server..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "Both servers are starting..."
echo "Backend: http://localhost:5001"
echo "Frontend: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait 