import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { authService } from '../../services/authService'
import { Mail, ArrowLeft } from 'lucide-react'
import './Auth.scss'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const result = await authService.forgotPassword(email)
      setMessage(result.message)
    } catch (error) {
      setError(error.message)
    }

    setLoading(false)
  }

  return (
    <div className="auth-container slide-in">
      <div className="auth-card">
        <Link to="/login" className="back-link">
          <ArrowLeft size={20} />
          Back to Login
        </Link>

        <div className="auth-header">
          <h1>Reset Your Password</h1>
          <p>Enter your email address and we'll send you instructions to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}

          {message && (
            <div className="success-banner">
              {message}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn--primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Remember your password?{' '}
            <Link to="/login" className="auth-link">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword