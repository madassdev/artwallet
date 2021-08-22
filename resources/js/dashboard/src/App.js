import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Payment from "./components/Payment";
import Service from "./components/Service";
import Buy from "./components/Buy";
import Provider from "./components/Provider";
import Deposit from "./components/Deposit";
import ProductDashboard from "./components/ProductDashboard";
import SuccessPage from "./components/SuccessPage";
import Modal from "./components/Modal";
import AdminRoute from "./AdminRoute";
import PinRoute from "./PinRoute";
import { connect } from "react-redux";
import { setServices, setProviders, setPlans } from "./actions/serviceActions";
import Settings from "./components/Settings";
import { Toaster } from "react-hot-toast";
import Activities from "./components/Activities";
import AdminDashboard from "./components/AdminDashboard";
import SalesDashboard from "./components/SalesDashboard";
import Transactions from "./components/Transactions";
import AdminSettings from "./components/AdminSettings";
import VerifyEmail from "./components/VerifyEmail";
import VerificationSuccess from "./components/VerificationSuccess";
import SetPin from "./components/SetPin";
import PasswordResetSuccess from "./components/PasswordResetSuccess";
import Customers from "./components/Customers";

const NotFound = () => {
    return (
        <div className="nk-block nk-block-middle wide-md mx-auto flex ">
            <div className="nk-block-content nk-error-ld text-center w-full mx-auto">
                <img
                    className="nk-error-gfx mx-auto"
                    src={`${ASSET_PATH}images/404.svg`}
                    alt=""
                />
                <div className="wide-xs mx-auto">
                    <h3 className="nk-error-title">Oops! Why you’re here?</h3>
                    <p className="nk-error-text">
                        We are very sorry for inconvenience. It looks like
                        you’re try to access a page that either has been deleted
                        or never existed.
                    </p>
                    <a href="dashboard" className="btn btn-lg btn-primary mt-2">
                        Back To Home
                    </a>
                </div>
            </div>
        </div>
    );
};
function App(props) {
    useEffect(() => {
        props.init();
    }, []);
    return (
        <Router basename={ROUTE_BASENAME}>
            <Layout>
                <Switch>
                    {!AUTH_USER.email_verified_at ? (
                        <>
                            <Modal
                                show={true}
                                noClose={true}
                                header={<h2>Not verified</h2>}
                                closeModal={() => {
                                    props.closeModal();
                                }}
                            >
                                <VerifyEmail />
                            </Modal>
                        </>
                    ) : (
                        <>
                            <Route path="/auth/verify">
                                <Redirect to="/" />
                            </Route>
                            <Route path="/set-pin">
                                <SetPin />
                            </Route>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            {/* <AdminRoute path="/services">
                                <Service />
                            </AdminRoute> */}
                            {/* <AdminRoute path="/providers">
                                <Provider />
                            </AdminRoute> */}
                            <AdminRoute path="/products">
                                <ProductDashboard />
                            </AdminRoute>

                            <AdminRoute path="/sales">
                                <SalesDashboard />
                            </AdminRoute>
                            <AdminRoute path="/admin-settings">
                                <AdminSettings />
                            </AdminRoute>

                            <AdminRoute path="/activities">
                                <Activities />
                            </AdminRoute>
                            <AdminRoute path="/customers">
                                <Customers />
                            </AdminRoute>
                            {AUTH_USER.is_super_admin && (
                                <AdminRoute path="/admin">
                                    <AdminDashboard />
                                </AdminRoute>
                            )}

                            <Route path="/buy">
                            <Buy />
                            </Route>
                            <Route path="/verification-success">
                                <VerificationSuccess />
                            </Route>
                            <Route path="/password-reset-success">
                                <PasswordResetSuccess />
                            </Route>
                            <Route path="/deposit">
                                <Deposit />
                            </Route>
                            <Route path="/payments">
                                <Payment />
                            </Route>
                            <Route path="/history">
                                <h2>History</h2>
                            </Route>
                            <Route path="/successPage">
                                <SuccessPage />
                            </Route>
                            <Route path="/transactions">
                                <Transactions />
                            </Route>
                            <Route path="/withdrawal">
                                <h2>Withdrawals</h2>
                            </Route>
                            <Route path="/settings">
                                <Settings />
                            </Route>
                            {/* <Route path="*" component={NotFound} /> */}
                        </>
                    )}
                </Switch>
                <Toaster />
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

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
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
            });
            // ,
            dispatch(setServices(APP_SERVICES.services));
            dispatch(setProviders(APP_SERVICES.providers));
            dispatch(setPlans(APP_SERVICES.plans));
            // dispatch({
            //     type: "SET_TRANSACTIONS",
            //     transactions: APP_TRANSACTIONS,
            // });
        },
        closeModal: () =>
            dispatch({
                type: "CLOSE_MODAL",
            }),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

// export default App;
