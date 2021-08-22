import React, { useState, useRef } from "react";

function Modal({modal, closeModal}) {
    return (
        <>
            {modal.show && (
                <div className="modal__container">
                    <div className="w-full max-w-4xl bg-white rounded overflow-initial max-h-9/10 relative
                    flex flex-col my-24 mx-auto">
                        <div className="p-3 px-5 border-b border-gray-200 text-lg text-gray-600
                        flex items-center justify-between">
                            <div>{modal.header}</div>
                            {modal.noClose || (
                                <span onClick={() => closeModal()} className="cursor-pointer">
                                    <i className="mdi mdi-close"></i>
                                </span>
                            )}
                        </div>
                        <div className="p-5 inline-flex flex-col flex-wrap gap-8">{modal.content}</div>
                    </div>
                </div>
            )}
        </>
    );
}



export default Modal;
