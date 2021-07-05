import "./singlePost.css";
import Sidebar from "../../components/sidebar/SideBar";
import SinglePost from "../../components/single/SinglePost";

const Single = () => {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
};

export default Single;
