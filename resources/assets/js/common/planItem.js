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
								<Button className='primary-button' onClick={(event) => this.triggerModal(event)}>Get Started </Button>
							</div>
							<hr/>
							<div className='options'>
							{this.props.options.map((item, i) => (
								<div className="item" key={i}>
									<img src="/images/icon-check.png" />
									<p>{this.props.lang=='en'?item.title:item.no_title}</p>
									{item.info && 
										<Popup trigger={<img src='/images/icon-info.svg' className='popper'/>} position="left center">
											<div>{item.info}</div>
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