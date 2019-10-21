import React from 'react'
import Navigation from '../common/navigation'
import Footer from '../common/mainFooter'
import AdminSidebar from '../common/sidebar';

class ServerMain extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Navigation />
        <div className="page">
          {this.props.status.isAuthenticated && this.props.status.isAdmin && <AdminSidebar />}
          <div className="fadeIn animated main">
            {this.props.children}
          </div>
        </div>
        {this.props.status.is_footer && <Footer />}
      </React.Fragment>
    )
  }
}

export default ServerMain;