/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import Footer from './Footer'
import './Dashboard.css'
import Widgets from './components/widgets'
import Chart from './components/Charts/Chart'
import Pie from './components/Charts/Pie'
import FootterD from './components/FootterD'
function MasterLAyouts() {
  const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const changeStyle = () => {
    if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
    }
    else {
      setStyle('navbar-nav bg-gradient-primary sidebar sidebar-dark accordion')
    }
  }
  return (
    <>
      <div>

        <body id="page-top">
          {/* <!-- Page Wrapper --> */}
          <div id="wrapper">
            {/* <!-- Sidebar --> */}
            <SideBar />
            {/* <!-- End of Sidebar --> */}
            {/* <!-- Content Wrapper --> */}
            <div id="content-wrapper" className="d-flex flex-column">
              {/* <!-- Main Content --> */}
              <div id="content">
                {/* <!-- Topbar --> */}
                <Navbar changeStyle={changeStyle} />
                {/* <!-- End of Topbar --> */}

                {/* <!-- Begin Page Content --> */}
                <div className="container-fluid">
                  {/* <!-- Page Heading --> */}
                  <div
                    className="d-sm-flex align-items-center justify-content-between mb-4"
                  >
                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                    <a
                      href="#"
                      className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
                    ><i className="fas fa-download fa-sm text-white-50"></i> Generate
                      Report</a
                    >
                  </div>

                  {/* <!-- Content Row --> */}
                  <Widgets/>

                  {/* <!-- Content Row --> */}

                  <div className="row">

                   <Chart/>

                    {/* <!-- Pie Chart --> */}
                   <Pie/>
                  </div>

                  {/* <!-- Content Row --> */}
                  <div className="row">

                  

                    
                  </div>
                </div>
                {/* <!-- /.container-fluid --> */}
              </div>
              {/* <!-- End of Main Content --> */}

              {/* <!-- Footer --> */}
              <FootterD/>
              {/* <!-- End of Footer --> */}
            </div>
            {/* <!-- End of Content Wrapper --> */}
          </div>

          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>

          <div
            className="modal fade"
            id="logoutModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                  <button
                    className="close"
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  Select Logout below if you are ready to end your current session.
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    type="button"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <a className="btn btn-primary" href="login.html">Logout</a>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>

    </>
  )
}

export default MasterLAyouts