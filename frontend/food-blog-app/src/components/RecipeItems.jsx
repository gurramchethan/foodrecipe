import React, { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState();
  const navigate = useNavigate();

  const path = window.location.pathname === "/myRecipe";
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  const [isFavRecipe, setIsFavRecipe] = useState(false);

  useEffect(() => {
    setAllRecipes(recipes);
  }, [recipes]);

  const onDelete = async (id) => {
    await axios.delete(`http://localhost:5000/recipe/${id}`);
    setAllRecipes(prev => prev.filter(recipe => recipe._id !== id));
    const filterItem = favItems.filter(recipe => recipe._id !== id);
    localStorage.setItem("fav", JSON.stringify(filterItem));
  };

  const favRecipe = (item) => {
    const exists = favItems.some(recipe => recipe._id === item._id);
    favItems = exists
      ? favItems.filter(recipe => recipe._id !== item._id)
      : [...favItems, item];
    localStorage.setItem("fav", JSON.stringify(favItems));
    setIsFavRecipe(prev => !prev);
  };

  return (
    <div className="container py-4">
      <div className="row g-4">
        {allRecipes?.map((item, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-3">
            <div
              className="card h-100 shadow-sm"
              onDoubleClick={() => navigate(`/recipe/${item._id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`http://localhost:5000/images/${item.coverImage}`}
                className="card-img-top"
                alt={item.title}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title text-truncate">{item.title}</h5>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <small className="text-muted">
                    <BsStopwatchFill className="me-1" />
                    {item.time}
                  </small>
                  {!path ? (
                    <FaHeart
                      onClick={() => favRecipe(item)}
                      className={`ms-2 ${favItems.some(res => res._id === item._id) ? 'text-danger' : 'text-secondary'}`}
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <div>
                      <Link to={`/editRecipe/${item._id}`} className="text-success me-3">
                        <FaEdit />
                      </Link>
                      <MdDelete
                        onClick={() => onDelete(item._id)}
                        className="text-danger"
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
