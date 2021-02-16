import React, { useState, Fragment, useEffect, Children } from "react";
import { API_ENDPOINT } from "../../config";
import { decodeToken, headers, getToken } from "../../utils/user";
import { FaUserCircle, FaIdCard, FaUndoAlt } from "react-icons/fa";
import CustomerDetail from "./CustomerDetail.jsx";
import {TableWrapper, Table, Tbody, Thead, TR, TH, TD} from "../../core/Table.jsx";
export default ({
    }) => {
    const uid = decodeToken().uuid;
    const [ loading, setLoading ] = useState(true);
    const [ calls, setCalls ] = useState([]);
    const [ customer, setCustomer ] = useState({});

    const options = {
        headers: headers()
    }
    const [ showDialog, setShowDialog] = useState(false);
    const getUserDetail = (uuid) => {
        fetch(`${API_ENDPOINT}/user?uuid=${uuid}&userType=customer`, options)
            .then(response => response.json())
            .then(user => {
                setShowDialog(true);
                setCustomer(user.data);
            }).catch((err)=>{
                alert('Something went wrong')
            });
            
    }
    useEffect(() => {
        GetAllCalls();
    }, []);

    const GetAllCalls = () => {
        fetch(`${API_ENDPOINT}/calls?uuid=${uid}`, options)
            .then(response => response.json())
            .then(results => {
                setLoading(false);
                setCalls(results.data);
              }).catch(()=>{
                alert('Something went wrong')
            });
    }
    return (
        <Fragment> 
            { (calls.length > 0) && !loading && (<div class="w-full">
            <div class="grid">
                <h2 class="text-2xl font-semibold leading-tight">
                    Recent placed calls
                    <button 
                        type="button" 
                        title="Refresh Table"
                        class="btn bg-white text-gray-700 md:ml-2 py-1 my-1 float-right px-4 py-2 text-sm font-normal"
                        onClick={()=>GetAllCalls()}>Refresh</button>
                </h2>
            </div>
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <TableWrapper>
                    <Table>
                        <Thead>
                            <TR>
                                { /* <TH>Customer name</TH> */ }
                                <TH>Reached at</TH>
                                <TH>Called for</TH>
                                <TH>Dialed at</TH>
                                <TH>Finished at</TH>
                                <TH width={70}>Customer</TH>
                            </TR>
                        </Thead>
                        <Tbody>
                        {
                            calls.map(call => <CallRow {...call} getUserDetail={getUserDetail}/>)
                        }
                        </Tbody>
                    </Table>
                    <div
                        class="px-5 hidden py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                        <span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
                        <div class="inline-flex mt-2 xs:mt-0">
                            <button
                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
                            <button
                                class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
                        </div>
                    </div>
                </TableWrapper>
            </div>
            <CustomerDetail showDialog={showDialog} setShowDialog={setShowDialog} {...customer} />
            </div>) }
        </Fragment>
    )
}

const CallRow = ({
    id = 0,
    uuid = "",
    restaurant_name = "",
    restaurant_phone = "",
    item = "",
    plateform = "",
    starttime = "",
    endtime = "",
    getUserDetail = () => {}
}) => {
    return(
        <tr>
        { /*<TD>
            <div class="flex items-center">
                <div class="flex-shrink-0 w-10 h-10 pt-1">
                    <FaUserCircle size={32} />
                </div>
                <div class="ml-1">
                    <p class="text-gray-900 whitespace-no-wrap">
                        Vera Carpenter
                    </p>
                </div>
            </div>
        </TD> */ }
        <TD>
            <p class="text-gray-900 whitespace-no-wrap">{restaurant_phone}</p>
        </TD>
        <TD>
            <p class="text-gray-900 whitespace-no-wrap">
                {item}
            </p>
        </TD>
        <TD>
            <p class="text-gray-900 whitespace-no-wrap">
                {starttime}
            </p>
        </TD>
        <TD>
            <p class="text-gray-900 whitespace-no-wrap">
                {endtime}
            </p>
        </TD>
        <TD>
            <p class="text-gray-900 whitespace-no-wrap">
                <button onClick={()=> {getUserDetail(uuid)}} title={`Get customer detail`}>
                    <FaIdCard size={20} class={"text-gray-400 hover:text-gray-700"}/>
                </button>
            </p>
        </TD>
    </tr>)
}
