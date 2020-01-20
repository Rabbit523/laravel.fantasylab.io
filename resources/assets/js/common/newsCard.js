import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'
import ReactHoverObserver from 'react-hover-observer';
class NewsCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ReactHoverObserver>
				{({ isHovering }) => (
					<div className='news-item'>
						<div className='figure'>
							<img src={`${this.props.url}`} />
						</div>
						<div className='news-content'>
							<h3>{this.props.title}</h3>
							{isHovering && this.props.description && <p className='normal'>{this.props.description}</p>}
							<p className='category'>{this.props.lang == 'en' ? 'By' : 'Av'} {this.props.author} {this.props.lang == 'en' ? 'in' : 'i'} {this.props.type}</p>
							<p className='normal'>{this.props.time} <span>&middot;</span> {this.props.read} {this.props.lang == 'en' ? 'read' : 'lesing'} <span className='news-icon-arrow'><Icon name='arrow right' /></span></p>
						</div>
					</div>
				)}
			</ReactHoverObserver>
		);
	}
}

NewsCard.propTypes = {
	url: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	read: PropTypes.string.isRequired,
	lang: PropTypes.string
};
export default NewsCard;