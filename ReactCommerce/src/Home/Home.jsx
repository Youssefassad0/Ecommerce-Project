import React from 'react'
import Banner from './Banner'
import HomeCategory from './HomeCategory'
import CategoryShow from './CategoryShow'
import Register from './Register'
import AppSection from './AppSection'
import About from './About'
import Sponsor from './Sponsor'

function Home() {
  return (
    <div>
      <Banner />
      <HomeCategory />
      <CategoryShow/>
      <Register/>
      <About />
      <AppSection />
      <Sponsor />
    </div>
  )
}

export default Home