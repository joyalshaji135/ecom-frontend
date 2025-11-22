import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Hero from '../../components/home/Hero'
import FeaturedProducts from '../../components/home/FeaturedProducts'
import Categories from '../../components/home/Categories'
import './Home.scss'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home">
      <Hero user={user} />
      <Categories />
      <FeaturedProducts />
    </div>
  )
}

export default Home