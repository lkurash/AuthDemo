#!/bin/bash
set -e

cp -n server/.env.example server/.env 2>/dev/null || true
cp -n client/.env.example client/.env.local 2>/dev/null || true

echo "Installing dependencies..."
( cd client && npm install )
( cd server && npm install )

echo "Starting the client and server..."
( cd server && npm run start ) &

SERVER_PID=$!
trap 'kill $SERVER_PID' EXIT

( cd client && npm run build && npm start )
