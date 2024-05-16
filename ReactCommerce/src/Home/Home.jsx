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
import IndexHome from '../ChatSupport/Home/IndexHome'

function Home() {
  return (
    <div>
      <NavItems />
      <div className="">
      <Banner />
      <HomeCategory />
      <CategoryShow />
      <Register />
      <About />
      <AppSection />
      <Sponsor />
      <IndexHome/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home