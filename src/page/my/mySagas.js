import { call, put, takeEvery, select, all, fork } from "redux-saga/effects";
import { Request } from '../../common/axiosRequest.js';
import { SEND_VERIFY_CODE } from "../actionsType.js";
import $ from '../../common/serverApi.js';
import Utlis from '../../common/utlis.js';
import { Toast } from 'antd-mobile';

/**
 * 发送短信接口
 * @param {*} action 
 */
function* axsiosSendVerifyCode(action) {
    const resulet = yield call(Request, $.sendVerifyCode.url, action.playload, "GET");
    if (Utlis.httpStatus_200(resulet)) {
        let data = Utlis.getData(resulet);
        if (data["success"]) {
            Toast.success("发送成功，请注意查收手机短信", 3);
        } else {
            Toast.fail("发送失败，请稍后重新发送!", 2);
        }
    } else {
        Toast.fail("发送失败，请稍后重新发送!", 2);
    }
}

export default {
    * initMySaga() {
        yield takeEvery("sendVerifyCode", axsiosSendVerifyCode);
    },
}