import React from 'react'
import PropTypes from 'prop-types'
import ReactHoverObserver from 'react-hover-observer';

const hoverStyle = {
    borderBottom: '2px solid #8341ff',
    cursor: 'pointer'
};
class GuideCard extends React.Component {
    render() {
        return (
            <ReactHoverObserver className='guide-card-observer'>
                {({ isHovering }) => (
                    <div className={this.props.from?'guide-card service':'guide-card'} style={isHovering?hoverStyle:null}>
                        <div className={`${this.props.from} avatar`}>
                            <img src={`${ this.props.avatar}`} />
                        </div>
                        <div className='title'>
                            <h3>{this.props.title}</h3>
                        </div>
                        <div className='description'>
                            <p>{this.props.description}</p>
                        </div>
                    </div>
                )}
            </ReactHoverObserver>
        );
    }
}

GuideCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    from: PropTypes.string
};
export default GuideCard;