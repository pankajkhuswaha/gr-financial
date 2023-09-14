import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  toast } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import {
 
  Col,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "utils/api";
import { resetData } from "features/loan/loanSlice";
import { uploadManyDoc } from "utils/api";

const Upload = ({ direction, ...args }) => {
  
  const images = [
    "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/39853/woman-girl-freedom-happy-39853.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/296282/pexels-photo-296282.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/103123/pexels-photo-103123.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400"
  ];
  const [imageList, setImageList] = useState(images);

  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (index) => (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();

    const sourceIndex = Number(event.dataTransfer.getData("text/plain"));
    const updatedImages = [...imageList];
    const [movedImage] = updatedImages.splice(sourceIndex, 1);
    updatedImages.splice(index, 0, movedImage);
    setImageList(updatedImages);
  };
  
  const handleDeleteImage = (imageIndex) => {
    const updatedImages = [...imageList];
    updatedImages.splice(imageIndex, 1);
    setImageList(updatedImages);
  };

  

  return (
    <div className="registermain">
      
      <Col lg="12" md="12">
          
      <div className=" conatiner border flex-wrap bg-white d-flex justify-content-center p-4 align-items-center rounded shadow " style={{gap:"20px"}} >
        {imageList.map((image, index) => (
          <div
            key={index}
            draggable
            style={{cursor:"grab",position:"relative"}}
            onDragStart={handleDragStart(index)}
            onDragOver={handleDragOver(index)}
            onDrop={handleDrop(index)}
          >
            <button className="btn btn-danger position-absolute right-0" onClick={() => handleDeleteImage(index)}>X</button>
            <img style={{width:200}} className="rounded" src={image} alt={`mage ${index}`} />
          </div>
        ))}
      </div>
        
      </Col>
    </div>
  );
};

export default Upload;
