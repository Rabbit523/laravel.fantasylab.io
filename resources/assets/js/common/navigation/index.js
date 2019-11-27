/**
 * Created by Sumit-Yadav on 06-10-2017.
 */
import React from 'react'
import { withRouter, NavLink, Link } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import Modal from 'react-modal'
import { Button, Container, Dropdown, Icon, Menu, Responsive, Grid, Segment } from 'semantic-ui-react'
import Http from '../../Http';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

class Page extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isOpen: false,
			user: null,
			isAuthenticated: false,
			isAdmin: false
		};
		this.closeModal = this.closeModal.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		let user = null, isAuthenticated = false, isAdmin = false;
		if (typeof window !== 'undefined') {
			let local_user = localStorage.getItem('user');
			if (local_user) {
					user = JSON.parse(local_user);
					isAdmin = localStorage.getItem('isAdmin');
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
		this.setState({ user, isAuthenticated, isAdmin });
	}

	handleLogout() {
		event.preventDefault();
		const ref = this;
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		}
		Http.get(`${window.location.origin}/api/auth/logout`).then(res => {
			localStorage.removeItem('jwt_token');
			localStorage.removeItem('user');
			localStorage.setItem('isAdmin', false);
			localStorage.setItem('isAuthenticated', false);
			this.setState({ user: null, isAuthenticated: false, isAdmin: false });
			ref.props.history.push('/');
		});
	}

	closeModal() {
		this.setState({ isOpen: false });
	}

	triggerModal(event) {
		event.preventDefault();
		this.setState({ isOpen: true });
	}

	changeLang(val) {
		this.props.onChangeLang(val);
	}

	render() {
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		let is_dashboard = false;
		if (typeof window !== 'undefined' && window.location.href.indexOf('admin') > 0) {
			is_dashboard = true;
		}
		const { isOpen, user, isAuthenticated, isAdmin } = this.state;
		let user_name = user ? user.name : "";
		this.avatar = (
			<span>
				{ user_name }
			</span>
		);

		Modal.setAppElement('#app')
		return (
			<Translate>
				{({ translate }) => (
					<React.Fragment>
						<Modal
							isOpen={isOpen}
							onRequestClose={this.closeModal}
							style={customStyles}
						>
							<Button icon='close' onClick={this.closeModal} />
							<h2>Hi,<br />Visionary.</h2>
							<p>Our web app is under development.</p>
							<div className="button-group">
								<Button as={Link} to='/contact' className='primary-button'>Contact us</Button>
								<Button className='secondary-button' onClick={this.closeModal}>Close</Button>
							</div>
						</Modal>
						<Responsive as={Segment} inverted maxWidth={768} className='mobile-navbar'>
							<Menu size='large' inverted secondary>
								<Menu.Item as={Link} to={lang=='en'?'/':'/no'} className='logo' replace>
									<img src={require('../../../images/theme/logo.png')} alt='infoTiq' />
								</Menu.Item>
								<div className="right-menu">
									{!isAuthenticated && <Menu.Item className="mobile-register">
										<Button as={Link} to={lang=='en'?'/register':'/no/register'} className='primary-button' onClick={(event) => this.triggerModal(event)}>{translate('navigation.craft-enterprise')}</Button>
									</Menu.Item>}
									<Menu.Menu position='right'>
										<Menu.Item>
											<Dropdown icon='bars' className='collapsible-menu'>
												<Dropdown.Menu className='animated'>
													<div style={{ display: 'flex', flexDirection: 'column' }}>
														<Dropdown text={translate('navigation.services')} className="services">
															<Dropdown.Menu className="sub-menu">
																<Segment className='custom-dropdown-item' as={Link} to={lang=='en'?'/web-development':'/no/web-development'}>
																	<div className='avatar-item desktop'>
																		<img src={require('../../../images/theme/desktop.png')} />
																	</div>
																	<p>{translate('navigation.web-development')}</p>
																</Segment>
																<Segment className='custom-dropdown-item' as={Link} to={lang=='en'?'/mobile-development':'/no/mobile-development'}>
																	<div className='avatar-item mobile'>
																		<img src={require('../../../images/theme/mobile.png')} />
																	</div>
																	<p>{translate('navigation.mobile-development')}</p>
																</Segment>
																<Segment className='custom-dropdown-item' as={Link} to={lang=='en'?'/ui-ux-design':'/no/ui-ux-design'}>
																	<div className='avatar-item ui'>
																		<img src={require('../../../images/theme/ui.png')} />
																	</div>
																	<p>{translate('navigation.ui-design')}</p>
																</Segment>
																<Segment className='custom-dropdown-item' as={Link} to={lang=='en'?'/branding':'/no/branding'}>
																	<div className='avatar-item branding'>
																		<img src={require('../../../images/theme/branding.png')} />
																	</div>
																	<p>{translate('navigation.branding')}</p>
																</Segment>
																<Segment className='custom-dropdown-item' as={Link} to={lang=='en'?'/illustration':'/no/illustration'}>
																	<div className='avatar-item illustration'>
																		<img src={require('../../../images/theme/illustration.png')} />
																	</div>
																	<p>{translate('navigation.illustration')}</p>
																</Segment>
																<Segment className='custom-dropdown-item' as={Link} to={lang=='en'?'/marketing-material':'/no/marketing-material'}>
																	<div className='avatar-item marketing'>
																		<img src={require('../../../images/theme/marketing.png')} />
																	</div>
																	<p>{translate('navigation.marketing-material')}</p>
																</Segment>
															</Dropdown.Menu>
														</Dropdown>
														<Dropdown text={translate('navigation.products')} className="services">
															<Dropdown.Menu className="sub-menu">
																<Segment className='custom-dropdown-item' as={Link} to='/managed-hosting'>
																	<div className='avatar-item desktop'>
																		<img src={require('../../../images/theme/desktop.png')} />
																	</div>
																	<p>{translate('navigation.managed-hosting')}</p>
																</Segment>
															</Dropdown.Menu>
														</Dropdown>
														<Dropdown.Item as={NavLink} to={lang=='en'?'/portfolio':'/no/portfolio'} text={translate('navigation.portfolio')} />
														{/* <Dropdown.Item as={NavLink} to='/features' text={translate('navigation.features')} /> */}
														<Dropdown.Item as={NavLink} to={lang=='en'?'/about':'/no/about'} text={translate('navigation.about')} />
														<Dropdown.Item as={NavLink} to={lang=='en'?'/blog':'/no/blog'} text={translate('navigation.blog')} />
														<Dropdown.Item as={NavLink} to={lang=='en'?'/contact':'/no/contact'} text={translate('navigation.contact')} />
														{/* <Dropdown.Item as={NavLink} to='/login' text='Login'/> */}
														{!isAuthenticated && <Dropdown.Item as={NavLink} to={lang=='en'?'/login':'/no/login'} className='login' text={translate('navigation.login')} onClick={(event) => this.triggerModal(event)} /> }
													</div>
													{isAdmin && isAuthenticated ?
														<Dropdown.Item as={NavLink} to='/admin/pages' text={translate('navigation.dashboard')} />
														: ''}
													{isAuthenticated && <Dropdown.Item onClick={this.handleLogout} text={translate('navigation.logout')} icon='sign out' key='logout' />}
												</Dropdown.Menu>
											</Dropdown>
										</Menu.Item>
									</Menu.Menu>
									<Menu.Item className="mobile-lang">
										{lang == 'en' ? <Button className="login" onClick={(event) => this.changeLang("nb")}>NO</Button> : <Button className="login" onClick={(event) => this.changeLang("en")}>EN</Button>}
									</Menu.Item>
								</div>
							</Menu>
						</Responsive>
						<Responsive as={Segment} style={{ margin: 0, borderRadius: '0', padding: 0, border: 0 }}
							className='navbar' minWidth={769}>
							<Menu pointing secondary size='large'>
								<Container className='custom-col-6'>
									{isAdmin && isAuthenticated && is_dashboard ?
										<Menu.Item as={Link} to={lang=='en'?'/':'/no'} className='logo' replace style={{ margin: 0, paddingTop: 10, paddingRight: 20, paddingBottom: 0, paddingLeft: 0, paddingTop: 12, height: '100%' }}>
											<img src={require('../../../images/theme/fantasy-logo.png')} /></Menu.Item>
										:
										<React.Fragment>
											<Menu.Item as={Link} to={lang=='en'?'/':'/no'} className='logo' replace style={{ margin: 0, padding: 0, paddingRight: 20, paddingTop: 12, height: '100%' }}>
												<img src={require('../../../images/theme/fantasy-logo.png')} /></Menu.Item>
											<Dropdown text={translate('navigation.services')} className='collapsible-menu nav-color services'>
												<Dropdown.Menu>
													<div className='custom-box'>
														<Container className='custom-col-6'>
															<Grid padded='horizontally'>
																<Grid.Row columns={6} className='custom-row'>
																	<Grid.Column className='custom-dropdown' as={Link} to={lang=='en'?'/web-development':'/no/web-development'}>
																		<div className='custom-dropdown-item desktop'>
																			<div className='avatar-item desktop'>
																				<img src={require('../../../images/theme/desktop.png')} />
																				<Icon name='arrow right' className='icon-right-arrow' />
																			</div>
																			<div className='text-item'>
																				<p>{translate("navigation.web-development")}</p>
																			</div>
																			<div className='description'>
																				<p>{translate("navigation.web-development-des")}</p>
																			</div>
																		</div>
																	</Grid.Column>
																	<Grid.Column className='custom-dropdown' as={Link} to={lang=='en'?'/mobile-development':'/no/mobile-development'}>
																		<div className='custom-dropdown-item mobile'>
																			<div className='avatar-item mobile'>
																				<img src={require('../../../images/theme/mobile.png')} />
																				<Icon name='arrow right' className='icon-right-arrow' />
																			</div>
																			<div className='text-item'>
																				<p>{translate("navigation.mobile-development")}</p>
																			</div>
																			<div className='description'>
																				<p>{translate("navigation.mobile-development-des")}</p>
																			</div>
																		</div>
																	</Grid.Column>
																	<Grid.Column className='custom-dropdown' as={Link} to={lang=='en'?'/ui-ux-design':'/no/ui-ux-design'}>
																		<div className='custom-dropdown-item ui'>
																			<div className='avatar-item ui'>
																				<img src={require('../../../images/theme/ui.png')} />
																				<Icon name='arrow right' className='icon-right-arrow' />
																			</div>
																			<div className='text-item'>
																				<p>{translate("navigation.ui-design")}</p>
																			</div>
																			<div className='description'>
																				<p>{translate("navigation.ui-design-des")}</p>
																			</div>
																		</div>
																	</Grid.Column>
																	<Grid.Column className='custom-dropdown' as={Link} to={lang=='en'?'/branding':'/no/branding'}>
																		<div className='custom-dropdown-item branding'>
																			<div className='avatar-item branding'>
																				<img src={require('../../../images/theme/branding.png')} />
																				<Icon name='arrow right' className='icon-right-arrow' />
																			</div>
																			<div className='text-item'>
																				<p>{translate("navigation.branding")}</p>
																			</div>
																			<div className='description'>
																				<p>{translate("navigation.branding-des")}</p>
																			</div>
																		</div>
																	</Grid.Column>
																	<Grid.Column className='custom-dropdown' as={Link} to={lang=='en'?'/illustration':'/no/illustration'}>
																		<div className='custom-dropdown-item illustration'>
																			<div className='avatar-item illustration'>
																				<img src={require('../../../images/theme/illustration.png')} />
																				<Icon name='arrow right' className='icon-right-arrow' />
																			</div>
																			<div className='text-item'>
																				<p>{translate("navigation.illustration")}</p>
																			</div>
																			<div className='description'>
																				<p>{translate("navigation.illustration-des")}</p>
																			</div>
																		</div>
																	</Grid.Column>
																	<Grid.Column className='custom-dropdown' as={Link} to={lang=='en'?'/marketing-material':'/no/marketing-material'}>
																		<div className='custom-dropdown-item marketing'>
																			<div className='avatar-item marketing'>
																				<img src={require('../../../images/theme/marketing.png')} />
																				<Icon name='arrow right' className='icon-right-arrow' />
																			</div>
																			<div className='text-item'>
																				<p>{translate("navigation.marketing-material")}</p>
																			</div>
																			<div className='description'>
																				<p>{translate("navigation.marketing-material-des")}</p>
																			</div>
																		</div>
																	</Grid.Column>
																	{/* <Grid.Column className='custom-dropdown' as={Link} to='/managed-hosting'>
																		<div className='custom-dropdown-item desktop'>
																			<div className='avatar-item desktop'>
																				<img src={require('../../../images/theme/desktop.png')} />
																				<Icon name='arrow right' className='icon-right-arrow' />
																			</div>
																			<div className='text-item'>
																				<p>{translate("navigation.managed-hosting")}</p>
																			</div>
																			<div className='description'>
																				<p>{translate("navigation.managed-hosting-des")}</p>
																			</div>
																		</div>
																	</Grid.Column> */}
																</Grid.Row>
															</Grid>
														</Container>
													</div>
												</Dropdown.Menu>
											</Dropdown>
											<Dropdown text={translate('navigation.products')} className='collapsible-menu nav-color services'>
												<Dropdown.Menu>
													<div className='custom-box'>
														<Container className='custom-col-6'>
															<Grid padded='horizontally'>
																<Grid.Row columns={6} className='custom-row' style={{justifyContent: 'flex-start'}}>
																	<Grid.Column className='custom-dropdown' as={Link} to={lang=='en'?'/managed-hosting':'/no/managed-hosting'}>
																		<div className='custom-dropdown-item hosting'>
																			<div className='avatar-item hosting'>
																				<img src={require('../../../images/theme/desktop.png')} />
																				<Icon name='arrow right' className='icon-right-arrow' />
																			</div>
																			<div className='text-item'>
																				<p>{translate("navigation.managed-hosting")}</p>
																			</div>
																			<div className='description'>
																				<p>{translate("navigation.managed-hosting-des")}</p>
																			</div>
																		</div>
																	</Grid.Column>
																</Grid.Row>
															</Grid>
														</Container>
													</div>
												</Dropdown.Menu>
											</Dropdown>
											<Menu.Item as={NavLink} to={lang=='en'?'/portfolio':'/no/portfolio'} className='nav-color portfolio'>{translate("navigation.portfolio")}</Menu.Item>
											{/* <Menu.Item as={NavLink} to='/features' className='nav-color features'>{translate("navigation.features")}</Menu.Item> */}
											<Menu.Item as={NavLink} to={lang=='en'?'/about':'/no/about'} className='nav-color about'>{translate("navigation.about")}</Menu.Item>
											<Menu.Item as={NavLink} to={lang=='en'?'/blog':'/no/blog'} className='nav-color blog'>{translate("navigation.blog")}</Menu.Item>
											<Menu.Item as={NavLink} to={lang=='en'?'/contact':'/no/contact'} className='nav-color contact'>{translate("navigation.contact")}</Menu.Item>
										</React.Fragment>
									}
									<Menu.Menu position='right' className='right-menu-width'>
										{isAuthenticated
											?
											(
												<React.Fragment>
													<Dropdown text={user_name} pointing='top right' className='user-dropdown'>
														<Dropdown.Menu>
															<Dropdown.Item
																text={translate('navigation.login-as') + user_name}
																disabled key='user' />
															{isAdmin ?
																<Dropdown.Item as={NavLink} to='/admin/pages' text={translate('navigation.dashboard')} />
																: ''
															}
															<Dropdown.Item onClick={this.handleLogout} text={translate('navigation.logout')} icon='sign out'
																key='logout' />
														</Dropdown.Menu>
													</Dropdown>
													{lang == 'en' ? <Button className="login" onClick={(event) => this.changeLang("nb")}>NO</Button> : <Button className="login" onClick={(event) => this.changeLang("en")}>EN</Button>}
												</React.Fragment>
											)
											: <Button.Group>
												{/* <Button as={Link} to='/login' className='login'>Login</Button> */}
												<Button as={Link} to={lang=='en'?'/login':'/no/login'} className='login' onClick={(event) => this.triggerModal(event)}>{translate("navigation.login")}</Button>
												<div className="register">
													{/* <Button as={Link} to='/register' className='primary-button'>Craft Enterprise</Button> */}
													<Button as={Link} to={lang=='en'?'/register':'/no/register'} className='primary-button' onClick={(event) => this.triggerModal(event)}>{translate("navigation.craft-enterprise")}</Button>
												</div>
												{lang == 'en' ? <Button className="login" onClick={(event) => this.changeLang("nb")}>NO</Button> : <Button className="login" onClick={(event) => this.changeLang("en")}>EN</Button>}
											</Button.Group>
										}
									</Menu.Menu>
								</Container>
							</Menu>
						</Responsive>
					</React.Fragment>)}
			</Translate>
		);
	}
}

export default withLocalize(withRouter(Page));