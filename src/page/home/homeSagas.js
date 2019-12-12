import { call, put, takeEvery, select, all, fork } from "redux-saga/effects";
// import Request from "../../common/request.js";
import { Request, RequestPost } from '../../common/axiosRequest.js';
import { HOME_STAR_LIST, HOME_STAR_JPG_LIMIT, HOME_STAR_FANS_LIST } from "../actionsType.js";
import $ from '../../common/serverApi.js';
import Utlis from '../../common/utlis.js';
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';

function* axsiosStarList(action) {
    const resulet = yield call(Request, $.getStarList.url, {}, "GET");
    if (Utlis.isResultSuccess(resulet)) {
        let starData = Utlis.getData(resulet);
        yield put({ type: HOME_STAR_LIST, starListData: Utlis.getData(starData) });
        let data = Utlis.getResultData(resulet);
        let voteRanking = [];
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (i < 3) {
                    voteRanking.push(data[i])
                }
            }
        
        function compare (prop){
            return function(a,b){
                var v1 = a[prop]
                var v2 = b[prop]
                return v2-v1
            }
        }
        voteRanking = voteRanking.sort(compare('total_vote'))
        voteRanking.splice(0, 1, ...voteRanking.splice(1, 1, voteRanking[0]))
        }
        yield put({ type: HOME_STAR_JPG_LIMIT, starJpgLimit: voteRanking });
        if (starData && starData["data"].length > 0) {
            yield put({ type: "getStarFansList", starNo1: starData["data"][0] });
        }
    }
}

function* axiosStarFansList(action) {
    
    yield put({ type: "HOME_STAR_NO_1_TITLE", starNo1: action.starNo1 });
    const resulet = yield call(Request, $.getStarFansList.url, { star_id: String(action["starNo1"]["star_id"]) }, "get");
    if (Utlis.isResultSuccess(resulet)) {
        yield put({ type: HOME_STAR_FANS_LIST, starFansListData: Utlis.getData(resulet) });
    }
}

function* axiosSaveStarVote(action) {
    let { star_id } = Utlis.getData(action)
    const resulet = yield call(Request, $.saveStarVote.url, { star_id }, "POST");
    if (Utlis.isResultSuccess(resulet)) {
        yield put({ type: "getStarList" })
    } else {
        let data = Utlis.getData(resulet);
        Toast.fail(data["message"], 1);
    }
}

export default {

    * initHomeSaga() {
        yield takeEvery("getStarList", axsiosStarList);
        yield takeEvery("getStarFansList", axiosStarFansList);
        yield takeEvery("saveStarVote", axiosSaveStarVote);
    },
}