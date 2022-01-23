import { toast } from 'react-toastify';
import { put, all, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import Api from './api'
import * as actionsType from './actionsType'
import { setLocalStorage } from '../../utils';
import { localKeyName } from '../../constants';

// worker Saga: will be fired on  actions
export function* loginUserSaga(action) {
    try {
        const data = yield axios.post(Api.loginUserApi, action.payload);
        yield put({ type: actionsType.LOGIN_SUCCEEDED });
        yield setLocalStorage(localKeyName, data?.data || {})
        yield toast.success(data?.data?.message || "");
        yield action.history.push("/")
    } catch (e) {
        const error = e?.response?.data?.message || "Something went worng!";
        yield put({ type: actionsType.LOGIN_FAILED, message: error });
        yield toast.error(error);
    }
}

export function* signupUserSaga(action) {
    try {
        const data = yield axios.post(Api.signupUserApi, action.payload);
        yield put({ type: actionsType.SINGUP_SUCCEEDED });
        yield toast.success(data?.data?.message || "");
        yield action.history.push("/login")
    } catch (e) {
        const error = e?.response?.data?.message || "Something went worng!";
        yield put({ type: actionsType.SINGUP_FAILED, message: error });
        yield toast.error(error);
    }
}

function* watchLoginUser() {
    yield takeLatest(actionsType.LOGIN_REQUESTED, loginUserSaga)
}
function* watchSignupUser() {
    yield takeLatest(actionsType.SINGUP_REQUESTED, signupUserSaga)
}

export function* authSaga() {
    yield all([
        watchLoginUser(),
        watchSignupUser()
    ])
}