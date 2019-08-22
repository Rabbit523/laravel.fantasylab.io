import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const customStyles = {
    content : {
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
        Modal.setAppElement('#app')
        return (
            <React.Fragment>
                 <Modal
                    isOpen={isOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    >
                    <Button icon='close' onClick={this.closeModal}/>
                    <h2>Hi,<br/>Visionary.</h2>
                    <p>Our website is under development.</p>
                    <div className="button-group">
                        <Button as={Link} to='/contact' className='primary-button'>Contact us</Button>
                        <Button className='secondary-button' onClick={this.closeModal}>Close</Button> 
                    </div>
                </Modal>
                <div className="headquater-card">
                    <div className="avatar">
                        <img src={`${ this.props.avatar}`} />
                    </div>
                    <div className="title">
                        <h3>{this.props.title=='Live Chat'?'Vist us':this.props.title}</h3>
                    </div>
                    <div className="description">
                        <p>{this.props.description}</p>
                    </div>
                    { this.props.title=='Call us' && <a href={`tel:${ this.props.button}`} className="primary-button headquater-button">Call Us</a> }
                    { this.props.title=='Send email' && <a href='mailto:support@fantasylab.io' className="primary-button headquater-button">{this.props.button}</a> }
                    { this.props.title=='Live Chat' && <a href='https://www.google.com/maps/place/Selma+Ellefsens+Vei+2,+0581+Oslo/@59.9258526,10.8067645,17z/data=!3m1!4b1!4m5!3m4!1s0x46416fb461bfa19f:0x63b68cd75645a10d!8m2!3d59.9258499!4d10.8089532' className="primary-button headquater-button" target="_blank">View Map</a> }
                    { this.props.title=='Get started' || this.props.title=='Start a Project' && <Button className="primary-button headquater-button" onClick={(event) => this.triggerModal(event)}>{this.props.button}</Button> }
                </div>
            </React.Fragment>
        )
    }
}

HeadquaterItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired
};
export default HeadquaterItem;