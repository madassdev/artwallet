// import { auth, provider } from "../firebase";
import { SET_USER } from "./actionType";

export const setUser = (payload) => {
    return {
        type: SET_USER,
        user: payload,
    };
};


export function signInAPI() {
    return (dispatch) => {
        auth.signInWithPopup(provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((error) => {
                alert(error);
            });
    };
}
export function signOutUser() {
    return (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(setUser(null));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function getUserAuth() {
    return (dispatch) => {
        // dispatch(
        //     setUser({
        //         name: "Faves",
        //     })
        // );
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        });
    };
}
