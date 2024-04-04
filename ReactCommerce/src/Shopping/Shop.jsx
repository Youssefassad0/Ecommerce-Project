import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation
import PageHeader from "../components/PageHeader";
import Data from "../products.json"; // Fixed the import path
import ProductsCard from "./ProductsCard";
import { useParams } from "react-router-dom";
import Pagination from "./pagination";
import SearchShop from "./SearchShop";
import ShopCategory from "./ShopCategory";
import FilterShop from "./FilterShop";

const Shop = () => {
  const { t } = useTranslation(); // Initialize useTranslation
  const [GridList, setGridList] = useState(true);
  const { gender } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let tempProducts = gender
      ? Data.filter((product) => product.gender === gender)
      : Data;

    if (selectedColor) {
      tempProducts = tempProducts.filter((product) =>
        product.color.includes(selectedColor)
      );
    }
    if (selectedSize) {
      tempProducts = tempProducts.filter((product) =>
        product.size.includes(selectedSize)
      );
    }
    if (selectedPrice) {
      tempProducts = tempProducts.filter(
        (product) => product.price <= selectedPrice
      );
    }
    if (selectedCategory) {
      tempProducts = tempProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    setFilteredProducts(tempProducts);
  }, [gender, selectedColor, selectedSize, selectedPrice, selectedCategory]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ProductsPerPage = 12;
  const indexLastProducts = currentPage * ProductsPerPage;
  const indexOfFirtProducts = indexLastProducts - ProductsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirtProducts,
    indexLastProducts
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter Product Based On category
  const menuItems = [...new Set(Data.map((val) => val.category))];
  const filterItem = (cate) => {
    const newItem = filteredProducts.filter((newVal) => {
      return newVal.category === cate;
    });
    setSelectedCategory(cate);
    setFilteredProducts(newItem);
  };

  // filter Products Based on Color
  const filterByColor = (color) => {
    setSelectedColor(color);
  };

  // Filter Product Based On size
  const filterBySize = (size) => {
    setSelectedSize(size);
  };

  // Filter Product Based On price
  const filterByPrice = (price) => {
    setSelectedPrice(price);
  };

  return (
    <div>
      <PageHeader title={t("pageHeaderTitle")} curPage="Shop" />
      {/* Shop Page */}
      <div className="shop-page padding-tb ">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-lg-8 col-12 ">
              <article>
                {/* layout and title here  */}
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{t("showResult")}</p>
                  <div
                    className={`product-view-mode ${
                      GridList ? "gridActive" : "listActive"
                    } `}
                  >
                    <a onClick={() => setGridList(!GridList)} className="grid">
                      <i className="icofont-ghost"></i>
                    </a>
                    <a onClick={() => setGridList(!GridList)} className="list">
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>
                {/*Products Cards  */}
                <div>
                  <ProductsCard GridList={GridList} products={currentProducts} />
                </div>
                <Pagination
                  ProductsPerPage={ProductsPerPage}
                  total={filteredProducts.length}
                  paginate={paginate}
                  activePage={currentPage}
                />
              </article>
            </div>

            <div className="col-lg-4 col-12 ">
              <aside>
                <SearchShop GridList={GridList} />
                <ShopCategory
                  filterItem={setSelectedCategory}
                  setItem={setFilteredProducts}
                  menuItems={menuItems}
                  setProducts={setFilteredProducts}
                  selectedCategory={selectedCategory}
                  Data={filteredProducts}
                />
                <FilterShop
                  filterByColor={filterByColor}
                  filterBySize={filterBySize}
                  filterByPrice={filterByPrice}
                />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
