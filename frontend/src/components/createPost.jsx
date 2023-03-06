import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [files, setFiles] = useState(undefined);

  const SubmitData = async (e) => {
    e.preventDefault();
    const formData = {
      caption: caption,
      images: files,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/user/createpost/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert(e);
    }
  };

  const changeCaption = (e) => {
    setCaption(e.target.value);
  };

  const uploadFiles = (e) => {
    setFiles(e.target.files);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[800px] h-[600px] p-6">
        <form encType="multipart/form-data">
          <input type="text" name="caption" className = "py-4" onChange={changeCaption} />
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={uploadFiles}
          />
          <button type="submit" onClick={SubmitData}>
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
