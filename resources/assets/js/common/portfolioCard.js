import React from 'react'
import PropTypes from 'prop-types'

class PortfolioCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='portfolio-item'>
                {this.props.from == 'home' ? 
                    <div className='portfolio'>
                        <img src={`${ this.props.icon_url}`} />
                    </div>
                : 
                    <div className='portfolio-text'>
                        <p>{this.props.title}</p>
                        <p className='portfolio-des'>{this.props.description}</p>
                    </div>
                }
            </div>
        );
    }
}

PortfolioCard.propTypes = {
    from: PropTypes.string.isRequired,
    icon_url: PropTypes.string,
    back_url: PropTypes.string,
    type:PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
};
export default PortfolioCard;