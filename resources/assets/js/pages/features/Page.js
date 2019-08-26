import React from 'react'
import { Header, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal';
import PageMetaTag from '../../common/pageMetaTag'
import Http from '../../Http'

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
            isLoaded: false,
            isOpen: true
        };

        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        Http.post('api/front/get-page', { name: 'features' })
        .then(
            res => {
                this.setState({ isLoaded: true, data: JSON.parse(res.data.data) });
                window.scrollTo(0, 0);
            }
        ).catch(err => {
            console.error(err);
        });
    }

    closeModal() {
        this.setState({ isOpen: false });
        this.props.history.go(-1)
    }

    render() {
        const { isLoaded, isOpen, data } = this.state;
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
                    <p>Our website is under development.</p>
                    <div className="button-group">
                        <Button as={Link} to='/contact' className='primary-button'>Contact us</Button>
                        <Button className='secondary-button' onClick={this.closeModal}>Close</Button> 
                    </div>
                </Modal>
                {isLoaded && !isOpen ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                            <Header as='h1'>Features</Header>
                        </Segment>
                    </React.Fragment>
                    :
                    <Segment className='page-loader'>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading...</Loader>
                        </Dimmer>
                    </Segment>
                }
            </div>
        );
    }
}

export default Page;