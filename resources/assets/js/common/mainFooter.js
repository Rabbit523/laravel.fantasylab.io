/**
 * Created by Sumit-Yadav on 12-10-2017.
 */
import React from 'react'
import { Container, Grid, Responsive, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {isMobileOnly, isTablet} from 'react-device-detect'
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

    render() {
        const { isOpen } = this.state;
        Modal.setAppElement('#app')
        return (
            <div className='footer'>
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
                <Responsive style={{ margin: 0, borderRadius: '0', padding: 0 }}>
                    <Container className='custom-col-6'>
                        <Grid className='foobar' stackable>
                            <Grid.Row style={{ paddingBottom: 50, paddingTop: 30 }} columns={5}>
                                <Grid.Column>
                                    <div className='footer-title service'>
                                        <h4>Services</h4>
                                    </div>
                                    <div className='footer-item'>
                                        <Link to='/web-development' className='item-link'>Web Development</Link>
                                        <Link to='/mobile-development' className='item-link'>Mobile Development</Link>
                                        <Link to='/ui-ux-design' className='item-link'>UI & UX Design</Link>
                                        <Link to='/branding' className='item-link'>Branding</Link>
                                        <Link to='/illustration' className='item-link'>Illustration</Link>
                                        <Link to='/marketing-material' className='item-link'>Marketing</Link>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='footer-title platform'>
                                        <h4>Platform</h4>
                                    </div>
                                    <div className='footer-item'>
                                        <Link to='/features' className='item-link' onClick={(event) => this.triggerModal(event)}>Creatives</Link>
                                        <Link to='/features' className='item-link' onClick={(event) => this.triggerModal(event)}>Features</Link>
                                        <Link to='/portfolio' className='item-link'>Portfolio</Link>
                                        <Link to='/portfolio' className='item-link' onClick={(event) => this.triggerModal(event)}>Pricing</Link>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='footer-title company'>
                                        <h4>Company</h4>
                                    </div>
                                    <div className='footer-item'>
                                        <h4></h4>
                                        <Link to='/about' className='item-link'>About us</Link>
                                        <Link to='/blog' className='item-link' onClick={(event) => this.triggerModal(event)}>Blog</Link>
                                        <Link to='/contact' className='item-link'>Contact</Link>
                                        <a href='https://www.facebook.com/fantasylab.io/' target="_blank" className='item-link'>Facebook</a>
                                        <a href='https://www.instagram.com/fantasylab.io/' target="_blank" className='item-link'>Instagram</a>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='footer-title started'>
                                        <h4>Get Started</h4>
                                    </div>
                                    <div className='footer-item'>
                                        <Link to='/login' className='item-link' onClick={(event) => this.triggerModal(event)}>Craft Enterprise</Link>
                                        <Link to='/login' className='item-link' onClick={(event) => this.triggerModal(event)}>Log in</Link>
                                        <Link to='/register' className='item-link' onClick={(event) => this.triggerModal(event)}>Sign up</Link>
                                        <Link to='/login' className='item-link' onClick={(event) => this.triggerModal(event)}>Apply as Designer</Link>
                                        <Link to='/register' className='item-link' onClick={(event) => this.triggerModal(event)}>Apply as Developer</Link>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='footer-title legal'>
                                        <h4>Legal</h4>
                                    </div>
                                    <div className='footer-item'>
                                        <Link to={{ pathname: '/privacy', state:{ pagename: 'privacy' } }} className='item-link'>Privacy</Link>
                                        <Link to={{ pathname: '/security', state:{ pagename: 'security' } }} className='item-link'>Data Processor</Link>
                                        <Link to={{ pathname: '/terms', state:{ pagename: 'terms' } }} className='item-link'>Terms</Link>
                                        <Link to={{ pathname: '/confidentiality', state:{ pagename: 'confidentiality' } }} className='item-link'>Confidentiality</Link>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <img src={(!isMobileOnly && !isTablet) ? require('../../images/theme/fantasy-logo.png'):require('../../images/theme/logo.png')} />
                                </Grid.Column>
                                <Grid.Column textAlign='right'>
                                    <h5>© + TM 2019 FantasyLab AS, NO 922 982 376 MVA</h5>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Container>
                </Responsive>
            </div>
        );
    }
}

export default Footer;