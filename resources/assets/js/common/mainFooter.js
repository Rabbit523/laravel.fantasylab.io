/**
 * Created by Sumit-Yadav on 12-10-2017.
 */
import React from 'react'
import { Container, Grid, Responsive } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='footer'>
                <Responsive style={{ margin: 0, borderRadius: '0', padding: 0 }}>
                    <Container className='custom-col-6'>
                        <Grid className='foobar' stackable>
                            <Grid.Row style={{ paddingBottom: 50, paddingTop: 30 }} columns={5}>
                                <Grid.Column>
                                    <div className='footer-title service'>
                                        <p>Services</p>
                                    </div>
                                    <div className='footer-item'>
                                        <Link to='/service-web' className='item-link'>Web Development</Link>
                                        <Link to='/service-mobile' className='item-link'>Mobile Development</Link>
                                        <Link to='/service-ui' className='item-link'>UI/UX Design</Link>
                                        <Link to='/service-branding' className='item-link'>Branding</Link>
                                        <Link to='/service-illustration' className='item-link'>Illustration</Link>
                                        <Link to='/service-marketing' className='item-link'>Marketing</Link>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='footer-title platform'>
                                        <p>Platform</p>
                                    </div>
                                    <div className='footer-item'>
                                        <Link to='/features' className='item-link'>Creatives</Link>
                                        <Link to='/features' className='item-link'>Features</Link>
                                        <Link to='/portfolio' className='item-link'>Portfolio</Link>
                                        <Link to='/portfolio' className='item-link'>Pricing</Link>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='footer-title company'>
                                        <p>Company</p>
                                    </div>
                                    <div className='footer-item'>
                                        <p></p>
                                        <Link to='/about' className='item-link'>About us</Link>
                                        <Link to='/blog' className='item-link'>Blog</Link>
                                        <Link to='/contact' className='item-link'>Contact</Link>
                                        <Link to='/blog' className='item-link'>Facebook</Link>
                                        <Link to='/contact' className='item-link'>Instagram</Link>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='footer-title started'>
                                        <p>Get Started</p>
                                    </div>
                                    <div className='footer-item'>
                                        <Link to='/login' className='item-link'>Start a project</Link>
                                        <Link to='/login' className='item-link'>Log in</Link>
                                        <Link to='/register' className='item-link'>Sign up</Link>
                                        <Link to='/login' className='item-link'>Apply as Designer</Link>
                                        <Link to='/register' className='item-link'>Apply as Developer</Link>
                                    </div>
                                </Grid.Column>
                                <Grid.Column>
                                    <div className='footer-title legal'>
                                        <p>Legal</p>
                                    </div>
                                    <div className='footer-item'>
                                        <Link to='/privacy' className='item-link'>Privacy</Link>
                                        <Link to='/privacy' className='item-link'>Security</Link>
                                        <Link to='/terms' className='item-link'>Terms</Link>
                                        <Link to='/terms' className='item-link'>Confidentiality</Link>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <img src={require('../../images/theme/logo.png')} alt='infoTiq' />
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