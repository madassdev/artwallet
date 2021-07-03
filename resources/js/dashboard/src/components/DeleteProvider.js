import { connect } from "react-redux";
import { deleteProvider } from "../actions/providerActions";

function DeleteProvider(props) {
    const deleteProvider = (e) => {
        props.deleteProvider(props.provider);
    };
    return (
        <>
            <div className="p-1 text-center">
                <h5 className="">
                    Are you sure you want to delete
                    <span className="text-danger ml-2">
                        {props.provider.title}
                    </span>
                    ?
                </h5>
                <small className="text-muted text-sm">
                    Action cannot be reversed
                </small>
            </div>
            <div className="p-3 d-flex justify-content-between align-items-center">
                <button className="btn btn-light">Cancel</button>
                <button className="btn btn-danger" onClick={deleteProvider}>
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
        deleteProvider: (provider) => {
            dispatch(deleteProvider(provider));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProvider);
