import React from 'react'
import { Switch, useRouteMatch, Route } from 'react-router-dom'
import CreditUser from './CreditUser';

function Activities() {
    let { path, url } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={path}>
                <h2>Activities</h2>
            </Route>
            <Route path={`${path}/profiles`}>
                {/* <UserProfiles /> */}
                Profiles
            </Route>
            <Route path={`${path}/credit-user`}>
                <CreditUser />
            </Route>
        </Switch>
    )
}

export default Activities
