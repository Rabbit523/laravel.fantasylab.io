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
                    <Menu.Item as={Link} to="/admin/dashboard" > <Icon name='home' /> Dashboard </Menu.Item>
                    <Menu.Item as={Link} to="/admin/pages" > <Icon name='gamepad' /> Pages </Menu.Item>
                    <Menu.Item as={Link} to="/admin/services" > <Icon name='camera' /> Services </Menu.Item>
                    <Menu.Item as={Link} to="/admin/clients" > <Icon name='camera' /> Clients </Menu.Item>
                    <Menu.Item as={Link} to="/admin/projects" > <Icon name='camera' /> Projects </Menu.Item>
                    <Menu.Item as={Link} to="/admin/teams" > <Icon name='camera' /> Teams </Menu.Item>
                    <Menu.Item as={Link} to="/admin/invoices" > <Icon name='camera' /> Invoices </Menu.Item>
                    <Menu.Item as={Link} to="/admin/settings" > <Icon name='settings' /> Settings </Menu.Item>
                </Sidebar>
            </React.Fragment>
        );
    }
}

export default AdminSidebar;