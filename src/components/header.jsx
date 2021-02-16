import React from "react"
import {Link} from "react-router-dom"
import { UserIcon, LogoutIcon}  from "./core/icons.jsx";
import { isLoggedIn } from "./utils/user"
export const Header = ({

}) => {
    return(
    <div className="col-span-1 signup text-sm">
        
        {
            (isLoggedIn()) ? 
            <Link to="/sign-out" className=" font-semibold hover:text-lightgreen"><span class="hidden lg:inline-block">Sign Out</span> <LogoutIcon cssClass={`w-4 h-4 top-2`} color="#d2d710" title="Sign Out"/></Link>
            : <Link to="/sign-in" className=" font-semibold hover:text-lightgreen"><span class="hidden lg:inline-block">Sign In</span> <UserIcon color="#d2d710" title="Sign In"/></Link>
            
        }
        
    </div>)
}