import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './rootReducer'
import rootSagas from './rootSagas'

//create the saga middleware
const sagaMiddleware = createSagaMiddleware();

//mount it on the store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

//then run the saga
sagaMiddleware.run(rootSagas)

export default store;