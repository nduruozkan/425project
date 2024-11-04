// models/recipe.js
const db = require('../connectionDb.js');

// Function to create a new recipe
function createRecipe(recipe, callback) {
    const { title, ingredients, instructions, time, coverImage, createdBy } = recipe;
    db.run(
        `INSERT INTO recipes (title, ingredients, instructions, time, coverImage, createdBy) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [title, JSON.stringify(ingredients), instructions, time, coverImage, createdBy],
        function (err) {
            callback(err, this ? this.lastID : null);
        }
    );
}

// Function to retrieve a recipe by ID
function getRecipeById(id, callback) {
    db.get(
        `SELECT * FROM recipes WHERE id = ?`,
        [id],
        (err, row) => {
            if (row) row.ingredients = JSON.parse(row.ingredients); // Convert JSON string back to array
            callback(err, row);
        }
    );
}

// Function to update a recipe
function updateRecipe(id, recipe, callback) {
    const { title, ingredients, instructions, time, coverImage, createdBy } = recipe;
    db.run(
        `UPDATE recipes 
         SET title = ?, ingredients = ?, instructions = ?, time = ?, coverImage = ?, createdBy = ?, updatedAt = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [title, JSON.stringify(ingredients), instructions, time, coverImage, createdBy, id],
        function (err) {
            callback(err, this.changes); // Returns number of rows affected
        }
    );
}

// Function to delete a recipe
function deleteRecipe(id, callback) {
    db.run(
        `DELETE FROM recipes WHERE id = ?`,
        [id],
        function (err) {
            callback(err, this.changes); // Returns number of rows affected
        }
    );
}

// Export the CRUD functions
module.exports = {
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe
};
