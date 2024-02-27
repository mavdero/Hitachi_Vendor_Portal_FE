import React, { useState } from "react";
import axios from "axios";
import apiService from "../services/api.service";

export default function ImageUpload() {
  const [postImage, setPostImage] = useState({
    image: "",
  });

  const url = `${process.env.REACT_APP_API_URL}/imageUpload`;
  const createImage = (newImage) => axios.post(url, newImage);

  const createPost = async (post) => {
    try {
      await createImage(post);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postImage);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, image: base64 });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          label="Image"
          name="image"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handleFileUpload(e)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}