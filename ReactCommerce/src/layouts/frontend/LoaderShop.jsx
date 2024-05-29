import React from 'react'
import './Loader.css'
function LoaderShop() {
    return (
        <div>
            <div className="pyramid-loader">
                <div className="wrapperL">
                    <span className="side side1"></span>
                    <span className="side side2"></span>
                    <span className="side side3"></span>
                    <span className="side side4"></span>
                    <span className="shadow"></span>
                </div>
            </div>
        </div>
    )
}

export default LoaderShop