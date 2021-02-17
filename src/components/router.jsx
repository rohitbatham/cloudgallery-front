import React from "react";
import { Home, Contact}  from "./core/content.jsx";
import SignIn       from './signin.jsx';
import SignUp       from './signup.jsx';
import SignOut      from './signout.jsx';
import ResetPassword from "./ResetPassword.jsx";
import VerifyEmail  from './verify-email.jsx';
import Profile      from './profile.jsx';
import ChangePassword from './ChangePassword.jsx';
import UploadPhoto   from './Upload.jsx'
import Gallery from './Gallery.jsx'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { isLoggedIn } from "./utils/user";


  export default({}) => {
      return(
        <div>
          <Switch>
            <Route path="/" exact><Home /></Route>
            <Route path="/contact"><Contact /></Route>
            <Route path="/sign-in"><SignIn /></Route>
            <Route path="/sign-up"><SignUp /></Route>
            <Route path="/sign-out"><SignOut /></Route>
            <Route path="/reset-password"><ResetPassword /></Route>

            <Route exact path="/verify-account/:id?" component={VerifyEmail} />
            <PrivateRoute path="/profile/:type?" exact><Profile /></PrivateRoute>
            <PrivateRoute path="/change-password" exact><ChangePassword /></PrivateRoute>
            
            {/* For Dashboard */}
            <PrivateRoute path="/upload" exact><UploadPhoto /></PrivateRoute>
            {/* For Listing gallery image*/ }
            <PrivateRoute path="/gallery" exact><Gallery /></PrivateRoute>
          </Switch>
        </div>);
  }

const PrivateRoute = ({ children, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={({ location }) => 
        isLoggedIn() ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }