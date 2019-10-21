import {createStore} from 'redux'
import RootReducer from './reducers'

const store = createStore(RootReducer);

export default store;
