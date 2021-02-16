import React, { Fragment, useState } from "react";

const SVGIcon = ({type}) => {
    const renderSvg = () =>{
        if(type == "red"){
            return(<svg className={`fill-current h-6 w-6 text-red-500 bg-red-200 rounded-full mr-4`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"></path>
            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"></path>
          </svg>)
        }else if(type == "teal"){
            return(<svg className={`fill-current h-6 w-6 text-teal-500 bg-teal-200 rounded-full mr-4`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"></path>
          </svg>)
        }else if(type == "yellow"){
            return(<svg className={`fill-current h-6 w-6 text-yellow-500 bg-yellow-200 rounded-full mr-4`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
          </svg>)
        }else {
            return(<svg className={`fill-current h-6 w-6 text-blue-500 bg-blue-200 rounded-full mr-4`} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"></path>
            <circle cx="8" cy="4.5" r="1"></circle>
          </svg>)
        }
    }
    return(<Fragment>{renderSvg()}</Fragment>)
}
const Alert = ({
    variation = "",
    title = "",
    summary = "",
    setShowMessage = () => {}
}) => {
    let vairationClass  = "text-blue-600 border-blue-400 bg-blue-100";
    if(variation == "red"){
        vairationClass  = "text-red-600 border-red-400 bg-red-100";
    }else if(variation == "yellow"){
        vairationClass  = "text-yellow-600 border-yellow-400 bg-yellow-100";
    }else if(variation == "teal"){
        vairationClass  = "text-teal-600 border-teal-400 bg-teal-100";
    }else{
        vairationClass  = "text-gray-600 border-gray-400 bg-gray-100";
    }

    return (
        <Fragment>
        { open && (<div className={`w-full lg:max-w-md my-4 mx-auto rounded border-l-4 px-4 py-3 shadow-md relative ${vairationClass}`} role="alert">
            <div className="flex">
                <div className="py-1"><SVGIcon type={variation} /></div>
                <div>
                    { title && (<p><strong className="font-bold">{title}</strong></p>) }
                    { summary && (<p><span className="block sm:inline" dangerouslySetInnerHTML={{__html: summary}} /></p>) }
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={ () => setShowMessage(false)}>
                        <svg className={`fill-current h-6 w-6 text-${variation}-600`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                    </span>
                </div>
            </div>
        </div>) }
        </Fragment>
  )
}
export const DisplayAlert = ({
    type = "",
    title = "",
    summary = "",
    setShowMessage = () => {}
}) => {
    const showAlert = () =>{
        if(type == 'error'){
            return(<Alert title={title} summary={summary} variation="red" setShowMessage={setShowMessage}/>)
        }else if(type == 'success'){
            return(<Alert title={title} summary={summary} variation="teal" setShowMessage={setShowMessage} />)
        }else if(type == 'warn'){
            return(<Alert title={title} summary={summary} variation="yellow" setShowMessage={setShowMessage} />)
        }else{
            return(<Alert title={title} summary={summary} variation="blue" setShowMessage={setShowMessage} />)
        }
    }
    return (
        <Fragment>{showAlert()}</Fragment>
    )
}

export const DisplayError = ({ msg = " "}) =>{
    return <p className="text-red-500 text-xs" dangerouslySetInnerHTML={{__html : msg}} />
}