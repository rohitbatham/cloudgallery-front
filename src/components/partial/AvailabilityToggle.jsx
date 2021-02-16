import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "./../config";
import { Link } from "react-router-dom";
import { decodeToken, getToken} from "./../utils/user";
import Toggle from "react-toggle";

export default ({ id = "", availability = 0 }) => {
    const uid = decodeToken().uuid;
    const handleEggsChange = (e) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({ id : id, availability : e.target.checked }),
            headers: { 'Content-Type': 'application/json', 'authorization' : getToken() },
        }
        fetch(`${API_ENDPOINT}/menuitems/update/availablility?uuid=${uid}`, options)
        .then(response => response.json())
        .then(data => {
            if(!data.status){
                alert(data.message)
            }
        }).catch(()=>{
            alert('Something went wrong. Please try again.')
        });
    }

    return(
        <Toggle
            defaultChecked={availability}
            aria-label='Availability'
            onChange={handleEggsChange} />
    )

}