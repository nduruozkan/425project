// controllers/recipeController.js
const recipeModel = require('../models/recipe');

// Controller to create a new recipe
function createRecipe(req, res) {
    recipeModel.createRecipe(req.body, (err, recipeId) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: recipeId, message: "Recipe created successfully" });
    });
}

// Controller to get a recipe by ID
function getRecipeById(req, res) {
    recipeModel.getRecipeById(req.params.id, (err, recipe) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        res.json(recipe);
    });
}

// Controller to update a recipe
function updateRecipe(req, res) {
    recipeModel.updateRecipe(req.params.id, req.body, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ error: "Recipe not found" });
        res.json({ message: "Recipe updated successfully" });
    });
}

// Controller to delete a recipe
function deleteRecipe(req, res) {
    recipeModel.deleteRecipe(req.params.id, (err, changes) => {
        if (err) return res.status(500).json({ error: err.message });
        if (changes === 0) return res.status(404).json({ error: "Recipe not found" });
        res.json({ message: "Recipe deleted successfully" });
    });
}

module.exports = {
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};

