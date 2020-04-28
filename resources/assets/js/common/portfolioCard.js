import React from 'react'
import PropTypes from 'prop-types'
import ReactHoverObserver from 'react-hover-observer';
import { Icon } from 'semantic-ui-react';
import { isMobile } from 'react-device-detect'

class PortfolioCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const item_hover = {
			backgroundImage: this.props.back_url ? `linear-gradient(to right bottom, rgba(20, 49, 144, 0.6), rgba(3, 5, 28, 0.7)),url(${this.props.back_url})` : 'linear-gradient(to bottom, #09133a 0%, #070e28 100%)',
			backgroundSize: 'cover',
			border: '2px solid #8341ff',
			boxShadow: '0 0 10px #8341ff',
			textShadow: '0 0 10px #8341ff',
			cursor: 'pointer'
		};
		const item_normal = {
			border: '2px solid transparent'
		};
		return (
			<ReactHoverObserver className='portfolio-item-observer'>
				{({ isHovering }) => (
					<div className='portfolio-item' style={isMobile ? item_hover : isHovering ? item_hover : item_normal}>
						{isHovering ?
							<div className='portfolio'>
								<div className='avatar'>
									<img src={`${this.props.icon_url}`} />
								</div>
								<Icon name='arrow right' className='icon-right-arrow' />
								<div className="hover-texts">
									<h3 className='hover-title'>{this.props.title}</h3>
									<p className='hover-des'>{this.props.description}</p>
								</div>
							</div>
							:
							<div className='portfolio'>
								<div className='avatar'>
									<img src={`${this.props.icon_url}`} />
								</div>
								{isMobile && <React.Fragment>
										<Icon name='arrow right' className='icon-right-arrow' />
										<div className="hover-texts">
											<h3 className='hover-title'>{this.props.title}</h3>
											<p className='hover-des'>{this.props.description}</p>
										</div>
									</React.Fragment>}
							</div>}
					</div>
				)}
			</ReactHoverObserver>
		);
	}
}

PortfolioCard.propTypes = {
	icon_url: PropTypes.string,
	back_url: PropTypes.string,
	type: PropTypes.string,
	title: PropTypes.string,
	description: PropTypes.string
};
export default PortfolioCard;