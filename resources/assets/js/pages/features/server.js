import React from 'react'
import { Header, Segment, Button } from 'semantic-ui-react'
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

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true
        };

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        this.setState({ isOpen: false });
        this.props.history.go(-1)
    }

    render() {
        const { isOpen } = this.state;
        let data = this.props.page;
        Modal.setAppElement('#app')
        return (
            <div className='features-page'>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    >
                    <Button icon='close' onClick={this.closeModal}/>
                    <h2>Hi,<br/>Visionary.</h2>
                    <p>Our web app is under development.</p>
                    <div className="button-group">
                        <Button as={Link} to='/contact' className='primary-button'>Contact us</Button>
                        <Button className='secondary-button' onClick={this.closeModal}>Close</Button> 
                    </div>
                </Modal>
                {!isOpen && <React.Fragment>
                    <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                        <Header as='h1'>Features</Header>
                    </Segment>
                </React.Fragment>}
            </div>
        );
    }
}

export default Page;