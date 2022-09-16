import React, { useEffect, useState } from "react";
import { PRIMARY } from "../../../styles/colors";
import AppLabel, { TYPES as LABEL_TYPES } from "../AppLabel";
import Image, { TYPES } from "../Image";
import "./styles.css";

export default function ImageUpload({
  onNewImage = (image) => {
    console.error("No on new image hanlder was passed - ImageUpload. ID: ", image);
  },
  imageURL = null,
  style = {},
  className = "",
  onClearImage = () => {
    console.error("No on clear image hanlder was passed - ImageUpload.");
  },
}) {
  const handleFile = (event) => {
    const url = URL.createObjectURL(event.target.files[0]);
    console.log("Initiated Image URL: ", url);
    let extName = event.target.files[0].name.split('.')[1];
    onNewImage([url,extName]);
  };

  const handleImageClearance = () => {
    console.log("Unmounting url ...");
    URL.revokeObjectURL(imageURL);
    console.log("Image URL: ", imageURL);
    onClearImage();
  };

  useEffect(() => {
    return () => {
      if (imageURL) {
        handleImageClearance();
      }
    };
  }, []);
  console.log("Component ImageURL: ", imageURL);
  return !imageURL ? (
    <label
      onChange={handleFile}
      htmlFor="image-upolad-button"
      style={{ backgroundColor: PRIMARY, ...style }}
      className={`image-upload-cont ${className}`}
    >
      <input
        onClick={(e) => {
          e.stopPropagation();
        }}
        id="image-upolad-button"
        type="file"
        accept="image/*"
        hidden
      />
      <Image type={TYPES.ALMOSTSMALL} imageName="add.png" />
      <AppLabel type={LABEL_TYPES.SUB_TITLE}>Add Image</AppLabel>
    </label>
  ) : (
    <div
      style={{ position: "relative", ...style }}
      className={`image-upload-cont disable-hover ${className}`}
    >
      <Image
        onClick={(e) => {
          handleImageClearance()
        }}
        className="image-upolad-cancel"
        type={TYPES.ALMOSTTINY}
        imageName="cancel.png"
      />
      <img
        alt="Image Not Found!"
        className="image-upload-selected-img"
        src={imageURL}
      />
    </div>
  );
}
