import React, { useState } from "react";
import { useParams } from "react-router-dom";
import blogList from "../utilis/blogdata";
import PageHeader from "../components/PageHeader";
const SingleBlog = () => {
  const [blog, setBlog] = useState(blogList);
  const { id } = useParams();
  const result = blog.filter((b) => b.id === parseInt(id));
  // console.log(result);
  const socialList = [
    {
      link: "#",
      iconName: "icofont-facebook",
      className: "facebook",
    },
    {
      link: "#",
      iconName: "icofont-twitter",
      className: "twitter",
    },
    {
      link: "#",
      iconName: "icofont-linkedin",
      className: "linkedin",
    },
    {
      link: "#",
      iconName: "icofont-instagram",
      className: "instagram",
    },
    {
      link: "#",
      iconName: "icofont-pinterest",
      className: "pinterest",
    },
  ];
  return (
    <div>
      <PageHeader title={"Single Blog Pages "} curPage={"Blog/Blog Details"} />
      <div className="blog-section blog-single padding-tb section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="section-wrapper">
                  <div className="row row-cols-1 justify-content-center g-4 ">
                    <div className="col">
                      <div className="post-item style-2">
                        <div className="post-inner">
                          {result.map((item) => (
                            <div key={item.id}>
                              <div className="post-thumb">
                                <img
                                  src={item.imgUrl}
                                  className="w-100"
                                  alt=""
                                />
                              </div>
                              <div className="post-content">
                                <h3>{item.title}</h3>
                                <div className="meta-post">
                                  <ul className="lab-ul">
                                    <ul className="lab-ul">
                                      {item.metaList.map((val, i) => (
                                        <li key={i}>
                                          <i className={val.iconName}></i>
                                          {val.text}
                                        </li>
                                      ))}
                                    </ul>
                                  </ul>
                                </div>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Doloribus modi recusandae
                                  aperiam ipsam commodi velit, pariatur
                                  voluptate iste dolorem quas accusantium harum
                                  ut quae sequi eaque odio fugit quibusdam hic!
                                </p>
                                <blockquote>
                                  <p>
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Magni laudantium labore
                                    alias blanditiis, recusandae assumenda
                                    nesciunt ipsum iure, similique consectetur
                                    repellendus quas id corrupti praesentium
                                    quis vel libero quo mollitia!
                                  </p>
                                  <cite>
                                    <a href="#">...Assad Youssef</a>
                                  </cite>
                                </blockquote>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Sunt rem natus numquam id
                                  nostrum dignissimos, vitae sapiente fugit
                                  officiis esse obcaecati aliquid vero magnam
                                  corrupti praesentium odit sit reprehenderit?
                                  Vitae?Lorem ipsum, dolor sit amet consectetur
                                  adipisicing elit. Tempore, neque. Labore
                                  doloremque illo exercitationem hic, animi
                                  error, suscipit nam vel corrupti alias rem
                                  dolorem consequatur! Voluptatum alias nisi
                                  dolorem dicta.
                                </p>
                                <img
                                  src="/src/assets/images/blog/single/01.jpg"
                                  alt=""
                                />
                                <p>
                                  Lorem, ipsum dolor sit amet consectetur
                                  adipisicing elit. Eveniet fugit laborum, iure
                                  voluptas quasi, animi ullam cupiditate
                                  praesentium quos quo exercitationem molestiae
                                  neque. Eaque delectus placeat in voluptas
                                  autem dolore.
                                </p>
                                <div className="video-thumb">
                                  <img
                                    src="/src/assets/images/blog/single/02.jpg"
                                    alt=""
                                  />
                                  <a href="" className="video-button popup">
                                    <i className="icofont-ui-play"></i>
                                  </a>
                                </div>
                                <div className="tags-section">
                                  <ul className="tags lab-ul">
                                    <a href="#">Agency</a>
                                    <a href="#">Business</a>
                                    <a href="#">Personal</a>
                                  </ul>
                                  <ul className="lab-ul social-icons">
                                    {socialList.map((s, i) => (
                                      <li key={i}>
                                        <a href="#" target="_blank" className={s.className} >
                                          <i className={s.iconName}></i>
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
