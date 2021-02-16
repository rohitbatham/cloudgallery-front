import React, { Fragment } from 'react';
import OCRWT from "./../../assets/images/ocr-walkthrough.gif"
export default () =>{
    return(
    <Fragment>
        <h1 class="text-2xl">OCR Guideline</h1>
        <p class="font-semibold mt-4 mb-1">File Format</p>
        <p>We accept images in JPEG and PNG formats.</p>
        <p class="font-semibold mt-4 mb-1">File Size</p>
        <p>We accept all image sizes as you have to crop specific area of the image to extract the text.</p>
        <p class="font-semibold mt-4 mb-1">File Background</p>
        <p>Image must not include conjusted background which might decrease the accuracy.</p>
        <p class="font-semibold mt-4 mb-1">File Quality</p>
        <p>Image must not be blur or faded it might be difficut for OCR to read text</p>

        <hr class="my-4 border-gray-500" />
        <h2 class="text-2xl mb-5">OCR Walkthrough</h2>
        <img src={OCRWT} alt="OCR Walkthrough" />
    </Fragment>
    )
}