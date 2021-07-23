import { Route, Redirect } from "react-router-dom";
function AdminRoute(props) {
    return (
        <Route {...props}>
            {AUTH_USER.is_admin ? props.children : <Redirect to="/dashboard" />}
        </Route>
    );
}

export default AdminRoute;
