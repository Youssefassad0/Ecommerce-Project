import React from 'react';
import { Breadcrumbs } from '@mui/material';
import Slider from 'react-slick';

function ProductDetails() {
    const productSliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false

    };
    const productSliderSmallOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false
    };
    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4">
                <h5 className="mb-0">Product View</h5>
                <div className="ml-auto">
                    Dashboard Home
                </div>
            </div>
            <div className="cardP ">
                <div className="row">
                    <div className="col-md-4">
                        <div className="sliderWrapper pt-3 pb-4 pl-4 pr-4">
                            <h5 className='mb-3' > Product Gallery  </h5>
                            <Slider {...productSliderOptions} className='sliderBig mn-2 ' >
                                <div className="item">
                                    <img
                                        src="https: //assets.adidas.com/images/w_600,f_auto,q_auto/bd43ce71f589498ab6b1aad6009a0e6e_9366/Superstar_Shoes_White_EG4958_07_standard.jpg"
                                        alt="Product Image"
                                        className="w-100"
                                    />
                                </div>
                            </Slider>
                            <Slider {...productSliderSmallOptions} className='sliderSmall' >
                                <div className="item">
                                    <img
                                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/bd43ce71f589498ab6b1aad6009a0e6e_9366/Superstar_Shoes_White_EG4958_07_standard.jpg"
                                        alt="Product Image"
                                        className="w-100"
                                    />
                                </div>
                                <div className="item">
                                    <img
                                        src="https://assets.adidas.com/images/w_1880,f_auto,q_auto/ff2e419f1eda4ebab23faad6009a3a9e_9366/EG4958_04_standard.jpg"
                                        alt="Product Image"
                                        className="w-100"
                                    />
                                </div>
                                <div className="item">
                                    <img
                                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/bd43ce71f589498ab6b1aad6009a0e6e_9366/Superstar_Shoes_White_EG4958_07_standard.jpg"
                                        alt="Product Image"
                                        className="w-100"
                                    />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className="col-md-8">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
