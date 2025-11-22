import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { productsService } from '../../services/productsService'
import { Star } from 'lucide-react'
import './SimilarProducts.scss'

const SimilarProducts = ({ productId }) => {
  const [similarProducts, setSimilarProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSimilarProducts()
  }, [productId])

  const loadSimilarProducts = async () => {
    try {
      const data = await productsService.getSimilarProducts(productId)
      setSimilarProducts(data)
    } catch (error) {
      console.error('Error loading similar products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || similarProducts.length === 0) {
    return null
  }

  return (
    <section className="similar-products">
      <h2>You Might Also Like</h2>
      <div className="similar-products-grid">
        {similarProducts.map(product => (
          <div key={product.id} className="similar-product-card">
            <div className="product-image">
              <Link to={`/product/${product.id}`}>
                <img src={product.images[0]} alt={product.name} />
              </Link>
              {product.isNew && <span className="product-badge new">New</span>}
            </div>
            
            <div className="product-info">
              <div className="product-category">{product.category}</div>
              <h3 className="product-name">
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </h3>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                      color="#fbbf24"
                    />
                  ))}
                </div>
                <span className="rating-text">{product.rating}</span>
              </div>
              
              <div className="product-price">
                <span className="current-price">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="original-price">${product.originalPrice}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SimilarProducts