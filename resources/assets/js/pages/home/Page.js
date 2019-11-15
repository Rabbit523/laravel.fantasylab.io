import React from 'react'
import { Button, Container, Grid, Dimmer, Segment, Loader, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {isMobile} from 'react-device-detect'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { Translate, withLocalize } from "react-localize-redux"
import PageFooter from '../../common/pageFooter'
import ServiceItem from '../../common/serviceItem'
import BadgeTextCard from '../../common/badgeTextCard'
import PortfolioCard from '../../common/portfolioCard'
import Gallery from '../../common/carousel'
import NewsCard from '../../common/newsCard'
import PageMetaTag from '../../common/pageMetaTag'
import Http from '../../Http'

const customStyles = {
    content : {
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
            isOpen: false,
            data: []
        };
        this.closeModal = this.closeModal.bind(this);
        this.triggerModal = this.triggerModal.bind(this);
    }

    componentDidMount() {
        this.props.setActiveLanguage(this.props.lang);
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        Http.post(`${window.location.origin}/api/front/get-page`, { name: 'home' }).then(
            res => {
                if (window.innerWidth < 1024) {
                    this.setState({ isLoaded: true, isTablet: false, data: JSON.parse(res.data.page.data) });
                } else {
                    this.setState({ isLoaded: true, isTablet: true, data: JSON.parse(res.data.page.data) });
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
        const { lang } = this.props;
        Modal.setAppElement('#app')
        return (
            <Translate>
                {({ translate }) => (
                    <div className='home-page'>
                    {isLoaded ?
                        <React.Fragment>
                            <PageMetaTag meta_title={lang=='en'?data.header.meta_title:data.header.no_meta_title} meta_description={lang=='no'?data.header.meta_description:data.header.no_meta_description}/>
                            <Modal
                                isOpen={isOpen}
                                onRequestClose={this.closeModal}
                                style={customStyles}
                                >
                                <Button icon='close' onClick={this.closeModal}/>
                                <h2>Hi,<br/>Visionary.</h2>
                                <p>Our web app is under development.</p>
                                <div className="button-group">
                                    <Button as={Link} to='/contact' className='primary-button'>Contact us</Button>
                                    <Button className='secondary-button' onClick={this.closeModal}>Close</Button> 
                                </div>
                            </Modal>
                            <div className='homepage-header' style={{ backgroundImage: `url(${isMobile&&!isTablet?data.header.mobile_header:data.header.header_url})` }}>
                                <Container className='custom-col-6'>
                                    <div className='homepage-header-description'>
                                        <h1>{lang=='en'?data.header.header_title:data.header.no_header_title}</h1>
                                        <p className='title'>{lang=='en'?data.header.header_description_title:data.header.no_header_description_title}</p>
                                        {
                                            lang=='en'?data.header.header_description.split('\n').map((item, i) => {
                                                return (
                                                    <p key={i} className='normal'>{item}</p>
                                                )
                                            }):data.header.no_header_description.split('\n').map((item, i) => {
                                                return (
                                                    <p key={i} className='normal'>{item}</p>
                                                )
                                            })
                                        }
                                        <div className='homepage-header-buttons'>
                                            {/* <Button as={Link} to='/register' className='register primary-button'>Craft Enterprise</Button> */}
                                            <Button className='register primary-button' onClick={(event) => this.triggerModal(event)}>{translate('navigation.craft-enterprise')}</Button>
                                            <p>{translate('home.existing-user')} <Link to='/login' className='item-link' onClick={(event) => this.triggerModal(event)}>{translate('home.login-to-fantasylab')}</Link>.</p>
                                        </div>
                                    </div>
                                </Container>
                            </div>
                            {data.services && <section className='home-section'>
                                <Container className='custom-col-6'>
                                    <h2>{translate('navigation.services')}</h2>
                                    <Grid>
                                        {Object.keys(data.services).map((key, index) => (
                                            <React.Fragment key={index}>
                                                {index<2 && 
                                                    <Grid.Column mobile={16} tablet={8} computer={8} as={Link} to={data.services[key].url}>
                                                        <ServiceItem avatar={data.services[key].avatar} title={lang=='en'?data.services[key].title:data.services[key].no_title} color={data.services[key].color} description={lang=='en'?data.services[key].description:data.services[key].no_description} backimage={data.services[key].backimage} />
                                                </Grid.Column>}
                                                {index>=2 && 
                                                    <Grid.Column mobile={16} tablet={8} computer={4} as={Link} to={data.services[key].url}>
                                                        <ServiceItem type="home_quater" avatar={data.services[key].avatar} title={lang=='en'?data.services[key].title:data.services[key].no_title} color={data.services[key].color} description={lang=='en'?data.services[key].description:data.services[key].no_description} backimage={data.services[key].backimage}/>
                                                    </Grid.Column>}
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </Container>
                            </section>}
                            <section className='home-estimation'>
                                <Container className='custom-col-6'>
                                    <div className='home-estimation-description'>
                                        <h2>{translate('home.estimation-delivery')}.</h2>
                                        <p>{translate('home.get-quote')}.</p>
                                    </div>
                                    <Grid columns={3}>
                                        {Object.keys(data.badges).map((key, index) => (
                                            <React.Fragment key={index}>
                                                <Grid.Column mobile={16} tablet={8} only="mobile tablet">
                                                    <BadgeTextCard from="home" url={data.badges[key].url} number={data.badges[key].number} title={lang=='en'?data.badges[key].title:data.badges[key].no_title} color={data.badges[key].color} description={lang=='en'?data.badges[key].description:data.badges[key].no_description} />
                                                </Grid.Column>
                                                <Grid.Column only="computer">
                                                    <BadgeTextCard from="home" url={data.badges[key].url} number={data.badges[key].number} title={lang=='en'?data.badges[key].title:data.badges[key].no_title} color={data.badges[key].color} description={lang=='en'?data.badges[key].description:data.badges[key].no_description} />
                                                </Grid.Column>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                    <div className='home-button-group'>
                                        {/* <Button as={Link} to='/register' replace compact className='primary-button'>Craft Enterprise</Button>
                                        <Button as={Link} to='/login' replace compact className='secondary-button'>The Platform</Button> */}
                                        <Button as={Link} to='/register' className='primary-button' onClick={(event) => this.triggerModal(event)}>{translate('navigation.craft-enterprise')}</Button>
                                        <Button as={Link} to='/login' className='secondary-button' onClick={(event) => this.triggerModal(event)}>{translate('home.the-platform')}</Button>
                                    </div>
                                </Container>
                            </section>
                            <section className='home-section'>
                                <Container className='custom-col-6'>
                                    <h2>{translate('navigation.portfolio')}</h2>
                                    <Grid columns={3}>
                                        {Object.keys(data.portfolios).map((key, index) => (
                                            <React.Fragment key={index}>
                                                <Grid.Column mobile={16} tablet={8} only="mobile tablet" as={Link} to={{ pathname: `/portfolio/${data.portfolios[key].url}`, state:{ pagename: key } }}>
                                                    <PortfolioCard from={data.portfolios[key].from} icon_url={data.portfolios[key].icon_url} back_url={data.portfolios[key].back_url} title={data.portfolios[key].title} description={data.portfolios[key].description}/>
                                                </Grid.Column>
                                                <Grid.Column only="computer" as={Link} to={{ pathname: `/portfolio/${data.portfolios[key].url}`, state:{ pagename: key } }}>
                                                    <PortfolioCard from={data.portfolios[key].from} icon_url={data.portfolios[key].icon_url} back_url={data.portfolios[key].back_url} title={data.portfolios[key].title} description={data.portfolios[key].description}/>
                                                </Grid.Column>
                                            </React.Fragment>
                                        ))}
                                    </Grid>
                                </Container>
                            </section>
                            <section className='home-section'>
                                <Container className='custom-col-6 home-review'>
                                    <h2>{translate('home.excellence')}</h2>
                                    <p>{translate('home.agile-framework')}</p>
                                </Container>
                                <Container>
                                    <Gallery type="review" items={data.carousels} lang={lang}/>
                                </Container>
                            </section>
                            <section className='home-section'>
                                <Container className='custom-col-6'>
                                    <h2>{translate('home.latest-news')}</h2>
                                    <Grid columns={3}>
                                        {data.news.map((item, i) => (
                                            <Grid.Column key={i} only="computer" onClick={(event) => this.triggerModal(event)}>
                                                <NewsCard url={item.url} author={item.author} type={item.type} title={lang=='en'?item.title:item.no_title} description={lang=='en'?item.description:item.no_description} time={item.time} read={item.read} />
                                            </Grid.Column>
                                        ))}
                                    </Grid>
                                    <Grid>
                                        <Grid.Column only="tablet mobile" onClick={(event) => this.triggerModal(event)}>
                                            <Gallery type="news" items={data.news} lang={lang}/>
                                        </Grid.Column>
                                    </Grid>
                                </Container>
                            </section>
                            <PageFooter title={lang=='en'?data.footer.title:data.footer.no_title} description={lang=='en'?data.footer.description:data.footer.no_description} button={lang=='en'?data.footer.button:data.footer.no_button} link={lang=='en'?data.footer.link:data.footer.no_link} linkName={lang=='en'?data.footer.link_name:data.footer.no_link_name} url={data.footer.url} />
                            <section className='divide'></section>
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