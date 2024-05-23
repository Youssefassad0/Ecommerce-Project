import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import PageHeader from "../components/PageHeader";
import ProductsCard from "./ProductsCard";
import { useParams } from "react-router-dom";
import Pagination from "./pagination";
import SearchShop from "./SearchShop";
import ShopCategory from "./ShopCategory";
import FilterShop from "./FilterShop";
import NavItems from "../components/NavItems";
import Footer from "../components/Footer";
import axios from "axios";

const Shop = () => {
  const { t } = useTranslation();
  const [GridList, setGridList] = useState(true);
  const { gender } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get("http://localhost:8001/api/products");
        const categoriesResponse = await axios.get("http://localhost:8001/api/category");

        const productsData = productsResponse.data.data;
        const categoriesData = categoriesResponse.data.data;

        // Join products with categories
        const productsWithCategories = productsData.map(product => {
          const category = categoriesData.find(cat => cat.id === product.category_id);
          return {
            ...product,
            category_name: category ? category.nom : "Unknown",
          };
        });

        setProducts(productsWithCategories);
        setFilteredProducts(productsWithCategories);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Apply filters
  useEffect(() => {
    let tempProducts = gender ? products.filter((product) => product.gender === gender) : products;

    if (selectedColor) {
      tempProducts = tempProducts.filter((product) => product.colors.includes(selectedColor));
    }
    if (selectedSize) {
      tempProducts = tempProducts.filter((product) => product.sizes.includes(selectedSize));
    }
    if (selectedPrice) {
      tempProducts = tempProducts.filter((product) => product.original_price <= selectedPrice);
    }
    if (selectedCategory) {
      tempProducts = tempProducts.filter((product) => product.category_name === selectedCategory);
    }

    setFilteredProducts(tempProducts);
  }, [gender, selectedColor, selectedSize, selectedPrice, selectedCategory, products]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ProductsPerPage = 12;
  const indexLastProducts = currentPage * ProductsPerPage;
  const indexOfFirtProducts = indexLastProducts - ProductsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirtProducts, indexLastProducts);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Filter Product Based On category
  const menuItems = [...new Set(categories.map((val) => val.nom))];
  const filterItem = (cate) => {
    setSelectedCategory(cate);
  };

  // Filter Products Based on Color
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
      <NavItems />
      <PageHeader title={t("pageHeaderTitle")} curPage="Shop" />
      <div className="shop-page padding-tb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="shop-title d-flex flex-wrap justify-content-between">
                  <p>{t("showResult")}</p>
                  <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                    <a onClick={() => setGridList(!GridList)} className="grid">
                      <i className="icofont-ghost"></i>
                    </a>
                    <a onClick={() => setGridList(!GridList)} className="list">
                      <i className="icofont-listine-dots"></i>
                    </a>
                  </div>
                </div>
                <div>
                  {currentProducts.length > 0 ? (
                    <ProductsCard GridList={GridList} products={currentProducts} />
                  ) : (
                    <p>{t("noProductFound")}</p>
                  )}
                </div>
                {filteredProducts.length > 0 && (
                  <Pagination
                    ProductsPerPage={ProductsPerPage}
                    total={filteredProducts.length}
                    paginate={paginate}
                    activePage={currentPage}
                  />
                )}
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside>
                <SearchShop GridList={GridList} />
                <ShopCategory
                  filterItem={filterItem}
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
      <Footer />
    </div>
  );
};

export default Shop;
