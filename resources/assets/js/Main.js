import React from 'react'
import { connect } from 'react-redux'
import Navigation from './common/navigation'
import Footer from './common/mainFooter'
import AdminSidebar from './common/sidebar';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let is_dashboard = false;
    let is_footer = true;
    if (typeof window != 'undefined' && window.location.href.indexOf("admin") > 0) {
      is_dashboard = true;
    }
    if (typeof window != 'undefined' && (window.location.href.indexOf("login") > 0 || window.location.href.indexOf("register") > 0)) {
      is_footer = false;
    }
    return (
      (this.props.isAdmin && this.props.isAuthenticated) ? (
        <React.Fragment>
          <Navigation />
          <div className="page">
            {is_dashboard && <AdminSidebar />}
            <div className="fadeIn animated main">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </React.Fragment>
      ) : (
          <React.Fragment>
            <Navigation />
            <div className="page">
              <div className="fadeIn animated main">
                {this.props.children}
              </div>
            </div>
            {is_footer && <Footer />}
          </React.Fragment>
        )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    isAdmin: state.Auth.isAdmin
  }
};

export default connect(mapStateToProps)(Main);