CSV to JSON conversion

start the application using Docker
- docker compose up

start application using npm (provided all requirements are installed)
- npm i
- npm run db:init (this script initializes database and table. WORKS ONLY FOR LINUX)
- npm run start


API
POST http://localhost:3000/api/data/process


testcase for 50000+ records
- for running this testcase first run the test_generateCSV.js file using "node test_generateCSV.js" command,
- then restart the application
