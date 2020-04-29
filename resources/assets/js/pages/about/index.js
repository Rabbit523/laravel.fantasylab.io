import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader, Button } from 'semantic-ui-react'
import { isMobileOnly } from 'react-device-detect'
import { Link, Redirect } from 'react-router-dom'
import Modal from 'react-modal'
import { Translate, withLocalize } from "react-localize-redux"
import PageMetaTag from '../../common/pageMetaTag'
import GuideCard from '../../common/guideCard'
import TextCard from '../../common/textCard'
import ServiceItem from '../../common/serviceItem'
import HeadquaterItem from '../../common/headQuaterItem'
import NewsCard from '../../common/newsCard'
import Gallery from '../../common/carousel'
import Http from '../../Http'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isTablet: false,
      isOpen: false
    }

    this.closeModal = this.closeModal.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
  }

  componentDidMount() {
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    Http.post(`${window.location.origin}/api/front/get-page`, { name: 'about' }).then(
      res => {
        if (window.innerWidth <= 1024) {
          this.setState({ isLoaded: true, isTablet: true, data: JSON.parse(res.data.data) });
        } else {
          this.setState({ isLoaded: true, isTablet: false, data: JSON.parse(res.data.data) });
        }
        window.scrollTo(0, 0);
      }
    ).catch(err => {
      console.error(err);
    });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  triggerModal(event) {
    event.preventDefault();
    this.setState({ isOpen: true });
  }

  render() {
    const { isLoaded, isTablet, isOpen, data } = this.state;
    const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
    if (lang=='nb' && !window.location.pathname.includes('no')) {
			return (
				<Redirect to='no/om-oss' />
			)
		} else if (lang == 'en' && window.location.pathname.includes('no')){
			return (
				<Redirect to='/about' />
			)
		}
    return (
      <Translate>
        {({ translate }) => (
          <div className="about-page">
            {isLoaded ?
              <React.Fragment>
                <PageMetaTag meta_title={lang == 'en' ? data.meta_title : data.no_meta_title} meta_description={lang == 'en' ? data.meta_description : data.no_meta_description} />
                <Modal
                  isOpen={isOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                >
                  <Button icon='close' onClick={this.closeModal} />
                  <h2>{lang=='en' ? 'Hi,' : 'Hei,'}<br />{lang=='en'?'visionary.':'visjonær.'}</h2>
                  <p>{lang=='en' ? 'Our web app is under development.' : 'Vår web app er under utvikling.'}</p>
                  <div className="button-group">
                    <Button as={Link} to={lang=='en'?'/contact':'/no/kontakt'} className='primary-button'>{lang=='en'?'Contact us':'Kontakt oss'}</Button>
                    <Button className='secondary-button' onClick={this.closeModal}>{lang=='en'?'Close':'Lukk'}</Button>
                  </div>
                </Modal>
                <div className="about-header" style={{ backgroundImage: `url(${data.header_url})` }}>
                  <div className="header-gradient">
                    <Container className="custom-col-6">
                      <div className="header-description">
                        <div className="header-text">
                          <h1>{lang == 'en' ? data.title : data.no_title}</h1>
                          <p>{lang == 'en' ? data.description : data.no_description}</p>
                        </div>
                        <Container className="custom-col-6">
                          <div className="counter-box">
                            {data.counters.map((item, i) => (
                              <div className="box" mobile={isTablet ? 4 : 16} tablet={8} computer={4} key={i}>
                                <h4>{item.number}</h4>
                                <p>{lang == 'en' ? item.text : item.no_text}</p>
                              </div>
                            ))}
                          </div>
                        </Container>
                      </div>
                      <div className="guide-tags">
                        <Grid columns={4}>
                          {data.guides.map((item, index) => (
                            <Grid.Column className="box" mobile={16} tablet={8} computer={isTablet ? 8 : 4} key={index} onClick={(event) => this.triggerModal(event)}>
                              <GuideCard avatar={item.avatar} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />
                            </Grid.Column>
                          ))}
                        </Grid>
                      </div>
                    </Container>
                  </div>
                </div>
                <div className="about-section">
                  <Container className="custom-col-6">
                    <h2>{lang == 'en' ? data.values.title : data.values.no_title}</h2>
                    <Grid>
                      <Grid.Column mobile={16} tablet={8} computer={8}>
                        {data.values.data.map((item, i) => (
                          <React.Fragment key={i}>
                            {i < 3 && <TextCard color={item.color} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />}
                          </React.Fragment>
                        ))}
                      </Grid.Column>
                      <Grid.Column mobile={16} tablet={8} computer={8} style={isMobileOnly ? { marginTop: -20 } : { marginTop: 20 }}>
                        {data.values.data.map((item, i) => (
                          <React.Fragment key={i}>
                            {i >= 3 && <TextCard color={item.color} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />}
                          </React.Fragment>
                        ))}
                      </Grid.Column>
                    </Grid>
                  </Container>
                </div>
                {data.services.data.length > 0 &&
                  <div className="about-section">
                    <Container className="custom-col-6">
                      <h2>{lang == 'en' ? data.services.title : data.services.no_title}</h2>
                      <Grid>
                        {data.services.data.map((item, i) => (
                          <React.Fragment key={i}>
                            {i < 2 &&
                              <Grid.Column mobile={16} tablet={8} computer={8} as={Link} to={lang == 'en' ? `/${item.url}` : `/no/${item.no_url}`}>
                                <ServiceItem avatar={item.avatar} title={lang == 'en' ? item.title : item.no_title} color={item.color} description={lang == 'en' ? item.description : item.no_description} backimage={item.backimage} />
                              </Grid.Column>}
                            {i >= 2 &&
                              <Grid.Column mobile={16} tablet={8} computer={4} as={Link} to={lang == 'en' ? `/${item.url}` : `/no/${item.no_url}`}>
                                <ServiceItem type="about_quater" avatar={item.avatar} title={lang == 'en' ? item.title : item.no_title} color={item.color} description={lang == 'en' ? item.description : item.no_description} backimage={item.backimage} />
                              </Grid.Column>}
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Container>
                  </div>}
                <div className="about-section headquarter">
                  <Container className="custom-col-6">
                    <h2>{lang == 'en' ? data.headquarters.title : data.headquarters.no_title}</h2>
                    <p className="sub_title">{lang == 'en' ? data.headquarters.description : data.headquarters.no_description}</p>
                    <div className="headquarters" style={{ backgroundImage: `url(${data.headquarters.backimage})`, backgroundSize: 'cover' }}>
                      <Grid className="headquater-item">
                        {data.headquarters.data.map((item, i) => (
                          <Grid.Column mobile={16} tablet={8} computer={isTablet ? 8 : 4} key={i}>
                            <HeadquaterItem lang={lang} avatar={item.avatar} button={lang == 'en' ? item.button : item.no_button} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} type={item.type} />
                          </Grid.Column>
                        ))}
                      </Grid>
                    </div>
                  </Container>
                </div>
                <div className="about-section">
                  <section className="home-section">
                    <Container className="custom-col-6">
                      <h2>{lang == 'en' ? data.news.title : data.news.no_title}</h2>
                      <Grid columns={3}>
                        {data.news.data.map((item, i) => (
                          <Grid.Column key={i} only="computer" onClick={(event) => this.triggerModal(event)}>
                            <NewsCard lang={lang} url={item.url} author={item.author} type={item.type} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} time={item.time} read={item.read} />
                          </Grid.Column>
                        ))}
                      </Grid>
                      <Grid>
                        <Grid.Column only="mobile tablet" onClick={(event) => this.triggerModal(event)}>
                          <Gallery type="news" items={data.news.data} />
                        </Grid.Column>
                      </Grid>
                    </Container>
                  </section>
                </div>
                <section className="divide"></section>
              </React.Fragment>
              :
              <Segment className='page-loader'>
                <Dimmer active inverted>
                  <Loader size='large'>{translate('alert.loading')}</Loader>
                </Dimmer>
              </Segment>
            }
          </div>
        )}
      </Translate>
    );
  }
}

export default withLocalize(Page);