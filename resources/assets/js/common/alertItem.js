import React from 'react'
import PropTypes from 'prop-types'
import ReactHoverObserver from 'react-hover-observer'
import Modal from 'react-modal'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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

class AlertItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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
		const { isOpen } = this.state;
		const { lang } = this.props;
		Modal.setAppElement('#app')

		return (
			<ReactHoverObserver className='alert-item-observer'>
				<React.Fragment>
					<Modal
						isOpen={isOpen}
						onRequestClose={this.closeModal}
						style={customStyles}
					>
						<Button icon='close' onClick={this.closeModal} />
						<h2>{lang == 'en' ? 'Hi,' : 'Hei,'}<br />{lang == 'en' ? 'visionary.' : 'visjonær.'}</h2>
						<p>{lang == 'en' ? 'Our web app is under development.' : 'Vår web app er under utvikling.'}</p>
						<div className="button-group">
							<Button as={Link} to={lang == 'en' ? '/contact' : '/no/kontakt'} className='primary-button'>{lang == 'en' ? 'Contact us' : 'Kontakt oss'}</Button>
							<Button className='secondary-button' onClick={this.closeModal}>{lang == 'en' ? 'Close' : 'Lukk'}</Button>
						</div>
					</Modal>
					<div className='alert-item'>
						<div className='text-item'>
							<div className="img-id">{this.props.id}</div>
							<p>{lang == 'en' ? this.props.data.title : this.props.data.no_title}</p>
						</div>
						<div className='description'>
							<p>{lang == 'en' ? this.props.data.des : this.props.data.no_des}</p>
						</div>
						<hr />
						<div className="options">
							<p className="title">{this.props.lang == 'en' ? "Consequences" : "Konsekvenser"}:</p>
							{this.props.data.items.map((item, i) => (
								<div className="item" key={i}>
									<img src="/images/minus-icon.svg" />
									<p>{this.props.lang == 'en' ? item.text : item.no_text}</p>
								</div>
							))}
						</div>
					</div>
				</React.Fragment>
			</ReactHoverObserver>
		);
	}
}

AlertItem.propTypes = {
	lang: PropTypes.string,
	data: PropTypes.object,
	id: PropTypes.number
};

export default AlertItem;