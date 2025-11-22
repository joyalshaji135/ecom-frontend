import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ArrowRight, ShoppingBag, Shield, Truck, Star, Users, Award, Zap, Clock, CheckCircle, Eye, Heart } from 'lucide-react'
import './Hero.scss'

const Hero = () => {
  const { user } = useAuth()

  const stats = [
    { icon: Users, number: "50K+", label: "Happy Customers" },
    { icon: Star, number: "4.9/5", label: "Customer Rating" },
    { icon: Award, number: "100+", label: "Awards Won" },
    { icon: Zap, number: "24/7", label: "Support" }
  ]

  const features = [
    {
      icon: ShoppingBag,
      title: "10,000+ Products",
      description: "Wide selection of premium items"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Free shipping worldwide"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% protected transactions"
    }
  ]

  return (
    <section className="hero-combined">
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>
      
      <div className="container">
        <div className="hero-content">
          {/* Main Content Section */}
          <div className="hero-main">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-content">
                  <Zap size={16} />
                  Premium Collection
                </span>
                <div className="badge-pulse"></div>
              </div>
              
              <h1 className="hero-title">
                Discover 
                <span className="highlight-gradient"> Exclusive</span> 
                Fashion & 
                <span className="highlight-gradient"> Luxury</span> 
                Items
              </h1>
              
              <p className="hero-subtitle">
                Shop the finest collection of premium fashion, luxury accessories, 
                and exclusive items. Curated quality with exceptional service for 
                the discerning shopper.
              </p>

              <div className="hero-actions">
                {!user ? (
                  <>
                    <Link to="/register" className="btn btn--primary hero-btn">
                      Start Shopping
                      <ArrowRight size={20} />
                    </Link>
                    <Link to="/products" className="btn btn--outline hero-btn">
                      Browse Collection
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/products" className="btn btn--primary hero-btn">
                      Continue Shopping
                      <ArrowRight size={20} />
                    </Link>
                    <Link to="/cart" className="btn btn--outline hero-btn">
                      View Cart
                    </Link>
                  </>
                )}
              </div>

              {/* Stats Section */}
              <div className="hero-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <div className="stat-icon-wrapper">
                      <stat.icon className="stat-icon" size={20} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual Section */}
            <div className="hero-visual">
              <div className="main-product-card">
                <div className="product-image">
                  <img 
                    src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=600&h=700&fit=crop" 
                    alt="Luxury Fashion Collection" 
                  />
                  <div className="product-overlay">
                    <div className="product-badge premium">
                      <Award size={16} />
                      Premium Pick
                    </div>
                    <div className="product-actions">
                      <button className="action-btn favorite">
                        <Heart size={16} />
                      </button>
                      <button className="action-btn view">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-category">Luxury Collection</div>
                  <h4>Premium Fashion 2024</h4>
                  <div className="product-rating">
                    <Star size={16} fill="#fbbf24" color="#fbbf24" />
                    <span>4.9 (2.4k reviews)</span>
                  </div>
                  <div className="price">
                    <span className="current-price">From $199</span>
                    <span className="original-price">$299</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="floating-card card-1">
                <div className="card-icon">
                  <Clock size={20} />
                </div>
                <div className="card-content">
                  <div className="card-title">Flash Sale</div>
                  <div className="card-desc">Ends in 24h</div>
                </div>
              </div>

              <div className="floating-card card-2">
                <div className="card-icon">
                  <Truck size={20} />
                </div>
                <div className="card-content">
                  <div className="card-title">Free Shipping</div>
                  <div className="card-desc">Worldwide</div>
                </div>
              </div>

              <div className="floating-card card-3">
                <div className="card-icon">
                  <CheckCircle size={20} />
                </div>
                <div className="card-content">
                  <div className="card-title">Quality</div>
                  <div className="card-desc">Guaranteed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Bar */}
          <div className="features-bar">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon-wrapper">
                  <feature.icon className="feature-icon" size={24} />
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero