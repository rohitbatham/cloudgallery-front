import React,{ useRef } from "react";

export const Input = ({
    type = "text",
    inputRef = useRef(null),
    ...props
}) => {
    //const inputRef = inputRef || useRef(null);
    return(<input
        className="appearance-none border border-gray-300 font-normal rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none" 
        type={type}
        ref={inputRef}
        {...props}
        />
        )
}

export const Select = ({
    type = "text",
    children = null,
    inputRef = useRef(null),
    ...props
}) => {
    return(<select
        {...props}
        ref={inputRef}
        className="appearance-none border  border-gray-300 font-normal rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none">
            {children}
    </select>
        )
}

export const Button = ({
    type = "button",
    children = null,
    ...props
}) => {
    return(<button 
            className="btn btn-primary" 
            {...props} type={type}>
            {children}
         </button>
        )
}
export const ToggleButton = ({
    children = null,
    inputRef = useRef(null),
    ...props
}) => {
return(<div class="flex items-center justify-center w-full mb-6">
  
<label 
  for="toogleA"
  class="flex items-center cursor-pointer">
  <div class="relative">
    <input id="toogleA" type="checkbox" {...props}
        ref={inputRef} class="hidden" />
    <div
      class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"
    ></div>
    <div
      class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow left-0"
    ></div>
  </div>
  <div
    class="ml-3 font-medium"
  >
    {children}
  </div>
</label>

</div>)
}