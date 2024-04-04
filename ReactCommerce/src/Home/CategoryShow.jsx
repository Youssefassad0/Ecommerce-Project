import React, { useState } from "react";
import {ProductData } from "../components/ShowProducts";
import { Link } from "react-router-dom";
import Ratting from "../components/Ratting";
import { useTranslation } from "react-i18next";
const CategoryShow = () => {
  const {t,i18n}=useTranslation()
   const Title =  t(`ourProducts`);
 const category = [ t(`shoes`) , t(`bags`), t(`phones`),t(`beauty`) ];
  const [items, setItems] = useState(ProductData);

  // Filtre Categories
  const FiltreItem = (cate) => {
    const filterupdate=ProductData.filter((e)=>{
      return (e.cate===cate)
    })
    setItems(filterupdate)
  };
  return (
    <div className="course-section style-3 padding-tb ">
      <div className="course-shape one">
        <img src="/src/assets/images/shape-img/icon/shape1.jpg" width={"400px"} height={'100px'}  alt="" />
      </div>{" "}
      <div className="course-shape two">
        <img src="/src/assets/images/shape-img/icon/shape2-removebg.png" alt="" />
      </div>
      {/* Main Section  */}
      <div className="container">
        {/* Section Header  */}
        <div className="section-header">
          <h2 className="title"> {Title} </h2>
          <div className="course-filter-group">
            <ul className="lab-ul">
              <li onClick={()=>setItems(ProductData)} >All</li>
              {category.map((cate, index) => {
                return (
                  
                  <li key={index} onClick={() => FiltreItem(`${cate}`)}>
                    
                    {cate}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* section Body : products  */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center  row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 course-filter ">
            {items.map((e) => {
              return (
                <div key={e.id} className="col">
                  <div className="course-item style-4">
                    <div className="course-inner">
                      <div className="course-thumb">
                        <img src={e.url} alt="produits image" />
                        <div className="course-category">
                          <div className="course-cate">
                            <Link> {e.cate} </Link>
                          </div>
                          <div className="course-review">
                            <Ratting />
                          </div>
                        </div>
                      </div>
                      {/* content  */}
                      <div className="course-content">
                        <h5>
                          <Link to={`/shop/${e.id}`}> {e.title} </Link>
                        </h5>
                        <div className="course-footer">
                          <div className="course-author">
                            {" "}
                            <Link to="/" className="ca-name">
                              {e.brand}
                            </Link>
                          </div>
                          <div className="course-price">$ {e.price}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryShow;
