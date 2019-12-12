import { call, put, takeEvery, select, all, fork } from "redux-saga/effects";
import { Request, RequestPost } from '../../common/axiosRequest.js';
import { NOTICE_DATA_LIST } from "../actionsType.js";
import $ from '../../common/serverApi.js';
import Utlis from '../../common/utlis.js';
import { Toast } from 'antd-mobile';

/**
 * 获取私信列表
 * @param {*} action 
 */
function* axsiosUserMessage(action) {
    let { data } = yield select(state => state.main_R.userInfoData);
    if (data && data["success"]) {
        let { user_id } = Utlis.getData(data);
        const resulet = yield call(Request, $.getUserMessage.url, { user_id }, "GET");
        if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
            let data = Utlis.getData(resulet);
            console.log(data)
            if (data["success"]) {

                yield put({ type: NOTICE_DATA_LIST, naticeListData: Utlis.getData(data) })
            } else {
                Toast.fail(data["message"], 1)
            }
        }
    } else {
        Toast.fail(data["msgInfo"], 2);
    }
}

/**
 * 设置私信已读
 * @param {*} action 
 */
function* axsiosMessageById(action) {
    const resulet = yield call(Request, $.updateMessageById.url, action.playload, "POST");
    if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
        yield put({ type: "getUserMessage" })
    }
}

export default {
    * initNoticeSaga() {
        yield takeEvery("getUserMessage", axsiosUserMessage);
        yield takeEvery("updateMessageById", axsiosMessageById);
    },
}