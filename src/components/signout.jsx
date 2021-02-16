import React from "react"
import { Link } from "react-router-dom"
import { removeToken } from "./utils/user"
export default({
    
}) => {
    removeToken();
    window.location = `/sign-in`;
    return(<div className="text-center text-xl">Please wait...</div>)
}