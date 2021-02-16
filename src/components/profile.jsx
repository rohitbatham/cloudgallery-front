import React, { useState, Fragment, useEffect } from "react";
import { DisplayAlert, DisplayError } from "./core/alert.jsx";
import  IdleAlert   from "./core/idlePopup.jsx"
import { API_ENDPOINT } from "./config";
import { useForm } from 'react-hook-form';
import { Input, Select, Button } from "./core/form.jsx";
import { decodeToken, headers, getToken } from "./utils/user";


export default ({ }) => {
    const query = new URLSearchParams(window.location.search);
    const uid = decodeToken().uuid;
    const typeParam = query.get('type');
    const options = {
        headers: headers()
    };
    const [user, setUser] = useState(false);
    const [idleAlert, setIdleAlert] = useState(false);
    const [ resp, setResp ] = useState({});
    const [ type, setType ] = useState(typeParam);
    const [ showMessage, setShowMessage ] = useState(false);
    const { register, handleSubmit, errors, setValue } = useForm();
    useEffect(() => {
        fetch(`${API_ENDPOINT}/user?uuid=${uid}`, options)
            .then(response => response.json())
            .then(user => {
                user.data["restaurant_email"] = decodeToken().username
                setUser(user.data);
                //setValue([{ restaurant_name: user.data.restaurant_name }, { restaurant_phone: user.data.restaurant_phone }]);
            }).catch((err)=>{
                setIdleAlert(true)
            });
    }, [uid])


    const onSubmit = (formData) => {
        formData["usertype"] = "restaurant";  // setting userType is owner for restaurant user
        console.log(formData)
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'authorization' : getToken() },
            body: JSON.stringify(formData)
        };
        fetch(`${API_ENDPOINT}/profile/update?uuid=${uid}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setResp(data)
                setShowMessage(true);
            });
    };
    return (
        <Fragment> 
            <IdleAlert idleAlert={idleAlert}/>
                <h1 class="text-center heading-2 mb-3">My Account</h1>
            { showMessage && (<DisplayAlert title={resp.title} summary={resp.message} type={resp.type} setShowMessage={setShowMessage} />) }
        
            <div class="w-full lg:max-w-md mx-auto">
                <form class="form-container" onSubmit={handleSubmit(onSubmit)}>

                    <div className={`mb-4`}>
                        <Input name="restaurant_name"
                            placeholder="Restaurant Name"
                            defaultValue={user.restaurant_name}
                            inputRef={register({ required: false })}
                            readonly={(type == "edit") ? false : "readonly"} /> 
                    </div>
                    { (type !== "edit") &&  <div className={`mb-4`}> 
                        <Input name="restaurant_email"
                            placeholder="Restaurant Email"
                            defaultValue={user.restaurant_email}
                            inputRef={register({ required: false })}
                            readonly={"readonly"} /> 
                    </div>
                        }
                    <div className={`mb-4`}>
                        <Input name="restaurant_phone"
                            placeholder="Restaurant Phone"
                            defaultValue={user.restaurant_phone}
                            inputRef={register({ required: false })} 
                            readonly={(type == "edit") ? false : "readonly"}/>
                    </div>
                    <div className={`mb-4`}>
                        <Input name="restaurant_address" 
                            placeholder="Restaurant Address" 
                            defaultValue={user.restaurant_address} 
                            inputRef={register({ required: false })} 
                            readonly={(type == "edit") ? false : "readonly"}/>
                    </div>
                    <div className={`flex items-center justify-center`}>
                        { (type !== "edit") ?
                            <button onClick={()=> setType('edit')} class="btn btn-primary">Edit</button>
                            : <Button type="submit">Update</Button>
                        }
                    </div>
                </form>
            </div>
        </Fragment>
    )
}