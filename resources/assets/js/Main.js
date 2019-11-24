import React from 'react'
import { withRouter } from 'react-router-dom'
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize } from "react-localize-redux"
import globalTranslations from './translations/global.json'
import Navigation from './common/navigation'
import Footer from './common/mainFooter'
import AdminSidebar from './common/sidebar'

class Main extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      lang: "en",
    };

    this.props.initialize({
      languages: [
        { name: "English", code: "en" },
        { name: "Norwegian", code: "nb" }
      ],
      translation: globalTranslations,
      options: { 
        renderToStaticMarkup,
        defaultLanguage: "en" 
      }
    });
    this.setActiveLanguage = this.setActiveLanguage.bind(this);
  }
 
  setActiveLanguage(code) {
    localStorage.setItem('locale', code);
    if (!this.props.location.pathname.includes('admin')) {
      if (this.props.location.pathname.includes('no')) {
        var next_url = this.props.location.pathname.replace('/no', '');
        this.props.history.push(next_url);
      } else {
        var next_url = `/no${this.props.location.pathname}`;
        this.props.history.push(next_url);
      }
    }
    this.props.setActiveLanguage(code);
  }

  componentDidMount() {
    let lang = "";
		if (typeof window !== 'undefined') {
      lang = localStorage.getItem('locale');
      if (!lang) {
        localStorage.setItem('locale', 'en');
        lang = 'en';
      }
    }
    this.setState({ lang });
    this.props.setActiveLanguage(lang);
  }

  render() {
    let is_dashboard = false;
    let is_footer = true;
    if (typeof window != 'undefined' && window.location.href.indexOf('admin') > 0) {
      is_dashboard = true;
    }
    if (typeof window != 'undefined' && (window.location.href.indexOf("login") > 0 || window.location.href.indexOf("register") > 0)) {
      is_footer = false;
    }
    const { isAdmin, isAuthenticated } = this.props;
    return (
      (isAdmin && isAuthenticated) ? (
        <React.Fragment>
          <Navigation isAdmin={isAdmin} isAuthenticated={isAuthenticated} onChangeLang={this.setActiveLanguage} />
          <div className="page">
            {is_dashboard && <AdminSidebar />}
            <div className="fadeIn animated main">
              {this.props.children}
            </div>
          </div>
          <Footer onChangeLang={this.setActiveLanguage} />
        </React.Fragment>
      ) : (
          <React.Fragment>
            <Navigation isAdmin={isAdmin} isAuthenticated={isAuthenticated} onChangeLang={this.setActiveLanguage}/>
            <div className="page">
              <div className="fadeIn animated main">
                {this.props.children}
              </div>
            </div>
            {is_footer && <Footer onChangeLang={this.setActiveLanguage}/>}
          </React.Fragment>
        )
    );
  }
}

export default withLocalize(withRouter(Main));