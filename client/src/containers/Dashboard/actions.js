import * as actionsType from './actionsType'

export function userFetchRequested(dispatch, payload) {
    dispatch({ type: actionsType.USER_FETCH_REQUESTED, payload: payload })
}
