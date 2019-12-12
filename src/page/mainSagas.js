import { call, put, takeEvery, takeLatest, select } from "redux-saga/effects";
import { Request } from '../common/axiosRequest.js';
import Utlis from '../common/utlis.js';
import { Toast } from 'antd-mobile';

import { LOGIN_SUCCESS_USERINFO_DATA, USER_INFO_DATA } from "./actionsType.js";
import $ from '../common/serverApi.js';


function* fetchUser(action) {
    if (action.playload && action.playload["phone"] && action.playload["ver_code"]) {
        let resulet = yield call(Request, $.getUserInfo.url, action.playload, "GET");
        if (Utlis.httpStatus_200(resulet)) {
            let data = Utlis.getData(resulet);
            if (!data["success"]) {
                Toast.info("登陆失败，请检查是否手机号或验证码输入正确!", 2);
                yield put({ type: USER_INFO_DATA, userInfoData: undefined });
                yield put({ type: LOGIN_SUCCESS_USERINFO_DATA, loginUserData: undefined }); // 储存登录状态
            } else {
                yield put({ type: USER_INFO_DATA, userInfoData: resulet });
                yield put({ type: LOGIN_SUCCESS_USERINFO_DATA, loginUserData: action.playload }); // 储存登录状态
                if (!action.playload.type) {
                    Toast.info("登陆成功", 2);
                }
            }
        } else {
            yield put({ type: USER_INFO_DATA, userInfoData: undefined });
            yield put({ type: LOGIN_SUCCESS_USERINFO_DATA, loginUserData: undefined }); // 储存登录状态
            Toast.fail(resulet["msgInfo"], 2);
        }
    }
}

export default {

    userInfo: function* getUserInfo() {
        yield takeLatest("getUserInfo", fetchUser);
    }
}

