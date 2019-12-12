import { HOME_VOTE_LIST, HOME_STAR_LIST, HOME_STAR_JPG_LIMIT, HOME_STAR_FANS_LIST, HOME_STAR_NO_1_TITLE } from "../actionsType.js";
import initState from './homeState.js';

export default {
    homes: (state = initState, action) => {
        switch (action.type) {
            case HOME_VOTE_LIST:
                return {
                    ...state,
                    voteListData: action.voteListData,
                };
            case HOME_STAR_LIST:
                return {
                    ...state,
                    starListData: action.starListData,
                }
            case HOME_STAR_JPG_LIMIT:
                return {
                    ...state,
                    starJpgLimit: action.starJpgLimit,
                }
            case HOME_STAR_FANS_LIST:
                return {
                    ...state,
                    starFansListData: action.starFansListData
                }
            case HOME_STAR_NO_1_TITLE:
                return {
                    ...state,
                    starNo1: action.starNo1
                }
            default:
                return state;
        }
    }
}

