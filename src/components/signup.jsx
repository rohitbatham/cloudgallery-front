import React, { useState, useEffect, useRef, Fragment } from "react";
import Creatable from 'react-select/creatable';
import { components } from "react-select";
import { RHFInput } from 'react-hook-form-input';
import { useForm } from 'react-hook-form';
import { DisplayAlert, DisplayError } from "./core/alert.jsx";
import { Input, Button } from "./core/form.jsx";
import { API_ENDPOINT } from "./config";
import FoodTypeList from "./json/foodtype.json";
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default({}) => {
    const { register, handleSubmit, reset, errors, watch } = useForm(); 
    const password = useRef({});
    password.current = watch("password", "");
    const [ step, setStep ] = useState("one");
    const [ signedup, setSignedup ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ showMessage, setShowMessage ] = useState(false);
    const [ pwdinputtype, setPwdinputtype ] = useState('password');
    const [ cpwdinputtype, setCpwdinputtype ] = useState('password');
    const [ resp, setResp ] = useState({});
    const onSubmit = (formData) => { 
        if(step == "one"){
            setStep("two");
        }else if(step == "two"){ 
            formData["usertype"] = "restaurant";  // setting userType is business for restaurant user
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
                        reset();
                    }
            }).catch(()=>{
                alert('Something went wrong. Please try later on.')
            });
        }
    };
    const [ foodtypes, setFoodtypes ] = useState([]);
    useEffect( () =>{
        Promise.resolve(FoodTypeList).then((data) => { console.log(data)
            setFoodtypes(data);
          }, (value) => {
            
          });
    },[])
    // validation
    const Menu = props => {
        const optionSelectedLength = props.getValue().length || 0;
        console.log(optionSelectedLength)
        return (
          <components.Menu {...props}>
            {optionSelectedLength < 3 ? (
              props.children
            ) : (
              <div className={`shadow appearance-none border font-bold rounded text-gray-400 p-3`}>Max limit achieved</div>
            )}
          </components.Menu>
        );
      };
    const isValidNewOption = (inputValue, selectValue) => inputValue.length > 0 && selectValue.length < 3;
   
    return(
        <Fragment>
            { loading && (<DisplayAlert title={'Hold on'} summary={'Please do not refresh or go back.'} type={resp.type} setShowMessage={setShowMessage} />) }
            
            { showMessage && (<DisplayAlert title={resp.title} summary={resp.message} type={resp.type} setShowMessage={setShowMessage} />) }
            { (!signedup) && (<Fragment>
                <h1 className="text-center heading-2 mb-3">
                    {(step === "one") ? "Sign Up" : "Tell us about your Restaurant" }
                </h1>
                <div className="w-full max-w-sm mx-auto">
                    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                        <div className={`mb-4 ${(step === "one") ? '' : 'hidden'}`}>
                            <Input 
                                inputRef={register({
                                    required: "Required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                name="email"
                                type="text" placeholder="Username" />
                                {(errors.email && errors.email.type === "required") && (<DisplayError msg="Username is required" />)}
                                {(errors.email && errors.email.type === "pattern") && (<DisplayError msg="Invalid email address" />)}
                        </div>
                        <div className={`mb-4 relative ${(step === "one") ? '' : 'hidden'}`}>
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
                        <div className={`mb-4 relative ${(step === "one") ? '' : 'hidden'}`}>
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
                        <div className={`mb-4 ${(step === "two") ? '' : 'hidden'}`}>
                            <Input name="restaurant_name" placeholder="Restaurant Name" inputRef={register({required:false})} />
                        </div>
                        <div className={`mb-4 ${(step === "two") ? '' : 'hidden'}`}>
                            <Input name="restaurant_phone" placeholder="Restaurant Phone" inputRef={register({required:false})}  />
                        </div>
                        <div className={`mb-4 ${(step === "two") ? '' : 'hidden'}`}>
                            <Input name="restaurant_address" placeholder="Restaurant Address"  inputRef={register({required:false})} />
                        </div>
                        <div className={`mb-4 ${(step === "two") ? '' : 'hidden'}`}>
                            <Input name="restaurant_hours" placeholder="Hours of Business"  inputRef={register({required:false})} />
                        </div>
                        <div className={`mb-4 ${(step === "two") ? '' : 'hidden'}`}>
                        
                            <RHFInput
                                as={<Creatable
                                    components={{Menu}}
                                    isMulti
                                    isValidNewOption={isValidNewOption}
                                    options={foodtypes}
                                    placeholder="Select food types"
                                    classNamePrefix="Select Foodtypes"
                                    className="appearance-none font-normal rounded w-full mb-1 text-gray-700 leading-tight focus:outline-none"
                                />}
                                register={register({required:false})}
                                setValue={()=>{}}
                                name="foodtype"
                            />
                        </div>
                        <div className={`flex items-center justify-center`}>
                            <Button type="submit">{ step === "two" ? "Sign Up" : "Continue" }</Button>
                        </div>
                    </form>
                </div>
            </Fragment>) }
        </Fragment>
    );
}