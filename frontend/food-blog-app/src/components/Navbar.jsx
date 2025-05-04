import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import InputForm from './InputForm';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(!localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!token);
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [isOpen]); // When modal closes, check if logged in

  const checkLogin = () => {
    if (!isLogin) {
      // Logout logic
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLogin(true);
      setUser(null);
    } else {
      // Show login modal when not logged in
      setIsOpen(true);
    }
  };

  return (
    <>
      <header className="bg-light py-2">
        <div className="container d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Food Blog</h2>
          <ul className="nav">
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to={isLogin ? '/' : '/myRecipe'}
                onClick={() => isLogin && setIsOpen(true)}
              >
                My Recipe
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                to={isLogin ? '/' : '/favRecipe'}
                onClick={() => isLogin && setIsOpen(true)}
              >
                Favourites
              </NavLink>
            </li>
            <li className="nav-item">
              {/* Logout or Login button */}
              {isLogin ? (
                <button className="btn btn-outline-primary" onClick={checkLogin}>
                  Login
                </button>
              ) : (
                <button
                  className="btn btn-outline-danger"
                  onClick={checkLogin}
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </header>

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
}
