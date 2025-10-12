#!/bin/bash
set -e

echo "Installing dependencies..."
( cd client && npm install )
( cd server && npm install )

echo "Starting the client and server..."
( cd server && npm run start ) &

SERVER_PID=$!
trap 'kill $SERVER_PID' EXIT

( cd client && npm run build && npm start  )
