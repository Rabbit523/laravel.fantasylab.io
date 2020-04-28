/**
 * Created by Sumit-Yadav on 12-10-2017.
 */
import React from 'react'
import { Container, Grid, Button, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import { isMobileOnly } from 'react-device-detect'
import Modal from 'react-modal'

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

class Footer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: false,
			lang: "en"
		}

		this.closeModal = this.closeModal.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
	}

	componentDidMount() {
		this.setState({ lang: localStorage.getItem('locale') });
	}

	closeModal() {
		this.setState({ isOpen: false });
	}

	triggerModal(event) {
		event.preventDefault();
		this.setState({ isOpen: true });
	}

	changeLang(val) {
		localStorage.setItem('locale', val);
		this.props.setActiveLanguage(val);
		this.setState({ lang: val });
	}

	render() {
		const { isOpen } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		Modal.setAppElement('#app')
		return (
			<Translate>
				{({ translate }) => (
					<div className='footer'>
						<Modal
							isOpen={isOpen}
							onRequestClose={this.closeModal}
							style={customStyles}
						>
							<Button icon='close' onClick={this.closeModal} />
							<h2>{lang=='en' ? 'Hi,' : 'Hei,'}<br />{lang=='en'?'visionary.':'visjonær.'}</h2>
							<p>{lang=='en' ? 'Our web app is under development.' : 'Vår web app er under utvikling.'}</p>
							<div className="button-group">
								<Button as={Link} to={lang=='en'?'/contact':'/no/kontakt'} className='primary-button'>{lang=='en'?'Contact us':'Kontakt oss'}</Button>
								<Button className='secondary-button' onClick={this.closeModal}>{lang=='en'?'Close':'Lukk'}</Button>
							</div>
						</Modal>
						<Container className='custom-col-6'>
							<Grid style={{ paddingBottom: 50, paddingTop: 30 }} columns={5}>
								<Grid.Column mobile={16} tablet={3} computer={3}>
									<div className='footer-title service'>
										<h4>{translate('navigation.services')}</h4>
									</div>
									<div className='footer-item'>
										<Link to={lang=='en'?'/web-development':'/no/webutvikling'} className='item-link'>{translate('navigation.web-development')}</Link>
										<Link to={lang=='en'?'/mobile-development':'/no/mobilutvikling'} className='item-link'>{translate('navigation.mobile-development')}</Link>
										<Link to={lang=='en'?'/ui-ux-design':'/no/ui-ux-design'} className='item-link'>{translate('navigation.ui-design')}</Link>
										<Link to={lang=='en'?'/branding':'/no/merkevarebygging'} className='item-link'>{translate('navigation.branding')}</Link>
										<Link to={lang=='en'?'/illustration':'/no/illustrasjon'} className='item-link'>{translate('navigation.illustration')}</Link>
										<Link to={lang=='en'?'/marketing-material':'/no/markedsføringsmateriell'} className='item-link'>{translate('footer.marketing')}</Link>
									</div>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={3} computer={3}>
									<div className='footer-title platform'>
										<h4>{translate('footer.platform')}</h4>
									</div>
									<div className='footer-item'>
										<Link to={lang=='en'?'/features':'/no/funksjoner'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.creatives')}</Link>
										<Link to={lang=='en'?'/features':'/no/funksjoner'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('navigation.features')}</Link>
										<Link to={lang=='en'?'/portfolio':'/no/portefolje'} className='item-link'>{translate('navigation.portfolio')}</Link>
										<Link to={lang=='en'?'/portfolio':'/no/portefolje'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.pricing')}</Link>
									</div>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={3} computer={3}>
									<div className='footer-title company'>
										<h4>{translate('footer.company')}</h4>
									</div>
									<div className='footer-item'>
										<Link to={lang=='en'?'/about':'/no/om-oss'} className='item-link'>{translate('footer.about-us')}</Link>
										<Link to={lang=='en'?'/blog':'/no/blogg'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('navigation.blog')}</Link>
										<Link to={lang=='en'?'/contact':'/no/kontakt'} className='item-link'>{translate('navigation.contact')}</Link>
										<a href='https://www.facebook.com/fantasylab.io/' target="_blank" className='item-link'>Facebook</a>
										<a href='https://www.instagram.com/fantasylab.io/' target="_blank" className='item-link'>Instagram</a>
									</div>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={4} computer={4}>
									<div className='footer-title started'>
										<h4>{translate('footer.get-started')}</h4>
									</div>
									<div className='footer-item'>
										<Link to={lang=='en'?'/login':'/no/logginn'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('navigation.craft-enterprise')}</Link>
										<Link to={lang=='en'?'/login':'/no/logginn'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('navigation.login')}</Link>
										<Link to={lang=='en'?'/register':'/no/start-prosjekt'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.signup')}</Link>
										<Link to={lang=='en'?'/login':'/no/logginn'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.apply-as-designer')}</Link>
										<Link to={lang=='en'?'/register':'/no/start-prosjekt'} className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.apply-as-developer')}</Link>
									</div>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={3} computer={3}>
									<div className='footer-title legal'>
										<h4>{translate('footer.legal')}</h4>
									</div>
									<div className='footer-item'>
										<Link to={{ pathname: lang=='en'?'/privacy':'/no/personvern', state: { pagename: 'privacy' } }} className='item-link'>{translate('footer.privacy')}</Link>
										<Link to={{ pathname: lang=='en'?'/data-processor':'/no/databehandler', state: { pagename: 'data-processor' } }} className='item-link'>{translate('footer.data-processor')}</Link>
										<Link to={{ pathname: lang=='en'?'/terms':'/no/vilkar', state: { pagename: 'terms' } }} className='item-link'>{translate('footer.terms')}</Link>
										<Link to={{ pathname: lang=='en'?'/confidentiality':'/no/konfidensialitet', state: { pagename: 'confidentiality' } }} className='item-link'>{translate('footer.confidentiality')}</Link>
									</div>
								</Grid.Column>
							</Grid>
							<Grid columns={2} style={{ margin: 0, padding: 0 }}>
								<Grid.Column mobile={16} tablet={12} computer={12} style={{ display: 'flex', alignItems: 'center', padding: '10px 0px' }}>
									<img src={isMobileOnly ? require('../../images/theme/logo.png') : require('../../images/theme/fantasy-logo.png')} />
									<h5>© + TM 2020 FantasyLab AS, NO 922 982 376 MVA</h5>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={4} computer={4} className="footer-lang" style={{ display: 'flex', alignItems: 'center', padding: '10px 0px' }}>
									<h5>{translate('footer.language')} </h5>
									<Dropdown text={lang == 'en' ? 'English' : 'Norsk'}>
										<Dropdown.Menu>
											{lang == 'en' ? 
												<Dropdown.Item text= 'Norsk' onClick={(event) => this.changeLang("nb")} />
												:<Dropdown.Item text='English' onClick={(event) => this.changeLang("en")} /> }
										</Dropdown.Menu>
									</Dropdown>
								</Grid.Column>
							</Grid>
						</Container>
					</div>
				)}
			</Translate>
		);
	}
}

export default withLocalize(Footer);