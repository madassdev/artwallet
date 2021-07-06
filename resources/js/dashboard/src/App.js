import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Service from "./components/Service";
import Buy from "./components/Buy";
import Provider from "./components/Provider";
import Deposit from "./components/Deposit";
import SuccessPage from "./components/SuccessPage";
import Modal from "./components/Modal";
import AdminRoute from "./AdminRoute";
import { connect } from "react-redux";
import { fetchServices } from "./actions/serviceActions";
import { fetchProviders } from "./actions/providerActions";

function App(props) {
    useEffect(() => {
        props.getServices();
        props.setUser();
        // props.getPlans();
    }, []);
    return (
        <Router basename={ROUTE_BASENAME}>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <AdminRoute path="/services">
                        <Service />
                    </AdminRoute>
                    <AdminRoute path="/providers">
                        <Provider />
                    </AdminRoute>

                    <Route path="/buy">
                        <Buy />
                    </Route>
                    <Route path="/deposit">
                        <Deposit />
                    </Route>
                    <Route path="/history">
                        <h2>History</h2>
                    </Route>
                    <Route path="/successPage">
                        <SuccessPage/>
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
            <Modal
                show={props.modal.show}
                header={props.modal.header}
                closeModal={() => {
                    props.closeModal();
                }}
            >
                {props.modal.content}
            </Modal>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        modal: state.appState.modal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getServices: () => dispatch(fetchServices()),
        closeModal: () =>
            dispatch({
                type: "CLOSE_MODAL",
            }),
        setUser: () => dispatch({
            type: "SET_USER",
            user: AUTH_USER
        })
        // getPlans: () => dispatch(fetchPlans()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
