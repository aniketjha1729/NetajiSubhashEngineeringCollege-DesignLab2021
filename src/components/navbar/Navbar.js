import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/user";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./navbar.css";

const Navbar = ({ logout, isAuthenticated, user: { user } }) => {
  return (
    <div className="top">
      <div className="topLeft">
        <i class="fas fa-blog fa-2x"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="topListItem">
                <Link className="link" to="/write">
                  WRITE
                </Link>
              </li>
              <li className="topListItem" onClick={logout}>
                LOGOUT
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className="topRight">
        {isAuthenticated ? (
          <>
            <Link to="/settings">
              <img
                className="topImg"
                src="https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png"
                alt="photo"
              />
            </Link>
            &nbsp; {user ? user.name : ""}
          </>
        ) : (
          ""
        )}
        {!isAuthenticated ? (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
