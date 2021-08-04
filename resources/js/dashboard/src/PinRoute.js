import { Route, Redirect } from "react-router-dom";
function PinRoute(props) {
    return (
        <Route {...props}>
            {AUTH_USER.pin_set ? props.children : <Redirect to={"/set-pin?redirect="+props.path} />}
        </Route>
    );
}

export default PinRoute;
