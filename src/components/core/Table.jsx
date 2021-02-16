import React from "react";

export const TableWrapper = ({
    children = null,
    class : className,
    props
}) =>{
    return(
        <div className={`inline-block min-w-full shadow rounded overflow-hidden ${className}`} {...props}>
           {children}
        </div>
               
    )
}
export const Table = ({
    children = null,
    class : className,
    props
}) =>{
    return(
        <table className={`min-w-full leading-normal text-gray-700 ${className}`} {...props}>
           {children}
        </table>
               
    )
}
export const Thead = ({
    children = null,
    props
}) =>{
    return(<thead {...props}>{children}</thead>)
}

export const Tbody = ({
    children = null,
    props
}) =>{
    return(<tbody {...props}>{children}</tbody>)
}

export const TR = ({
    children = null,
    props
}) =>{
    return(<tr {...props}>{children}</tr>)
}
export const TD = ({
    children = null,
    class : className,
    props
}) => {
    return(
        <td className={`px-4 py-2 border-b border-gray-200 bg-white text-sm ${className}`} {...props}>{children}</td>
    )
}
export const TH = ({
    children = null,
    class : className,
    props
}) => {
    return(<th
        className={`px-4 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${className}`}
                {...props}
            >
            {children}
            </th>)
}