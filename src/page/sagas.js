import mainSagas from './mainSagas.js';
import homeSagas from './home/homeSagas.js';
import profilesSagas from './profiles/profilesSagas.js';
import noticeSagas from './notice/noticeSagas.js';
import mySagas from './my/mySagas.js';

export const sagas = () => {
    return [
        mainSagas,
        homeSagas,
        profilesSagas,
        noticeSagas,
        mySagas
    ]
}
