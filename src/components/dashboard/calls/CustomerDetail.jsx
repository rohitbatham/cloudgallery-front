import React from "react";
import { Dialog } from "@reach/dialog";

export default ({
 fname = "",
 lname = "",
 phone = "",
 email = "",
 showDialog= false,
 setShowDialog = () => {}
}) => {
    return(
        <Dialog id="qrdialog" isOpen={showDialog} onDismiss={close} style={{backgroundColor:'#fff', borderRadius:4, textAlign: "left", boxShadow: "none"}}>
            <h2 className={`text-2xl text-black`}>Customer Detail</h2>
            <table cellPadding={4} className={`text-gray-600 my-6`}>
                <tr>
                    <td className={`py-3`}>First name</td>
                    <td width="50">:</td>
                    <td>{fname}</td>
                </tr>
                <tr>
                    <td className={`py-3`}>Last name</td>
                    <td width="50">:</td>
                    <td>{lname}</td>
                </tr>
                <tr>
                    <td className={`py-3`}>Phone number</td>
                    <td width="50">:</td>
                    <td>{phone}</td>
                </tr>
                <tr>
                    <td className={`py-3`}>Email</td>
                    <td width="50">:</td>
                    <td>{email}</td>
                </tr>
            </table>
            
            <button className={`btn btn-primary`} onClick={()=>setShowDialog(false)}>Close</button>
        </Dialog>
    )
}