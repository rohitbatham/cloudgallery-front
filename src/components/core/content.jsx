import React, { Fragment } from "react";
import ImageFadeIn from "react-image-fade-in";
import logo from './../../assets/images/logo.png';

export const Home = () => {
    return(
        <Fragment>
            <ImageFadeIn src={logo} className="mx-auto my-10" opacityTransition={5}/>
        </Fragment>
    )
}
export const Contact = () => {
    return(
        <Fragment>
            <h1 className="text-left">Contact Us</h1>
            <h4 className="text-darkyellow mt-8 text-lg">Email Us at:</h4>
            <p className="py-4">
            <strong>Rohit Batham : </strong> <a href="mailto:rohitwatham@gmail.com">rohitwatham@gmail.com</a> <br />
            <br/>
            </p>
        </Fragment>
    )
}

export const Footer = () => {
    return(
        <Fragment>
            <div className="text-gray-700 text-center my-4 mt-8 p-4 text-xs border-t border-gray-800">&copy; 2021 Cluod Gallery</div>
        </Fragment>
    )
}