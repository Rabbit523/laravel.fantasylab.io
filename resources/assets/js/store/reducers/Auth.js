import * as ActionTypes from '../action-types'
import Http from '../../Http'

const user = {
	id: null,
	name: null,
	email: null,
	createdAt: null,
	updatedAt: null
};

const initialState = {
	lang: 'en',
	isAuthenticated: false,
	isAdmin: false,
	user
};

const Auth = (state = initialState, { type, payload = null }) => {
	switch (type) {
		case ActionTypes.AUTH_LOGIN:
			return authLogin(state, payload);
		case ActionTypes.AUTH_CHECK:
			return checkAuth(state);
		case ActionTypes.AUTH_LOGOUT:
			return logout(state);
		case ActionTypes.GET_LANG:
			return getlang(state);
		case ActionTypes.SET_LANG:
			return setlang(state, payload);
		default:
			return state;
	}
};

const getlang = (state) => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('locale')) {
			state = Object.assign({}, state, {
				lang: localStorage.getItem('locale'),
			});
		} else {
			state = Object.assign({}, state, {
				lang: 'en',
			});
		}
	}
	return state;
};

const setlang = (state, payload) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('locale', payload);
		state = Object.assign({}, state, {
			lang: payload,
		});
	}
	return state;
};

const authLogin = (state, payload) => {
	const jwtToken = payload.token;
	const user = payload.user[0];
	if (typeof window !== 'undefined') {
		if (!!payload.user[0].role == 0) {
			localStorage.setItem('is_admin', true);
		} else {
			localStorage.setItem('is_admin', false);
		}
		localStorage.setItem('jwt_token', jwtToken);
		localStorage.setItem('user', JSON.stringify(user));
		Http.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
		state = Object.assign({}, state, {
			isAuthenticated: true,
			isAdmin: localStorage.getItem('is_admin') === 'true',
			user
		});
	}
	return state;
};

const checkAuth = (state) => {
	if (typeof window !== 'undefined') {
		state = Object.assign({}, state, {
			isAuthenticated: !!localStorage.getItem('jwt_token'),
			isAdmin: localStorage.getItem('is_admin')
		});
		if (state.isAuthenticated) {
			Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
		}
	}
	return state;
};

const logout = (state) => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('jwt_token');
		localStorage.removeItem('user');
		localStorage.setItem('is_admin', false);
		state = Object.assign({}, state, {
			isAuthenticated: false,
			isAdmin: false,
			user
		});
	}
	return state;
};

export default Auth;
