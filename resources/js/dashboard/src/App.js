import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Service from "./components/Service";
import Buy from "./components/Buy";
import Data from "./components/Data";
import Provider from "./components/Provider";
import Modal from "./components/Modal";
import AdminRoute from "./AdminRoute";
import { connect } from "react-redux";
import { fetchServices } from "./actions/serviceActions";
import { fetchProviders } from "./actions/providerActions";

function App(props) {
    useEffect(() => {
        props.getServices();
        props.getProviders();
        // props.getPlans();
    }, []);
    return (
        <Router basename={ROUTE_BASENAME}>
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <h2>Home</h2>
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
        getProviders: () => dispatch(fetchProviders()),
        closeModal: () =>
            dispatch({
                type: "CLOSE_MODAL",
            }),
        // getPlans: () => dispatch(fetchPlans()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
