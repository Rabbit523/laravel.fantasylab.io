/**
 * Created by Sumit-Yadav on 16-10-2017.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

class PageHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='main-header' style={{backgroundImage: `url(${this.props.url})`}}>
                <Container className='custom-col-6'>
                    <div className='main-header-description'>
                        <h1>{this.props.title}</h1>
                    </div>
                </Container>
            </div>
        );
    }
}

PageHeader.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};
export default PageHeader;