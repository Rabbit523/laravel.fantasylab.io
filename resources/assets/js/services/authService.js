import Http from '../Http'
import * as action from '../store/actions'

export function getLang() {
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(action.getLang());
			return resolve();
		})
	)
}

export function setLang(lang) {
	return dispatch => (
		new Promise((resolve, reject) => {
			dispatch(action.setLang(lang));
			return resolve();
		})
	)
}

export function login(credentials) {
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	return dispatch => (
		new Promise((resolve, reject) => {
			Http.post(`${window.location.origin}/api/auth/login`, credentials).then(res => {
				dispatch(action.authLogin(res.data));
				return resolve();
			})
				.catch(err => {
					const statusCode = err.response.status;
					const data = {
						error: null,
						statusCode,
					};
					if (statusCode === 401 || statusCode === 422) {
						// status 401 means unauthorized
						// status 422 means unprocessable entity
						data.error = err.response.data.message;
					}
					return reject(data);
				})
		})
	)
}

export function socialLogin(data) {
	return dispatch => (
		new Promise((resolve, reject) => {
			Http.post(`../api/auth/login/${data.social}/callback${data.params}`)
				.then(res => {
					dispatch(action.authLogin(res.data));
					return resolve();
				})
				.catch(err => {
					const statusCode = err.response.status;
					const data = {
						error: null,
						statusCode,
					};
					if (statusCode === 401 || statusCode === 422) {
						// status 401 means unauthorized
						// status 422 means unprocessable entity
						data.error = err.response.data.message;
					}
					return reject(data);
				})
		})
	)
}

export function resetPassword(credentials) {
	return dispatch => (
		new Promise((resolve, reject) => {
			Http.post('../api/password/email', credentials)
				.then(res => {
					return resolve(res.data);
				})
				.catch(err => {
					const statusCode = err.response.status;
					const data = {
						error: null,
						statusCode,
					};
					if (statusCode === 401 || statusCode === 422) {
						// status 401 means unauthorized
						// status 422 means unprocessable entity
						data.error = err.response.data.message;
					}
					return reject(data);
				})
		})
	)
}

export function updatePassword(credentials) {
	return dispatch => (
		new Promise((resolve, reject) => {
			Http.post('../../api/password/reset', credentials)
				.then(res => {
					const statusCode = res.data.status;
					if (statusCode == 202) {
						const data = {
							error: res.data.message,
							statusCode,
						}
						return reject(data)
					}
					return resolve(res);
				})
				.catch(err => {
					const statusCode = err.response.status;
					const data = {
						error: null,
						statusCode,
					};
					if (statusCode === 401 || statusCode === 422) {
						// status 401 means unauthorized
						// status 422 means unprocessable entity
						data.error = err.response.data.message;
					}
					return reject(data);
				})
		})
	)
}

export function register(credentials) {
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}
	return dispatch => (
		new Promise((resolve, reject) => {
			Http.post(`${window.location.origin}/api/auth/register`, credentials)
				.then(res => {
					return resolve(res.data);
				})
				.catch(err => {
					const statusCode = err.response.status;
					const data = {
						error: null,
						statusCode,
					};
					if (statusCode === 422) {
						Object.values(err.response.data.message).map((value, i) => {
							data.error = value
						});

					} else if (statusCode === 400) {
						data.error = err.response.data.message;
					}
					return reject(data);
				})
		})
	)
}