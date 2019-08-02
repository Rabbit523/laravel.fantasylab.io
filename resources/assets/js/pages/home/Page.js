import React from 'react'
import { Button, Container, Grid, Dimmer, Segment, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PageFooter from '../../common/pageFooter'
import ServiceItem from '../../common/serviceItem'
import BadgeTextCard from '../../common/badgeTextCard'
import PortfolioCard from '../../common/portfolioCard'
import Gallery from '../../common/carousel'
import NewsCard from '../../common/newsCard'
import PageMetaTag from '../../common/pageMetaTag'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false
        };
    }

    componentDidMount() {
        Http.post('api/front/get-page', { name: 'home' }).then(
            res => {
                this.setState({ isLoaded: true, data: JSON.parse(res.data.data) });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    render() {
        const { isLoaded, data } = this.state;
        return (
            <div className='home-page'>
                {isLoaded ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.header.meta_title} meta_description={data.header.meta_description}/>
                        <div className='homepage-header' style={{ backgroundImage: `url(${data.header.header_url})` }}>
                            <Container className='custom-col-6'>
                                <div className='homepage-header-description'>
                                    <h2>{data.header.header_title}</h2>
                                    <p className='title'>{data.header.header_description_title}</p>
                                    {
                                        data.header.header_description.split('\n').map((item, i) => {
                                            return (
                                                <p key={i} className='normal'>{item}</p>
                                            )
                                        })
                                    }
                                    <div className='homepage-header-buttons'>
                                        <Button as={Link} to='/register' replace compact
                                            className='register primary-button'>Craft Enterprise</Button>
                                        <p>Existing user?<Link to='/login' className='item-link'>Log in to FantasyLab</Link></p>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <section className='home-section'>
                            <Container className='custom-col-6'>
                                <h3>Services</h3>
                                <Grid padded='horizontally'>
                                    <Grid.Row columns={2}>
                                        {Object.keys(data.services).map((key, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {index<2 && 
                                                        <Grid.Column>
                                                            <ServiceItem url={data.services[key].url} title={data.services[key].title} color={data.services[key].color} description={data.services[key].description} backimage={data.services[key].backimage} />
                                                    </Grid.Column>}                                                        
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid.Row>
                                    <Grid.Row columns={4}>
                                        {Object.keys(data.services).map((key, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {index>=2 && 
                                                        <Grid.Column>
                                                            <ServiceItem url={data.services[key].url} title={data.services[key].title} color={data.services[key].color} description={data.services[key].description} backimage={data.services[key].backimage} />
                                                        </Grid.Column>}
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </section>
                        <section className='home-estimation'>
                            <Container className='custom-col-6'>
                                <div className='home-estimation-description'>
                                    <h3>Estimation. Proposal. Delivery.</h3>
                                    <p>Don't get a goat. Get a quote.</p>
                                </div>
                                <Grid padded='horizontally'>
                                    <Grid.Row columns={3}>
                                        {Object.keys(data.badges).map((key, index) => (
                                            <React.Fragment key={index}>
                                                {index<3 && 
                                                    <Grid.Column>
                                                        <BadgeTextCard url={data.badges[key].url} number={data.badges[key].number} title={data.badges[key].title} color={data.badges[key].color} description={data.badges[key].description} />
                                                </Grid.Column>}
                                            </React.Fragment>
                                        ))}
                                    </Grid.Row>
                                    <Grid.Row columns={3}>
                                        {Object.keys(data.badges).map((key, index) => (
                                            <React.Fragment key={index}>
                                                {index>=3 && 
                                                    <Grid.Column>
                                                        <BadgeTextCard url={data.badges[key].url} number={data.badges[key].number} title={data.badges[key].title} color={data.badges[key].color} description={data.badges[key].description} />
                                                </Grid.Column>}
                                            </React.Fragment>
                                        ))}
                                    </Grid.Row>
                                </Grid>
                                <div className='home-button-group'>
                                    <Button as={Link} to='/register' replace compact className='primary-button'>Craft Enterprise</Button>
                                    <Button as={Link} to='/login' replace compact className='secondary-button'>The Platform</Button>
                                </div>
                            </Container>
                        </section>
                        <section className='home-section'>
                            <Container className='custom-col-6'>
                                <h3>Portfolio</h3>
                                <Grid padded='horizontally'>
                                    <Grid.Row columns={3}>
                                        {Object.keys(data.portfolios).map((key, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {index<3 && 
                                                        <Grid.Column>
                                                            <PortfolioCard from={data.portfolios[key].from} icon_url={data.portfolios[key].icon_url} />
                                                    </Grid.Column>}
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid.Row>
                                    <Grid.Row columns={3}>
                                        {Object.keys(data.portfolios).map((key, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    {index>=3 && 
                                                        <Grid.Column>
                                                            <PortfolioCard from={data.portfolios[key].from} icon_url={data.portfolios[key].icon_url} />
                                                    </Grid.Column>}
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </section>
                        <section className='home-section'>
                            <Container className='custom-col-6 home-review'>
                                <h3>Choose excellence, always.</h3>
                                <p>The scrum Framework and an Agile mindset is paramount.</p>
                            </Container>
                            <Container className='custom-col-8'>
                                <Gallery items={data.carousels} />
                            </Container>
                        </section>
                        <section className='home-section'>
                            <Container className='custom-col-6'>
                                <h3>Latest News</h3>
                                <Grid padded='horizontally'>
                                    <Grid.Row columns={3}>
                                        {
                                            data.news.map(function(item, i) {
                                                return (
                                                    <Grid.Column key={i}>
                                                        <NewsCard url={item.url} author={item.author} type={item.type} title={item.title} description={item.description} time={item.time} read={item.read} />
                                                    </Grid.Column>
                                                )
                                            })
                                        }
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </section>
                        <PageFooter url={data.header.footer_url} />
                        <section className='divide'></section>
                    </React.Fragment>
                    :
                    <Segment className='page-loader'>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading...</Loader>
                        </Dimmer>
                    </Segment>
                }
            </div>
        );
    }
}

export default Page;