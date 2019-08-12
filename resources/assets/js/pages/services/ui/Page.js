import React from 'react'
import { Button, Container, Grid, Dimmer, Segment, Loader } from 'semantic-ui-react'
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
        Http.post('api/front/get-page', { name: 'serviceUI' }).then(
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
                                            <h1>{data.title}</h1>
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
                                        <h2>Let's start. What do you need?</h2>
                                        <Container className='custom-col-8'>
                                            <Grid columns={3}>
                                                {data.starting.map((item, i) => (
                                                    <React.Fragment key={i}>
                                                        <Grid.Column mobile={16} tablet={8} only="mobile">
                                                            <ServiceItem from='service' url={item.url} backimage={item.backimage} color={item.color} title={item.title} description={item.description}/>
                                                        </Grid.Column>
                                                        <Grid.Column only="computer">
                                                            <ServiceItem from='service' url={item.url} backimage={item.backimage} color={item.color} title={item.title} description={item.description}/>
                                                        </Grid.Column>
                                                    </React.Fragment>
                                                ))}
                                            </Grid>
                                        </Container>
                                    </Container>
                                </div>
                            </div>
                        </div>
                        <div className='service-section review mobile' style={{ backgroundImage: `url(${data.study.backimage})` }}>
                            <Container className='custom-col-6'>
                                <Container className='custom-col-4'>
                                    <div className='service-review'>
                                        <p className="case_text">CASE STUDY</p>
                                        <h2>{data.study.title}</h2>
                                        <p>'{data.study.description}'</p>
                                        <div className='avatar'><img src={`${ data.study.avatar}`} /></div>
                                        <p>{data.study.job}</p>
                                        <Button className='third-button'>Read case study</Button>
                                    </div>
                                </Container>
                            </Container>
                        </div>
                        <div className='service-section tech' style={data.technologies.length > 4 ? null : {minHeight: '30vh'}}>
                            <Container className='custom-col-6'>
                                <h2>Technologies we excel at</h2>
                                <Container className='custom-col-8'>
                                    <Grid>
                                        {data.technologies.map((item, i) => (
                                            <React.Fragment key={i}>
                                                <Grid.Column mobile={8} tablet={8} computer={4}>
                                                    <GuideCard from='service_mobile' avatar={item.icon} title={item.lang} description={item.text}/>
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
                                    <h2>Estimation. Proposal. Delivery.</h2>
                                    <p>Don't get a goat. Get a quote.</p>
                                </div>
                                <Grid columns={3}>
                                    {data.estimation.map((item, i) => (
                                        <React.Fragment key={i}>
                                            <Grid.Column mobile={16} only="mobile">
                                                <BadgeTextCard from='service' url={item.url} number={item.number} title={item.title} color={item.color} description={item.description} />
                                            </Grid.Column>
                                            <Grid.Column only="computer">
                                                <BadgeTextCard from='service' url={item.url} number={item.number} title={item.title} color={item.color} description={item.description} />
                                            </Grid.Column>
                                        </React.Fragment>
                                    ))}
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