import React from 'react'
import { Button, Container, Grid, Dimmer, Segment, Loader, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import Modal from 'react-modal'
import Http from '../../Http'

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

class WPServiceServer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			isOpen: false,
			data: []
		};
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
		return (
			<React.Fragment>
				
			</React.Fragment>
		)
	}
}

export default WPServiceServer;