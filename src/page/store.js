import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers.js';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas.js';

const sagaMiddleware = createSagaMiddleware();
let middlewares = [];
middlewares.push(sagaMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
const store = createStoreWithMiddleware(reducers)

sagas().map((item, index) => {
    for (const key in item) {
        sagaMiddleware.run(item[key]);
    }
});

export default store;