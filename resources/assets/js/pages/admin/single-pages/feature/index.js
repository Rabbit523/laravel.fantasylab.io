import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import { Translate, withLocalize } from "react-localize-redux"

class Page extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		return (
			<Translate>
				{({ translate }) => (
					<React.Fragment>
						<Segment vertical textAlign='center' style={{ minHeight: '110vh', paddingTop: 70 }}>
							<Header as='h1'>Feature</Header>
						</Segment>
					</React.Fragment>
				)}
			</Translate>
		);
	}
}

export default withLocalize(Page);