import React, { Fragment } from "react";

const Footer = () => {
  return (
    <div>
      <Fragment>
        <div className="container">
          <footer className="pt-4 my-md-5 pt-md-5 border-top">
            <div className="row">
              <div className="col-12 col-md">
                <img
                  className="mb-2"
                  src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
                  alt=""
                  width={24}
                  height={24}
                />
                <small className="d-block mb-3 text-muted">© 2017-2018</small>
              </div>
            </div>
          </footer>
        </div>
      </Fragment>
    </div>
  );
};

export default Footer;
