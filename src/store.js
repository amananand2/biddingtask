import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga'
import { createLogger } from "redux-logger";
import reducer from "./reducer";
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware()
const initalState = {};
const logger = createLogger({ collapsed: true });
const middlewares = [sagaMiddleware, logger];

const store = createStore(
  reducer,
  applyMiddleware(...middlewares)
)
sagaMiddleware.run(rootSaga)

export default store;