import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Categories.scss'

const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef(null)

  const categories = [
    {
      id: 1,
      name: "Summer Dresses",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop",
      count: "125 items",
      color: "#ec4899",
      link: "/products?category=dresses"
    },
    {
      id: 2,
      name: "Men's Blazers",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop",
      count: "89 items",
      color: "#3b82f6",
      link: "/products?category=blazers"
    },
    {
      id: 3,
      name: "Denim Jackets",
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=300&fit=crop",
      count: "67 items",
      color: "#06b6d4",
      link: "/products?category=jackets"
    },
    {
      id: 4,
      name: "Evening Gowns",
      image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=300&fit=crop",
      count: "42 items",
      color: "#8b5cf6",
      link: "/products?category=gowns"
    },
    {
      id: 5,
      name: "Casual Tops",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      count: "234 items",
      color: "#f59e0b",
      link: "/products?category=tops"
    },
    {
      id: 6,
      name: "Designer Bags",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      count: "78 items",
      color: "#ef4444",
      link: "/products?category=bags"
    },
    {
      id: 7,
      name: "Winter Coats",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
      count: "56 items",
      color: "#84cc16",
      link: "/products?category=coats"
    },
    {
      id: 8,
      name: "Linen Pants",
      image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400&h=300&fit=crop",
      count: "91 items",
      color: "#f97316",
      link: "/products?category=pants"
    },
    {
      id: 9,
      name: "Sports Wear",
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop",
      count: "112 items",
      color: "#10b981",
      link: "/products?category=sports"
    },
    {
      id: 10,
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      count: "156 items",
      color: "#8b5cf6",
      link: "/products?category=accessories"
    }
  ]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex === categories.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [categories.length, isPaused])

  const scrollToIndex = (index) => {
    setCurrentIndex(index)
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const card = container.children[index]
      const scrollLeft = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const nextCategory = () => {
    const nextIndex = currentIndex === categories.length - 1 ? 0 : currentIndex + 1
    scrollToIndex(nextIndex)
  }

  const prevCategory = () => {
    const prevIndex = currentIndex === 0 ? categories.length - 1 : currentIndex - 1
    scrollToIndex(prevIndex)
  }

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const scrollLeft = container.scrollLeft
      const cardWidth = container.children[0]?.offsetWidth || 320
      const gap = 24
      const newIndex = Math.round(scrollLeft / (cardWidth + gap))
      
      if (newIndex >= 0 && newIndex < categories.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }
  }

  return (
    <section className="categories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle">
            Discover our wide range of fashion categories
          </p>
        </div>

        <div className="categories-wrapper">
          <button 
            className="nav-btn nav-btn--prev"
            onClick={prevCategory}
            aria-label="Previous category"
          >
            <ChevronLeft size={24} />
          </button>

          <div 
            className="categories-scroll-container"
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="categories-track">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={category.link}
                  className={`category-card ${index === currentIndex ? 'active' : ''}`}
                >
                  <div className="category-image">
                    <img src={category.image} alt={category.name} />
                    <div 
                      className="category-overlay"
                      style={{ backgroundColor: `${category.color}20` }}
                    ></div>
                    <div 
                      className="category-indicator"
                      style={{ backgroundColor: category.color }}
                    ></div>
                  </div>
                  
                  <div className="category-content">
                    <h3 className="category-name">{category.name}</h3>
                    <span className="category-count">{category.count}</span>
                  </div>

                  <div 
                    className="category-hover-effect"
                    style={{ backgroundColor: category.color }}
                  ></div>
                </Link>
              ))}
            </div>
          </div>

          <button 
            className="nav-btn nav-btn--next"
            onClick={nextCategory}
            aria-label="Next category"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="categories-dots">
          {categories.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to category ${index + 1}`}
            />
          ))}
        </div>

        <div className="view-all-container">
          <Link to="/products" className="btn btn--outline view-all-btn">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Categories