import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [footers, setFooters] = useState([]);
  const [categoris, setCategoris] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/categoris`
    fetch(url)
      .then(res => res.json())
      .then(data => setCategoris(data));
  }, []);

  useEffect(() => {
    const url = `http://localhost:5000/footer`
    fetch(url)
      .then(res => res.json())
      .then(data => setFooters(data));
  }, []);
  return (
    <>
      <footer className="footer-area pd-top-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget widget widget_contact">
                <h4 className="widget-title">Contact Us</h4>
                <div className="media">
                  <div className="thumb">
                    <img src="assets/img/footer/1.png" alt="img" />
                  </div>
                  <div className="media-body">
                    <p>2200 Pooz Street</p>
                    <p>Henderson, TN 38340</p>
                  </div>
                </div>
                <div className="media">
                  <div className="thumb mt-0">
                    <img src="assets/img/footer/2.png" alt="img" />
                  </div>
                  <div className="media-body">
                    <p className="m-0">example@mail.com</p>
                  </div>
                </div>
                <div className="media">
                  <div className="thumb mt-0">
                    <img src="assets/img/footer/3.png" alt="img" />
                  </div>
                  <div className="media-body">
                    <p className="m-0">517-383-6673</p>
                  </div>
                </div>
                <ul className="social-area">
                  <li>
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-google-plus-g" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fab fa-pinterest-p" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget widget widget_nav_menu">
                <h4 className="widget-title">Useful link</h4>
                <ul>
                  <li>
                    <a href="#">All properties</a>
                  </li>
                  <li>
                    <a href="#">FAQ’S</a>
                  </li>
                  <li>
                    <a href="#">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="#">Sign up</a>
                  </li>
                  <li>
                    <a href="#">Articles</a>
                  </li>
                  <li>
                    <a href="#">Popular tags</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6">
              <div className="footer-widget widget widget widget_products">
                <h4 className="widget-title">Products</h4>
                <ul>
                  <li>
                    <a href="#">Graphics (26)</a>
                  </li>
                  <li>
                    <a href="#">Backgrounds (11)</a>
                  </li>
                  <li>
                    <a href="#">Fonts (9)</a>
                  </li>
                  <li>
                    <a href="#">Music (3)</a>
                  </li>
                  <li>
                    <a href="#">Photography (3)</a>
                  </li>
                  <li>
                    <a href="#">Themes (3)</a>
                  </li>
                  <li>
                    <a href="#">Web Templates (3)</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 offset-lg-1 col-md-6">
              <div className="footer-widget widget widget_news">
                <h4 className="widget-title">Latest News</h4>
                <div className="widget-news-wrap">
                  <div className="date">May 11, 2020</div>
                  <p>The heights by great men</p>
                </div>
                <div className="widget-news-wrap">
                  <div className="date">May 11, 2020</div>
                  <p>The heights by great men</p>
                </div>
                <div className="widget-news-wrap">
                  <div className="date">May 11, 2020</div>
                  <p>The heights by great men</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Footer bottom*/}
        <div className="container">
          <div className="copyright-area">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <p>©2022 CopyRight Example. All rights reserved.</p>
              </div>
              <div className="col-lg-6 text-lg-right">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Footer;