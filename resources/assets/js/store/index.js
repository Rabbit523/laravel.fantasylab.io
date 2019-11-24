import {createStore, applyMiddleware} from 'redux'
import RootReducer from './reducers'

let user = null;
let isAuthenticated = false;
let isAdmin = false;

if (typeof window !== 'undefined') {
    let local_user = localStorage.getItem('user');
    if (local_user) {
        user = JSON.parse(local_user);
        isAdmin = localStorage.getItem('is_admin');
        isAuthenticated = true;
    } else {
        user = {
            id: null,
            name: null,
            email: null,
            createdAt: null,
            updatedAt: null
        };
        isAuthenticated = false;
        isAdmin = false;
    }
}
const initialState = {
    Auth: { 
        user,
        lang: 'en',
        isAuthenticated,
        isAdmin
    }
}
const store = createStore(RootReducer, initialState);

export default store;
