import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productsService } from '../../services/productsService'
import { useCart } from '../../contexts/CartContext'
import { Star, ShoppingCart, Heart, ArrowLeft, Share2 } from 'lucide-react'
import SimilarProducts from '../../components/products/SimilarProducts'
import './ProductDetail.scss'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      const data = await productsService.getProductById(id)
      setProduct(data)
      setSelectedSize(data.sizes[0])
      setSelectedColor(data.colors[0])
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color')
      return
    }
    
    addToCart(product, selectedSize, selectedColor, quantity)
    alert('Product added to cart!')
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn btn--primary">
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <div className="product-detail">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/products" className="breadcrumb-link">
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>

        <div className="product-detail-content">
          <div className="product-gallery">
            <div className="main-image">
              <img src={product.images[selectedImage]} alt={product.name} />
              {product.isNew && <span className="product-badge new">New</span>}
              {product.originalPrice > product.price && (
                <span className="product-badge sale">Sale</span>
              )}
            </div>
            
            <div className="image-thumbnails">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              <h1 className="product-title">{product.name}</h1>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={20}
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
                <span className="current-price">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="original-price">${product.originalPrice}</span>
                )}
                {product.originalPrice > product.price && (
                  <span className="discount">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="product-options">
              <div className="option-group">
                <label htmlFor="size-select">Size</label>
                <div className="size-options">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label htmlFor="color-select">Color</label>
                <div className="color-options">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      className={`color-option ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    >
                      <span style={{ backgroundColor: color.toLowerCase() }}></span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label htmlFor="quantity">Quantity</label>
                <div className="quantity-selector">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <button 
                className="btn btn--primary add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
              
              <button className="btn btn--outline wishlist-btn">
                <Heart size={20} />
                Add to Wishlist
              </button>

              <button className="btn btn--ghost share-btn">
                <Share2 size={20} />
                Share
              </button>
            </div>

            <div className="product-meta">
              <div className="meta-item">
                <strong>SKU:</strong> {product.id}
              </div>
              <div className="meta-item">
                <strong>Category:</strong> {product.category}
              </div>
              <div className="meta-item">
                <strong>Tags:</strong> {product.tags.join(', ')}
              </div>
            </div>
          </div>
        </div>

        <SimilarProducts productId={id} />
      </div>
    </div>
  )
}

export default ProductDetail