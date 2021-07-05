import React from "react";
import styled from "styled-components";

function ProviderPlans(props) {
    return (
        <div className="my-3">
            <div className="my-2">
                <button className="btn btn-primary">
                    {props.provider.title}
                </button>
                <span className="text-primary ml-3" onClick={props.changeProvider}>Change</span>
            </div>
            <h5>Select Plan</h5>
            <Container className="my-2">
                {props.provider.plans.map((plan) => (
                    <RadioFormGroup key={plan.id}>
                        <input
                            className="plan-radio"
                            name="plan_id"
                            id={"plan" + plan.id}
                            type="radio"
                            value={plan.id}
                            onChange={() => props.planSelected(plan)}
                        />
                        <label htmlFor={"plan" + plan.id}>
                            <p>{plan.title}</p>
                            <span>#{plan.price}</span>
                        </label>
                    </RadioFormGroup>
                ))}
            </Container>
        </div>
    );
}

const Container = styled.div`
    display: flex;

    @media (max-width: 768px) {
        display: grid;
        grid-template-columns: auto auto;
        grid-gap: 20px;
    }
`;

const RadioFormGroup = styled.div`
    .plan-radio {
        display: none;
        &:checked {
            & ~ label {
                color: white;
                /* background: #854fff; */
                border: 2px solid #854fff;
            }
        }
    }
    label {
        height: 100px;
        width: 120px;
        font-weight: bold;
        p {
            color: #333;
            font-size: 14px;
        }
        span {
            color: #854fff;
        }
        @media (max-width: 768px) {
            margin: auto;
        }
        color: #8091a7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: white;
        border-radius: 5px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        i {
            font-size: 40px;
        }
        margin-right: 30px;
        /* transition: 0.3s; */
    }
`;
export default ProviderPlans;
