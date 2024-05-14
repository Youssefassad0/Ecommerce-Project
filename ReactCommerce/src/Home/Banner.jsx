import React, { useState } from "react";
import productData from "../products.json";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SelectCategorie from "../components/selectCate";
import "./button.css";

const Banner = () => {
  const { t, i18n } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [filterProducts, setFilterProducts] = useState(productData);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);
    const filtered = productData.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterProducts(filtered);
  };

  return (
    <div className="banner-section style-4">
      <video autoPlay loop muted style={{
        position: 'absolute',
        width: '100%',
        left: '50%',
        top: '50%',
        height: '100%',
        objectFit: 'cover',
        transform: 'translate(-50%, -50%)',
        zIndex :'-1'
      }} >
        <source src="bg-3.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <div className="banner-content">
          <h2 style={{ backgroundImage: 'linear-gradient(to right, blue,purple)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {t(`searchText`)}
          </h2>
          <form action="">
            <SelectCategorie select={"all"} />
            <input
              type="text"
              name="search"
              id="search"
              placeholder={t("searchPlaceholder")}
              value={searchInput}
              onChange={handleSearch}
            />
            <button type="submit">
              <i className="icofont-search"></i>
            </button>
          </form>
          <p style={{ color: "green" }}> {t("desc")}</p>
          <div>
            <Link to="/shop/woman" style={{ marginRight: "20px" }}>
              <button className="btn-31">
                <span className="text-container">
                  <span className="text">{t("womenBtn")}</span>
                </span>
              </button>
            </Link>
            <Link to="/shop/men" style={{ marginRight: "20px" }}>
              <button className="btn-31">
                <span className="text-container">
                  <span className="text">{t("menBtn")}</span>
                </span>
              </button>
            </Link>
            <Link to="/shop/children">
              <button className="btn-31">
                <span className="text-container">
                  <span className="text">{t("childrenBtn")}</span>
                </span>
              </button>
            </Link>
          </div>
          <ul className="lab-ul">
            {searchInput &&
              filterProducts.map((p, index) => (
                <li key={index}>
                  <Link to={`/product/${p.id}`}>
                    <img src={p.img} style={{ width: "40px", height: "40px" }} alt="" />
                    {p.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
