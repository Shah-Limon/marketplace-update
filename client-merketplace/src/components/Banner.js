import React from 'react';

const Banner = () => {
  return (
    <>
      <div
        className="banner-area"
        style={{ background: "url(assets/img/banner/2.png)" }}
      >
        <div className="container">
          <div className="banner-area-inner">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="banner-inner text-center">
                  <h2>
                    Best Themes and <br />
                    <span>Plugins Marketplace</span>
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                    ipsum suspendisse
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;