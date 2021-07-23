import React, { useEffect, useState } from "react";
import { Switch, useRouteMatch, Route } from 'react-router-dom'
import AddAdmin from "./AddAdmin";
import AdminReport from "./AdminReport";

function AdminDashboard() {
    let { path, url } = useRouteMatch();
   
    return (
        <Switch>
            <Route exact path={path}>
                <h2>Activities</h2>
            </Route>
            <Route path={`${path}/add`}>
                {/* <UserProfiles /> */}
                <AddAdmin/>
            </Route>
            <Route path={`${path}/report`}>
                <AdminReport/>
            </Route>
        </Switch>
    );
}

export default AdminDashboard;
