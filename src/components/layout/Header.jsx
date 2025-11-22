import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { ShoppingCart, User, LogOut, Menu, Search, Heart, X, ChevronDown } from 'lucide-react'
import './Header.scss'

const Header = () => {
  const { user, logout } = useAuth()
  const { getCartItemsCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)

  const handleLogout = () => {
    logout()
    setIsUserDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 100)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && !event.target.closest('.search-container')) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isSearchOpen])

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/categories', label: 'Categories' },
    { path: '/deals', label: 'Hot Deals' },
  ]

  const mobileNavigationItems = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/categories', label: 'Categories' },
    { path: '/deals', label: 'Hot Deals' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <header className="header">
      {/* Top Bar - Hidden on mobile */}
      <div className="header-top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="top-bar-left">
              <span className="welcome-text">
                🎉 Welcome to ShopEasy - Premium Fashion Destination
              </span>
            </div>
            <div className="top-bar-right">
              <span className="top-bar-item">
                <span className="icon">🚚</span>
                Free Shipping
              </span>
              <span className="top-bar-item">
                <span className="icon">🛡️</span>
                Secure Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            {/* Logo - Always visible */}
            <div className="header-section logo-section">
              <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="logo-icon">
                  <ShoppingCart className="logo-svg" />
                </div>
                <div className="logo-text">
                  <span className="logo-primary">Shop</span>
                  <span className="logo-accent">Easy</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="header-section nav-section desktop-nav">
              <nav className="nav">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Search Overlay - Shows when search is open */}
            {isSearchOpen && (
              <div className="search-overlay">
                <div className="search-container expanded">
                  <form onSubmit={handleSearchSubmit} className="search-form">
                    <div className="search-input-wrapper">
                      <Search className="search-icon" size={24} />
                      <input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder="Search for products, brands, categories..." 
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                      <button 
                        type="button"
                        className="close-search-btn"
                        onClick={() => setIsSearchOpen(false)}
                        aria-label="Close search"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <button type="submit" className="search-btn expanded">
                      Search
                    </button>
                  </form>

                  {/* Search Suggestions */}
                  <div className="search-suggestions">
                    <div className="suggestion-section">
                      <h4>Popular Categories</h4>
                      <div className="suggestion-tags">
                        <button 
                          className="suggestion-tag"
                          onClick={() => {
                            navigate('/products?category=men')
                            setIsSearchOpen(false)
                          }}
                        >
                          Men's Fashion
                        </button>
                        <button 
                          className="suggestion-tag"
                          onClick={() => {
                            navigate('/products?category=women')
                            setIsSearchOpen(false)
                          }}
                        >
                          Women's Fashion
                        </button>
                        <button 
                          className="suggestion-tag"
                          onClick={() => {
                            navigate('/products?category=electronics')
                            setIsSearchOpen(false)
                          }}
                        >
                          Electronics
                        </button>
                        <button 
                          className="suggestion-tag"
                          onClick={() => {
                            navigate('/products?category=accessories')
                            setIsSearchOpen(false)
                          }}
                        >
                          Accessories
                        </button>
                      </div>
                    </div>

                    <div className="suggestion-section">
                      <h4>Trending Searches</h4>
                      <div className="suggestion-list">
                        <button 
                          className="suggestion-item"
                          onClick={() => {
                            setSearchQuery('Summer Collection')
                            searchInputRef.current?.focus()
                          }}
                        >
                          <Search size={16} />
                          Summer Collection
                        </button>
                        <button 
                          className="suggestion-item"
                          onClick={() => {
                            setSearchQuery('Smart Watches')
                            searchInputRef.current?.focus()
                          }}
                        >
                          <Search size={16} />
                          Smart Watches
                        </button>
                        <button 
                          className="suggestion-item"
                          onClick={() => {
                            setSearchQuery('Running Shoes')
                            searchInputRef.current?.focus()
                          }}
                        >
                          <Search size={16} />
                          Running Shoes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions Section */}
            <div className="header-section actions-section">
              <div className="header-actions">
                {/* Desktop Actions */}
                <div className="desktop-actions">
                  {/* Search Icon - Hidden when search is open */}
                  {!isSearchOpen && (
                    <button 
                      className="action-btn search-icon-btn"
                      onClick={toggleSearch}
                      title="Search"
                    >
                      <Search size={22} />
                      <span className="action-label">Search</span>
                    </button>
                  )}

                  {/* Wishlist - Hidden on mobile */}
                  <button className="action-btn wishlist-btn" title="Wishlist">
                    <Heart size={22} />
                    <span className="action-label">Wishlist</span>
                  </button>

                  {/* Cart - Always visible */}
                  <Link to="/cart" className="action-btn cart-btn">
                    <div className="cart-icon-wrapper">
                      <ShoppingCart size={22} />
                      {getCartItemsCount() > 0 && (
                        <span className="cart-count">{getCartItemsCount()}</span>
                      )}
                    </div>
                    <span className="action-label">Cart</span>
                  </Link>

                  {/* User Account */}
                  {user ? (
                    <div className="user-menu">
                      <button 
                        className="action-btn user-btn"
                        onClick={toggleUserDropdown}
                      >
                        <div className="user-avatar">
                          <User size={18} />
                        </div>
                        <span className="action-label user-name-truncate">
                          {user.name.split(' ')[0]}
                        </span>
                        <ChevronDown size={16} className="dropdown-arrow" />
                      </button>
                      
                      {isUserDropdownOpen && (
                        <div className="user-dropdown">
                          <div className="user-info">
                            <div className="user-welcome">Welcome back!</div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-email">{user.email}</div>
                          </div>
                          <div className="dropdown-divider"></div>
                          <Link 
                            to="/profile" 
                            className="dropdown-item"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <User size={16} />
                            My Profile
                          </Link>
                          <Link 
                            to="/orders" 
                            className="dropdown-item"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <ShoppingCart size={16} />
                            My Orders
                          </Link>
                          <Link 
                            to="/wishlist" 
                            className="dropdown-item"
                            onClick={() => setIsUserDropdownOpen(false)}
                          >
                            <Heart size={16} />
                            Wishlist
                          </Link>
                          <div className="dropdown-divider"></div>
                          <button 
                            onClick={handleLogout} 
                            className="dropdown-item logout"
                          >
                            <LogOut size={16} />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="auth-buttons">
                      <Link to="/login" className="btn btn--ghost login-btn">
                        <User size={18} />
                        Login
                      </Link>
                      <Link to="/register" className="btn btn--ghost signup-btn">
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button - Hidden on desktop */}
                <button 
                  className="mobile-menu-btn"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`mobile-menu-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <Link to="/" className="mobile-logo" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="logo-icon">
              <ShoppingCart className="logo-svg" />
            </div>
            <span>ShopEasy</span>
          </Link>
          <button 
            className="close-menu-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Search - In mobile menu */}
        <div className="mobile-search">
          <form onSubmit={handleSearchSubmit} className="search-container mobile">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button type="submit" className="search-btn mobile">
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="mobile-menu-content">
          {/* Mobile Navigation */}
          <nav className="mobile-nav">
            {mobileNavigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile User Section */}
          <div className="mobile-user-section">
            {user ? (
              <>
                <div className="mobile-user-info">
                  <div className="user-avatar">
                    <User size={20} />
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
                  </div>
                </div>
                <div className="mobile-user-actions">
                  <Link 
                    to="/profile" 
                    className="mobile-action-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={18} />
                    Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="mobile-action-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={18} />
                    Orders
                  </Link>
                  <Link 
                    to="/wishlist" 
                    className="mobile-action-btn"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Heart size={18} />
                    Wishlist
                  </Link>
                </div>
                <button 
                  onClick={handleLogout}
                  className="mobile-logout-btn"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="mobile-auth-section">
                <p>Welcome to ShopEasy!</p>
                <div className="mobile-auth-buttons">
                  <Link 
                    to="/login" 
                    className="btn btn--outline"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn btn--primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isUserDropdownOpen && (
        <div 
          className="dropdown-overlay"
          onClick={() => setIsUserDropdownOpen(false)}
        ></div>
      )}
    </header>
  )
}

export default Header