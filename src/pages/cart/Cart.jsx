import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { useAuth } from '../../contexts/AuthContext'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import './Cart.scss'

const Cart = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    getCartItemsCount 
  } = useCart()
  const { user } = useAuth()

  const handleQuantityChange = (cartId, change) => {
    const item = items.find(item => item.cartId === cartId)
    if (item) {
      const newQuantity = item.quantity + change
      if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
        updateQuantity(cartId, newQuantity)
      }
    }
  }

  const handleRemoveItem = (cartId) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(cartId)
    }
  }

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="container">
          <div className="empty-cart-content">
            <ShoppingBag size={64} className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/products" className="btn btn--primary">
              Start Shopping
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{getCartItemsCount()} items in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.cartId} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-options">
                    <span className="item-size">Size: {item.size}</span>
                    <span className="item-color">Color: {item.color}</span>
                  </div>
                  <div className="item-price">${item.price}</div>
                </div>

                <div className="item-quantity">
                  <button 
                    onClick={() => handleQuantityChange(item.cartId, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.cartId, 1)}
                    disabled={item.quantity >= item.maxQuantity}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                  className="item-remove"
                  onClick={() => handleRemoveItem(item.cartId)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({getCartItemsCount()} items)</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="summary-row">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
              </div>

              {!user ? (
                <div className="login-prompt">
                  <p>Please log in to proceed with checkout</p>
                  <Link to="/login" className="btn btn--primary">
                    Login to Checkout
                  </Link>
                </div>
              ) : (
                <button className="btn btn--primary checkout-btn">
                  Proceed to Checkout
                </button>
              )}

              <button 
                className="btn btn--outline clear-cart-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>

              <Link to="/products" className="continue-shopping">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart