import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    const val = name === 'ingredients'
      ? value.split(',')
      : name === 'file'
      ? files[0]
      : value;
    setRecipeData((prev) => ({ ...prev, [name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post('http://localhost:5000/recipe', recipeData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then(() => navigate('/'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h3 className="mb-4 text-center">Add New Recipe</h3>
          <form onSubmit={onHandleSubmit} className="bg-white p-4 rounded shadow-sm border">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" name="title" onChange={onHandleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Time</label>
              <input type="text" className="form-control" name="time" onChange={onHandleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Ingredients (comma-separated)</label>
              <textarea className="form-control" name="ingredients" rows="3" onChange={onHandleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Instructions</label>
              <textarea className="form-control" name="instructions" rows="3" onChange={onHandleChange} required />
            </div>

            <div className="mb-3">
              <label className="form-label">Recipe Image</label>
              <input type="file" className="form-control" name="file" onChange={onHandleChange} required />
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success w-100">Add Recipe</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
