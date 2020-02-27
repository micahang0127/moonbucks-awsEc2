import { all, fork } from 'redux-saga/effects';
import { watchLogin,  watchSignUp } from './userSaga';


export default function* userSaga() {
    yield all ([
        fork(watchLogin),
        fork(watchSignUp),
    ])
}