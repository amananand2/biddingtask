import { put, takeEvery, all, call } from 'redux-saga/effects';
import actionTypes from "./types";
import {customerApiSuccess,customerApiFailed} from "./action";


function* helloSaga() {
  console.log('Hello Sagas!')
}

function* watchCustomerApiStart() {
  yield takeEvery(actionTypes.CUSTOMER_API_START, customerApiAsync);
}

function* customerApiAsync({payload}) {
  try {
    const data = yield call(() => {
        return fetch('https://intense-tor-76305.herokuapp.com/merchants')
                .then(res => res.json())
        });
    yield put(customerApiSuccess(data));
  } catch (error) {
    yield put(customerApiFailed(error));
  }
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchCustomerApiStart()
  ])
}