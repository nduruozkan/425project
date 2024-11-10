require('dotenv').config(); // Load environment variables
const express = require('express');
const { initializeSchema } = require('./dbSchema');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const authController = require("./controllers/authController");

const app = express(); // Create an instance of the Express app
const PORT = process.env.PORT || 3001; // Use PORT from .env if available

app.use(express.json()); // Middleware to parse JSON bodies

// Initialize the database schema
initializeSchema();

// Use separate paths for user and recipe routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);
app.get("/api/protected", authController.authenticateJWT, authController.protectedResource);

// Export the app for testing purposes
module.exports = app;

// Start the server only if this file is run directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
