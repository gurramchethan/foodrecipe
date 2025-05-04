import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 ">
      <div className="container text-center">
        <p className="mb-3">© {new Date().getFullYear()} Food Blog. All rights reserved.</p>
        
        <div className="footer-links mb-3">
          <a href="/about" className="text-white mx-3">About Us</a>
          <a href="/privacy" className="text-white mx-3">Privacy Policy</a>
          <a href="/terms" className="text-white mx-3">Terms & Conditions</a>
        </div>

        <div className="social-icons mt-3">
          <a href="#" className="text-white mx-2"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-white mx-2"><i className="bi bi-twitter"></i></a>
          <a href="#" className="text-white mx-2"><i className="bi bi-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}
