import React from "react";
import PageHeader from "../components/PageHeader";
import BlogList from "../utilis/blogdata";
import { Link } from "react-router-dom";
import NavItems from "../components/NavItems";
import Footer from "../components/Footer";
const Blog = () => {
  const btnText= 'Read More';
  return (
    <div>
      <NavItems/>
      <PageHeader title="Blog Page" curPage="Blogs" />
      <div className="blog-section padding-tb section-bg">
        <div className="container">
          <div className="section-wrapper">
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 justify-content-center g-4">
              {BlogList.map((blog, i) => (
                <div className="col" key={i}>
                  <div className="post-item">
                    <div className="post-inner">
                      <div className="post-thumb">
                        <Link to={`singleblog/${blog.id}`}>
                          <img src={blog.imgUrl} alt="" />
                        </Link>
                      </div>
                      <div className="post-content">
                        <Link to={`singleblog/${blog.id}`}>
                          <h4> {blog.title} </h4>
                        </Link>
                        <div className="meta-post">
                          <ul className="lab-ul">
                            {blog.metaList.map((val, i) => (
                              <li key={i}>
                                <i className={val.iconName}></i>
                                {val.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <p> {blog.desc} </p>
                      </div>
                      <div className="post-footer">
                        <div className="pf-left">
                          <Link to={`singleblog/${blog.id}`} className="lab-btn-text">
                            <i className="icofont-external-link"></i>
                            {btnText}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Blog;
