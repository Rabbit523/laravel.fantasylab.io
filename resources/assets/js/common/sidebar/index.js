import React from 'react'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import { Icon, Menu, Sidebar } from 'semantic-ui-react'

class AdminSidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Translate>
				{({ translate }) => (
					<React.Fragment>
						<Sidebar as={Menu} animation='push' direction='left' icon='labeled' inverted vertical visible={true} width='thin' className="admin-sidebar">
							<Menu.Item as={Link} to="/admin/pages" > <Icon name='gamepad' /> {translate('sidebar.pages')} </Menu.Item>
							<Menu.Item as={Link} to="/admin/portfolio" > <Icon name='camera' /> {translate('navigation.portfolio')} </Menu.Item>
							<Menu.Item as={Link} to="/admin/reviews" > <Icon name='camera' /> {translate('sidebar.reviews')} </Menu.Item>
							<Menu.Item as={Link} to="/admin/blog" > <Icon name='camera' /> {translate('navigation.blog')} </Menu.Item>
							<Menu.Item as={Link} to="/admin/legal" > <Icon name='camera' /> {translate('footer.legal')} </Menu.Item>
						</Sidebar>
					</React.Fragment>
				)}
			</Translate>
		);
	}
}

export default withLocalize(AdminSidebar);