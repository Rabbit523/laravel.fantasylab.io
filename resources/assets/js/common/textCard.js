import React from 'react'
import PropTypes from 'prop-types'
import ReactHoverObserver from 'react-hover-observer';

class TextCard extends React.Component {
    constructor(props) {
        super(props);
        this.hoverStyle = {
            borderBottom: '2px solid',
            cursor: 'pointer',
            borderColor: props.color
        };   
    }
    render() {
        return (
            <ReactHoverObserver className='text-card-observer'>
                {({ isHovering }) => (
                    <div className='text-card' style={this.hoverStyle}>
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

TextCard.propTypes = {
    color: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string
};
export default TextCard;