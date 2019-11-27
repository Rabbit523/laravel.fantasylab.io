import React from 'react'
import PropTypes from 'prop-types'
import ReactHoverObserver from 'react-hover-observer'
import Modal from 'react-modal'
import { isMobile } from 'react-device-detect'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Popup from "reactjs-popup"

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

class PlanItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar_hover: {
				borderColor: this.props.color,
				color: this.props.color
			},
			isOpen: false
		};

		this.closeModal = this.closeModal.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
	}

	triggerModal(event) {
		event.preventDefault();
		this.setState({ isOpen: true });
	}

	closeModal() {
		this.setState({ isOpen: false });
	}

	render() {
		const item_hover = {
			backgroundImage: 'linear-gradient(to bottom, #09133a 0%, #070e28 100%)',
			backgroundSize: 'cover',
			borderBottom: '2px solid ' + this.props.color,
			cursor: 'pointer'
		};
		const { avatar_hover } = this.state;
		const { isOpen } = this.state;
		Modal.setAppElement('#app')

		return (
			<ReactHoverObserver className='plan-item-observer'>
				{({ isHovering }) => (
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
						<div className='plan-item' style={isMobile ? item_hover : isHovering ? item_hover : {}}>
							<div className='avatar-item' style={isMobile ? avatar_hover : isHovering ? avatar_hover : {}}>
								<img src={`${this.props.avatar}`} />
							</div>
							<div className='text-item'>
								<h3>{this.props.title}</h3>
								<p>{this.props.description}</p>
							</div>
							<hr/>
							<div className='description'>
								<h3>kr {this.props.cost},- <span>/ monthly</span></h3>
								<Button as={Link} to='/contact' className='primary-button'>{this.props.lang=='en'?'Contact Sales':'Kontakt salg'} </Button>
							</div>
							<hr/>
							<div className='options'>
							{this.props.options.map((item, i) => (
								<div className="item" key={i}>
									<img src="/images/icon-check.png" />
									<p>{this.props.lang=='en'?item.title:item.no_title}</p>
									{item.info && 
										<Popup trigger={<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="26" height="26" viewBox="0 0 26 26" className="popper"><path d="M 13 1.1875 C 6.476563 1.1875 1.1875 6.476563 1.1875 13 C 1.1875 19.523438 6.476563 24.8125 13 24.8125 C 19.523438 24.8125 24.8125 19.523438 24.8125 13 C 24.8125 6.476563 19.523438 1.1875 13 1.1875 Z M 15.460938 19.496094 C 14.851563 19.734375 14.367188 19.917969 14.003906 20.042969 C 13.640625 20.167969 13.222656 20.230469 12.742188 20.230469 C 12.007813 20.230469 11.433594 20.050781 11.023438 19.691406 C 10.617188 19.335938 10.414063 18.878906 10.414063 18.324219 C 10.414063 18.109375 10.429688 17.890625 10.460938 17.667969 C 10.488281 17.441406 10.539063 17.191406 10.605469 16.90625 L 11.367188 14.21875 C 11.433594 13.960938 11.492188 13.71875 11.539063 13.488281 C 11.585938 13.257813 11.605469 13.046875 11.605469 12.855469 C 11.605469 12.515625 11.535156 12.273438 11.394531 12.140625 C 11.25 12.003906 10.980469 11.9375 10.582031 11.9375 C 10.386719 11.9375 10.183594 11.96875 9.976563 12.027344 C 9.769531 12.089844 9.59375 12.148438 9.445313 12.203125 L 9.648438 11.375 C 10.144531 11.171875 10.621094 11 11.078125 10.855469 C 11.53125 10.710938 11.964844 10.636719 12.367188 10.636719 C 13.097656 10.636719 13.664063 10.816406 14.058594 11.167969 C 14.453125 11.519531 14.652344 11.980469 14.652344 12.542969 C 14.652344 12.660156 14.640625 12.867188 14.613281 13.160156 C 14.585938 13.453125 14.535156 13.722656 14.460938 13.972656 L 13.703125 16.652344 C 13.640625 16.867188 13.585938 17.113281 13.535156 17.386719 C 13.488281 17.660156 13.464844 17.871094 13.464844 18.011719 C 13.464844 18.367188 13.542969 18.613281 13.703125 18.742188 C 13.859375 18.871094 14.136719 18.933594 14.53125 18.933594 C 14.714844 18.933594 14.921875 18.902344 15.15625 18.839844 C 15.386719 18.773438 15.554688 18.71875 15.660156 18.667969 Z M 15.324219 8.617188 C 14.972656 8.945313 14.546875 9.109375 14.050781 9.109375 C 13.554688 9.109375 13.125 8.945313 12.769531 8.617188 C 12.414063 8.289063 12.238281 7.890625 12.238281 7.425781 C 12.238281 6.960938 12.417969 6.558594 12.769531 6.226563 C 13.125 5.894531 13.554688 5.730469 14.050781 5.730469 C 14.546875 5.730469 14.972656 5.894531 15.324219 6.226563 C 15.679688 6.558594 15.855469 6.960938 15.855469 7.425781 C 15.855469 7.890625 15.679688 8.289063 15.324219 8.617188 Z"></path></svg>} position="left center">
											<div>{this.props.lang == 'en' ? item.info : item.no_info}</div>
										</Popup>
									}
								</div>
							))}
							</div>
						</div>
					</React.Fragment>
				)}
			</ReactHoverObserver>
		);
	}
}

PlanItem.propTypes = {
	lang: PropTypes.string,
	avatar: PropTypes.string,
	cost: PropTypes.string,
	color: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string,
	options: PropTypes.array
};

export default PlanItem;