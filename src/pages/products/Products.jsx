import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productsService } from '../../services/productsService'
import { useCart } from '../../contexts/CartContext'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Filter, 
  Share2, 
  Grid, 
  List, 
  ChevronDown,
  Eye,
  Zap,
  Crown,
  TrendingUp
} from 'lucide-react'
import './Products.scss'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [showFilters, setShowFilters] = useState(false)
  const [shareLoading, setShareLoading] = useState(null)
  const { addToCart } = useCart()

  const categories = [
    { value: 'all', label: 'All Products', count: 156 },
    { value: 'dresses', label: 'Dresses', count: 42 },
    { value: 'tops', label: 'Tops', count: 38 },
    { value: 'bottoms', label: 'Bottoms', count: 29 },
    { value: 'outerwear', label: 'Outerwear', count: 25 },
    { value: 'accessories', label: 'Accessories', count: 22 }
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'popular', label: 'Most Popular' }
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, selectedCategory, sortBy, priceRange])

  const loadProducts = async () => {
    try {
      const data = await productsService.getAllProducts()
      setProducts(data)
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return new Date(b.isNew ? 1 : 0) - new Date(a.isNew ? 1 : 0)
        case 'popular':
          return b.reviewCount - a.reviewCount
        case 'featured':
        default:
          // Featured items first, then by rating
          if (a.isPremium !== b.isPremium) return b.isPremium ? 1 : -1
          return b.rating - a.rating
      }
    })

    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product) => {
    addToCart(product, 'M', product.colors?.[0] || 'Default', 1)
    // Show success notification
    showNotification(`${product.name} added to cart!`)
  }

  const handleShareProduct = async (product) => {
    setShareLoading(product.id)
    
    const productUrl = `${window.location.origin}/product/${product.id}`
    const shareText = `Check out this amazing product: ${product.name} - $${product.price}\n\n${product.description}`
    
    if (navigator.share) {
      // Use Web Share API if available
      try {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        })
      } catch (error) {
        console.log('Error sharing:', error)
        fallbackShare(productUrl, shareText)
      }
    } else {
      fallbackShare(productUrl, shareText)
    }
    
    setTimeout(() => {
      setShareLoading(null)
    }, 2000)
  }

  const fallbackShare = (url, text) => {
    // Copy to clipboard as fallback
    navigator.clipboard.writeText(`${text}\n\n${url}`).then(() => {
      showNotification('Product link copied to clipboard!')
    }).catch(() => {
      // If clipboard fails, open in new window
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    })
  }

  const showNotification = (message) => {
    // Create a simple notification
    const notification = document.createElement('div')
    notification.className = 'share-notification'
    notification.textContent = message
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideInRight 0.3s ease;
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      notification.remove()
    }, 3000)
  }

  const getProductBadges = (product) => {
    const badges = []
    
    if (product.isNew) {
      badges.push({ type: 'new', label: 'New', icon: Zap })
    }
    if (product.isPremium) {
      badges.push({ type: 'premium', label: 'Premium', icon: Crown })
    }
    if (product.originalPrice > product.price) {
      const discount = Math.round((1 - product.price / product.originalPrice) * 100)
      badges.push({ type: 'sale', label: `-${discount}%`, icon: TrendingUp })
    }
    if (product.rating >= 4.5) {
      badges.push({ type: 'top-rated', label: 'Top Rated', icon: Star })
    }
    
    return badges
  }

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner large"></div>
        <p>Discovering amazing products...</p>
      </div>
    )
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="header-content">
            <h1>Our Collection</h1>
            <p>Discover handpicked products curated just for you</p>
            <div className="header-stats">
              <span className="stat">
                <strong>{products.length}+</strong> Products
              </span>
              <span className="stat">
                <strong>50K+</strong> Happy Customers
              </span>
              <span className="stat">
                <strong>4.9</strong> Average Rating
              </span>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="controls-bar">
          <div className="controls-left">
            <button 
              className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={18} />
            </button>
            <button 
              className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <List size={18} />
            </button>
            
            <div className="results-count">
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>

          <div className="controls-right">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
              Filters
              <ChevronDown size={16} className={`chevron ${showFilters ? 'up' : ''}`} />
            </button>

            <div className="sort-dropdown">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} className="dropdown-arrow" />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filter-section">
              <h4>Categories</h4>
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.value}
                    className={`category-filter ${selectedCategory === category.value ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <span className="category-name">{category.label}</span>
                    <span className="category-count">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-filter">
                <div className="price-inputs">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="price-slider"
                />
              </div>
            </div>

            <div className="filter-actions">
              <button 
                className="btn btn--outline"
                onClick={() => {
                  setSelectedCategory('all')
                  setPriceRange([0, 1000])
                }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        <div className={`products-container ${viewMode}`}>
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.images[0]} alt={product.name} />
                </Link>
                
                {/* Product Badges */}
                <div className="product-badges">
                  {getProductBadges(product).map((badge, index) => (
                    <span key={index} className={`product-badge ${badge.type}`}>
                      <badge.icon size={12} />
                      {badge.label}
                    </span>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="product-actions">
                  <button 
                    className="action-btn quick-view"
                    title="Quick View"
                    onClick={() => window.location.href = `/product/${product.id}`}
                  >
                    <Eye size={18} />
                  </button>
                  <button 
                    className="action-btn wishlist"
                    title="Add to Wishlist"
                  >
                    <Heart size={18} />
                  </button>
                  <button 
                    className={`action-btn share ${shareLoading === product.id ? 'loading' : ''}`}
                    onClick={() => handleShareProduct(product)}
                    disabled={shareLoading === product.id}
                    title="Share Product"
                  >
                    {shareLoading === product.id ? (
                      <div className="loading-spinner-mini"></div>
                    ) : (
                      <Share2 size={18} />
                    )}
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  className="add-to-cart-overlay"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
              
              <div className="product-info">
                <div className="product-category">{product.category}</div>
                
                <h3 className="product-name">
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </h3>
                
                {viewMode === 'list' && (
                  <p className="product-description">{product.description}</p>
                )}
                
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
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>
                
                <div className="product-price">
                  <span className="current-price">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="original-price">${product.originalPrice}</span>
                  )}
                </div>

                {viewMode === 'list' && (
                  <div className="product-features">
                    {product.features?.slice(0, 3).map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                )}

                <div className="product-actions-bottom">
                  <button 
                    className="btn btn--primary add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  
                  <button 
                    className="btn btn--outline share-btn"
                    onClick={() => handleShareProduct(product)}
                    disabled={shareLoading === product.id}
                  >
                    {shareLoading === product.id ? (
                      <div className="loading-spinner-mini"></div>
                    ) : (
                      <Share2 size={18} />
                    )}
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <div className="no-products-content">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button 
                className="btn btn--primary"
                onClick={() => {
                  setSelectedCategory('all')
                  setPriceRange([0, 1000])
                  setShowFilters(false)
                }}
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="load-more-section">
            <button className="btn btn--outline load-more-btn">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products