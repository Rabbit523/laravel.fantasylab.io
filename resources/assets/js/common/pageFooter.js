/**
 * Created by Sumit-Yadav on 16-10-2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PageFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='main-footer' style={{backgroundImage: `url(${this.props.url})`}}>
                <Container className='custom-col-6'>
                    <div className='main-footer-description'>
                        <h2>Let's elevate the world.</h2>
                        <Button as={Link} to='/register' replace compact
                            className='register primary-button'>Craft Enterprise</Button>
                        <p>Existing user? <Link to='/login' className='item-link'>Log in to FantasyLab</Link>.</p>
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