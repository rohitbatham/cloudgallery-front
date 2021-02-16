import React, { useState, Fragment } from "react";
import { AlertDialogOverlay, AlertDialogContent, AlertDialogLabel, AlertDialogDescription } from "@reach/alert-dialog";
import { Link } from "react-router-dom";
export default ({
    idleAlert = false,
    showIdlePopup = false
}) =>{
    const cancelRef = React.useRef();
    if(idleAlert){
      window.location = "/sign-out";
    }
    return(
        <Fragment>
        { showIdlePopup && (<AlertDialogOverlay
          style={{ background: "rgba(0, 0, 0, 0.95)" }}
          leastDestructiveRef={cancelRef}
        ><AlertDialogContent class="bg-gray-800">
          <AlertDialogLabel class="text-center text-2xl text-red-600 font-semibold">Session expired</AlertDialogLabel>
          <AlertDialogDescription class="py-4 text-center text-lg text-gray-300">
             Your session has been expired please sign in again to continue.
          </AlertDialogDescription>
          <div className="alert-buttons mt-6 text-center">
            <Link to="/sign-out" class="btn btn-primary">
              Sign In again
            </Link>
          </div>
        </AlertDialogContent></AlertDialogOverlay>)
        }
        </Fragment>
    )
}