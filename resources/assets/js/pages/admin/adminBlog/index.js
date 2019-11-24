import React from 'react'
import { Button, Container, Grid, Header, Icon, Responsive, Segment, Step } from 'semantic-ui-react'
class Page extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		return (
			<React.Fragment>
				<Segment vertical textAlign='center' style={{ minHeight: '110vh', paddingTop: 70 }}>
					<Header as='h1'>Blogs</Header>
				</Segment>
			</React.Fragment>
		);
	}
}

export default Page;