import { call, put, takeEvery, select, all, fork } from "redux-saga/effects";
// import Request from "../../common/request.js";
import { Request, RequestPost, } from '../../common/axiosRequest.js';
import { PROFILE_PIE_DATA, PROFILE_GATEGORY_DATA, IDOL_LIMIT, USER_ID, AUTO_USERNAME_SUCCESS } from "../actionsType.js";
import $ from '../../common/serverApi.js';
import Utlis from '../../common/utlis.js';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

/**
 * 饼状图
 * @param {*} action 
 */
function* axsiosPersionStarGraph(action) {
    const resulet = yield call(Request, $.getPersonVoteInfo.url, {}, "GET");
    debugger
    let voteLimit = [];
    if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
        let data = Utlis.getData(resulet);
        if (data["success"] && Utlis.getData(data) && Utlis.getData(data).length > 0) {
            let vote_0_5 = Utlis.getData(data)[0]["star_list"];
            if (vote_0_5 && vote_0_5.length > 0) {
                for (let i = 0; i < vote_0_5.length; i++) {
                    if (i < 5) {
                        voteLimit.push(vote_0_5[i]);
                    }
                }
                yield put({ type: PROFILE_PIE_DATA, personStarGraphData: { "phone": Utlis.getData(data)[0]["phone"], "fans_id": Utlis.getData(data)[0]["fans_id"], "star_list": voteLimit } })
                yield put({ type: "getPersonCateGory", starId: (vote_0_5[0] && vote_0_5[0]["star_id"]) ? vote_0_5[0]["star_id"] : undefined })
            }
        } else {
            Toast.fail(data["message"], 1)
        }
    }

}

/**
 * 折线图
 * @param {*} action 
 */
function* axsiosPersonStarList(action) {
    if (action && action.starId) {
        const resulet = yield call(Request, $.getPersonStarList.url, { star_id: action.starId, show_day: 7 }, "GET");
        if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
            let data = Utlis.getData(resulet);
            if (data["success"]) {
                yield put({ type: PROFILE_GATEGORY_DATA, personCateGoryData: Utlis.getData(data) })
            } else {
                Toast.fail(data["message"], 1)
            }
        }
    }

}

/**
 * 判断是否具有爱豆权
 * @param {*} action 
 */
function* axsiosIdolLimit(action) {
    let userInfoData = yield select(state => state.main_R.userInfoData);
    let user_id = undefined;
    if (userInfoData && userInfoData["data"] && userInfoData["data"]["data"] && userInfoData["data"]["data"]["user_id"]) {
        user_id = userInfoData["data"]["data"]["user_id"];
        yield put({ type: USER_ID, userIdData: user_id }); // 设置用户ID
    }
    const resulet = yield call(Request, $.getIdolLimit.url, { user_id }, "GET");
    if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
        let data = Utlis.getData(resulet);
        if (data["success"]) {
            yield put({ type: IDOL_LIMIT, idolLimitData: Utlis.getData(data) });
        } else {
            Toast.fail(data["message"], 1)
        }
    }
}

/**
 * 保存爱豆寄语
 */
function* axsiosIdolMessage(action) {
    const resulet = yield call(Request, $.saveIdolMessage.url, action.playload, "POST");
    if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
        let data = Utlis.getData(resulet);
        if (data["success"]) {
            Toast.success("提交成功", 2);
            yield put({ type: "getUserInfo", userInfoData: resulet });
        } else {
            Toast.fail(data["message"], 2)
        }
    } else {
        Toast.fail("提交失败", 2)
    }
}

/**
 * 爱豆社群（用户发布社群）
 * @param {*} action 
 */
function* axsiosIdolFlock(action) {
    const resulet = yield call(RequestPost, $.saveIdolFlock.url, action.playload.forms);
    if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
        let data = Utlis.getData(resulet);
        if (data["success"]) {
            Toast.success("提交成功", 2);
        } else {
            Toast.fail(data["message"], 2)
        }
    } else {
        Toast.fail("提交失败", 2)
    }
}

/**
 * 爱豆爱豆图像（用户设置明星头像）
 * @param {*} action 
 */
function* axsiosIdolImage(action) {
    const resulet = yield call(RequestPost, $.saveIdolImage.url, action.playload.forms);
    if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
        let data = Utlis.getData(resulet);
        if (data["success"]) {
            Toast.success("提交成功", 1);
        } else {
            Toast.fail(data["message"], 1)
        }
    } else {
        Toast.fail("提交失败", 1)
    }
}

/**
 * 自定义用户
 * @param {*} action 
 */
function* axsiosUserByUserName(action) {
    let { user_id, name, userinfo } = action.playload;
    const resulet = yield call(Request, $.updateUserByUserName.url, { user_id, name }, "POST");
    if (Utlis.httpStatus_200(resulet) && Utlis.isResultSuccess(resulet)) {
        let data = Utlis.getData(resulet);
        if (data["success"]) {
            Toast.success("修改成功", 1);
            yield put({ type: AUTO_USERNAME_SUCCESS, autoUsername: name });
        } else {
            Toast.fail(data["message"], 1)
        }
    } else {
        Toast.fail(Utlis.getData(resulet)["message"], 2)
    }
}

export default {

    * initProfilesSaga() {
        yield takeEvery("getPersionStarGraph", axsiosPersionStarGraph);
        yield takeEvery("getPersonCateGory", axsiosPersonStarList);
        yield takeEvery("getIdolLimit", axsiosIdolLimit);
        yield takeEvery("saveIdolMessage", axsiosIdolMessage);
        yield takeEvery("saveIdolFlock", axsiosIdolFlock);
        yield takeEvery("updateUserByUserName", axsiosUserByUserName);
        yield takeEvery("saveIdolImage", axsiosIdolImage);
    },
}