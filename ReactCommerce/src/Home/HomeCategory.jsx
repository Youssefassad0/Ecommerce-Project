import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import './homecate.css'
const HomeCategory = () => {
  const iconName = "icofont-brand-windows";
  const [categoryList, setCategoryList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/category');
        setCategoryList(response.data.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []);
  
  const { t, i18n } = useTranslation();
  const btnText = t(`getStartedNow`);
  const subTitle = t(`chooseAnyProducts`);
  const title = t(`buyEverythingWithUs`);
  
  return (
    <div className="category-section style-4 padding-tb">
      <div className="container">
        <div className="section-header text-center">
          <span className="subtitle" style={{ color: "red" }}>
            {subTitle}
          </span>
          <h2 className="title">{title}</h2>
        </div>
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
            {categoryList.slice(0,6).map((category, index) => (
              <div key={index} className="col" >
                <Link to="/shop" className="category-item" >
                  <div className="category-inner">
                    <div className="category-thumb">
                      <img src={`http://127.0.0.1:8001/${category.image}`} alt={category.image} />
                    </div>
                    <div className="category-content">
                      <div className="cate-icon">
                        <i className={iconName}></i>
                      </div>
                      <Link to="/shop"><h6>{category.nom}</h6></Link>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/shop" className="lab-btn"><span>{btnText}</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
