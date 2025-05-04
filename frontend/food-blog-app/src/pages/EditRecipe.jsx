import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:5000/recipe/${id}`)
                .then(response => {
                    let res = response.data
                    setRecipeData({
                        title: res.title,
                        ingredients: res.ingredients.join(","),
                        instructions: res.instructions,
                        time: res.time
                    })
                })
        }
        getData()
    }, [])

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.put(`http://localhost:5000/recipe/${id}`, recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        })
            .then(() => navigate("/myRecipe"))
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Edit Your Recipe</h2>
            <form className="row g-3" onSubmit={onHandleSubmit}>
                <div className="col-md-8 mx-auto">
                    <label htmlFor="title" className="form-label">Recipe Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="title" 
                        name="title" 
                        onChange={onHandleChange} 
                        value={recipeData.title} 
                        required
                    />
                </div>

                <div className="col-md-8 mx-auto">
                    <label htmlFor="time" className="form-label">Preparation Time</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="time" 
                        name="time" 
                        onChange={onHandleChange} 
                        value={recipeData.time} 
                        required
                    />
                </div>

                <div className="col-md-8 mx-auto">
                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    <textarea 
                        className="form-control" 
                        id="ingredients" 
                        name="ingredients" 
                        rows="5" 
                        onChange={onHandleChange} 
                        value={recipeData.ingredients} 
                        required
                    ></textarea>
                </div>

                <div className="col-md-8 mx-auto">
                    <label htmlFor="instructions" className="form-label">Instructions</label>
                    <textarea 
                        className="form-control" 
                        id="instructions" 
                        name="instructions" 
                        rows="5" 
                        onChange={onHandleChange} 
                        value={recipeData.instructions} 
                        required
                    ></textarea>
                </div>

                <div className="col-md-8 mx-auto">
                    <label htmlFor="file" className="form-label">Recipe Image</label>
                    <input 
                        type="file" 
                        className="form-control" 
                        id="file" 
                        name="file" 
                        onChange={onHandleChange} 
                    />
                </div>

                <div className="col-md-8 mx-auto text-center mt-3 mb-4">
                    <button type="submit" className="btn btn-danger">Update Recipe</button>
                </div>
            </form>
        </div>
    )
}
