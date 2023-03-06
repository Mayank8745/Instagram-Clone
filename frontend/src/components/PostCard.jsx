import ImageSlider from "./imageSlider";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";

export default function PostCard({
  id,
  userName,
  likeData,
  imagesData,
  image_count,
  caption,
  like_count,
}) {
  const [isLikeTrue, setLike] = useState(like_count == 0);
  var [likeCount, setLikeCount] = useState(like_count);
  const [images, setImages] = useState(imagesData);

  const LikeClick = async () => {
    const { data: response } = await axios.post(
      `http://localhost:8000/user/1/like/${id}`
    );
    setLike((isLikeTrue) => !isLikeTrue);

    if (isLikeTrue == false) {
      setLikeCount((likeCount) => likeCount - 1);
    } else {
      setLikeCount((like_count) => like_count + 1);
    }
  };

  return (
    <div className="postcard mb-[20px] w-full bg-white">
      <div className="postcard-userName border-2 p-2 flex flex-row items-center">
        <h6 className="ml-[10px]">{userName}</h6>
      </div>

      {image_count > 0 && (
        <div className="poscard-image-container rounded-2xl">
          {image_count == 1 &&
            images.map((image) => (
              <img
                key={image.id}
                className="h-[500px] w-[40vw]"
                src={`http://localhost:8000/${image.image_location}`}
                alt="Laptop"
              />
            ))}
          {image_count > 1 && <ImageSlider images={images} />}
        </div>
      )}
      <div className="post-card-like-container p-[10px] text-[20px] flex flex-row items-center">
        <div className="like-icon-container" onClick={LikeClick}>
          {isLikeTrue ? (
            <AiOutlineHeart size={30} />
          ) : (
            <AiFillHeart size={30} />
          )}
        </div>
        <p className="ml-[10px]">{likeCount} Likes</p>
      </div>
      {caption !== "" && (
        <div className="postcard-caption-container p-[10px]">
          <p>
            <strong className="mr-[5px]">{userName}</strong>
            {caption}
          </p>
        </div>
      )}
    </div>
  );
}
