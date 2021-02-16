import React, { useState, useEffect, Fragment } from "react"
import UploadImages from "./uploadimg/uploadimg.jsx"
import { getToken, decodeToken } from "./utils/user";
import { API_ENDPOINT } from "./config";

import { Link } from "react-router-dom";
export default ({

}) => {

    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const submitImages = () =>{
        const imgSize = images[0].file.size/1024/1024; 
        if( imgSize > 2 ){
            alert('Image size is large. It should be less than 2 MB.');
            return true;
        }
        setUploading(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'authorization' : getToken() },
            body: JSON.stringify(images)
        };
        fetch(`${API_ENDPOINT}/restaurantmenus/add?uuid=${decodeToken().uuid}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setUploading(false);
                if(data.status){
                    setImages([]);
                }
                alert(data.title)
            }).catch(()=>{
                setUploading(false)
            });;
    }
    return(
        <Fragment>
            <UploadImages 
                uploading={uploading}
                images={images}
                setImages={setImages}
            />
            { (images.length > 0 ) && 
            (<button 
                class="bg-teal-700 text-gray-400 p-2 text-center w-full my-4 shadow-md rounded-sm transition-all delay-100 hover:bg-teal-800"
                type="button"
                disabled={(uploading)? 'disabled' : false}
                onClick={submitImages}
            >{(uploading)? 'Please wait...' : 'Upload' }</button>)
            }
            <Link to="/restaurant-menus" 
                class="w-full my-6 block md:inline-block md:w-auto btn bg-trasparent border border-gray-800 hover:bg-green-600 text-gray-200"
            >Go Back to Gallery</Link>
        </Fragment>
    )
}