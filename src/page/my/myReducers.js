import { SEND_VERIFY_CODE } from "../actionsType.js";
import initState from './myState.js';

export default {
    my: (state = initState, action) => {
        switch (action.type) {
            case SEND_VERIFY_CODE:
                return {
                    ...state,
                    sendVerifyCodeData: action.sendVerifyCodeData
                }
            default:
                return state;
        }
    }
}

