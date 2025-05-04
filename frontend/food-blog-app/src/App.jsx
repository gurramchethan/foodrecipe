import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from 'axios';
import Home from './pages/Home';
import MainNavigation from './components/MainNavigation';
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';
import RecipeDetails from './pages/RecipeDetails';

// Function to fetch all recipes
const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get('http://localhost:5000/recipe').then(res => {
    allRecipes = res.data;
  });
  return allRecipes;
};

// Function to fetch recipes for the current user
const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter(item => item.createdBy === user._id);
};

// Function to fetch favorite recipes
const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav"));
};

// Function to fetch a single recipe by ID along with creator details
const getRecipe = async ({ params }) => {
  let recipe;
  await axios.get(`http://localhost:5000/recipe/${params.id}`)
    .then(res => recipe = res.data);

  await axios.get(`http://localhost:5000/user/${recipe.createdBy}`)
    .then(res => {
      recipe = { ...recipe, email: res.data.email };
    });

  return recipe;
};

// Defining routes for the application using react-router v6
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe },
    ]
  }
]);

// Main App component that renders the RouterProvider
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
