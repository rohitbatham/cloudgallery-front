import React, { useState, Fragment } from "react";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import SideNav, {MenuIcon} from 'react-simple-sidenav';
import { isLoggedIn, decodeToken } from "./utils/user"


export default({}) => {
    const [showNav, setShowNav] = useState();
    return(
        <Fragment>
            <MenuIcon fill="currentColor" onClick={() => setShowNav(true)} className={`text-yellow-500`} />{' '}
            <SideNav
                showNav={showNav}
                onHideNav={()=> setShowNav(false)}>
                <div className="h-32 bg-lightgreen p-8">
                    <h2 className="text-gray-800 text-2xl font-bold italic my-3 mb-1">
                        Welcome, {(isLoggedIn()) ? 'User' : 'Guest'}
                    </h2>
                   </div>
                    <nav>
                    {(isLoggedIn()) ? 
                    <ul>
                        <NavLink path="/dashboard" setShowNav={setShowNav}>Dashboard</NavLink>
                        <NavLink path="/upload" setShowNav={setShowNav}>Upload</NavLink>
                        <NavLink path="/gallery" setShowNav={setShowNav}>My Photos</NavLink>
                        <li><hr/></li>
                        <NavLink path={`/profile`} setShowNav={setShowNav}>Profile</NavLink>
                        <NavLink path="/change-password" setShowNav={setShowNav}>Change Password</NavLink>
                        <li><hr/></li>
                        <NavLink path="/sign-out" setShowNav={setShowNav}>Sign Out</NavLink>
                    </ul>
                    
                    : <ul>
                        <NavLink path="/about" setShowNav={setShowNav}>About Us</NavLink>
                        <NavLink path="/contact" setShowNav={setShowNav}>Contact Us</NavLink>
                        <li><hr/></li>
                        <NavLink path="/sign-in" setShowNav={setShowNav}>Sign In</NavLink>
                    </ul> }
                    </nav>
            </SideNav>
        </Fragment>
    );
};

const NavLink = ({
    path = "",
    setShowNav= () => {},
    children = null
}) =>{
    return(
        <li>
            <Link to={path} onClick={() => setShowNav(false) } className="block font-semibold p-6 text-gray-800 hover:bg-gray-100">{children}</Link>
        </li>
    )
}