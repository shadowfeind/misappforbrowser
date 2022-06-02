import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputControl from "../../../components/controls/InputControl";
import { API_URL } from "../../../constants";
import {
  putUploadPhotoAction,
  uploadPhotoActionAction,
} from "./UploadPhotoActions";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const UploadPhotoForm = ({ uploadPhoto }) => {
  const [image, setImage] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);
  const dispatch = useDispatch();

  const handleImage = (event) => {
    let imageFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (x) => {
      setImgSrc(x.target.result);
    };
    reader.readAsDataURL(imageFile);
    setImage(event.target.files[0]);
  };

  const handleUploadImage = () => {
    if (uploadPhoto) {
      dispatch(putUploadPhotoAction(image, uploadPhoto.dbModel));
    } else {
      console.log("failed");
    }
  };

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      // source: CameraSource.Camera,
    });

    console.log("image", image);
    const imageUrl = image?.path || image?.webPath;
    setImgSrc(Capacitor.convertFileSrc(imageUrl));
    console.log("imageurl", imageUrl);

    const result = await fetch(Capacitor.convertFileSrc(imageUrl));
    console.log("my result", result);
    const blob = await result.blob();
    const file = new File([blob], "image.jpeg", { type: blob.type });
    console.log("my file", file);
    setImage(file);
  };

  return (
    <>
      {/* <InputControl
        name="ImageUploaded"
        onChange={(e) => handleImage(e)}
        type="file"
      /> */}

      <button
        style={{
          backgroundColor: "#253053",
          color: "#fff",
          padding: "6px 14px",
          display: "block",
        }}
        onClick={() => takePicture()}
      >
        Take a photo
      </button>
      <div style={{ height: "10px" }}></div>

      <img
        src={
          imgSrc
            ? imgSrc
            : uploadPhoto && `${API_URL}${uploadPhoto.dbModel.FullPath}`
        }
        height={200}
        width={200}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        {image && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleUploadImage}
            style={{ margin: "10px 0 0 10px" }}
          >
            UPLOAD
          </Button>
        )}
      </div>
    </>
  );
};

export default UploadPhotoForm;
