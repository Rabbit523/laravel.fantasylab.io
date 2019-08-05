import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader, Icon } from 'semantic-ui-react'
import PageMetaTag from '../../common/pageMetaTag'
import PageFooter from '../../common/pageFooter'
import ServiceItem from '../../common/serviceItem'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isExisted: false,
        };
    }

    componentDidMount() {
        const { pagename } = this.props.location.state;
        Http.post('api/front/get-portfolio-page', { type: pagename })
        .then(
            res => {
                if (res.data.data) {
                    this.setState({ isLoaded: true, isExisted: true, data: JSON.parse(res.data.data) });
                } else {
                    this.setState({ isLoaded: true, isExisted: false });
                }
            }
        ).catch(err => {
            console.error(err);
            this.setState({ isLoaded: true });
        });
    }

    render() {
        const { isLoaded, isExisted, data } = this.state;
        return (
            <div className='singlePortfolio-page'>
                {isLoaded?isExisted?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <div className='singlePortfolio-header' style={{ backgroundImage: `url(${data.header_back_url})` }}>
                            <div className='header-gradient'>
                                <Container className='custom-col-6'>
                                    <div className='header-description'>
                                        <div className='header-text'>
                                            <h2>{data.title}</h2>
                                            <p>{data.header_description}</p>
                                        </div>
                                    </div>
                                    <div className="image-group">
                                        <img src={`${ data.header_sub_images[0] }`} />
                                        <img src={`${ data.header_sub_images[1] }`} className="sub-img" />
                                    </div>
                                </Container>
                            </div>
                        </div>
                        <section className='portfolio-section'>
                            <Container className='custom-col-6'>
                                <Grid columns={3}>
                                    {data.main_description.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Grid.Column mobile={16} tablet={16} only="mobile" className="main_description">
                                                <p className="sub_title">{item.title}</p>
                                                <p className="sub_text">{item.text}</p>
                                                {Object.keys(item.sub).map((key, i) => (
                                                    <div className="sub_descriptions" key={i}>
                                                        <div className="round_number">{i+1}</div>
                                                        <p>{item.sub[key]}</p>
                                                    </div>
                                                ))}
                                            </Grid.Column>
                                            <Grid.Column only="computer" className="main_description">
                                                <p className="sub_title">{item.title}</p>
                                                <p className="sub_text">{item.text}</p>
                                                {Object.keys(item.sub).map((key, i) => (
                                                    <div className="sub_descriptions" key={i}>
                                                        <div className="round_number">{i+1}</div>
                                                        <p>{item.sub[key]}</p>
                                                    </div>
                                                ))}
                                            </Grid.Column>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </Container>
                        </section>
                        <section className="portfolio-section">
                            <Container className='custom-col-6'>
                                {data.sub_images.map((item, index) => (
                                    <div className="subImage" key={index}>
                                        <img src={`${ item.url }`} />
                                        <p>{item.text}</p>
                                    </div>
                                ))}
                            </Container>
                        </section>
                        <section className='portfolio-section review' style={{ backgroundImage: `url(${data.review.back_url})` }}>
                            <Container className="custom-col-6">
                                <div className="review-item">
                                    <div className="review-text-section">
                                        <h3>{data.review.title}</h3>
                                        <div className='description'>{data.review.description}</div>
                                        <hr/>
                                    </div>
                                    <div className="review-avatar">
                                        <img src={`${ data.review.avatar }`} />
                                        <div className='icon-quote-right'>
                                            <Icon name='quote right'/>
                                        </div>
                                    </div>
                                    <div className="review-personal">
                                        <p className='name'>{data.review.name}</p>
                                        <p>{data.review.job}</p>
                                    </div>
                                </div>
                            </Container>
                        </section>
                        <section className='portfolio-section scope'>
                            <Container className='custom-col-6 service'>
                                <h3>Scope of the project</h3>
                                <Grid columns={3}>
                                    {data.services.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <Grid.Column mobile={16} tablet={8} only="mobile">
                                                <ServiceItem url={item.url} title={item.title} color={item.color} description={item.description} backimage={item.backimage} />
                                            </Grid.Column>
                                            <Grid.Column only="computer">
                                                <ServiceItem url={item.url} title={item.title} color={item.color} description={item.description} backimage={item.backimage} />
                                            </Grid.Column>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </Container>
                        </section>
                        <PageFooter url={data.footer_back_url} />
                        <div className='divide'></div>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <h1 className="alert-notice">Page is not ready yet.</h1>
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