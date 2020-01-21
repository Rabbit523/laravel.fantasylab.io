import React from 'react'
import { withRouter } from 'react-router-dom'
import { renderToStaticMarkup } from "react-dom/server"
import { withLocalize, Translate } from "react-localize-redux"
import CookieConsent, { Cookies } from "react-cookie-consent";
import Switch from "react-switch";
import { isMobileOnly, isMobile } from 'react-device-detect'
import globalTranslations from './translations/global.json'
import Navigation from './common/navigation'
import Footer from './common/mainFooter'
import AdminSidebar from './common/sidebar'

class Main extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      lang: "en",
      visible: true,
      isDetail: false,
      stateTab: true,
      stateType: "neccessary",
      is_functional: false,
      is_statistical: false,
      is_marketing: false,
      today: "",
      cookie_neccessary: [],
      cookie_statistical: [],
      cookie_functional: [],
      cookie_marketing: []
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
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.cookie = null;
  }
  
  setActiveLanguage(code) {
    localStorage.setItem('locale', code);
    if (!this.props.location.pathname.includes('admin')) {
      if (this.props.location.pathname.includes('no')) {
        this.props.setActiveLanguage(code);
        var next_url = this.props.location.pathname.replace('/no', '');
        switch(next_url) {
          case '/logginn':
            this.props.history.push('/login');
            break;
          case '/start-prosjekt':
            this.props.history.push('/register');
            break;
          case '/webutvikling':
            this.props.history.push('/web-development');
            break;
          case '/mobilutvikling':
            this.props.history.push('/mobile-development');
            break;
          case '/ui-ux-design':
            this.props.history.push('/ui-ux-design');
            break;
          case '/merkevarebygging':
            this.props.history.push('/branding');
            break;
          case '/illustrasjon':
            this.props.history.push('/illustration');
            break;
          case '/markedsføringsmateriell':
            this.props.history.push('/marketing-material');
            break;
          case '/administrert-hosting':
            this.props.history.push('/managed-hosting');
            break;
          case '/portfolio':
            this.props.history.push('/portfolio');
            break;
          case '/funksjoner':
            this.props.history.push('/features');
            break;
          case '/om-oss':
            this.props.history.push('/about');
            break;
          case '/blogg':
            this.props.history.push('/blog');
            break;
          case '/kontakt':
            this.props.history.push('/contact');
            break;
          case '/personvern':
            this.props.history.push('/privacy');
            break;
          case '/sikkerhet':
            this.props.history.push('/security');
            break;
          case '/avsnitt':
            this.props.history.push('/terms');
            break;
          case '/sikker':
            this.props.history.push('/confidentiality');
            break;
          default:
            this.props.history.push('/');
            break;
        }
      } else {
        this.props.setActiveLanguage(code);
        var next_url = this.props.location.pathname;
        switch(next_url) {
          case '/login':
            this.props.history.push('/no/logginn');
            break;
          case '/register':
            this.props.history.push('/no/start-prosjekt');
            break;
          case '/web-development':
            this.props.history.push('/no/webutvikling');
            break;
          case '/mobile-development':
            this.props.history.push('/no/mobilutvikling');
            break;
          case '/ui-ux-design':
            this.props.history.push('/no/ui-ux-design');
            break;
          case '/branding':
            this.props.history.push('/no/merkevarebygging');
            break;
          case '/illustration':
            this.props.history.push('/no/illustrasjon');
            break;
          case '/marketing-material':
            this.props.history.push('/no/markedsføringsmateriell');
            break;
          case '/managed-hosting':
            this.props.history.push('/no/administrert-hosting');
            break;
          case '/portfolio':
            this.props.history.push('/no/portfolio');
            break;
          case '/features':
            this.props.history.push('/no/funksjoner');
            break;
          case '/about':
            this.props.history.push('/no/om-oss');
            break;
          case '/blog':
            this.props.history.push('/no/blogg');
            break;
          case '/contact':
            this.props.history.push('/no/kontakt');
            break;
          case '/privacy':
            this.props.history.push('/no/personvern');
            break;
          case '/secruity':
            this.props.history.push('/no/sikkerhet');
            break;
          case '/terms':
            this.props.history.push('/no/avsnitt');
            break;
          case '/confidentiality':
            this.props.history.push('/no/sikker');
            break;
          default:
            this.props.history.push('/no');
            break;
        }
      }
    }
  }

  componentDidMount() {
    let lang = "", neccessary = [], statistical = [];
		if (typeof window !== 'undefined') {
      lang = localStorage.getItem('locale');
      if (!lang) {
        localStorage.setItem('locale', 'en');
        lang = 'en';
      }
    }
    this.props.setActiveLanguage(lang);
    this.getCurrentDate();
    const cookies_ = new Cookies();
    Object.keys(cookies_).map((key, index)=> {
      if (key == 'laravel_session' || key == 'XSRF-TOKEN') {
        let _item = {
          name: "Laravel_sessionId",
          supplier: "fantasylab.io",
          purpose: "Supports integration or 'embedding' of a third-party platform on the website.",
          expires: "Session"
        };
        neccessary.push(_item);
      }
      if (key == '__cfduid') {
        let _item = {
          name: "CookieInformationConsent",
          supplier: "fantasylab.io",
          purpose: "Supports the site's technical features.",
          expires: "one year"
        };
        neccessary.push(_item);
      }
      if (key == '_ga') {
        let _item = {
          name: "_ga",
          supplier: "fantasylab.io",
          purpose: "Gathers information about users and their activity on the site for analysis and reporting purposes.",
          expires: "2 years"
        };
        statistical.push(_item);
      }
      if (key == '_gid') {
        let _item = {
          name: "_gid",
          supplier: "fantasylab.io",
          purpose: "Gathers information about users and their activity on the site for analysis and reporting purposes.",
          expires: "one day"
        };
        statistical.push(_item);
      }
      if (key.includes('_gat_gtag_UA')) {
        let _item = {
          name: "_gat_gtag_UA_xxx_xxx",
          supplier: "fantasylab.io",
          purpose: "Gathers information about users and their activity on the site for analysis and reporting purposes.",
          expires: "one minute"
        };
        statistical.push(_item);
      }
    });
    
    this.setState({ lang, cookie_neccessary: neccessary, cookie_statistical: statistical });
  }      

  onDetails() {
    const { isDetail } = this.state;
    this.setState({ isDetail: !isDetail });
  }

  onHandleTabs() {
    const { stateTab } = this.state;
    this.setState({ stateTab: !stateTab });
  }

  onHandleToggles(event, val) {
    this.setState({ stateType: val});
  }

  handleChange(val, type) {
    const { is_functional, is_statistical, is_marketing } = this.state;
    switch (type) {
      case "functional":
        this.setState({ is_functional: !is_functional });
        break;
      case "statistical":
        this.setState({ is_statistical: !is_statistical });
        break;
      case "marketing":
        this.setState({ is_marketing: !is_marketing });
        break;
    }
  }

  getCurrentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!

    let yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    } 
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '.' + mm + '.' + yyyy;
    this.setState({ today: today });
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
    const { isDetail, stateTab, stateType, is_functional, is_statistical, is_marketing, today, cookie_neccessary, cookie_statistical } = this.state;
    
    return (
      <Translate>
        {({ translate }) => (
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
              <CookieConsent
                ref={ref => this.cookie = ref} 
                contentClasses="cookie-consent"
                buttonClasses="btn success-btn"
                buttonText="OK"
              > 
              <div className="cookie-title">
                <div className="btn-group">
                  <button className="button success-btn" onClick={() => { console.log('cookie consents are allowed.'); }}>OK</button>
                  {!isDetail && <button className="button detail-btn" onClick={(event) => this.onDetails(event)}>{translate('cookie.details')}</button>}
                  {isDetail && <button className="button detail-btn" onClick={(event) => this.onDetails(event)}>{translate('cookie.hide_details')}</button>}
                </div>
                <div className="title">
                  <p>{translate('cookie.title')}</p>
                  {translate('cookie.des')}
                </div>
              </div>
              
              {isDetail && <div className="cookie-des">
                <div className="cookie-options">
                  <div className="cookie-consent-banner">
                    <a className={stateTab?"banner-indicator active":"banner-indicator"} onClick={(event) => this.onHandleTabs(event)}>{translate('cookie.statement')}</a>
                    <a className={!stateTab?"banner-indicator active":"banner-indicator"} onClick={(event) => this.onHandleTabs(event)}>{translate('cookie.about')}</a>
                  </div>
                  {stateTab && <div className="cookie-consent-statement">
                    <div className={stateType=="neccessary"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "neccessary")}>
                      {translate('cookie.neccessary')}
                    </div>
                    <div className={stateType=="functional"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "functional")}>
                      {translate('cookie.functional')}
                      <Switch onChange={(val) => this.handleChange(val, 'functional')} checked={is_functional} checkedIcon={false} uncheckedIcon={false} className="toggle-btn"/>
                    </div>
                    <div className={stateType=="statistical"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "statistical")}>
                      {translate('cookie.statistical')}
                      <Switch onChange={(val) => this.handleChange(val, 'statistical')} checked={is_statistical} checkedIcon={false} uncheckedIcon={false} className="toggle-btn"/>
                    </div>
                    <div className={stateType=="marketing"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "marketing")}>
                      {translate('cookie.marketing')}
                      <Switch onChange={(val) => this.handleChange(val, 'marketing')} checked={is_marketing} checkedIcon={false} uncheckedIcon={false} className="toggle-btn"/>
                    </div>
                    <div className={stateType=="unclassfied"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "unclassfied")}>
                      {translate('cookie.unclassified')}
                    </div>
                    <div className="toggle-indicator toggle-btn">
                      <a className="update-btn" onClick={() => onAccept()}>{translate('cookie.update-btn')}</a>
                    </div>
                  </div>}
                  {!stateTab && <div className="cookie-consent-about">
                    <p><b>{translate('cookie.about-domain')}: </b>fantasylab.io</p>
                    <p><b>{translate('cookie.about-date')}: </b>{today}</p>
                  </div>}
                </div>
                <div className="cookie-content">
                  <div className="cookie-des-title">
                    {stateType=="neccessary" && translate('cookie.neccessary-cookie-des')}
                    {stateType=="functional" && translate('cookie.functional-cookie-des')}
                    {stateType=="statistical" && translate('cookie.statistical-cookie-des')}
                    {stateType=="marketing" && translate('cookie.marketing-cookie-des')}
                    {stateType=="unclassfied" && translate('cookie.unclassified-cookie-des')}
                  </div>
                  <div className="cookie-des-content">
                    {stateType=="neccessary" && stateTab && 
                      cookie_neccessary.map((item, i) => (
                        <div className="cookie-item" key={i}>
                          {Object.keys(item).map((key, index) => (
                            <div className='item' key={index}>
                              <p><span>{key}: </span>{item[key]}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    {stateType=="statistical" && stateTab && 
                      cookie_statistical.map((item, i) => (
                        <div className="cookie-item" key={i}>
                          {Object.keys(item).map((key, index) => (
                            <div className='item' key={index}>
                              <p><span>{key}: </span>{item[key]}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    {!stateTab && <React.Fragment>
                      <h2>{translate('cookie.cookie-des-content-title')}</h2>
                      <p>{translate('cookie.cookie-des-content-sub-title')}</p>
                      <p>Fantasylab AS<br/>Øvre Slottsgate 2B<br/>0106 Oslo<br/>22 09 04 00<br/><a href="mailto:support@fantasylab.io">support@fantasylab.io</a></p>
                      <h2>{translate('cookie.what-is-cookie')}</h2>
                      <p>{translate('cookie.what-is-cookie-answer')}</p>
                      <h2>{translate('cookie.how-cookie-use')}</h2>
                      <p>{translate('cookie.how-cookie-use-answer')}</p>
                      <h2>{translate('cookie.how-long-cookie-stored')}</h2>
                      <p>{translate('cookie.how-long-cookie-stored-answer')}</p>
                      <h2>{translate('cookie.how-reject-cookie')}</h2>
                      <p>{translate('cookie.how-reject-cookie-answer')}</p>
                      <h2>{translate('cookie.deleting-cookies')}</h2>
                      <p>{translate('cookie.deleing-cookies-key')}</p>
                      <p>{translate('cookie.deleing-cookies-links')}</p>
                      <ul>
                        <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-11" target="_blank">Internet Explorer</a></li>
                        <li><a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank">Mozilla Firefox</a></li>
                        <li><a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank">Google Chrome</a></li>
                        <li><a href="https://www.opera.com/help/tutorials/security/cookies" target="_blank">Opera</a></li>
                        <li><a href="https://support.apple.com/en-us/HT201265" target="_blank">Safari</a></li>
                        <li><a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" target="_blank">Flash Cookies</a></li>
                        <li><a href="https://support.apple.com/en-us/HT1677" target="_blank">Apple</a></li>
                        <li><a href="https://timeread.hubpages.com/hub/How-to-delete-internet-cookies-on-your-Droid-or-any-Android-device" target="_blank">Android</a></li>
                        <li><a href="https://support.microsoft.com/en-us/help/11696/windows-phone-7" target="_blank">Windows 7</a></li>
                      </ul>
                      <p>{translate('cookie.deleing-cookies-remember')}</p>
                      <h2>{translate('cookie.do-you-have-question')}</h2>
                      <p>{translate('cookie.do-you-have-question-answer')}</p>
                      </React.Fragment>}
                  </div>
                </div>
              </div>}
              </CookieConsent>
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
              <CookieConsent 
                ref={ref => this.cookie = ref} 
                contentClasses="cookie-consent"
                buttonClasses="btn success-btn"
                buttonText="OK"
                onAccept={() => {console.log("yay!")}}

              > 
                <div className="cookie-title">
                  {!isMobileOnly && <div className="btn-group">
                    <button className="button success-btn" onClick={() => { console.log('cookie consents are allowed.'); }}>OK</button>
                    {!isDetail && <button className="button detail-btn" onClick={(event) => this.onDetails(event)}>{translate('cookie.details')}</button>}
                    {isDetail && <button className="button detail-btn" onClick={(event) => this.onDetails(event)}>{translate('cookie.hide_details')}</button>}
                  </div>}
                  <div className="title">
                    <p>{translate('cookie.title')}</p>
                    {translate('cookie.des')}
                  </div>
                  {isMobileOnly && <div className="btn-group">
                    <button className="button success-btn" onClick={() => { console.log('cookie consents are allowed.'); }}>OK</button>
                    {!isDetail && <button className="button detail-btn" onClick={(event) => this.onDetails(event)}>{translate('cookie.details')}</button>}
                    {isDetail && <button className="button detail-btn" onClick={(event) => this.onDetails(event)}>{translate('cookie.hide_details')}</button>}
                  </div>}
                </div>
                
                {isDetail && <div className="cookie-des">
                  <div className="cookie-options">
                    <div className="cookie-consent-banner">
                      <a className={stateTab?"banner-indicator active":"banner-indicator"} onClick={(event) => this.onHandleTabs(event)}>{translate('cookie.statement')}</a>
                      <a className={!stateTab?"banner-indicator active":"banner-indicator"} onClick={(event) => this.onHandleTabs(event)}>{translate('cookie.about')}</a>
                    </div>
                    {stateTab && <div className="cookie-consent-statement">
                      <div className={stateType=="neccessary"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "neccessary")}>
                        {translate('cookie.neccessary')}
                      </div>
                      {stateType=="neccessary" && isMobileOnly && 
                        <div className="mobile-state-des">
                          {translate('cookie.neccessary-cookie-des')} 
                          {cookie_neccessary.map((item, i) => (
                            <div className="cookie-item" key={i}>
                              {Object.keys(item).map((key, index) => (
                                <div className='item' key={index}>
                                  <p><span>{key}: </span>{item[key]}</p>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>}
                      <div className={stateType=="functional"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "functional")}>
                        {translate('cookie.functional')}
                        <Switch onChange={(val) => this.handleChange(val, 'functional')} checked={is_functional} checkedIcon={false} uncheckedIcon={false} className="toggle-btn"/>
                      </div>
                      {stateType=="functional" && isMobileOnly && <div className="mobile-state-des"> {translate('cookie.functional-cookie-des')} </div>}
                      <div className={stateType=="statistical"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "statistical")}>
                        {translate('cookie.statistical')}
                        <Switch onChange={(val) => this.handleChange(val, 'statistical')} checked={is_statistical} checkedIcon={false} uncheckedIcon={false} className="toggle-btn"/>
                      </div>
                      {stateType=="statistical" && isMobileOnly && 
                        <div className="mobile-state-des"> 
                          {translate('cookie.statistical-cookie-des')}
                          {cookie_statistical.map((item, i) => (
                            <div className="cookie-item" key={i}>
                              {Object.keys(item).map((key, index) => (
                                <div className='item' key={index}>
                                  <p><span>{key}: </span>{item[key]}</p>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>}
                      <div className={stateType=="marketing"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "marketing")}>
                        {translate('cookie.marketing')}
                        <Switch onChange={(val) => this.handleChange(val, 'marketing')} checked={is_marketing} checkedIcon={false} uncheckedIcon={false} className="toggle-btn"/>
                      </div>
                      {stateType=="marketing" && isMobileOnly && <div className="mobile-state-des"> {translate('cookie.marketing-cookie-des')} </div>}
                      <div className={stateType=="unclassfied"?"toggle-indicator active":"toggle-indicator"} onClick={(event) => this.onHandleToggles(event, "unclassfied")}>
                        {translate('cookie.unclassified')}
                      </div>
                      {stateType=="unclassfied" && isMobileOnly && <div className="mobile-state-des"> {translate('cookie.unclassified-cookie-des')} </div>}
                    </div>}
                    {!stateTab && <div className="cookie-consent-about">
                      <p><b>{translate('cookie.about-domain')}: </b>fantasylab.io</p>
                      <p><b>{translate('cookie.about-date')}: </b>{today}</p>
                      {isMobileOnly && <React.Fragment>
                      <h2>{translate('cookie.cookie-des-content-title')}</h2>
                      <p>{translate('cookie.cookie-des-content-sub-title')}</p>
                      <p>Fantasylab AS<br/>Selma Ellefsensvei 2<br/>0581 Oslo<br/>+47 454 94 649<br/><a href="mailto:support@fantasylab.io">support@fantasylab.io</a></p>
                      <h2>{translate('cookie.what-is-cookie')}</h2>
                      <p>{translate('cookie.what-is-cookie-answer')}</p>
                      <h2>{translate('cookie.how-cookie-use')}</h2>
                      <p>{translate('cookie.how-cookie-use-answer')}</p>
                      <h2>{translate('cookie.how-long-cookie-stored')}</h2>
                      <p>{translate('cookie.how-long-cookie-stored-answer')}</p>
                      <h2>{translate('cookie.how-reject-cookie')}</h2>
                      <p>{translate('cookie.how-reject-cookie-answer')}</p>
                      <h2>{translate('cookie.deleting-cookies')}</h2>
                      <p>{translate('cookie.deleing-cookies-key')}</p>
                      <p>{translate('cookie.deleing-cookies-links')}</p>
                      <ul>
                        <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-11" target="_blank">Internet Explorer</a></li>
                        <li><a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank">Mozilla Firefox</a></li>
                        <li><a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank">Google Chrome</a></li>
                        <li><a href="https://www.opera.com/help/tutorials/security/cookies" target="_blank">Opera</a></li>
                        <li><a href="https://support.apple.com/en-us/HT201265" target="_blank">Safari</a></li>
                        <li><a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" target="_blank">Flash Cookies</a></li>
                        <li><a href="https://support.apple.com/en-us/HT1677" target="_blank">Apple</a></li>
                        <li><a href="https://timeread.hubpages.com/hub/How-to-delete-internet-cookies-on-your-Droid-or-any-Android-device" target="_blank">Android</a></li>
                        <li><a href="https://support.microsoft.com/en-us/help/11696/windows-phone-7" target="_blank">Windows 7</a></li>
                      </ul>
                      <p>{translate('cookie.deleing-cookies-remember')}</p>
                      <h2>{translate('cookie.do-you-have-question')}</h2>
                      <p>{translate('cookie.do-you-have-question-answer')}</p>
                      </React.Fragment>}
                    </div>}
                  </div>
                  {!isMobileOnly && <div className="cookie-content">
                    <div className="cookie-des-title">
                      {stateType=="neccessary" && translate('cookie.neccessary-cookie-des')}
                      {stateType=="functional" && translate('cookie.functional-cookie-des')}
                      {stateType=="statistical" && translate('cookie.statistical-cookie-des')}
                      {stateType=="marketing" && translate('cookie.marketing-cookie-des')}
                      {stateType=="unclassfied" && translate('cookie.unclassified-cookie-des')}
                    </div>
                    <div className="cookie-des-content">
                      {stateType=="neccessary" && stateTab && 
                        cookie_neccessary.map((item, i) => (
                          <div className="cookie-item" key={i}>
                            {Object.keys(item).map((key, index) => (
                              <div className='item' key={index}>
                                <p><span>{key}: </span>{item[key]}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      {stateType=="statistical" && stateTab && 
                        cookie_statistical.map((item, i) => (
                          <div className="cookie-item" key={i}>
                            {Object.keys(item).map((key, index) => (
                              <div className='item' key={index}>
                                <p><span>{key}: </span>{item[key]}</p>
                              </div>
                            ))}
                          </div>
                        ))}
                      {!stateTab && <React.Fragment>
                        <h2>{translate('cookie.cookie-des-content-title')}</h2>
                        <p>{translate('cookie.cookie-des-content-sub-title')}</p>
                        <p>Fantasylab AS<br/>Selma Ellefsensvei 2<br/>0581 Oslo<br/>+47 454 94 649<br/><a href="mailto:support@fantasylab.io">support@fantasylab.io</a></p>
                        <h2>{translate('cookie.what-is-cookie')}</h2>
                        <p>{translate('cookie.what-is-cookie-answer')}</p>
                        <h2>{translate('cookie.how-cookie-use')}</h2>
                        <p>{translate('cookie.how-cookie-use-answer')}</p>
                        <h2>{translate('cookie.how-long-cookie-stored')}</h2>
                        <p>{translate('cookie.how-long-cookie-stored-answer')}</p>
                        <h2>{translate('cookie.how-reject-cookie')}</h2>
                        <p>{translate('cookie.how-reject-cookie-answer')}</p>
                        <h2>{translate('cookie.deleting-cookies')}</h2>
                        <p>{translate('cookie.deleing-cookies-key')}</p>
                        <p>{translate('cookie.deleing-cookies-links')}</p>
                        <ul>
                          <li><a href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies#ie=ie-11" target="_blank">Internet Explorer</a></li>
                          <li><a href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank">Mozilla Firefox</a></li>
                          <li><a href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank">Google Chrome</a></li>
                          <li><a href="https://www.opera.com/help/tutorials/security/cookies" target="_blank">Opera</a></li>
                          <li><a href="https://support.apple.com/en-us/HT201265" target="_blank">Safari</a></li>
                          <li><a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html" target="_blank">Flash Cookies</a></li>
                          <li><a href="https://support.apple.com/en-us/HT1677" target="_blank">Apple</a></li>
                          <li><a href="https://timeread.hubpages.com/hub/How-to-delete-internet-cookies-on-your-Droid-or-any-Android-device" target="_blank">Android</a></li>
                          <li><a href="https://support.microsoft.com/en-us/help/11696/windows-phone-7" target="_blank">Windows 7</a></li>
                        </ul>
                        <p>{translate('cookie.deleing-cookies-remember')}</p>
                        <h2>{translate('cookie.do-you-have-question')}</h2>
                        <p>{translate('cookie.do-you-have-question-answer')}</p>
                        </React.Fragment>}
                    </div>
                  </div>}
                </div>}
              </CookieConsent>
            </React.Fragment>
          )
        )}
      </Translate>
    );
  }
}

export default withLocalize(withRouter(Main));