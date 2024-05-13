import React from 'react'
import Banner from './Banner'
import HomeCategory from './HomeCategory'
import CategoryShow from './CategoryShow'
import Register from './Register'
import AppSection from './AppSection'
import About from './About'
import Sponsor from './Sponsor'
import NavItems from '../components/NavItems'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <NavItems />
      <Banner />
      <HomeCategory />
      <CategoryShow />
      <Register />
      <About />
      <AppSection />
      <Sponsor />
      <Footer/>
    </div>
  )
}

export default Home