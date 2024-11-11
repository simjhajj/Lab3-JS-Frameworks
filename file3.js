// Import required modules
// Import express module to create a web server
import express from "express";
// Import file system module to interact with the file system
import fs from "fs";

// Initialize the Express application
// Create an express application
const app = express();
// Define the port number on which the server will listen
const PORT = 3000;

// Middleware to parse JSON
// It parses incoming JSON data in the requet body 
// without this the server won't understand data coming in and out from POST() and PUT() 
app.use(express.json());

// Path to the JSON file
// stores the path to the JSON file
const dataFilePath = "./data/data.json";

// Utility function to read data from the JSON file
const readData = () => {
    // Read the data from the JSON file as UTF-8 string
    const data = fs.readFileSync(dataFilePath, "utf8");
    // Converts the stringified JSON data into a JavaScript object or array.
    return JSON.parse(data);
};

// Utility function to write data to the JSON file
const writeData = (data) => {
    // Converts the JavaScript object or array into a stringified JSON data.
    // null and 2 ensure proper indentation for readability.
    // it writes the formatted JSON string back to the data.json file
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
};

// Route to add a new user (POST)
// This route is used to add a new user to the data.json file
app.post("/add", (req, res) => {
    // req.body contains the data for the new user
    const newUser = req.body; // Get new user data from request body
    const data = readData();
    
    data.push(newUser); // Add the new user to the existing data
    writeData(data); // Save updated data to the JSON file

    // Sends an HTTP response with a 201 status code (Created) and a success message.
    res.status(201).send("User added successfully!");
});

// Route to get all users (GET)
// Defines a route at /users that accepts GET requests.
app.get("/users", (req, res) => {
    const data = readData(); // Read data from JSON file
    res.json(data); // Send data as JSON response
});

// Route to update an existing user (PUT)
// Defines a route at /update/:id that accepts PUT requests. The :id is a route parameter for the user ID.
app.put("/update/:id", (req, res) => {
    const { id } = req.params; // Get user ID from route parameters
    const updatedInfo = req.body; // Get updated info from request body
    let data = readData();

    // Find the user by ID
    const userIndex = data.findIndex((user) => user.userID === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).send("User not found!");
    }

    // Update the user details
    data[userIndex] = { ...data[userIndex], ...updatedInfo };
    writeData(data); // Save updated data to the JSON file

    res.send("User updated successfully!");
});

// Route to delete a user (DELETE)
app.delete("/delete/:id", (req, res) => {
    const { id } = req.params; // Get user ID from route parameters
    let data = readData();

    // Filter out the user to delete
    const filteredData = data.filter((user) => user.userID !== parseInt(id));
    if (data.length === filteredData.length) {
        return res.status(404).send("User not found!");
    }

    writeData(filteredData); // Save updated data to the JSON file
    res.send("User deleted successfully!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
