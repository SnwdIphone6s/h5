import mainReducers from './mainReducers.js';
import homeReducers from './home/homeReducers.js';
import profilesReducers from './profiles/profilesReducers.js';
import noticeReducers from './notice/noticeReducers.js';
import myReducers from './my/myReducers.js';

import { combineReducers } from 'redux';

const main_R = mainReducers.main;
const home_R = homeReducers.homes;
const profile_R = profilesReducers.profiles;
const notice_R = noticeReducers.notice;
const my_R = myReducers.my;

const reducers = combineReducers({
    main_R,
    home_R,
    profile_R,
    notice_R,
    my_R
})

export default reducers