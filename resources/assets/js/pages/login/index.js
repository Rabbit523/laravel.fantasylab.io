import React from 'react'
import { Button, Checkbox, Dimmer, Form, Grid, Header, Icon, Loader, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { withLocalize } from "react-localize-redux"
import ReeValidate from 'ree-validate'
import PageMetaTag from '../../common/pageMetaTag'
import Http from '../../Http';

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.validator = new ReeValidate({
			email: 'required|email',
			password: 'required|min:6'
		});

		this.state = {
			credentials: {
				email: '',
				password: ''
			},
			responseError: {
				isError: false,
				code: '',
				text: ''
			},
			isLoaded: false,
			errors: this.validator.errors,
			isAdmin: false,
			isAuthenticated: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const name = event.target.name;
		const value = event.target.value;
		const { errors } = this.validator;
		const { credentials } = this.state;
		credentials[name] = value;

		this.validator.validate(name, value)
			.then(() => {
				this.setState({ errors, credentials })
			});
	}

	handleSubmit(event) {
		event.preventDefault();
		const { credentials } = this.state;
		this.validator.validateAll(credentials)
			.then(success => {
				if (success) {
					this.setState({
						isLoaded: true
					});
					this.submit(credentials);
				}
			});
	}

	submit(credentials) {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		}
		Http.post(`${window.location.origin}/api/auth/login`, credentials).then(res => {
			const jwtToken = res.data.token;
			const user = res.data.user[0];
			if (typeof window !== 'undefined') {
				if (!!user.role == 0) {
					localStorage.setItem('isAdmin', true);
				} else {
					localStorage.setItem('isAdmin', false);
				}
				localStorage.setItem('isAuthenticated', true);
				localStorage.setItem('jwt_token', jwtToken);
				localStorage.setItem('user', JSON.stringify(user));
				Http.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
			}
			if (user.role == 0) {
				this.props.history.push('/admin/pages');
			} else {
				this.props.history.push('/');
			}
		});
	}

	onSocialClick(event, data) {
		window.location.assign(`redirect/${data.service}`);
	}

	componentDidMount() {
		// const social = this.props.match.params.social
		// const params = this.props.location.search;
		// setTimeout(function () {

		//     if (params && social) {
		//         this.props.dispatch(AuthService.socialLogin({ params, social }))
		//             .catch(({ error, statusCode }) => {
		//                 const responseError = {
		//                     isError: true,
		//                     code: statusCode,
		//                     text: error
		//                 };
		//                 this.setState({ responseError });
		//                 this.setState({
		//                     isLoaded: false
		//                 });
		//             })
		//     }

		// }.bind(this), 1000);
		let isAuthenticated = false, isAdmin = false;
		if (typeof window !== 'undefined') {
			isAuthenticated = localStorage.getItem('isAuthenticated');
			isAdmin = localStorage.getItem('isAdmin');
		}
		this.setState({
			isLoaded: false,
			isAdmin,
			isAuthenticated
		});
	}

	render() {
		const { isAuthenticated, isAdmin } = this.state;
		const { from } = this.props.location.state || { from: { pathname: isAdmin=='true' ? '/admin/pages' : '/' } };
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';

		if (isAuthenticated == 'true') {
			return (
				<Redirect to={from} />
			)
		} else if (lang=='nb' && !window.location.pathname.includes('no')) {
			return (
				<Redirect to='no/logginn' />
			)
		}

		const { errors } = this.state;
		return (
			<React.Fragment>
				<PageMetaTag meta_title="Login to Access Loyalty" meta_description="" />
				<Segment className='page-loader' style={{ display: this.state.isLoaded ? 'block' : 'none' }}>
					<Dimmer active inverted>
						<Loader size='large'>{lang=='en'?'Authenticating...':'Godkjenner ...'}</Loader>
					</Dimmer>
				</Segment>
				<Grid textAlign='center' verticalAlign='middle' className='login-page'>
					<Grid.Column className="login-responsive">
						<div className='login_title'>
							<h2>{lang=='en'?'Sign into FantasyLab':'Logg deg på FantasyLab'}</h2>
							<Link to='/register' replace><h3>{lang=='en'?'or create a free FantasyLab account':'eller opprett en gratis FantasyLab-konto'}</h3></Link>
						</div>
						{this.state.responseError.isError && <Message negative>
							<Message.Content>
								{this.state.responseError.text}
							</Message.Content>
						</Message>}
						<Form size='large' className='login-form'>
							<Segment stacked>
								<Form.Input
									fluid
									label={lang=='en'?'Email':'E-post'}
									name='email'
									placeholder={lang=='en'?'Your email here':'Din e-post her'}
									className='input-form'
									onChange={this.handleChange}
									error={errors.has('email')}
								/>
								{errors.has('email') && <Header size='tiny' className='custom-error' color='red'>
								{errors.first('email')}
								</Header>}
								<Form.Input
									fluid
									label={lang=='en'?'Password':'Passord'}
									name='password'
									placeholder={lang=='en'?'Enter password':'Oppgi passord'}
									className='input-form'
									type='password'
									onChange={this.handleChange}
									error={errors.has('password')}
								/>
								{errors.has('password') && <Header size='tiny' className='custom-error' color='red'>
									{errors.first('password')}
								</Header>}
								<div className='remember-section'>
									<Checkbox label={lang=='en'?'Remember me':'Husk meg'} />
									<Link to='/forgot-password' replace><Icon name='lock' />{lang=='en'?'Forgot password?':'Glemt passord?'}</Link>
								</div>
								<Button fluid size='large' className='primary-button' onClick={this.handleSubmit}>{lang=='en'?'Login':'Logg Inn'}</Button>
								<Button onClick={this.onSocialClick.bind(this)} service='google' className='ui google icon button google-button'>
									<img src='/images/google.png' /> {lang=='en'?'Login with Google':'Logg inn med Google'}
								</Button>
							</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</React.Fragment>
		);
	}
}

export default withLocalize(withRouter(Page));
