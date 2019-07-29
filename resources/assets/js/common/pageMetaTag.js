import React from 'react'
import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';

class pageMetaTag extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MetaTags>
                <title>{this.props.meta_title} - FantasyLab</title>
                <meta name="description" content={this.props.meta_description} />
            </MetaTags>
        );
    }
}

pageMetaTag.propTypes = {
    meta_title: PropTypes.string,
    meta_description: PropTypes.string
};
export default pageMetaTag;