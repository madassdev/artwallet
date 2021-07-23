import React, { useState } from "react";

function SpinButton(props) {
    const [isLoading, setIsLoading] = useState(props.isLoading ?? false);
    return (
        <>
            {isLoading ? (
                <button
                    className="btn btn-light btn-sm"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsLoading(false);
                        props.buttonClicked
                    }}
                >
                    <div
                        className="spinner-border-sm spinner-border text-primary"
                        role="status"
                    ></div>
                </button>
            ) : (
                <button
                    onClick={()=>{
                        setIsLoading(true)
                        props.buttonClicked()}
                    }
                    className="btn btn-primary btn-sm"
                >
                    {props.text}
                </button>
            )}
        </>
    );
}

export default SpinButton;
