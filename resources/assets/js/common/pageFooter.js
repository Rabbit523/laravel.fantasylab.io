/**
 * Created by Sumit-Yadav on 16-10-2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';

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

class PageFooter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpen: false
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
        const { isOpen } = this.state;
        Modal.setAppElement('#app')
        return (
            <div className='main-footer' style={{backgroundImage: `url(${this.props.url})`}}>
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
                <Container className='custom-col-6'>
                    <div className='main-footer-description'>
                        <h2>Let's elevate the world.</h2>
                        {/* <Button as={Link} to='/register' className='register primary-button'>Craft Enterprise</Button> */}
                        <Button className='register primary-button' onClick={(event) => this.triggerModal(event)}>Craft Enterprise</Button>
                        <p>Existing user? <Link to='/login' className='item-link' onClick={(event) => this.triggerModal(event)}>Log in to FantasyLab</Link>.</p>
                    </div>
                </Container>
            </div>
        );
    }
}

PageFooter.propTypes = {
    url: PropTypes.string.isRequired
};
export default PageFooter;