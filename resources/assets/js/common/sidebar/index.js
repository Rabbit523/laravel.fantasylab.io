import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Menu, Sidebar } from 'semantic-ui-react'

class AdminSidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Sidebar as={Menu} animation='push' direction='left' icon='labeled' inverted vertical visible={true} width='thin' className="admin-sidebar">
                    <Menu.Item as={Link} to="/admin/pages" > <Icon name='gamepad' /> Pages </Menu.Item>
                    <Menu.Item as={Link} to="/admin/portfolio" > <Icon name='camera' /> Portfolio </Menu.Item>
                    <Menu.Item as={Link} to="/admin/reviews" > <Icon name='camera' /> Reviews </Menu.Item>
                    <Menu.Item as={Link} to="/admin/blog" > <Icon name='camera' /> Blog </Menu.Item>
                    <Menu.Item as={Link} to="/admin/legal" > <Icon name='camera' /> Legal </Menu.Item>
                </Sidebar>
            </React.Fragment>
        );
    }
}

export default AdminSidebar;