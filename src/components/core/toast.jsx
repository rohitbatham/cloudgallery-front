import React, { Fragment, useState } from "react";

const ToastCore = ({
    variation = "",
    title = "",
    summary = ""
}) => {
    const [hide, setHide] = useState(false);
    return (
        <Fragment>
        <div className="alert-toast fixed bottom-0 right-0 m-6 w-5/6 md:w-full max-w-xs">
            <input type="checkbox" checked={hide} className="hidden" id="footertoast" onChange={()=> setHide(!hide)}/>

            <label className={`close cursor-pointer flex items-start justify-between w-full p-2 bg-${variation}-500 h-16 rounded shadow-lg text-white`} title="close" for="footertoast">
            {title}
            
            <svg className="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
            </svg>
            </label>
        </div>
        </Fragment>
  )
}
export const Toast = ({
    type = "",
    title = "",
    summary = ""
}) => {
    const showToast = () =>{
        if(type == 'error'){
            return(<ToastCore title={title} summary={summary} variation="red" />)
        }else if(type == 'error'){
            return(<ToastCore title={title} summary={summary} variation="teal" />)
        }else if(type == 'warn'){
            return(<ToastCore title={title} summary={summary} variation="yellow" />)
        }else{
            return(<ToastCore title={title} summary={summary} variation="blue" />)
        }
    }
    return (
        <Fragment>{showToast()}</Fragment>
    )
}