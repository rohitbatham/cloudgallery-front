import React, { useState, Fragment, useRef } from "react";
import { DisplayAlert, DisplayError } from "./core/alert.jsx"
import { API_ENDPOINT } from "./config";
import { useForm } from 'react-hook-form';
import { Input, Select, Button } from "./core/form.jsx";
import { decodeToken, headers, getToken } from "./utils/user";


export default ({ }) => {
    const uid = decodeToken().uuid;
    const options = {
        headers: headers()
    };
    const [ resp, setResp ] = useState({});
    const [ showMessage, setShowMessage ] = useState(false);
    const { register, handleSubmit, errors, watch, reset } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    
    const onSubmit = (formData) => {
        setShowMessage(false);
        if(formData.oldpassword === formData.password){
            setResp({
                status:false,
                type:"error",
                title:"Oops!",
                message:'New password and old password can not be same.'
            })
            setShowMessage(true)
            return;
        }
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'authorization' : getToken() },
            body: JSON.stringify(formData)
        };
        fetch(`${API_ENDPOINT}/profile/update-password?uuid=${uid}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setResp(data)
                setShowMessage(true);
                if(data.status){
                    reset();
                    window.location = '/sign-out'
                }
            }).catch(()=>{
                alert('Something went wrong')
            });
    };
    return (
        <Fragment> 
                <h1 class="text-center heading-2 mb-3">Change Password</h1>
                { showMessage && (<DisplayAlert title={resp.title} summary={resp.message} type={resp.type} setShowMessage={setShowMessage} />) }
        
            <div class="w-full lg:max-w-md mx-auto">
                <form class="form-container text-left" onSubmit={handleSubmit(onSubmit)}>
                    <div className={`mb-4`}>
                        <Input name="oldpassword"
                            type="password"
                            placeholder="Old Password"
                            inputRef={register({ required: true })} />          
                        {errors.oldpassword && (<DisplayError msg="Old Password is required"  />) }
                   
                    </div>
                    <div className={`mb-4`}>
                        <Input 
                            inputRef={register({ 
                                required: true,
                                minLength:8
                            })}
                            name="password"
                            placeholder="New Password"
                            type="password"/>
                            {errors.password && (<DisplayError msg="Password length should be minmum 8."  />) }
                    </div>
                    <div className={`mb-4`}>
                        <Input 
                            inputRef={register({
                                validate: value =>
                                value === password.current || "Password does not match"
                            })}
                            name="cpassword"
                            placeholder="Confirm Password"
                            type="password" />
                            {errors.cpassword && (<DisplayError msg="Password does not match"  />) }
                    </div>
                    <div className={`flex items-center justify-center`}>
                        <Button type="submit">Update</Button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}