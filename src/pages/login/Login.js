import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLogin } from "../../redux/actions/user";
import "./login.css";

const Login = ({ userLogin, isAuthenticated, errors }) => {
  const [formData, setFormData] = useState({
    email: "test1@gmail.com",
    password: "test1@123456",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    userLogin(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form onSubmit={onSubmit} className="loginForm">
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          name="email"
          value={email}
          onChange={onChange}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          name="password"
          value={password}
          onChange={onChange}
        />
        <button className="loginButton">Login</button>
      </form>
    </div>
  );
};
Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  errors: state.user.errors,
});

export default connect(mapStateToProps, { userLogin })(Login);
