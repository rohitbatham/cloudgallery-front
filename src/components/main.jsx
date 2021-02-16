import React, {useEffect} from "react";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { LogoIcon } from "./core/logos.jsx";
import MegaNav from "./meganav.jsx";
import { Footer}  from "./core/content.jsx";
import RouterConfig from "./router.jsx";
import { Header } from "./header.jsx"
export default({}) => {
    return(
        <Router>
            <div className="fluid-container">
                <div id="main-container" className={`p-4 min-h-screen text-gray-200`}>
                    <div className="grid col-gap-4 grid-cols-12">
                        <div className="col-span-1 meganav">
                            <MegaNav />
                        </div>
                        <div className="col-span-10">
                            <Link to="/" className="flex justify-center mb-4">
                                <LogoIcon className={`${(window.location.pathname == "/") ? "w-40 h-40 lg:w-26 lg:h-26" : "w-24 h-24"} mx-0 transition duration-500 ease-in-out`}/>
                            </Link> 
                        </div> 
                        <Header />
                        
                    </div>
                    <div className="container mx-auto">
                        <RouterConfig />
                    </div>
                    <Footer />
                </div>
            </div>
        </Router>
    )
};

