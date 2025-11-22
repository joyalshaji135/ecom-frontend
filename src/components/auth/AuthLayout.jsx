import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/auth.scss'

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-background">
          <div className="auth-content">
            <div className="auth-header">
              <h1 className="auth-title">ShopEase</h1>
              <p className="auth-subtitle">Your favorite online store</p>
            </div>
          </div>
        </div>
        
        <div className="auth-form-container">
          <div className="auth-form-wrapper">
            <div className="auth-form-header">
              <h2>{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout