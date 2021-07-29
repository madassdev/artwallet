import React, { useState } from 'react'
import Spinner from './Spinner'

function AdminSettings() {
    const [isLoading, setIsLoading] = useState(true)
    return (
        <div>
            <div className="bg-white p-3 md:p-5">
            <h2 className="text-purple-500 text-center font-bold text-lg capitalize">
                Admin Settings
            </h2>
            {isLoading ? (
                <Spinner text="Loading..." />)
                :(
                    <div className="">
                        Settings
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default AdminSettings
