import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { authService } from '../../services/authService'
import { CheckCircle, XCircle, Mail } from 'lucide-react'
import './Auth.scss'

const EmailVerification = () => {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token')
      
      if (!token) {
        setStatus('error')
        setMessage('Invalid verification link')
        return
      }

      try {
        const result = await authService.verifyEmail(token)
        setStatus('success')
        setMessage(result.message)
      } catch (error) {
        setStatus('error')
        setMessage(error.message || 'Verification failed')
      }
    }

    verifyEmail()
  }, [searchParams])

  return (
    <div className="auth-container slide-in">
      <div className="auth-card">
        <div className="verification-content">
          {status === 'verifying' && (
            <>
              <div className="verification-icon verifying">
                <Mail className="icon" />
              </div>
              <h1>Verifying Your Email</h1>
              <p>Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="verification-icon success">
                <CheckCircle className="icon" />
              </div>
              <h1>Email Verified!</h1>
              <p>{message}</p>
              <Link to="/login" className="btn btn--primary">
                Continue to Login
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="verification-icon error">
                <XCircle className="icon" />
              </div>
              <h1>Verification Failed</h1>
              <p>{message}</p>
              <div className="verification-actions">
                <Link to="/register" className="btn btn--outline">
                  Try Again
                </Link>
                <Link to="/login" className="btn btn--primary">
                  Go to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerification