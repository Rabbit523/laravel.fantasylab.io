import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
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

class HeadquaterItem extends React.Component {
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

	render() {
		const { isOpen } = this.state;
		const { lang } = this.props;
		Modal.setAppElement('#app')
		return (
			<React.Fragment>
				<Modal
					isOpen={isOpen}
					onRequestClose={this.closeModal}
					style={customStyles}
				>
					<Button icon='close' onClick={this.closeModal} />
					<h2>{this.props.lang == 'en' ? 'Thank you,' : 'Takk skal du ha,'} <br />{this.props.lang == 'en' ? 'Visionary.' : 'Visjonær.' }</h2>
                  	<p>{this.props.lang == 'en' ? 'We have received your request. We will get in touch within 24 hours.' : 'Vi har mottatt forespørselen din. Vi tar kontakt innen 24 timer.'}</p>
					<div className="button-group">
						<Button as={Link} to={lang=='en'?'/contact':'/no/kontakt'} className='primary-button'>{this.props.lang == 'en' ? 'Contact us' : 'kontakt oss'}</Button>
						<Button className='secondary-button' onClick={this.closeModal}>{this.props.lang == 'en' ? 'Close' : 'Lukk'}</Button>
					</div>
				</Modal>
				<div className="headquater-card">
					<div className="avatar">
						<img src={`${this.props.avatar}`} />
					</div>
					<div className="title">
						<h3>{this.props.title == 'Live Chat' ? 'Vist us' : this.props.title}</h3>
					</div>
					<div className="description">
						<p>{this.props.description}</p>
					</div>
					{this.props.type == 'call' && <a href={`tel:${this.props.button}`} className="primary-button headquater-button">{this.props.lang == 'en' ? 'Call Us' : 'Ring oss'}</a>}
					{this.props.type == 'email' && <a href='mailto:support@fantasylab.io' className="primary-button headquater-button">{this.props.button}</a>}
					{this.props.type == 'chat' && <a href='https://www.google.com/maps/place/Selma+Ellefsens+Vei+2,+0581+Oslo/@59.9258526,10.8067645,17z/data=!3m1!4b1!4m5!3m4!1s0x46416fb461bfa19f:0x63b68cd75645a10d!8m2!3d59.9258499!4d10.8089532' className="primary-button headquater-button" target="_blank">{this.props.lang == 'en'?'View Map':'Vis kart'}</a>}
					{this.props.type == 'start' && <Button className="primary-button headquater-button" onClick={(event) => this.triggerModal(event)}>{this.props.button}</Button>}
				</div>
			</React.Fragment>
		)
	}
}

HeadquaterItem.propTypes = {
	type: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	button: PropTypes.string.isRequired,
	lang: PropTypes.string
};
export default HeadquaterItem;