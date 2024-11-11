// Import express module to create a web server
const express = require('express');
// Import file system module to interact with the file system
const fs = require('fs');
// Create an express application
const app = express();
// Define the port number on which the server will listen
const port = 3000;

// Define a route handler for the root endpoint ('/')
// This will handle requests to the root URL (http://localhost:3000/)
app.get('/', (req, res) => {
    // Send a simple response when the root URL is accessed
    res.send('Welcome to the Home Page!');  // This is the response that will be shown
});

// Define a route handler for '/data' endpoint
// This route will be used to fetch the JSON data
app.get('/data', (req, res) => {
    // Read the 'data.json' file asynchronously
    fs.readFile('./data/data.json', (err, data) => {
        // Check if there was an error reading the file
        if (err) {
            // If there's an error, send a 500 status code (internal server error)
            // Return an error message to the client
            res.status(500).send('Error reading data');
            return;  // Stop further execution of the function
        }
        // If no errors occur, parse the JSON file content into a JavaScript object
        // Send the parsed JSON object as a response to the client
        res.json(JSON.parse(data));  // Sends JSON data as the response
    });
});

// Start the server and make it listen on the specified port
app.listen(port, () => {
    // Log a message to the console indicating the server is running
    console.log(`Server is running at http://localhost:${port}`);
});
