const express = require('express');
const { initializeSchema } = require('./dbSchema');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const port = 3001;

app.use(express.json());

// Initialize the database schema
initializeSchema();

// Use the user and recipe routes
app.use('/api', userRoutes);
app.use('/api', recipeRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
