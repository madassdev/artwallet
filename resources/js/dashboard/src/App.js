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
import { setServices, setProviders, setPlans } from "./actions/serviceActions";
import Settings from "./components/Settings";

function App(props) {
    useEffect(() => {
        props.init();
    }, []);
    return (
        <Router basename={ROUTE_BASENAME}>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <Home />
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
                        <SuccessPage />
                    </Route>
                    <Route path="/transactions">
                        <h2>Transactions</h2>
                    </Route>
                    <Route path="/withdrawal">
                        <h2>Withdrawals</h2>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
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
        transactions: state.transactionState.transactions,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // getServices: () => dispatch(fetchServices()),
        init: () => {
            dispatch({
                type: "SET_USER",
                user: AUTH_USER,
            }),
            dispatch(setServices(APP_SERVICES.services));
            dispatch(setProviders(APP_SERVICES.providers));
            dispatch(setPlans(APP_SERVICES.plans));
            dispatch({
                type: "SET_TRANSACTIONS",
                transactions: APP_TRANSACTIONS
            })
        },
        closeModal: () =>
            dispatch({
                type: "CLOSE_MODAL",
            }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
