import Cookies from 'universal-cookie';
import { useState } from "react";
import jwt_decode from "jwt-decode";

const cookies = new Cookies();


export const getToken = () =>{
    return cookies.get('token');
}
export const setToken = (token) =>{
    return cookies.set('token', token);
}
export const removeToken = () =>{
    return cookies.remove('token');
}


export const isLoggedIn = () =>{
    return cookies.get('token') ? true : false
}

export const decodeToken = () =>{
    return jwt_decode(getToken());
}

export const headers = (contentType) =>{
    return {
        'authorization': getToken(), 
        'Content-Type': contentType || 'application/x-www-form-urlencoded'
      }
}