import { PROFILE_PIE_DATA, PROFILE_GATEGORY_DATA, IDOL_LIMIT, USER_ID, AUTO_USERNAME_SUCCESS } from "../actionsType.js";
import initState from './profilesState.js';

export default {
    profiles: (state = initState, action) => {
        switch (action.type) {
            case PROFILE_PIE_DATA:
                return {
                    ...state,
                    personStarGraphData: action.personStarGraphData
                };
            case PROFILE_GATEGORY_DATA:
                return {
                    ...state,
                    personCateGoryData: action.personCateGoryData
                };
            case IDOL_LIMIT:
                return {
                    ...state,
                    idolLimitData: action.idolLimitData
                }
            case USER_ID:
                return {
                    ...state,
                    userIdData: action.userIdData
                }
            case AUTO_USERNAME_SUCCESS:
                return {
                    ...state,
                    autoUsername: action.autoUsername
                }
            default:
                return state;
        }
    }
}

