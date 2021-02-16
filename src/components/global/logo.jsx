import React from "react";
import { LogoIcon } from "./../core/logos.jsx";
import { Link } from "react-router-dom";
export default ({
    sizeClass = ""
}) => {
    return(
    <Link to="/" className="flex justify-center mb-4">
        <LogoIcon className={`${sizeClass} mx-0 transition duration-500 ease-in-out`}/>
    </Link> )
}