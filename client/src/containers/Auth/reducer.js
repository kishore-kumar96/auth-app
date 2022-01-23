import * as actionType from './actionsType'

const initialState = {
    isLoading: false,
};

export default function authReducer(state = { ...initialState }, action) {
    switch (action.type) {
        case actionType.LOGIN_REQUESTED:
            return { ...state, isLoading: true };
        case actionType.LOGIN_SUCCEEDED:
            return { ...state, isLoading: false };
        case actionType.LOGIN_FAILED:
            return { ...state, isLoading: false };
        case actionType.SINGUP_REQUESTED:
            return { ...state, isLoading: true };
        case actionType.SINGUP_SUCCEEDED:
            return { ...state, isLoading: false };
        case actionType.SINGUP_FAILED:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}
