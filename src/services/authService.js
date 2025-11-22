// Mock auth service - replace with actual API calls
export const authService = {
  async login(email, password) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials
    if (email === 'demo@example.com' && password === 'password') {
      return {
        user: {
          id: 1,
          email: email,
          name: 'Demo User',
          isVerified: true
        },
        token: 'demo-jwt-token-12345'
      };
    } else {
      throw new Error('Invalid email or password');
    }
  },

  async register(userData) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic validation
    if (!userData.email || !userData.password || !userData.name) {
      throw new Error('All fields are required');
    }
    
    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match');
    }
    
    return {
      message: 'Registration successful! Please check your email for verification.',
      userId: Math.floor(Math.random() * 1000) + 1
    };
  },

  async forgotPassword(email) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!email) {
      throw new Error('Email is required');
    }
    
    return {
      message: 'Password reset instructions have been sent to your email.'
    };
  },

  async verifyEmail(token) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!token) {
      throw new Error('Invalid verification token');
    }
    
    return {
      message: 'Email verified successfully! You can now log in.'
    };
  },

  async resetPassword(token, newPassword) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!token || !newPassword) {
      throw new Error('Token and new password are required');
    }
    
    if (newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    return {
      message: 'Password reset successfully! You can now log in with your new password.'
    };
  }
};