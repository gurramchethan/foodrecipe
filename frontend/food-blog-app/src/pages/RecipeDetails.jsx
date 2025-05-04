import React from 'react'
import profileImg from '../assets/profile.png'
import { useLoaderData } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function RecipeDetails() {
    const recipe = useLoaderData()
    console.log(recipe)

    return (
        <div className="container my-5">
            <div className="card shadow-lg p-4">
                <div className="d-flex align-items-center mb-4">
                    <img src={profileImg} className="rounded-circle me-3" width="50" height="50" alt="Profile" />
                    <h5 className="mb-0 text-secondary">{recipe.email}</h5>
                </div>

                <h3 className="text-primary mb-3">{recipe.title}</h3>
                <img
                    src={`http://localhost:5000/images/${recipe.coverImage}`}
                    className="img-fluid rounded mb-4"
                    style={{ maxWidth: "400px", height: "auto" }}
                    alt="Recipe"
                />

                <div className="row">
                    <div className="col-md-6 mb-4">
                        <h4 className="text-success">Ingredients</h4>
                        <ul className="list-group list-group-flush">
                            {recipe.ingredients.map((item, idx) => (
                                <li key={idx} className="list-group-item">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <h4 className="text-success">Instructions</h4>
                        <p className="bg-light p-3 rounded border">{recipe.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
