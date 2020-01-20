import React from 'react'
import { Button, Container, Grid, Dimmer, Segment, Loader, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import Modal from 'react-modal'
import PageMetaTag from '../../../common/pageMetaTag'
import Http from '../../../Http'
import PageFooter from '../../../common/pageFooter'
import ServiceItem from '../../../common/serviceItem'
import GuideCard from '../../../common/guideCard'
import BadgeTextCard from '../../../common/badgeTextCard'

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
      isOpen: false
    }

    this.closeModal = this.closeModal.bind(this);
    this.triggerModal = this.triggerModal.bind(this);
  }

  componentDidMount() {
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    Http.post(`${window.location.origin}/api/front/get-page`, { name: 'service-illustration' })
      .then(
        res => {
          this.setState({ isLoaded: true, data: JSON.parse(res.data.data) });
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
    const { isLoaded, isOpen, data } = this.state;
    const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
    Modal.setAppElement('#app')
    return (
      <Translate>
        {({ translate }) => (
          <div className='service-page'>
            {isLoaded ?
              <React.Fragment>
                <PageMetaTag meta_title={lang == 'en' ? data.meta_title : data.no_meta_title} meta_description={lang == 'en' ? data.meta_description : data.no_meta_description} />
                <Modal
                  isOpen={isOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                >
                  <Button icon='close' onClick={this.closeModal} />
                  <h2>{lang=='en' ? 'Hi,' : 'Hei,'}<br />{lang=='en'?'Visionary.':'Visjonær'}</h2>
                  <p>{lang=='en' ? 'Our web app is under development.' : 'Vår web app er under utvikling.'}</p>
                  <div className="button-group">
                    <Button as={Link} to='/contact' className='primary-button'>{lang=='en'?'Contact us':'Kontakt oss'}</Button>
                    <Button className='secondary-button' onClick={this.closeModal}>{lang=='en'?'Close':'Lukk'}</Button>
                  </div>
                </Modal>
                <div className='service-header' style={{ backgroundImage: `url(${data.header_url})` }}>
                  <div className='header-gradient mobile'>
                    <Container className='custom-col-6 text-group'>
                      <div className='header-description'>
                        <div className='header-text'>
                          <h1>{lang == 'en' ? data.title : data.no_title}</h1>
                          <p>{lang == 'en' ? data.description : data.no_description}</p>
                        </div>
                      </div>
                      <Container className='custom-col-6'>
                        <div className='figures'>
                          {data.icons.map((item, i) => (
                            <div className='figure' key={i}>
                              <img src={`${item.icon}`} />
                              <p>{lang == 'en' ? item.text : item.no_text}</p>
                            </div>
                          ))}
                        </div>
                      </Container>
                    </Container>
                    <div className='starter-group'>
                      <Container className='custom-col-6'>
                        <h2>{lang == 'en' ? data.starting.start_title : data.starting.no_start_title}</h2>
                        <Container className='custom-col-8'>
                          <Grid columns={3}>
                            {data.starting.data.map((item, i) => (
                              <React.Fragment key={i}>
                                <Grid.Column mobile={16} tablet={8} only="mobile" onClick={(event) => this.triggerModal(event)}>
                                  <ServiceItem from='service' avatar={item.url} backimage={item.backimage} color={item.color} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />
                                </Grid.Column>
                                <Grid.Column only="computer" onClick={(event) => this.triggerModal(event)}>
                                  <ServiceItem from='service' avatar={item.url} backimage={item.backimage} color={item.color} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />
                                </Grid.Column>
                              </React.Fragment>
                            ))}
                          </Grid>
                        </Container>
                      </Container>
                      <Button className='primary-button' style={{ marginTop: 10 }} onClick={(event) => this.triggerModal(event)}>{translate('navigation.craft-enterprise')} <Icon name='arrow right'></Icon></Button>
                    </div>
                  </div>
                </div>
                <div className='service-section review illustration' style={{ backgroundImage: `url(${data.study.backimage})` }}>
                  <Container className='custom-col-6'>
                    <Container className='custom-col-4'>
                      <div className='service-review'>
                        <p className="case_text">{translate('service.case-study')}</p>
                        <h2>{lang == 'en' ? data.study.title : data.study.no_title}</h2>
                        <p className="description">'{lang == 'en' ? data.study.description : data.study.no_description}'</p>
                        <div className='avatar'><img src={`${data.study.avatar}`} /></div>
                        <p>{data.study.job}</p>
                        {data.study.path && <Link to={{ pathname: `/portfolio/${data.study.path}` }} className='third-button'>{translate('service.read-study')}</Link>}
                      </div>
                    </Container>
                  </Container>
                </div>
                <div className='service-section tech' style={data.technologies.length > 4 ? null : { minHeight: '30vh' }}>
                  <Container className='custom-col-6'>
                    <h2>{lang == 'en' ? data.translate_titles.tech : data.translate_titles.no_tech}</h2>
                    <Container className='custom-col-8'>
                      <Grid>
                        {data.technologies.map((item, i) => (
                          <React.Fragment key={i}>
                            <Grid.Column mobile={8} tablet={8} computer={4}>
                              <GuideCard from='service_mobile' avatar={item.icon} title={item.lang} description={lang == 'en' ? item.text : item.no_text} />
                            </Grid.Column>
                          </React.Fragment>
                        ))}
                      </Grid>
                    </Container>
                  </Container>
                </div>
                <div className='service-estimation'>
                  <Container className='custom-col-6'>
                    <div className='service-estimation-description'>
                      <h2>{lang == 'en' ? data.translate_titles.estimation : data.translate_titles.no_estimation}</h2>
											<p>{lang == 'en' ? data.translate_titles.estimation_des : data.translate_titles.no_estimation_des}</p>
                    </div>
                    <Grid columns={3}>
                      {data.estimation.map((item, i) => (
                        <React.Fragment key={i}>
                          <Grid.Column mobile={16} tablet={8} only="mobile tablet">
                            <BadgeTextCard from='service' url={item.url} number={item.number} title={lang == 'en' ? item.title : item.no_title} color={item.color} description={lang == 'en' ? item.description : item.no_description} />
                          </Grid.Column>
                          <Grid.Column only="computer">
                            <BadgeTextCard from='service' url={item.url} number={item.number} title={lang == 'en' ? item.title : item.no_title} color={item.color} description={lang == 'en' ? item.description : item.no_description} />
                          </Grid.Column>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </Container>
                </div>
                <PageFooter title={lang == 'en' ? data.footer_title : data.no_footer_title} description={lang == 'en' ? data.footer_description : data.no_footer_description} button={lang == 'en' ? data.footer_button : data.no_footer_button} link={lang == 'en' ? data.footer_link : data.no_footer_link} linkName={lang == 'en' ? data.footer_link_name : data.no_footer_link_name} url={data.footer_url} />
                <div className='divide'></div>
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