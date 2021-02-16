import React from "react";
import logoicon from './../../assets/images/logoicon.png';
import logo from './../../assets/images/logo.png';
export const LogoIcon = ({
    alt = "My Menu",
    ...props
}) =>{
    const styleAttr = {
        transitionProperty :"width"
    }
    return(
        <img src={logoicon} alt={alt} {...props} style={styleAttr}/>
    )
};

export const Logo = ({
    alt = "My Menu",
    ...props
}) =>{
    return(
        <img src={logo} alt={alt} {...props}/>
    )
};