import React, { useState, useContext, Fragment } from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { DisplayAlert, DisplayError } from "./core/alert.jsx";
import { Input } from "./core/form.jsx";
import { setToken } from "./utils/user";
import { API_ENDPOINT } from "./config";

export default({}) => {
    const { register, handleSubmit, errors } = useForm(); 
    const [ showMessage, setShowMessage ] = useState(false);
    const [ pwdinputtype, setPwdinputtype ] = useState('password');
    const [ resp, setResp ] = useState({});
    const onSubmit = (data) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch(`${API_ENDPOINT}/auth`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setResp(data);
                setShowMessage(true);
                if(data.status){
                    setToken(data.token);
                    // redirect to profile page
                    window.location = `/profile?uid=${data.uuid}&type=view`;
                }
            });
    };
    return(
        <Fragment>
            { showMessage && (<DisplayAlert title={resp.title} summary={resp.message} type={resp.type} setShowMessage={setShowMessage} />) }
        <div className="w-full max-w-sm mx-auto md:mt-10">
            <h1 className="text-center heading-2 mb-3">Sign In</h1>
            <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <Input 
                        inputRef={register({
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                          })}
                        name="email"
                        placeholder="Email" />
                        {(errors.email && errors.email.type === "required") && (<DisplayError msg="Username is required" />)}
                        {(errors.email && errors.email.type === "pattern") && (<DisplayError msg="Invalid email address" />)}
                 </div>
                <div className="mb-4 relative">
                    <Input 
                        inputRef={register({ required: true })}
                        name="password"
                        type={pwdinputtype} placeholder="Password" />
                        <i 
                            class="absolute right-3 top-5 text-gray-500 hover:text-gray-800 cursor-pointer"
                            onClick={()=> setPwdinputtype(pwdinputtype === "password" ? "text" : "password")}
                        >
                            { (pwdinputtype === "password") ? <FaEyeSlash /> : <FaEye /> }
                        </i>
                        {errors.password && (<DisplayError msg="Password is required"  />) }
                </div>
                <div className="flex items-center justify-between">
                    <button className="btn btn-primary" type="submit">
                        Sign In
                    </button>
                    <Link className="inline-block align-baseline font-semibold text-sm primary-link" to="/reset-password">
                        Forgot Password?
                    </Link>
                </div>
            </form>
            <Link className="primary-link font-semibold block text-center my-6" to="/sign-up">Don't have account? Create One</Link>
        </div>
        </Fragment>
    );
}