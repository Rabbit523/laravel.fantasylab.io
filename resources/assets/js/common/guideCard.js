import React from 'react'
import PropTypes from 'prop-types'
import ReactHoverObserver from 'react-hover-observer';

const hoverStyle = {
    borderBottom: '2px solid #8341ff',
    cursor: 'pointer'
};
const serviceWebStyle = {
    display: 'inline-block',
    width: 100,
    height: 80
}
const serviceMobileStyle = {
    display: 'inline-block',
    width: 70,
    height: 90
}
const serviceUIStyle = {
    display: 'inline-block',
    width: 60,
    height: 80
}
var aboutStyle = {
    display: 'inline-block',
    width: 50,
    height: 50,
    marginBottom: 20
}
class GuideCard extends React.Component {
    render() {
        switch(this.props.from) {
            case 'service_web':
                aboutStyle = serviceWebStyle;
                break;
            case 'service_mobile':
                aboutStyle = serviceMobileStyle;
                break;
            case 'service_ui':
                aboutStyle = serviceUIStyle;
                break;
        }
        return (
            <ReactHoverObserver className='guide-card-observer'>
                {({ isHovering }) => (
                    <div className={this.props.from?'guide-card service':'guide-card'} style={isHovering?hoverStyle:null}>
                        <div className='avatar' style={aboutStyle}>
                            <img src={`${ this.props.avatar}`} />
                        </div>
                        <div className='title'>
                            <p>{this.props.title}</p>
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