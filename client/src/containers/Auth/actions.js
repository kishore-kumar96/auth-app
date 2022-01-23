import * as actionsType from './actionsType'

export function loginRequested(dispatch, payload, history) {
    dispatch({ type: actionsType.LOGIN_REQUESTED, payload, history });
}


export function signupRequested(dispatch, payload, history) {
    dispatch({ type: actionsType.SINGUP_REQUESTED, payload, history });
}
