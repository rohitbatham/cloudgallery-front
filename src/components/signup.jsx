import React, { useState, useEffect, useRef, Fragment } from "react";
import { DisplayAlert, DisplayError } from "./core/alert.jsx";
import { Input, Button } from "./core/form.jsx";
import { useForm } from 'react-hook-form';
import { API_ENDPOINT } from "./config";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default({}) => {
    const { register, handleSubmit, reset, errors, watch } = useForm(); 
    const password = useRef({});
    password.current = watch("password", "");
    const [ signedup, setSignedup ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ showMessage, setShowMessage ] = useState(false);
    const [ pwdinputtype, setPwdinputtype ] = useState('password');
    const [ cpwdinputtype, setCpwdinputtype ] = useState('password');
    const [ resp, setResp ] = useState({});
    const onSubmit = (formData) => { 
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        setLoading(true);
        fetch(`${API_ENDPOINT}/register`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setResp(data);
                setShowMessage(true);
                if(data.status){
                    setSignedup(true)
                    setLoading(false);
                    reset();
                }
        }).catch(()=>{
            setLoading(false);
            alert('Something went wrong. Please try later on.')
        });
    };
    return(
        <Fragment>
            { showMessage && (<DisplayAlert title={resp.title} summary={resp.message} type={resp.type} setShowMessage={setShowMessage} />) }
            { (!signedup) && (<Fragment>
                <h1 className="text-center heading-2 mb-3">
                    Sign Up
                </h1>
                <div className="w-full max-w-sm mx-auto">
                    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                        <div className={`mb-4`}>
                            <Input 
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                name="email"
                                type="text" placeholder="Email" />
                                {(errors.email && errors.email.type === "required") && (<DisplayError msg="Email is required" />)}
                                {(errors.email && errors.email.type === "pattern") && (<DisplayError msg="Invalid email address" />)}
                        </div>
                        <div className={`mb-4 relative`}>
                            <Input 
                                inputRef={register({ 
                                    required: true,
                                    minLength:8
                                })}
                                name="password"
                                type={pwdinputtype} placeholder="Password" />
                                <i 
                                    class="absolute right-3 top-5 text-gray-500 hover:text-gray-800 cursor-pointer"
                                    onClick={()=> setPwdinputtype(pwdinputtype === "password" ? "text" : "password")}
                                >
                                    { (pwdinputtype === "password") ? <FaEyeSlash /> : <FaEye /> }
                                </i>
                                {errors.password && (<DisplayError msg="Password length should be minmum 8."  />) }
                        </div>
                        <div className={`mb-4 relative`}>
                            <Input 
                                inputRef={register({
                                    validate: value =>
                                    value === password.current || "Password does not match"
                                })}
                                name="cpassword"
                                type={cpwdinputtype} placeholder="Confirm Password" />
                                <i 
                                    class="absolute right-3 top-5 text-gray-500 hover:text-gray-800 cursor-pointer"
                                    onClick={()=> setCpwdinputtype(cpwdinputtype === "password" ? "text" : "password")}
                                >
                                    { (cpwdinputtype === "password") ? <FaEyeSlash /> : <FaEye /> }
                                </i>
                                {errors.cpassword && (<DisplayError msg="Password does not match"  />) }
                        </div>
                        <div className={`mb-4`}>
                            <Input name="fname" placeholder="First Name" inputRef={register({required:false})} />
                        </div>
                        <div className={`mb-4`}>
                            <Input name="lname" placeholder="Last Phone" inputRef={register({required:false})}  />
                        </div>
                        <div className={`mb-4`}>
                            <Input name="phone" placeholder="Phone number" type="number"  inputRef={register({required:false})} />
                        </div>
                        <div className={`flex items-center justify-center`}>
                            <Button type="submit" disabled={loading}>{loading? 'Please wait..'  : 'Sign Up'}</Button>
                        </div>
                    </form>
                </div>
            </Fragment>) }
        </Fragment>
    );
}