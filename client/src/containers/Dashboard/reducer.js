import * as actionType from './actionsType'

const initialState = {
    isLoading: false,
    user: {},
};

export default function Dashboard(state = { ...initialState }, action) {
    switch (action.type) {
        case actionType.USER_FETCH_REQUESTED:
            return { ...state, isLoading: true };
        case actionType.USER_FETCH_SUCCEEDED:
            return { ...state, user: action.payload.data || {}, isLoading: false };
        case actionType.USER_FETCH_FAILED:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}
