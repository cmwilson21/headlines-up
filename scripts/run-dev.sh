npm start &
PID1=$!
echo "Started server with PID $PID1"
npm run dev
kill -9 $PID1
