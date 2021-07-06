import axios from "axios";
import React, { useState } from "react";
import {PaystackButton} from 'react-paystack'
function Deposit(props) {
    console.log(Date.now())
    const publicKey = "pk_test_ebd6435d808e02ac14eb40d514d9d13bba875309";
    const amount = 100000;
    const reference = "AR-"+Date.now()
    const [email, setEmail] = useState("favescsskr@gmail.com");
    const [name, setName] = useState("Favour King");
    const [phone, setPhone] = useState("08136051712");
    const componentProps = {
        email,
        amount,
        reference,
        metadata: {
            name,
            phone,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: (data) =>
            {
                console.log(data)
                axios.post('/payments', {reference: reference}).then(response => console.log(response.data)).catch(err=>console.log(err))
            },
        onClose: () => alert("Wait! You need this oil, don't go!!!!"),
    };
    return (
        <div className="col-md-8 mx-auto">
            <div className="card">
                <div className="card-header text-center">Deposit now</div>
                <div className="card-body">
                    <div className="col-sm-6 mt-2">
                        <div className="form-group">
                            <label className="form-label" htmlFor="default-01">
                                Title
                            </label>

                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className={"form-control "}
                                    id="default-01"
                                    // value={""}
                                    // onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter title eg MTN Data"
                                />
                            </div>
                        </div>
                    </div>
                    <PaystackButton {...componentProps} />
                </div>
            </div>
        </div>
    );
}

export default Deposit;
