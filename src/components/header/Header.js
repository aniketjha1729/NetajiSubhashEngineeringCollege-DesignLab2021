import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1542435503-956c469947f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80"
        alt=""
      />
    </div>
  );
}
