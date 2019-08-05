import React from 'react'
import PropTypes from 'prop-types'
import ReactHoverObserver from 'react-hover-observer';
import { Icon } from 'semantic-ui-react';

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
        return (
            <ReactHoverObserver className='service-item-observer'>
                {({ isHovering }) => (
                    <div className='service-item' style={isHovering?item_hover:{}}>
                        <div className='avatar-item' style={isHovering?this.state.avatar_hover:{}}>
                            <img src={`${ this.props.url}`} />
                            {isHovering?this.props.from?<Icon name='arrow right' className='icon-right-arrow'/>:'':''}
                        </div>
                        <div className='text-item'>
                            <p>{this.props.title}</p>
                        </div>
                        {this.props.description && <div className='description' style={isHovering?this.state.des_hover:{}}>
                            <p>{this.props.description}</p>
                        </div>}
                    </div>
                )}
            </ReactHoverObserver>
        );
    }
}

ServiceItem.propTypes = {
    url: PropTypes.string.isRequired,
    backimage: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    from: PropTypes.string
};
export default ServiceItem;