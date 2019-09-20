import React from 'react'
import PropTypes from 'prop-types'
import ReactHoverObserver from 'react-hover-observer';
import { Icon } from 'semantic-ui-react';
import {isMobile} from 'react-device-detect'

class ServiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            des_hover: {
                display: 'block'
            },
            avatar_hover: {
                borderColor: this.props.color,
                color: this.props.color
            },
            arrow_color : {
                color: this.props.color
            }
        };
    }

    render() {
        const item_hover = {
            backgroundImage: this.props.backimage?`linear-gradient(to right bottom, rgba(20, 49, 144, 0.6), rgba(3, 5, 28, 0.7)),url(${ this.props.backimage})`:'linear-gradient(to bottom, #09133a 0%, #070e28 100%)',
            backgroundSize: 'cover',
            borderBottom: '2px solid ' + this.props.color,
            cursor: 'pointer'
        };
        const { des_hover, avatar_hover, arrow_color } = this.state;
        return (
            <ReactHoverObserver className='service-item-observer'>
                {({ isHovering }) => (
                    <div className='service-item' style={isMobile?item_hover:isHovering?item_hover:{}}>
                        {isHovering?this.props.from?<Icon name='arrow right' className='icon-right-arrow' style={arrow_color}/>:'':''}
                        <div className='avatar-item' style={isHovering?avatar_hover:{}}>
                            <img src={`${ this.props.avatar}`} />
                        </div>
                        <div className='text-item'>
                            <h3>{this.props.title}</h3>
                        </div>
                        {this.props.description && <div className='description' style={isMobile?des_hover:isHovering?des_hover:{}}>
                            <p>{this.props.description}</p>
                        </div>}
                    </div>
                )}
            </ReactHoverObserver>
        );
    }
}

ServiceItem.propTypes = {
    avatar: PropTypes.string,
    backimage: PropTypes.string,
    color: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    from: PropTypes.string
};
export default ServiceItem;