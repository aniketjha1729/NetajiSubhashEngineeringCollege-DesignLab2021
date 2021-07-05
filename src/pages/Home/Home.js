import React from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./home.css";

const Home = ({ isAuthenticated }) => {
  return (
    <>
      <Header />
      <div className="home">
        <Posts isAuthenticated={isAuthenticated} />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
