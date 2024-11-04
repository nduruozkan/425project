const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const userController = require('../controllers/userController'); // To access authentication

// Create recipe (protected)
router.post('/recipes', userController.authenticateToken, recipeController.createRecipe);

// Get recipe by ID (public)
router.get('/recipes/:id', recipeController.getRecipeById);

// Update recipe (protected)
router.put('/recipes/:id', userController.authenticateToken, recipeController.updateRecipe);

// Delete recipe (protected)
router.delete('/recipes/:id', userController.authenticateToken, recipeController.deleteRecipe);

module.exports = router;
