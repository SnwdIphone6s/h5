import { LOGIN_SUCCESS_USERINFO_DATA, TABS_SELECTED, USER_INFO_DATA } from "./actionsType.js";
import { TAB_ITEM } from './type.js';

const initialState = {
    selectedTab: "home",
    userInfoData: undefined,
    loginUserData: undefined,
};


export default {
    main: (state = initialState, action) => {
        switch (action.type) {
            case TABS_SELECTED:
                return {
                    ...state,
                    selectedTab: action.payload.selectedTab
                };
            case USER_INFO_DATA:
                return {
                    ...state,
                    userInfoData: action.userInfoData
                }
            case LOGIN_SUCCESS_USERINFO_DATA:
                return {
                    ...state,
                    loginUserData: action.loginUserData
                }
            default:
                return state;
        }
    }
}

