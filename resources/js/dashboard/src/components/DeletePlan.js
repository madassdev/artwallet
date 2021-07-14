import { connect } from "react-redux";
import { deletePlan } from "../actions/planReducer";

function DeletePlan(props) {
    const deletePlan = (e) => {
        props.deletePlan(props.plan);
    };
    return (
        <>
            <div className="p-1 text-center">
                <h5 className="">
                    Are you sure you want to delete
                    <span className="text-danger ml-2">
                        {props.plan.title}
                    </span>
                    ?
                </h5>
                <small className="text-muted text-sm">
                    Action cannot be reversed
                </small>
            </div>
            <div className="p-3 d-flex justify-content-between align-items-center">
                <button className="btn btn-light">Cancel</button>
                <button className="btn btn-danger" onClick={deletePlan}>
                    Delete
                </button>
            </div>
        </>
    );
}
const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePlan: (plan) => {
            dispatch(deletePlan(plan));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlan);
