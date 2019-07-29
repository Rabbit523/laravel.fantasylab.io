import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

class HeadquaterItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="headquater-card">
                <div className="avatar">
                    <img src={`${ this.props.avatar}`} />
                </div>
                <div className="title">
                    <p>{this.props.title}</p>
                </div>
                <div className="description">
                    <p>{this.props.description}</p>
                </div>
                <Button className="primary-button headquater-button">{this.props.button}</Button>
            </div>
        )
    }
}

HeadquaterItem.propTypes = {
    avatar: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    button: PropTypes.string.isRequired
};
export default HeadquaterItem;