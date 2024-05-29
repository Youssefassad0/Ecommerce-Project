import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import StoreIcon from '@mui/icons-material/Store';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
// import './ProductDetails.css'; // Make sure to import your CSS file
import './Product.css'
function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await axios.get(`http://localhost:8001/api/products/${id}`);
                setProduct(response.data.data);
                if (response.data.data.images.length > 0) {
                    setCurrentImage(`http://localhost:8001/storage/${response.data.data.images[0]}`);
                }
                axios.get('http://127.0.0.1:8001/api/category')
                .then(response => {
                  setCategories(response.data.data);
                })
                .catch(error => {
                  console.error('There was an error fetching the categories!', error);
                });
            } catch (err) {
                console.log('ERROR :: ' + err);
            }
        }
        getProduct();
    }, [id]);
    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.nom : 'Unknown';
      };
    if (!product) return <div>Loading...</div>;

    const productSliderOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    const productSliderSmallOptions = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="right-content w-100">
            <div className="card shadow border-0 w-100 flex-row p-4">
                <h5 className="mb-0">Product View</h5>
                <div className="ml-auto breadcrumb">
                    <span className="mr-2">
                        <i> <HouseSidingIcon /> </i>
                        <Link to="/dashboard" className="text-decoration-none">Dashboard</Link>
                    </span>
                    <span>/</span>
                    <span className="ml-2">
                        <Link to="/dashboard/products" className="text-decoration-none">Home</Link>
                    </span>
                </div>
            </div>

            <div className="cardP productDetailsSection">
                <div className="row">
                    <div className="col-md-5">
                        <div className="sliderWrapper pt-3 pb-4 pl-4 pr-4">
                            <h5 className='mb-4'>Product Gallery</h5>
                            <div className='sliderBig mb-2'>
                                <img src={currentImage} alt="Product Image" className="w-100" />
                            </div>
                            <Slider {...productSliderSmallOptions} className='sliderSmall'>
                                {product.images.map((image, index) => (
                                    <div className="item" key={index} onClick={() => setCurrentImage(`http://localhost:8001/storage/${image}`)}>
                                        <img src={`http://localhost:8001/storage/${image}`} alt={`Product Image ${index + 1}`} className="slider-image w-100 cursor-pointer" />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="pt-3 pb-3 pl-4 pr-4">
                            <h5 className="mb-4">Product Details</h5>
                            <h4 style={{ lineHeight: '32px' }}>
                                {product.name}
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
                                        : <span>{product.brand}</span>
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
                                        : <span>{getCategoryName(product.category_id)}</span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Colors
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        : <span>
                                            <ul className="list list-inline colors sml">
                                                {product.colors.map((color, index) => (
                                                    <li className="list-inline-item" key={index}>
                                                        <span>{color}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </span>
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
                                        : <span> <ul className="list list-inline colors sml">
                                            {product.sizes.map((color, index) => (
                                                <li className="list-inline-item" key={index}>
                                                    <span>{color}</span>
                                                </li>
                                            ))}
                                        </ul></span>
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
                                        : <span>${product.original_price}</span>
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
                                        : <span>{product.stock}</span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-5 d-flex align-items-center">
                                        <span className="icon">
                                            <StoreIcon />
                                        </span>
                                        <span className="name">
                                            Rating
                                        </span>
                                    </div>
                                    <div className="col-sm-7 ">
                                        : <span>{product.rating} ({product.rating_count} reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <h4 className="mt-4 mb-3">Product Description</h4>
                    <p className="product-description">
                        {product.description}
                    </p>
                </div>
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
                    <br />
                    <h6 className="mt-4 mb0-">Customer_reviews</h6>
                    <div className="reviewsSection">
                        <div className="reviewsRow">
                            <div className="row">
                                <div className="col-sm-8">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
