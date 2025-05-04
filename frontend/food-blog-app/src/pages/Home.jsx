import React, { useState } from 'react';
import foodRecipe from '../assets/banana_bread.jpg'; // Make sure to update this with the actual path of the image
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';
import RecipeItems from '../components/RecipeItems';

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Determine heading based on the route
  let heading = "All Recipes";
  let showHeroImage = true; // Default to show the hero image
  let showDescription = true; // Default to show the description
  let showShareButton = true; // Default to show the "Share your recipe" button

  if (location.pathname === "/myRecipe") {
    heading = "My Recipes";
    showHeroImage = false; // Don't show hero image on the My Recipes page
    showDescription = false; // Don't show description on My Recipes page
    showShareButton = false; // Don't show the "Share your recipe" button on the My Recipes page
  } else if (location.pathname === "/favRecipe") {
    heading = "Your Favourites";
    showHeroImage = false; // Don't show hero image on the Favourites page
    showDescription = false; // Don't show description on Favourites page
    showShareButton = false; // Don't show the "Share your recipe" button on the Favourites page
  }

  const addRecipe = () => {
    let token = localStorage.getItem("token");
    if (token) {
      navigate("/addRecipe");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <section className="home container py-5">
        <div className="row align-items-center">
          {/* Left side */}
          <div className="col-md-6">
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#333', marginBottom: '1rem' }}>
              {heading}
            </h1>
            {/* Conditionally render description */}
            {showDescription && (
              <h5 className="mb-4" style={{ lineHeight: '1.6', color: '#555', marginBottom: '2rem' }}>
                Explore delicious recipes with easy-to-follow instructions and ingredients. Start your culinary adventure now!
              </h5>
            )}
            {/* Conditional button for add recipe */}
            {showShareButton && location.pathname !== "/favRecipe" && (
              <button
                onClick={addRecipe}
                className="btn btn-primary"
                style={{
                  backgroundColor: '#ff6b6b',
                  borderColor: '#ff6b6b',
                  padding: '12px 24px',
                  fontSize: '1rem',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Share your recipe
              </button>
            )}
          </div>

          {/* Right side (Image) - only show for All Recipes route */}
          {showHeroImage && (
            <div className="col-md-6" style={{ paddingLeft: '8rem' }}>
              <img
                src={foodRecipe}
                style={{
                  maxWidth: '350px',
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
                alt="food"
              />
            </div>
          )}
        </div>
      </section>

      {/* Modal to show if user is not logged in */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      {/* Show Recipe Items */}
      <div className="recipe">
        <RecipeItems />
      </div>
    </>
  );
}
