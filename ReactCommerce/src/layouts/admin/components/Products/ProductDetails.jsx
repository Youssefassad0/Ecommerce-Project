import React from 'react';
import Slider from 'react-slick';
import StoreIcon from '@mui/icons-material/Store';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


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
            <div className="cardP productDetailsSection">
                <div className="row">
                    <div className="col-md-5">
                        <div className="sliderWrapper pt-3 pb-4 pl-4 pr-4">
                            <h5 className='mb-4' > Product Gallery  </h5>
                            <Slider {...productSliderOptions} className='sliderBig mn-2' >
                                <div className="item">
                                    <img
                                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/bd43ce71f589498ab6b1aad6009a0e6e_9366/Superstar_Shoes_White_EG4958_07_standard.jpg"
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
                                </div>  <div className="item">
                                    <img
                                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/bd43ce71f589498ab6b1aad6009a0e6e_9366/Superstar_Shoes_White_EG4958_07_standard.jpg"
                                        alt="Product Image"
                                        className="w-100"
                                    />
                                </div>  <div className="item">
                                    <img
                                        src="https://assets.adidas.com/images/w_600,f_auto,q_auto/bd43ce71f589498ab6b1aad6009a0e6e_9366/Superstar_Shoes_White_EG4958_07_standard.jpg"
                                        alt="Product Image"
                                        className="w-100"
                                    />
                                </div>
                            </Slider>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="pt-3 pb-3 pl-4 pr-4">
                            <h5 className="mb-4">Product Details</h5>
                            <h4 style={{ lineHeight: '32px' }} >
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, cupiditate quas
                            </h4>
                            <div className="productInfo mt-3">
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Brand
                                        </span>
                                    </div>
                                    <div className="col-sm-7">
                                        :  <span>Adidas </span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Category
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        :  <span>Men </span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Tags
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        :  <span>Adidas </span>
                                    </div>

                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Color
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        :  <span>
                                            <ul className="list list-inline colors sml">
                                                <li className="list-inline-item">
                                                    <span>
                                                        Black
                                                    </span>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span>
                                                        white
                                                    </span>
                                                </li>
                                                <li className="list-inline-item">
                                                    <span>
                                                        Gray
                                                    </span>
                                                </li><li className="list-inline-item">
                                                    <span>
                                                        Gray
                                                    </span>
                                                </li><li className="list-inline-item">
                                                    <span>
                                                        Gray
                                                    </span>
                                                </li><li className="list-inline-item">
                                                    <span>
                                                        Gray
                                                    </span>
                                                </li>
                                            </ul> </span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Size
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        :  <span>Adidas </span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Price
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        :  <span>Adidas </span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Stock
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        :  <span>Adidas </span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Review
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        :  <span>Adidas </span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Published
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        :  <span>Adidas </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="p-4">
                    <h4 className="mt-4 mb-3">Product Description</h4>
                    <p className="product-description">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni fuga illum beatae nostrum facilis id assumenda rerum commodi tempora numquam. Expedita corporis quidem asperiores culpa nulla architecto illum repellendus aut.
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, cumque porro eaque repudiandae, corporis assumenda quam dolores architecto culpa laborum doloribus, eligendi tempore sunt rerum nam. Voluptas harum vero vel.
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit vitae praesentium quibusdam debitis, nemo earum incidunt maiores quaerat eveniet. Quidem aperiam natus eum laboriosam debitis non! Ut blanditiis minus tempore.
                    </p>
                    <div className="mt-4">
                        <h6 className="mt-4 mb-4">Rating Analytics</h6>
                        <div className="rating-section">
                            {[
                                { star: '5 Star', width: '80%', count: 22 },
                                { star: '4 Star', width: '60%', count: 14 },
                                { star: '2 Star', width: '20%', count: 5 }
                            ].map((rating, index) => (
                                <div className="rating-row d-flex align-items-center mb-2" key={index}>
                                    <span className="col-2">{rating.star}</span>
                                    <div className="col-8">
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: rating.width }}></div>
                                        </div>
                                    </div>
                                    <span className="col-2 text-center">({rating.count})</span>
                                </div>
                            ))}
                        </div>
                        <div className="total-review text-center mt-4">
                            <h5>Total Review (38)</h5>
                            <h2 className="display-4">4.9</h2>
                            <h6>Your Average Star</h6>
                        </div>
                        <h6 className="mt-4 mb-4">
                            <div className="reviewsSection">
                                <div className="reviewsRow">
                                    <div className="row">
                                        <div className="col-sm-7">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </h6>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ProductDetails;
