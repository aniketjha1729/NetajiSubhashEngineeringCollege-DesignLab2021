import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW Me</span>
        <div className="sidebarSocial">
          <a href="https://www.facebook.com/aniketjha1729/">
            <i className="sidebarIcon fab fa-facebook-square"></i>
          </a>
          <a href="https://twitter.com/aniketjha1729">
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </a>
          <a href="https://github.com/aniketjha1729">
            <i className="sidebarIcon fab fa-github-square"></i>
          </a>
          <a href="https://www.instagram.com/aniketjha1729/">
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
