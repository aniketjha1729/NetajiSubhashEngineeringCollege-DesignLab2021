import React, { useState } from "react";
import "./register.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userRegister } from "../../redux/actions/user";

const Register=({ userRegister, signupStatus, errors })=> {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    userRegister(name, email, password);
  };

  if (signupStatus) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form onSubmit={onSubmit} className="registerForm">
        <label>Name</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          name="name"
          value={name}
          onChange={onChange}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          name="email"
          value={email}
          onChange={onChange}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          name="password"
          value={password}
          onChange={onChange}
        />
        <button className="registerButton">Register</button>
      </form>
    </div>
  );
}
Register.propTypes = {
  userRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  signupStatus: state.user.signupStatus,
  errors: state.user.errors,
});


export default connect(mapStateToProps, { userRegister })(Register);