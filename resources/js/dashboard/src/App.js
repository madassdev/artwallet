import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Layout from "./components/Layout";
import { nav_items } from "./data/NavItems";
import Page from "./components/Page";

function App(props) {
   
    return (
        <Router basename={ROUTE_BASENAME}>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <h2>Home</h2>
                    </Route>
                    {
                        nav_items.map(item => (

                    <Route path={item.link} key={item.id}>
                        <Page title={item.title}></Page>
                    </Route>
                        ))
                    }
                    <Route path="/data">
                        <h2>Data</h2>
                    </Route>
                    <Route path="/history">
                        <h2>History</h2>
                    </Route>
                    <Route path="/referrals">
                        <h2>Referrals</h2>
                    </Route>
                    <Route path="/withdrawal">
                        <h2>Withdrawals</h2>
                    </Route>
                    <Route path="/settings">
                       <h2>Settings</h2>
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}
export default App;
