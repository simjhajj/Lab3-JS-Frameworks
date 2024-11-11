// import express
const express = require('express');
// created an instance for express
//  the app object allows to define routes and middleware
const app = express();
//  define the port tp the server
const port = 3000;

// need to chnge week 9 
// pckg.json scripts 
// nodemonm is used to make instant chnage sin the website
// type c hange krni pcg 

// Serve static files (optional for any other content like images)
app.use(express.static('public'));

// Home route - Display group names using simple HTML
// The get() method handles HTTP get() requests
// this is being used to display group members names

// I have added the route to handle requests to the home page(root)(/), 
// the second parameter is a callback functionthat takes request(req) and response(res) as arguments
// use res.send to send an HTML request. It sends the response to the client(browser)
app.get('/', (req, res) => {
    res.send('<h1>Group Members: Simrandeep Kaur, Ashmandeep Kaur, Krisha Patel</h1>');
});


// start the server to listen for incoming requests
// the listen() method starts the server and listens for incoming requests
// the callback function logs a message to the console when the server starts
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
