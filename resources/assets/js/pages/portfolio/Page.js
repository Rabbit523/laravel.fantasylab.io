import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PageMetaTag from '../../common/pageMetaTag'
import PageFooter from '../../common/pageFooter'
import PortfolioCard from '../../common/portfolioCard'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            data: []
        }
    }

    componentDidMount() {
        Http.post('api/front/get-page', { name: 'portfolio' }).then(
            res => {
                this.setState({ isLoaded: true, data: JSON.parse(res.data.page.data) });
                window.scrollTo(0, 0);
            }
        ).catch(err => {
            console.error(err);
        });
    }

    render() {
        const { isLoaded, data } = this.state;
        return (
            <div className='portfolio-page'>
                {isLoaded ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <div className='portfolio-header' style={{ backgroundImage: `url(${data.header_url})` }}>
                            <div className='header-gradient'>
                                <Container className='custom-col-6'>
                                    <div className='portfolio-header-description'>
                                        <div className='portfolio-header-text'>
                                            <h1>{data.title}</h1>
                                            <p>{data.description}</p>
                                        </div>
                                        <div className='portfolio-header-figure'>
                                            {data.icon_urls.map((item, i) => (
                                                <div className='figure' key={i}>
                                                    <img src={`${ item.path}`} />
                                                    <p>{item.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Container>
                            </div>
                        </div>
                        <div className='portfolio-studios'>
                            <Container className='custom-col-6'>
                                <h2>Case Studies</h2>
                                <Grid columns={3}>
                                    {Object.keys(data.portfolios).map((key, index) => (
                                        <React.Fragment key={index}>
                                            <Grid.Column mobile={16} tablet={8} only="mobile tablet" as={Link} to={{ pathname: `/${data.portfolios[key].url}`, state:{ pagename: key } }}>
                                                <PortfolioCard from='portfolio' back_url={data.portfolios[key].back_url} title={data.portfolios[key].title} description={data.portfolios[key].description}/>
                                            </Grid.Column>
                                            <Grid.Column only="computer" as={Link} to={{ pathname: `/${data.portfolios[key].url}`, state:{ pagename: key } }}>
                                                <PortfolioCard from='portfolio' back_url={data.portfolios[key].back_url} title={data.portfolios[key].title} description={data.portfolios[key].description}/>
                                            </Grid.Column>
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </Container>
                        </div>
                        <PageFooter title={data.footer_title} description={data.footer_description} button={data.footer_button} link={data.footer_link} linkName={data.footer_link_name} url={data.footer_url} />
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