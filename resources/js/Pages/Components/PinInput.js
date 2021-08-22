import React from "react";

function PinInput(props) {
    return (
        <div className="form-control-wrap">
            <a
                href="#"
                onClick={(e)=>e.preventDefault()}
                className="form-icon form-icon-right passcode-switch lg"
                data-target={props.eid}
            >
                <em className="passcode-icon icon-show icon ni ni-eye"></em>
                <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
            </a>
            <input
                type="password"
                name="pin"
                className="w-full rounded border-gray-300"
                value={props.pin}
                onChange={(e) => props.setPinValue(e.target.value)}
                id={props.eid}
                maxLength={props.type === 'password' ? 30 : 4}
                minLength={props.type === 'password' ? 4 : null}
                required
                placeholder={props.placeholder ?? "Enter 4 digit PIN"}
                autoComplete="new_password"
            />
        </div>
    );
}

export default PinInput;
