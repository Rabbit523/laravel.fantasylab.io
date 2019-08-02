import React from 'react'
import { Button, Container, Grid, Dimmer, Segment, Loader, Icon } from 'semantic-ui-react'
import PageMetaTag from '../../../common/pageMetaTag'
import Http from '../../../Http'
import PageFooter from '../../../common/pageFooter'
import ServiceItem from '../../../common/serviceItem'
import GuideCard from '../../../common/guideCard'
import BadgeTextCard from '../../../common/badgeTextCard'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }
    
    componentDidMount() {
        Http.post('api/front/get-page', { name: 'serviceMobile' })
        .then(
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
            <div className='service-page'>
                {isLoaded ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <div className='service-header' style={{ backgroundImage: `url(${data.header_url})` }}>
                            <div className='header-gradient mobile'>
                                <Container className='custom-col-6'>
                                    <div className='header-description'>
                                        <div className='header-text'>
                                            <h2>{data.title}</h2>
                                            <p>{data.description}</p>
                                        </div>
                                    </div>
                                    <Container className='custom-col-6'>
                                        <div className='figures'>
                                            {data.icons.map((item, i) => (
                                                <div className='figure' key={i}>
                                                    <img src={`${ item.icon}`} />
                                                    <p>{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </Container>
                                </Container>
                                <div className='starter-group'>
                                    <Container className='custom-col-6'>
                                        <h3>Let's start. What do you need?</h3>
                                        <Container className='custom-col-8'>
                                            <Grid padded='horizontally'>
                                                <Grid.Row columns={3}>
                                                    {data.starting.map((item, i) => (
                                                        <Grid.Column key={i}>
                                                            <ServiceItem from='service' url={item.url} backimage={item.backimage} color={item.color} title={item.title} description={item.description}/>
                                                        </Grid.Column>
                                                    ))}
                                                </Grid.Row>
                                            </Grid>
                                        </Container>
                                        <Button className='primary-button' style={{marginTop: 20}}>Craft Enterprise <Icon name='arrow right'></Icon></Button>
                                    </Container>
                                </div>
                            </div>
                        </div>
                        <div className='service-section review' style={{ background: `url(${data.study.backimage}) no-repeat center`, backgroundSize: '100% 100%' }}>
                            <Container className='custom-col-6'>
                                <Container className='custom-col-4'>
                                    <div className='service-review'>
                                        <p>CASE STUDY</p>
                                        <h3>{data.study.title}</h3>
                                        <p>'{data.study.description}'</p>
                                        <div className='avatar'><img src={`${ data.study.avatar}`} /></div>
                                        <p>{data.study.job}</p>
                                        <Button className='third-button'>Read case study</Button>
                                    </div>
                                </Container>
                            </Container>
                        </div>
                        <div className='service-section'>
                            <h3>Technologies we excel at</h3>
                            <Container className='custom-col-6'>
                                <Container className='custom-col-8'>
                                    <Grid padded='horizontally'>
                                        <Grid.Row columns={4}>
                                            {data.technologies.map((item, i) => (
                                                <React.Fragment  key={i}>
                                                    {i<4 && 
                                                        <Grid.Column>
                                                            <GuideCard from='service_mobile' avatar={item.icon} title={item.lang} description={item.text}/>
                                                        </Grid.Column>}
                                                </React.Fragment>
                                            ))}
                                        </Grid.Row>
                                        <Grid.Row columns={4}>
                                            {data.technologies.map((item, i) => (
                                                <React.Fragment  key={i}>
                                                    {i>=4 && 
                                                        <Grid.Column>
                                                            <GuideCard from='service_mobile' avatar={item.icon} title={item.lang} description={item.text}/>
                                                        </Grid.Column>}
                                                </React.Fragment>
                                            ))}
                                        </Grid.Row>
                                    </Grid>
                                </Container>
                            </Container>
                        </div>
                        <div className='service-estimation'>
                            <Container className='custom-col-6'>
                                <div className='service-estimation-description'>
                                    <h3>Estimation. Proposal. Delivery.</h3>
                                    <p>Don't get a goat. Get a quote.</p>
                                </div>
                                <Grid padded='horizontally'>
                                    <Grid.Row columns={3}>
                                        {data.estimation.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i<3 && 
                                                    <Grid.Column>
                                                        <BadgeTextCard from='service' url={item.url} number={item.number} title={item.title} color={item.color} description={item.description} />
                                                    </Grid.Column>}
                                            </React.Fragment>
                                        ))}
                                    </Grid.Row>
                                    <Grid.Row columns={3}>
                                        {data.estimation.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i>=3 && 
                                                    <Grid.Column>
                                                        <BadgeTextCard from='service' url={item.url} number={item.number} title={item.title} color={item.color} description={item.description} />
                                                    </Grid.Column>}
                                            </React.Fragment>
                                        ))}
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </div>
                        <PageFooter url={data.footer_url} />
                        <div className='divide'></div>
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