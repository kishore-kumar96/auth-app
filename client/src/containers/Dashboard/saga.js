import { put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import Api from './api'
import * as actionsType from '../Dashboard/actionsType'
import { getToken } from '../../utils'
import { toast } from 'react-toastify';

// worker Saga: will be fired on  actions

export function* fetchUser(action) {
    const getUserByIdApi = `${Api.fetchUser}/${action.payload.id}`
    try {
        const headers = yield {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
        const user = yield axios.get(getUserByIdApi, { headers });
        yield put({ type: actionsType.USER_FETCH_SUCCEEDED, payload: user });
    } catch (e) {
        yield put({ type: actionsType.USER_FETCH_FAILED, message: e.message });
        const error = e?.response?.data?.message || "Something went worng!";
        yield toast.error(error);
    }
}


function* watchFetchUser() {
    yield takeLatest(actionsType.USER_FETCH_REQUESTED, fetchUser)
}


export function* userSaga() {
    yield all([
        watchFetchUser()
    ])
}