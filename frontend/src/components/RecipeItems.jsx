// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems() {
  const recipes = useLoaderData(); // Assuming this is passed from a route loader
  const [allRecipes, setAllRecipes] = useState([]); // Initialize the state for all recipes
  const [favItems, setFavItems] = useState(JSON.parse(localStorage.getItem("fav")) ?? []); // Initialize the state for favorites
  const navigate = useNavigate();
  const path = window.location.pathname === "/myRecipe";

  // Update the recipes when `recipes` changes
  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);  // Now it will update whenever `recipes` changes

  const onDelete = async (id) => {
    try {
      // Delete the recipe from the database
      await axios.delete(`http://localhost:3001/recipes/${id}`);
      
      // Update the state to remove the deleted recipe
      setAllRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));

      // Remove deleted item from favorites if it's there
      const updatedFavorites = favItems.filter(recipe => recipe._id !== id);
      localStorage.setItem("fav", JSON.stringify(updatedFavorites));
      setFavItems(updatedFavorites); // Update the state to reflect the change in favorites
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe. Please try again.");
    }
  };

  const favRecipe = (item) => {
    const isFavorite = favItems.some(recipe => recipe._id === item._id); // Check if the item is already a favorite
    const updatedFavorites = isFavorite
      ? favItems.filter(recipe => recipe._id !== item._id)  // If it's already a favorite, remove it
      : [...favItems, item];  // If it's not a favorite, add it to the list

    // Update the favorites in localStorage and state
    localStorage.setItem("fav", JSON.stringify(updatedFavorites));
    setFavItems(updatedFavorites); // Update the state to reflect the change in favorites
  };

  return (
    <div className='card-container'>
      {allRecipes?.map((item) => {
        return (
          <div 
            key={item._id}  // Ensure each child has a unique key
            className='card' 
            onDoubleClick={() => navigate(`/recipe/${item._id}`)}
          >
            <img 
              src={`http://localhost:3001/images/${item.coverImage}`} 
              width="120px" 
              height="100px" 
              alt={`${item.title} cover`} 
            />
            <div className='card-body'>
              <div className='title'>{item.title}</div>
              <div className='icons'>
                <div className='timer'>
                  <BsStopwatchFill /> {item.time}
                </div>
                {!path ? (
                  <FaHeart 
                    onClick={() => favRecipe(item)}
                    style={{ color: favItems.some(res => res._id === item._id) ? "red" : "" }}
                  />
                ) : (
                  <div className='action'>
                    <Link to={`/editRecipe/${item._id}`} className="editIcon">
                      <FaEdit />
                    </Link>
                    <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
