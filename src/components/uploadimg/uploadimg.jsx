import React, { Fragment } from "react"
import ImageUploading from 'react-images-uploading';
import { CameraIcon } from "./../core/icons.jsx"
export default ({
    images = [],
    uploading = false,
    uploadNow = () => {},
    setImages = () => {}
}) => {
    const maxNumber = 3;
    
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };
    return(
        <Fragment>
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                        { /* Upload or drag image */ } 
                        { (images.length < 1 ) && <div className={`border-4 border-dashed cursor-pointer relative hover:border-gray-400 ${isDragging ? "border-green-600" : "border-gray-800"}`}
                           onClick={onImageUpload}
                            {...dragProps}>
                            <div class="text-center p-10 top-0 right-0 left-0 m-auto">
                                <div class="text-gray-700 ">
                                    <CameraIcon cssClass={`w-20 h-20 ${isDragging ? "text-green-600" : "text-gray-700"}`} />
                                    <h4> 
                                        Drop files anywhere to upload
                                        <br/>or
                                    </h4>
                                    <p>Browse local directoy</p>
                                </div>
                            </div>
                        </div> }
                        { /*Remove all earlier uploaded images */ }
                        { (images.length > 1) && (<button class="bg-red-700 text-gray-400 p-2 text-center w-full my-4 shadow-md rounded-sm transition-all delay-100 hover:bg-red-800" onClick={onImageRemoveAll}>Remove all images</button>) }
                        {imageList.map((image, index) => (
                            <div key={index} className="mt-6 text-center">
                                <div class="border-r border-l border-t border-gray-700 border-dashed">
                                    <img src={image['data_url']} alt="" className="max-w-full mx-auto p-6" />
                                </div>
                                <div className="grid col-gap-0 grid-cols-2">
                                    <button 
                                        className={`bg-gray-400 text-gray-800 p-2 text-center w-full ${(uploading)? 'cursor-not-allowed' : 'hover:bg-green-600 hover:text-gray-400'}`} 
                                        disabled={(uploading)? 'disabled' : false}
                                        onClick={() => onImageUpdate(index)}>
                                        Change
                                    </button>
                                    <button 
                                        className={`bg-gray-500 text-gray-900 p-2 text-center w-full ${(uploading)? 'cursor-not-allowed' : 'hover:bg-red-600 hover:text-gray-400'}`} 
                                        disabled={(uploading)? 'disabled' : false}
                                        onClick={() => onImageRemove(index)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </ImageUploading>
        </Fragment>)
}
