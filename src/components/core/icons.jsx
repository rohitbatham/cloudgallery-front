import React from "react";

export const UserIcon = ({
}) => {
    return(
    <i className="inline-block relative w-4 h-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}  className="feather feather-user h-5 w-5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    </i>)
}
export const CameraIcon = ({
    cssClass = "w-4 h-4"
}) => {
    return(
    <i className={`inline-block relative ${cssClass}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} stroke-linecap="round" stroke-linejoin="round" class="feather feather-camera">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
        </svg>                     
    </i>)
}


export const DeleteIcon = ({
    cssClass = "w-4 h-4"
}) => {
    return(
    <i className={`inline-block relative ${cssClass}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 58.67"  stroke="currentColor">
            <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
                    <path class="cls-1" d="M61.33 5.33H48V2.67A2.66 2.66 0 0045.33 0H18.67A2.66 2.66 0 0016 2.67v2.66H2.67a2.67 2.67 0 000 5.34H8v40a8 8 0 008 8h32a8 8 0 008-8v-40h5.33a2.67 2.67 0 100-5.34zM50.67 50.67A2.67 2.67 0 0148 53.33H16a2.67 2.67 0 01-2.67-2.66v-40h37.34z"/><path class="cls-1" d="M24 45.33a2.67 2.67 0 002.67-2.66V21.33a2.67 2.67 0 00-5.34 0v21.34A2.67 2.67 0 0024 45.33zM40 45.33a2.67 2.67 0 002.67-2.66V21.33a2.67 2.67 0 00-5.34 0v21.34A2.67 2.67 0 0040 45.33z"/>
                </g>
            </g>
        </svg>                  
    </i>)
}



export const ChangeIcon = ({
    cssClass = "w-4 h-4"
}) => {
    return(
    <i className={`inline-block relative ${cssClass}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="41.8" height="42.18">
            <path class="a" d="M35.48.59l-3 3A21 21 0 000 19a2 2 0 002 2.18h4.07A2 2 0 008 19.41a13 13 0 0118.58-9.92l-2.27 2.27a2 2 0 001.42 3.42H36.9a2 2 0 002-2V2A2 2 0 0035.48.59zM39.79 21h-4.06a2 2 0 00-1.95 1.76A13 13 0 0120.9 34a12.81 12.81 0 01-5.68-1.32l2.26-2.27A2 2 0 0016.07 27H4.9a2 2 0 00-2 2v11.17a2 2 0 003.41 1.42l3.05-3.05A20.78 20.78 0 0020.9 42a21 21 0 0020.89-18.82 2 2 0 00-2-2.18z"/>
        </svg>                    
    </i>)
}


export const LogoutIcon = ({
    cssClass = "w-4 h-4"
}) => {
    return(
    <i className={`inline-block relative ${cssClass}`}>
        <svg viewBox="0 0 32 32"  stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M25 2h-9v2h9a1 1 0 011 1v22a1 1 0 01-1 1h-9v2h9a3 3 0 003-3V5a3 3 0 00-3-3z"/><path d="M21.58 17v-2H7l4-4-1.42-1.45-5 5a2 2 0 000 2.83l5 5L11 21l-4-4z"/></svg>
    </i>)
}



