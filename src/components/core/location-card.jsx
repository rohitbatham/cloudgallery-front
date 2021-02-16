import React, { Fragment } from "react";

export default function ({
    id = 0,
    name = "",
    phone = "",
    foodtype = [],
    address = "",
    city = "",
    state = "",
    zip = "",
    delivery = false,
    hours = "",
    removeLocation = () => {}
}
) {
    return (
    <div class="max-w-sm w-full lg:max-w-full lg:flex mt-8 text-gray-600">
        <div class="border bg-white hover:bg-gray-100 border-gray-200 rounded-md p-4 w-full leading-loose">
            <div class="mb-8">
                <p class="text-sm flex items-center">
                    <button type="button" class="rounded-full px-2 mr-2 bg-teal-600 hover:bg-teal-500 text-white py-1 rounded  leading-none flex items-center">
                        Active
                    </button>
                </p>
                <div class="font-bold text-xl mb-2 mt-2">{name}</div>
                <p class="text-base">
                    {address}, {city}, {state}, {zip}
                </p>
                <p class="text-base">
                    <strong>Phone : </strong>{phone}
                </p>
                <p class="text-base">
                    <strong>Hours : </strong>{hours}
                </p>
                <p class="text-base">
                    <strong>Delivery Service : </strong>{(delivery) ? "Yes" : "No"}
                </p>
                <p class="text-base">
                    <strong>Food Types : </strong> <FoodTypes foodtype={JSON.parse(foodtype)} />
                </p>
            </div>
            <div class="my-3">
            <button class="bg-red-400 text-gray-200 rounded border-red-500 hover:border-b-4 hover:bg-red-500 hover:text-white shadow-md py-1 px-6" onClick={()=>removeLocation(id)}>Remove Location</button>
            </div>
        </div>
    </div>)
}

const FoodTypes = (foodList) => {
    const foodtypes = foodList.foodtype || [];
    return(
        <Fragment>
            {
               foodtypes.map(({ value = "", label = "" }, index) => {
                   return(
                       <span key={value}>
                            <span >{label}</span>
                            {(index < (foodtypes.length-1)) && (<span>, </span>)}
                       </span>
                   )
               })
            }
        </Fragment>
    )
}
