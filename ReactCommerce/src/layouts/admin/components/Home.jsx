import React from 'react'
import Widgets from './widgets'
import Chart from './Charts/Chart'
import Pie from './Charts/Pie'

function HomeD() {
  return (
   <>
   
   
    {/* <!-- Page Heading --> */}
    <div
      className="d-sm-flex align-items-center justify-content-between mb-4"
    >
      <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      <a
        href="#"
        className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
      ><i className="fas fa-download fa-sm text-white-50"></i> Generate
        Report</a  >
    </div>
    <Widgets/>
    <div className="row">
     <Chart/>
     <Pie/>
    </div>
    <div className="row">
    </div>
 
   </>
  )
}

export default HomeD