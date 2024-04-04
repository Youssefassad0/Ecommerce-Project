import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";



const categoryList = [
  {
    src: "src/assets/images/category/01.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "DSLR Camera",
  },
  {
    src: "src/assets/images/category/02.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Shoes",
  },
  {
    src: "src/assets/images/category/03.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Photography",
  },
  {
    src: "src/assets/images/category/04.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Formal Dress",
  },
  {
    src: "src/assets/images/category/05.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Colorful Bags",
  },
  {
    src: "src/assets/images/category/06.jpg",
    imgAlt: "category rajibraj91 rajibraj",
    iconName: "icofont-brand-windows",
    title: "Home Decor",
  },
];
const HomeCategory = () => {
  const { t, i18n } = useTranslation();
  const btnText = t(`getStartedNow`);
  const subTitle = t(`chooseAnyProducts`);
const title = t(`buyEverythingWithUs`);
  return (
    <div className="category-section style-4 padding-tb">
      <div className="container">
        <div className="section-header text-center ">
          <span className="subtitle" style={{ color: "red" }}>
            {subTitle}
          </span>
          <h2 className="title">{title}</h2>
        </div>
        {/* Section Cards  */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2  row-cols-1">
            {categoryList.map((category, index) => {
              return (
                <div key={index} className="col">
                  <Link to="/shop" className="category-item">
                    <div className="category-inner">
                      <div className="category-thumb">
                        <img src={category.src} alt="" />
                      </div>
                      {/* content  */}
                      <div className="category-content">
                        <div className="cate-icon">
                          <i className={category.iconName}></i>
                        </div>
                        <Link to="/shop" ><h6>{category.title}</h6></Link>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-5" >
            <Link to="/shop" className="lab-btn" ><span>{btnText}</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
