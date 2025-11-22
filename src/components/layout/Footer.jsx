import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <ShoppingCart className="logo-icon" />
              <span>ShopEasy</span>
            </Link>
            <p className="footer-description">
              Your one-stop destination for all your shopping needs. 
              Quality products, amazing prices.
            </p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Shop</h4>
              <Link to="/">All Products</Link>
              <Link to="/">Featured</Link>
              <Link to="/">New Arrivals</Link>
            </div>

            <div className="link-group">
              <h4>Support</h4>
              <Link to="/">Contact Us</Link>
              <Link to="/">FAQ</Link>
              <Link to="/">Shipping</Link>
            </div>

            <div className="link-group">
              <h4>Company</h4>
              <Link to="/">About Us</Link>
              <Link to="/">Careers</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Made with <Heart size={14} className="heart-icon" /> by ShopEasy Team
          </p>
          <p>&copy; 2024 ShopEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer