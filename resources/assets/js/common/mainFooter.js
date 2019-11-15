/**
 * Created by Sumit-Yadav on 12-10-2017.
 */
import React from 'react'
import {connect} from 'react-redux'
import { Container, Grid, Button, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import { isMobileOnly } from 'react-device-detect'
import { setLang } from '../services/authService'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

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
			isOpen: false
		}

		this.closeModal = this.closeModal.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
	}

	closeModal() {
		this.setState({ isOpen: false });
	}

	triggerModal(event) {
		event.preventDefault();
		this.setState({ isOpen: true });
	}

	changeLang(val) {
		this.props.dispatch(setLang(val));
	}

	render() {
		const { isOpen } = this.state;
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
							<h2>Hi,<br />Visionary.</h2>
							<p>Our web app is under development.</p>
							<div className="button-group">
								<Button as={Link} to='/contact' className='primary-button'>Contact us</Button>
								<Button className='secondary-button' onClick={this.closeModal}>Close</Button>
							</div>
						</Modal>
						<Container className='custom-col-6'>
							<Grid style={{ paddingBottom: 50, paddingTop: 30 }} columns={5}>
								<Grid.Column mobile={16} tablet={3} computer={3}>
									<div className='footer-title service'>
										<h4>{translate('navigation.services')}</h4>
									</div>
									<div className='footer-item'>
										<Link to='/web-development' className='item-link'>{translate('navigation.web-development')}</Link>
										<Link to='/mobile-development' className='item-link'>{translate('navigation.mobile-development')}</Link>
										<Link to='/ui-ux-design' className='item-link'>{translate('navigation.ui-design')}</Link>
										<Link to='/branding' className='item-link'>{translate('navigation.branding')}</Link>
										<Link to='/illustration' className='item-link'>{translate('navigation.illustration')}</Link>
										<Link to='/marketing-material' className='item-link'>{translate('footer.marketing')}</Link>
									</div>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={3} computer={3}>
									<div className='footer-title platform'>
										<h4>{translate('footer.platform')}</h4>
									</div>
									<div className='footer-item'>
										<Link to='/features' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.creatives')}</Link>
										<Link to='/features' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('navigation.features')}</Link>
										<Link to='/portfolio' className='item-link'>{translate('navigation.portfolio')}</Link>
										<Link to='/portfolio' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.pricing')}</Link>
									</div>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={3} computer={3}>
									<div className='footer-title company'>
										<h4>{translate('footer.company')}</h4>
									</div>
									<div className='footer-item'>
										<h4></h4>
										<Link to='/about' className='item-link'>{translate('footer.about-us')}</Link>
										<Link to='/blog' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('navigation.blog')}</Link>
										<Link to='/contact' className='item-link'>{translate('navigation.contact')}</Link>
										<a href='https://www.facebook.com/fantasylab.io/' target="_blank" className='item-link'>Facebook</a>
										<a href='https://www.instagram.com/fantasylab.io/' target="_blank" className='item-link'>Instagram</a>
									</div>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={4} computer={4}>
									<div className='footer-title started'>
										<h4>{translate('footer.get-started')}</h4>
									</div>
									<div className='footer-item'>
										<Link to='/login' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('navigation.craft-enterprise')}</Link>
										<Link to='/login' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('navigation.login')}</Link>
										<Link to='/register' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.signup')}</Link>
										<Link to='/login' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.apply-as-designer')}</Link>
										<Link to='/register' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('footer.apply-as-developer')}</Link>
									</div>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={3} computer={3}>
									<div className='footer-title legal'>
										<h4>{translate('footer.legal')}</h4>
									</div>
									<div className='footer-item'>
										<Link to={{ pathname: '/privacy', state: { pagename: 'privacy' } }} className='item-link'>{translate('footer.privacy')}</Link>
										<Link to={{ pathname: '/security', state: { pagename: 'security' } }} className='item-link'>{translate('footer.data-processor')}</Link>
										<Link to={{ pathname: '/terms', state: { pagename: 'terms' } }} className='item-link'>{translate('footer.terms')}</Link>
										<Link to={{ pathname: '/confidentiality', state: { pagename: 'confidentiality' } }} className='item-link'>{translate('footer.confidentiality')}</Link>
									</div>
								</Grid.Column>
							</Grid>
							<Grid columns={2} style={{ margin: 0, padding: 0 }}>
								<Grid.Column mobile={16} tablet={12} computer={12} style={{ display: 'flex', alignItems: 'center', padding: '10px 0px' }}>
									<img src={isMobileOnly ? require('../../images/theme/logo.png') : require('../../images/theme/fantasy-logo.png')} />
									<h5>© + TM 2019 FantasyLab AS, NO 922 982 376 MVA</h5>
								</Grid.Column>
								<Grid.Column mobile={16} tablet={4} computer={4} className="footer-lang" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '10px 0px' }}>
									<h5>{translate('footer.language')} </h5>
									{/* <Dropdown text={this.props.lang == 'en' ? 'English' : 'Norsk'}>
										<Dropdown.Menu>
											{this.props.lang == 'en' ? 
												<Dropdown.Item text= 'Norsk' onClick={(event) => this.changeLang("no")} /> 
												:<Dropdown.Item text='English' onClick={(event) => this.changeLang("en")} /> }
										</Dropdown.Menu>
									</Dropdown> */}
								</Grid.Column>
							</Grid>
						</Container>
					</div>
				)}
			</Translate>
		);
	}
}

Footer.propTypes = {
	dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    lang: state.Auth.lang
  }
};
export default withLocalize(connect(mapStateToProps, null)(Footer));