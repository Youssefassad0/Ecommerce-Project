import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";
import Review from "./Review";
import { useTranslation } from "react-i18next";
import NavItems from "../components/NavItems";
import Footer from "../components/Footer";
import "./SingleProduct.css"; // Import the CSS file for styling

const SingleProduct = () => {
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8001/api/products/${id}`) // Fetch the specific product
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data); // Ensure data is correctly set
      });
  }, [id]);

  return (
    <div>
      <NavItems />
      <PageHeader title={t("ourProduct")} curPage={t("shopSingleProduct")} />
      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay, Navigation]}
                            navigation={{
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next",
                            }}
                            className="mySwiper"
                          >
                            {product?.images.map((image, index) => (
                              <SwiperSlide key={index}>
                                <div className="single-thumb">
                                  <img
                                    src={`http://localhost:8001/storage/${image}`}
                                    alt={`Product image ${index + 1}`}
                                    className="product-image" // Add class for styling
                                  />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>
                          <div className="pro-single-next swiper-button-next">
                            <i className="icofont-rounded-right"></i>
                          </div>
                          <div className="pro-single-prev swiper-button-prev">
                            <i className="icofont-rounded-left"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        {product && <ProductDisplay item={product} />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="review">
                  {product && <Review img={product.img} />}
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
