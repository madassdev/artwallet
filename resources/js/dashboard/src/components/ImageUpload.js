import axios from "axios";
import React, { useRef, useState } from "react";

function ImageUpload({ imageUploaded, defaultImage }) {
    console.log(defaultImage)
    const hiddenFileInput = useRef(null);
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        const up = URL.createObjectURL(fileUploaded);
        setImgSrc(up);
        imageUploaded(fileUploaded);
    };

    const [imgSrc, setImgSrc] = useState(defaultImage);

    return (
        <div className="">
            <p className="p-3 bg-gray-300 my-2">
                {imgSrc && <img src={imgSrc} className="w-12 h-12" />}
            </p>
            <button
                className="text-xs p-1 bg-info text-white rounded m-2 cursor-pointer"
                onClick={handleClick}
                type="button"
            >
                Select
            </button>
            <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
            />
        </div>
    );
}

export default ImageUpload;
