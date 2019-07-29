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
    if (window.location.href.indexOf("admin") > 0) {
      is_dashboard = true;
    }
    return (
      (this.props.isAdmin && this.props.isAuthenticated) ? (
        <div>
          <Navigation />
          <div className="page">
            {!!is_dashboard && <AdminSidebar />}
            <main className="fadeIn animated">
              {this.props.children}
            </main>
          </div>
          <Footer />
        </div>
      ) : (
          <div>
            <Navigation />
            <div className="page">
              <main className="fadeIn animated">
                {this.props.children}
              </main>
            </div>
            <Footer />
          </div>
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