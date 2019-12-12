import { NOTICE_DATA_LIST } from "../actionsType.js";
import initState from './noticeState.js';

export default {
    notice: (state = initState, action) => {
        switch (action.type) {
            case NOTICE_DATA_LIST:
                return {
                    ...state,
                    naticeListData: action.naticeListData
                }
            default:
                return state;
        }
    }
}

