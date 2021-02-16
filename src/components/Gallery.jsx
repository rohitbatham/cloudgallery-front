import React, { useState, Fragment, useEffect } from "react";
import { API_ENDPOINT } from "./config";
import { Link } from "react-router-dom";
import { decodeToken, headers } from "./utils/user";

export default ({ resp = {}}) => {
    const uid = decodeToken().uuid;
    const [loading, setLoading] = useState(true);
    const [ menuimages, setMenuimages ] = useState([]);
    const getMenuImageList = () =>{
        fetch(`${API_ENDPOINT}/restaurantmenus?uuid=${uid}`, {
            headers: headers()
        })
        .then(response => response.json())
        .then(results => {
            setLoading(false);
            setMenuimages(results.data);
            }).catch(()=>{
                alert('Something went wrong! Please try again.');
        });
    }
    useEffect(() => {
        getMenuImageList();
    }, [uid])
    const removeMenuImage = (id, image) =>{
        var confrimRemoval = confirm("Are you sure?");
        if (!confrimRemoval){
            return;
        }
        const bodyParams = JSON.stringify({id:id,path:image});
        const options = {
            headers: headers('application/json'),
            method: 'DELETE',
            body: bodyParams
        };
        fetch(`${API_ENDPOINT}/restaurantmenus/delete?uuid=${uid}`, options)
        .then(res => res.json()) 
        .then(res => {
            alert(res.message);
            getMenuImageList()
        }).catch(()=>{
            alert('Something went wrong! Please try again.');
        });
    }
    const makeImagePrimary = (id, primary_img) =>{
        if(primary_img){
            alert('This menu is already set as primary.');
            return;
        }
        const bodyParams = JSON.stringify({id:id});
        const options = {
            headers: headers('application/json'),
            method: 'PATCH',
            body: bodyParams
        };
        fetch(`${API_ENDPOINT}/restaurantmenus/makeprimary?uuid=${uid}`, options)
        .then(res => res.json()) 
        .then(res => {
            alert(res.message);
            getMenuImageList();
        }).catch(()=>{
            alert('Something went wrong! Please try again.');
        });
    }
    return (
        <Fragment> 
            <div class="w-full">
            <h1 class="text-center md:text-left heading-2 mb-3">Restaurant Menus</h1>
                { (menuimages.length > 0) && (<p class="pb-8 text-sm">Set at least one menu as primary image that will be apprear in search results when customer searching the restaurant.</p>) }
                { (menuimages.length > 0) && (<Fragment><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-8">
                {
                    menuimages.map(image => <ImageCard {...image} key={image.id} makeImagePrimary={makeImagePrimary} removeMenuImage={removeMenuImage}/>)
                }
                </div>
                <div class="my-10 text-left">
                <Link to="/upload-menu" 
                        class="w-full my-6 block md:inline-block md:w-auto btn bg-trasparent border border-gray-800 hover:bg-green-600 text-gray-200"
                    >Add more images</Link>
                </div></Fragment>
                )}
                {(menuimages.length < 1) && !loading && (
                <div class="py-6 border-4 border-gray-500 text-center">
                <p class="text-2xl">You have not added any menu image.</p>
                  <Link to="/upload-menu" 
                            class="w-full my-6 block md:inline-block md:w-auto btn bg-green-500 hover:bg-green-600 text-gray-200"
                        >Add Menu Images</Link>
               </div>)}
               
            </div>
        </Fragment>
    )
}

const ImageCard = ({
    image = "",
    id = "",
    primary_img = 0,
    makeImagePrimary = () => {},
    removeMenuImage = ()=>{}
}) =>{
    return(
        
        <div class="relative mb-8">
            <div 
                style={{ backgroundImage: `url(\"https://mymenus3bucket.s3.us-east-2.amazonaws.com/${image}\")`}}
                class="h-48 bg-cover border-8 border-white"
            >
            </div>     
            <a className={`px-3 py-1 block bg-white hover:bg-teal-500 w-full text-center border-b text-gray-600 hover:text-white`} href={`https://mymenus3bucket.s3.us-east-2.amazonaws.com/${image}`}>View</a>
            
            <button 
                class="px-3 py-1 bg-white hover:bg-red-500 w-full text-gray-600  border-b hover:text-white"
                onClick={()=>removeMenuImage(id, image)}>Remove Image</button>
           <button 
                className={`px-3 py-1 ${primary_img ? 'bg-green-500 hover:bg-green-500 text-white' : 'bg-white hover:bg-blue-500 text-gray-600 hover:text-white' }  w-full`}
                onClick={()=>makeImagePrimary(id, primary_img)}>
                    {(primary_img) ? 'Primary Menu' : 'Set as Primary Menu'}
            </button>
        </div>
        
    )
}