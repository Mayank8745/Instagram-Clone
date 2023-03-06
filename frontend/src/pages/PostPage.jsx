import { useState, useEffect } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import "./PostPage.css";

export default function PostPage() {
  const fetchUrl = "http://localhost:8000/user/allpost";
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const { data: response } = await axios.get(fetchUrl);
      setPost(response.finalResult);
    };
    getPost();
  }, [fetchUrl]);

  return (
    <div className="postpage bg-[#f7f7f7] w-full h-full overflow-auto ">
      <div className="post-container flex flex-col h-[100vh] w-[40vw] m-auto relative">
        {posts.length > 0 &&
          posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                userName={post.userName}
                likeData={post.likeData}
                imagesData={post.imagesData}
                image_count={post.image_count}
                caption={post.caption}
                like_count={post.like_count}
              />
            );
          })}
      </div>
    </div>
  );
}
