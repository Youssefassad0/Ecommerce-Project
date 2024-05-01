import React from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import Footer from './Footer'
function MasterLAyouts() {
  return (
    <div className='sb-nav-fixed' >
        <SideBar/>
        <Navbar/>
        <main>
im dashbord
        </main>
        <Footer/>
    </div>
  )
}

export default MasterLAyouts