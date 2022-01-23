import { all } from 'redux-saga/effects';

import { authSaga } from '../containers/Auth/saga'
import { userSaga } from '../containers/Dashboard/saga'

function* rootSaga() {
  yield all([
    authSaga(),
    userSaga()
  ])
}

export default rootSaga