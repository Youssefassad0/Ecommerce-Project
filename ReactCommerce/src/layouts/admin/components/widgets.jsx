import React from 'react'

function Widgets() {
    return (
        <div className="row">
            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div
                                    className="text-xs font-weight-bold text-primary text-uppercase mb-1"
                                >
                                    Earnings (Monthly)
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    $40,000
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div
                                    className="text-xs font-weight-bold text-success text-uppercase mb-1"
                                >
                                    Earnings (Annual)
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    $215,000
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Earnings (Monthly) Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div
                                    className="text-xs font-weight-bold text-success text-uppercase mb-1"
                                >
                                    Earnings (Annual)
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    $215,000
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Pending Requests Card Example --> */}
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                        <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div
                                    className="text-xs font-weight-bold text-warning text-uppercase mb-1"
                                >
                                    Pending Requests
                                </div>
                                <div className="h5 mb-0 font-weight-bold text-gray-800">
                                    18
                                </div>
                            </div>
                            <div className="col-auto">
                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Widgets