import React, { useState } from "react";
import { PRIMARY } from "../../../styles/colors";
import AppLabel, { TYPES as LABEL_TYPES } from "../AppLabel";
import Image, { TYPES } from "../Image";
import "./styles.css";

export default function ImageUpload({ style = {}, className = "" }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFile = (event) => {
    console.log(event.target.files[0]);
    setSelectedImage(event.target.files[0]);
  };

  return !selectedImage ? (
    <label
      onChange={handleFile}
      htmlFor="image-upolad-button"
      style={{ backgroundColor: PRIMARY, ...style }}
      className={`image-upload-cont ${className}`}
    >
      <input id="image-upolad-button" type="file" accept="image/*" hidden />
      <Image type={TYPES.ALMOSTSMALL} imageName="add.png" />
      <AppLabel type={LABEL_TYPES.SUB_TITLE}>Add Image</AppLabel>
    </label>
  ) : (
    <div
      style={{ position: "relative", ...style }}
      className={`image-upload-cont disable-hover ${className}`}
    >
      <Image
        onClick={() => setSelectedImage(null)}
        className="image-upolad-cancel"
        type={TYPES.ALMOSTTINY}
        imageName="cancel.png"
      />
      <img
        alt="Image Not Found!"
        className="image-upload-selected-img"
        src={URL.createObjectURL(selectedImage)}
      />
    </div>
  );
}
