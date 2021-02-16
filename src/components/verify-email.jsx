import React, { useState, useEffect , Fragment } from "react";
import { Link } from 'react-router-dom';
import { DisplayAlert, DisplayError } from "./core/alert.jsx";
import { API_ENDPOINT } from "./config";
import SignIn from "./signin.jsx";
import { useParams } from "react-router-dom"
export default({}) => {
    const [ showMessage, setShowMessage ] = useState(false);
    const [ resp, setResp ] = useState({});
    const query = new URLSearchParams(window.location.search);
    const paramId = decodeURIComponent(query.get('id'))
    useEffect(()=>{
        fetch(`${API_ENDPOINT}/verify-account?id=${paramId}`)
        .then(response => response.json())
        .then(resp => {
            setResp(resp);
            setShowMessage(true);
        });
    },[])
    
    return(
        <Fragment>
            <div className="w-full">
            { showMessage && (<DisplayAlert title={resp.title} summary={resp.message} type={resp.type} setShowMessage={setShowMessage} />) }
            </div>
            <SignIn />
        </Fragment>
    )
}