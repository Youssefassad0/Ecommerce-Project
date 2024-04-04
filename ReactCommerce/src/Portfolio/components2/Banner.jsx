import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
export const Banner = () => {


 

  return (
    <section className="banner" id="/aboutAssad">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline"  >Welcome to my Portfolio</span>
                  <h1 style={{color:'white'}} >
                    {`Hi! I'm Assad`}{" "}
                    <span>
                      <span className="wrap">Web Developer</span>
                    </span>
                  </h1>
                  <p>
                    As a pabssionate and ambitious full-stack beginner
                    developer, I embark on a journey where code becomes the
                    canvas of my creativity. My enthusiasm for creating seamless
                    and engaging web applications drives me to explore the
                    intricate world of both front-end and back-end development
                  </p>
                  <button onClick={() => console.log("connect")}>
                    Let s Connect <ArrowRightCircle size={25} />
                  </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
