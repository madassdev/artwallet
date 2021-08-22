import React from 'react'

function CardWrapper({children}) {
    return (
        <div className="w-full md:w-3/4 mx-auto p-3 md:p-5 bg-white rounded">
            {children}
        </div>
    )
}

export default CardWrapper
