import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../contexts/CartContext'
import { Star, ShoppingCart, Heart, Share2, Zap, Crown, Eye } from 'lucide-react'
import './FeaturedProducts.scss'

const FeaturedProducts = () => {
  const { addToCart } = useCart()
  const [shareLoading, setShareLoading] = useState(null)

  const premiumProducts = [
    {
      id: 1,
      name: 'Luxury Silk Evening Gown',
      price: 499.99,
      originalPrice: 699.99,
      category: 'Premium Dresses',
      description: 'Handcrafted silk gown with intricate embroidery and pearl details',
      rating: 4.9,
      reviewCount: 89,
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500&h=600&fit=crop',
      isNew: true,
      isPremium: true,
      features: ['100% Pure Silk', 'Hand Embroidered', 'Limited Edition']
    },
    {
      id: 2,
      name: 'Designer Leather Handbag',
      price: 899.99,
      originalPrice: 1199.99,
      category: 'Luxury Accessories',
      description: 'Handcrafted Italian leather bag with gold-plated hardware',
      rating: 4.8,
      reviewCount: 124,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
      isNew: false,
      isPremium: true,
      features: ['Italian Leather', 'Gold Hardware', 'Limited Stock']
    },
    {
      id: 3,
      name: 'Premium Cashmere Coat',
      price: 799.99,
      originalPrice: 999.99,
      category: 'Luxury Outerwear',
      description: 'Ultra-soft cashmere coat with custom tailoring and premium finish',
      rating: 4.7,
      reviewCount: 67,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop',
      isNew: true,
      isPremium: true,
      features: ['100% Cashmere', 'Custom Tailored', 'Winter Collection']
    },
    {
      id: 4,
      name: 'Diamond Watch Collection',
      price: 2499.99,
      originalPrice: 3499.99,
      category: 'Luxury Watches',
      description: 'Swiss-made automatic watch with diamond bezel and sapphire crystal',
      rating: 5.0,
      reviewCount: 45,
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500&h=600&fit=crop',
      isNew: true,
      isPremium: true,
      features: ['Swiss Movement', 'Diamond Bezel', 'Water Resistant']
    },
    {
      id: 5,
      name: 'Designer Perfume Set',
      price: 299.99,
      originalPrice: 399.99,
      category: 'Luxury Fragrances',
      description: 'Exclusive perfume collection with rare ingredients and elegant packaging',
      rating: 4.6,
      reviewCount: 156,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=600&fit=crop',
      isNew: false,
      isPremium: true,
      features: ['Rare Ingredients', 'Elegant Packaging', 'Long Lasting']
    },
    {
      id: 6,
      name: 'Custom Jewelry Set',
      price: 1599.99,
      originalPrice: 1999.99,
      category: 'Luxury Jewelry',
      description: 'Handcrafted jewelry set with precious stones and 18k gold',
      rating: 4.9,
      reviewCount: 78,
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop',
      isNew: true,
      isPremium: true,
      features: ['Precious Stones', '18k Gold', 'Custom Design']
    }
  ]

  const handleAddToCart = (product) => {
    addToCart(product, 'Standard', 'Default', 1)
    // Show success message
    alert(`Added ${product.name} to cart!`)
  }

  const handleWhatsAppShare = async (product) => {
    setShareLoading(product.id)
    
    const message = `Check out this premium product: ${product.name} - $${product.price}\n\n${product.description}\n\nView it here: ${window.location.origin}/product/${product.id}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    setTimeout(() => {
      setShareLoading(null)
    }, 1000)
  }

  const handleQuickView = (product) => {
    // For now, redirect to product detail page
    window.location.href = `/product/${product.id}`
  }

  return (
    <section className="featured-products premium-products">
      <div className="container">
        <div className="section-header">
          <div className="premium-badge">
            <Crown size={24} />
            <span>Premium Collection</span>
          </div>
          <h2 className="section-title">Exclusive Luxury Products</h2>
          <p className="section-subtitle">
            Discover our handpicked collection of premium items crafted with exceptional quality and attention to detail
          </p>
        </div>
        
        <div className="products-grid">
          {premiumProducts.map((product) => (
            <div key={product.id} className="product-card premium-card fade-in">
              <div className="product-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                {product.isNew && <span className="product-badge new">New Arrival</span>}
                {product.isPremium && (
                  <span className="product-badge premium">
                    <Crown size={14} />
                    Premium
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="product-badge sale">
                    <Zap size={14} />
                    Save ${(product.originalPrice - product.price).toFixed(0)}
                  </span>
                )}
                
                <div className="product-actions">
                  <button 
                    className="action-btn wishlist-btn"
                    title="Add to Wishlist"
                  >
                    <Heart size={18} />
                  </button>
                  <button 
                    className="action-btn quick-view-btn"
                    onClick={() => handleQuickView(product)}
                    title="Quick View"
                  >
                    <Eye size={18} />
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                
                <h3 className="product-name">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                
                <p className="product-description">{product.description}</p>
                
                <div className="product-features">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>
                
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                        color="#fbbf24"
                      />
                    ))}
                  </div>
                  <span className="rating-text">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="product-price">
                  <div className="price-main">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="price-savings">
                    {product.originalPrice > product.price && (
                      <span className="savings">
                        Save {((1 - product.price / product.originalPrice) * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="product-actions-bottom">
                  <button 
                    className="btn btn--primary add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  
                  <button 
                    className={`btn btn--outline whatsapp-btn ${shareLoading === product.id ? 'loading' : ''}`}
                    onClick={() => handleWhatsAppShare(product)}
                    disabled={shareLoading === product.id}
                  >
                    {shareLoading === product.id ? (
                      <div className="loading-spinner-mini"></div>
                    ) : (
                      <>
                        <Share2 size={18} />
                        Share
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="premium-cta">
          <div className="cta-content">
            <h3>Ready for Luxury?</h3>
            <p>Explore our complete premium collection and discover exclusive items</p>
            <Link to="/products?category=premium" className="btn btn--primary cta-btn">
              Explore Premium Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts