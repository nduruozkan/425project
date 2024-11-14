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
  const [allRecipes, setAllRecipes] = useState([]);
  const [isFavRecipe, setIsFavRecipe] = useState(false);
  const navigate = useNavigate();
  const path = window.location.pathname === "/myRecipe";
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];

  useEffect(() => {
    if (recipes !== allRecipes) {
      setAllRecipes(recipes);  // Only update if recipes have changed
    }
  }, [recipes, allRecipes]);  // Added allRecipes to prevent infinite updates

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/recipes/${id}`);
      setAllRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== id));

      // Remove deleted item from favorites if it's there
      const updatedFavorites = favItems.filter(recipe => recipe._id !== id);
      localStorage.setItem("fav", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const favRecipe = (item) => {
    const isFavorite = favItems.some(recipe => recipe._id === item._id);
    const updatedFavorites = isFavorite 
      ? favItems.filter(recipe => recipe._id !== item._id) 
      : [...favItems, item]; 
    
    localStorage.setItem("fav", JSON.stringify(updatedFavorites));
    setIsFavRecipe(!isFavRecipe);  // Trigger re-render when favorites change
  };

  return (
    <div className='card-container'>
      {allRecipes?.map((item) => {
        return (
          // Use `item._id` as the unique key for each recipe
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
