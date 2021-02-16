import React, { useState, useContext, Fragment } from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { DisplayAlert, DisplayError } from "./core/alert.jsx";
import { Input } from "./core/form.jsx";
import { API_ENDPOINT } from "./config";

export default({}) => {
    const { register, handleSubmit, errors } = useForm(); 
    const [ showMessage, setShowMessage ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ showotp, setShowotp ] = useState(false);
    const [ showlogin, setShowlogin ] = useState(false);
    const [ resp, setResp ] = useState({});
    const [ timer, setTimer ] = useState(30);
    const onSubmit = (data) => {
        setLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        if(showotp){
            ValidateOTP(requestOptions);
        }else{
            SendOTP(requestOptions);
        }
    };
    const ValidateOTP = (requestOptions) => {
        fetch(`${API_ENDPOINT}/reset-password?userType=restaurant&otpType=reset`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if(data.status){
                    setShowlogin(true);
                }
                setResp(data);
                setShowMessage(true);
            }).catch(()=>{
                setLoading(false)
                alert('Something went wrong.')
            });
    }
    const SendOTP = (requestOptions) => {
        fetch(`${API_ENDPOINT}/sendotp?userType=restaurant&otpType=reset`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                if(data.status){
                    setShowotp(true);
                }
                setResp(data);
                setShowMessage(true);
            }).catch(()=>{
                setLoading(false)
                alert('Something went wrong.')
            });
    }
    return(
        <Fragment>
            { showMessage && (<DisplayAlert title={resp.title} summary={resp.message} type={resp.type} setShowMessage={setShowMessage} />) }
        <div className="w-full max-w-sm mx-auto md:mt-10">
            <h1 className="text-center heading-2 mb-3">Reset Password</h1>
            <form className="form-container text-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                    <Input 
                        inputRef={register({
                            required: "Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                          })}
                        readonly={showotp}
                        name="email"
                        placeholder="Email" />
                        {(errors.email && errors.email.type === "required") && (<DisplayError msg="Email is required" />)}
                        {(errors.email && errors.email.type === "pattern") && (<DisplayError msg="Invalid email address" />)}
                 </div>
                { showotp && !showlogin && (<div className="mb-4 relative">
                    <input 
                        ref={register({ required: true })}
                        name="otp"
                        className={`otp-input`}
                        maxLength={4}
                        type={'text'} placeholder="OTP" />
                        {errors.otp && (<DisplayError msg="OTP is required"  />) }
                </div>) 
                }
                <div className="flex items-center justify-center">
                    { !showlogin && 
                        <button className="btn btn-primary" type="submit" disabled={loading}>
                        { loading ? "Please wait..." : ( showotp ?  'Submit' : 'Send OTP') }
                        </button>
                    }
                    {
                        showlogin && <Link className="btn btn-primary mt-4" to="/sign-in">Sign in to your account</Link>
                    }
                </div>
            </form>
        </div>
        </Fragment>
    );
}