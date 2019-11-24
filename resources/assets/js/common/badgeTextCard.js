import React from 'react'
import PropTypes from 'prop-types'

const serviceStyle = {
	alignItems: 'center',
	textAlign: 'center'
};
const homeStyle = {
	alignItems: 'left',
	textAlign: 'left'
};
class BadgeTextCard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='badge-item' style={this.props.from == "service" ? serviceStyle : homeStyle}>
				<div className='badge-img'>
					<img src={`${this.props.url}`} />
					<p>{this.props.number}</p>
				</div>
				<div className='badge-title'>
					<h3>{this.props.title}</h3>
				</div>
				<div className='badge-description'>
					<p>{this.props.description}</p>
				</div>
			</div>
		);
	}
}

BadgeTextCard.propTypes = {
	url: PropTypes.string.isRequired,
	number: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	from: PropTypes.string
};
export default BadgeTextCard;