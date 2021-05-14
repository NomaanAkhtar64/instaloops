import React from "react";
import { Link } from "react-router-dom";

import "./layout.scss";

interface layoutProps {}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <>
      <div className="main-body">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <div className="site-name">Instaloops</div>
            </Link>

            <a
              role="button"
              className="navbar-burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>

              <Link to="/profile/" className="navbar-item">
                Profile
              </Link>

              {/* <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link"> More </Link>

                <div className="navbar-dropdown">
                  <Link className="navbar-item"> About </Link>
                  <Link className="navbar-item"> Jobs </Link>
                  <Link className="navbar-item"> Contact </Link>
                  <hr className="navbar-divider" />
                  <Link className="navbar-item"> Report an issue </Link>
                </div>
              </div> */}
            </div>

            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/signup/" className="button is-info">
                    <strong>Sign up</strong>
                  </Link>
                  <Link to="/login/" className="button is-light">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {children}
        <footer className="footer">
          <div className="content has-text-centered">
            <p>&copy; All copyrights are reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default layout;
