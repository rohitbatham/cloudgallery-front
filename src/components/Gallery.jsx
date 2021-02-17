import React, { useState, Fragment, useEffect } from "react";
import { API_ENDPOINT } from "./config";
import { Link } from "react-router-dom";
import { decodeToken, headers } from "./utils/user";

export default ({ resp = {}}) => {
    const uid = decodeToken().uuid;
    const [loading, setLoading] = useState(true);
    const [ gallery, setGallery ] = useState([]);
    const getGallery = () =>{
        fetch(`${API_ENDPOINT}/gallery?uuid=${uid}`, {
            headers: headers()
        })
        .then(response => response.json())
        .then(results => {
            setLoading(false);
            setGallery(results.data);
            }).catch(()=>{
                alert('Something went wrong! Please try again.');
        });
    }
    useEffect(() => {
        getGallery();
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
        fetch(`${API_ENDPOINT}/gallery/delete?uuid=${uid}`, options)
        .then(res => res.json()) 
        .then(res => {
            alert(res.message);
            getGallery()
        }).catch(()=>{
            alert('Something went wrong! Please try again.');
        });
    }
    return (
        <Fragment> 
            <div class="w-full">
            <h1 class="text-center md:text-left heading-2 mb-3">My Photos</h1>
                { (gallery.length > 0) && (<p class="pb-8 text-lg">Your recently updated photos.</p>) }
                { (gallery.length > 0) && (<Fragment><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-gap-8">
                {
                    gallery.map(image => <ImageCard {...image} key={image.id} removeMenuImage={removeMenuImage}/>)
                }
                </div>
                <div class="my-6 text-left">
                <Link to="/upload" 
                        class="w-full block md:inline-block md:w-auto btn bg-trasparent border border-gray-800 hover:bg-green-600 text-gray-200"
                    >Add photos</Link>
                </div></Fragment>
                )}
                {(gallery.length < 1) && !loading && (
                <div class="py-6 border-4 border-gray-500 text-center">
                <p class="text-2xl">You have not added any photo.</p>
                  <Link to="/upload" 
                            class="w-full block md:inline-block md:w-auto btn bg-green-500 hover:bg-green-600 text-gray-200"
                        >Add photos</Link>
               </div>)}
               
            </div>
        </Fragment>
    )
}

const ImageCard = ({
    image = "",
    id = "",
    removeMenuImage = ()=>{}
}) =>{
    return(
        
        <div class="relative mb-8">
            <div 
                style={{ backgroundImage: `url(\"http://dyqm5nexnuoxl.cloudfront.net/${image}\")`}}
                class="h-48 bg-cover border-8 border-white"
            >
            </div>     
            <a className={`px-3 py-1 block bg-white hover:bg-teal-500 w-full text-center border-b text-gray-600 hover:text-white`} href={`http://dyqm5nexnuoxl.cloudfront.net/${image}`}>View</a>
            
            <button 
                class="px-3 py-1 bg-white hover:bg-red-500 w-full text-gray-600  border-b hover:text-white"
                onClick={()=>removeMenuImage(id, image)}>Remove Image</button>
           
        </div>
        
    )
}