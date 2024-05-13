/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react'
import Navbar from './Navbar'
import SideBar from './SideBar'
import Footer from './Footer'
import './Dashboard.css'
import Widgets from './components/widgets'
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

                    <div className="col-xl-8 col-lg-7">
                      <div className="card shadow mb-4">

                        <div
                          className="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                        >
                          <h6 className="m-0 font-weight-bold text-primary">
                            Earnings Overview
                          </h6>
                          <div className="dropdown no-arrow">
                            <a
                              className="dropdown-toggle"
                              href="#"
                              role="button"
                              id="dropdownMenuLink"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i
                                className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"
                              ></i>
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <div className="dropdown-header">Dropdown Header:</div>
                              <a className="dropdown-item" href="#">Action</a>
                              <a className="dropdown-item" href="#">Another action</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#"
                              >Something else here</a
                              >
                            </div>
                          </div>
                        </div>
                        {/* <!-- Card Body --> */}
                        <div className="card-body">
                          <div className="chart-area">
                            <canvas id="myAreaChart"></canvas>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <!-- Pie Chart --> */}
                    <div className="col-xl-4 col-lg-5">
                      <div className="card shadow mb-4">
                        {/* <!-- Card Header - Dropdown --> */}
                        <div
                          className="card-header py-3 d-flex flex-row align-items-center justify-content-between"
                        >
                          <h6 className="m-0 font-weight-bold text-primary">
                            Revenue Sources
                          </h6>
                          <div className="dropdown no-arrow">
                            <a
                              className="dropdown-toggle"
                              href="#"
                              role="button"
                              id="dropdownMenuLink"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i
                                className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"
                              ></i>
                            </a>
                            <div
                              className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                              aria-labelledby="dropdownMenuLink"
                            >
                              <div className="dropdown-header">Dropdown Header:</div>
                              <a className="dropdown-item" href="#">Action</a>
                              <a className="dropdown-item" href="#">Another action</a>
                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item" href="#"
                              >Something else here</a
                              >
                            </div>
                          </div>
                        </div>
                        {/* <!-- Card Body --> */}
                        <div className="card-body">
                          <div className="chart-pie pt-4 pb-2">
                            <canvas id="myPieChart"></canvas>
                          </div>
                          <div className="mt-4 text-center small">
                            <span className="mr-2">
                              <i className="fas fa-circle text-primary"></i> Direct
                            </span>
                            <span className="mr-2">
                              <i className="fas fa-circle text-success"></i> Social
                            </span>
                            <span className="mr-2">
                              <i className="fas fa-circle text-info"></i> Referral
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Content Row --> */}
                  <div className="row">

                    <div className="col-lg-6 mb-4">

                      <div className="card shadow mb-4">
                        <div className="card-header py-3">
                          <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                        </div>
                        <div className="card-body">
                          <h4 className="small font-weight-bold">
                            Server Migration <span className="float-right">20%</span>
                          </h4>
                          <div className="progress mb-4">
                            <div
                              className="progress-bar bg-danger a2"
                              role="progressbar"

                            ></div>
                          </div>
                          <h4 className="small font-weight-bold">
                            Sales Tracking <span className="float-right">40%</span>
                          </h4>
                          <div className="progress mb-4">
                            <div
                              className="progress-bar bg-warning a3"
                              role="progressbar"

                            ></div>
                          </div>
                          <h4 className="small font-weight-bold">
                            Customer Database <span className="float-right">60%</span>
                          </h4>
                          <div className="progress mb-4">
                            <div
                              className="progress-bar a7"
                              role="progressbar"
                            ></div>
                          </div>
                          <h4 className="small font-weight-bold">
                            Payout Details <span className="float-right">80%</span>
                          </h4>
                          <div className="progress mb-4">
                            <div
                              className="progress-bar bg-info a4"
                              role="progressbar"
                            ></div>
                          </div>
                          <h4 className="small font-weight-bold">
                            Account Setup <span className="float-right">Complete!</span>
                          </h4>
                          <div className="progress">
                            <div
                              className="progress-bar bg-success a5"
                              role="progressbar"

                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* <!-- Color System --> */}
                      <div className="row">
                        <div className="col-lg-6 mb-4">
                          <div className="card bg-primary text-white shadow">
                            <div className="card-body">
                              Primary
                              <div className="text-white-50 small">#4e73df</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card bg-success text-white shadow">
                            <div className="card-body">
                              Success
                              <div className="text-white-50 small">#1cc88a</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card bg-info text-white shadow">
                            <div className="card-body">
                              Info
                              <div className="text-white-50 small">#36b9cc</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card bg-warning text-white shadow">
                            <div className="card-body">
                              Warning
                              <div className="text-white-50 small">#f6c23e</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card bg-danger text-white shadow">
                            <div className="card-body">
                              Danger
                              <div className="text-white-50 small">#e74a3b</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card bg-secondary text-white shadow">
                            <div className="card-body">
                              Secondary
                              <div className="text-white-50 small">#858796</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card bg-light text-black shadow">
                            <div className="card-body">
                              Light
                              <div className="text-black-50 small">#f8f9fc</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-4">
                          <div className="card bg-dark text-white shadow">
                            <div className="card-body">
                              Dark
                              <div className="text-white-50 small">#5a5c69</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 mb-4">
                      {/* <!-- Illustrations --> */}
                      <div className="card shadow mb-4">
                        <div className="card-header py-3">
                          <h6 className="m-0 font-weight-bold text-primary">
                            Illustrations
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="text-center">
                            <img
                              className="img-fluid px-3 px-sm-4 mt-3 mb-4 a6"

                              src="img/undraw_posting_photo.svg"
                              alt="..."
                            />
                          </div>
                          <p>
                            Add some quality, svg illustrations to your project
                            courtesy of
                            <a rel="nofollow"
                              href="https://undraw.co/"
                            >unDraw</a> a constantly updated collection of beautiful svg images
                            that you can use completely free and without attribution!
                          </p>
                          <a rel="nofollow" href="https://undraw.co/"
                          >Browse Illustrations on unDraw &rarr;</a
                          >
                        </div>
                      </div>

                      {/* <!-- Approach --> */}
                      <div className="card shadow mb-4">
                        <div className="card-header py-3">
                          <h6 className="m-0 font-weight-bold text-primary">
                            Development Approach
                          </h6>
                        </div>
                        <div className="card-body">
                          <p>
                            SB Admin 2 makes extensive use of Bootstrap 4 utility
                            classes in order to reduce CSS bloat and poor page
                            performance. Custom CSS classes are used to create custom
                            components and custom utility classes.
                          </p>
                          <p className="mb-0">
                            Before working with this theme, you should become familiar
                            with the Bootstrap framework, especially the utility
                            classes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- /.container-fluid --> */}
              </div>
              {/* <!-- End of Main Content --> */}

              {/* <!-- Footer --> */}
              <footer className="sticky-footer bg-white">
                <div className="container my-auto">
                  <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Your Website 2021</span>
                  </div>
                </div>
              </footer>
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