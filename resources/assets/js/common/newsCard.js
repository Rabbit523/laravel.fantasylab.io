import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
class NewsCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='news-item'>
                <div className='figure'>
                    <img src={`${ this.props.url}`} />
                </div>
                <div className='news-content'>
                    <p className='title'>{this.props.title}</p>
                    <p className='normal'>{this.props.description}</p>
                    <p className='category'>By {this.props.author} in {this.props.type}</p>
                    <p className='normal'>{this.props.time} <span>&middot;</span> {this.props.read} read <span className='news-icon-arrow'><Icon name='arrow right'/></span></p>
                </div>
            </div>
        );
    }
}

NewsCard.propTypes = {
    url: PropTypes.string.isRequired,
    author:PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    read: PropTypes.string.isRequired
};
export default NewsCard;