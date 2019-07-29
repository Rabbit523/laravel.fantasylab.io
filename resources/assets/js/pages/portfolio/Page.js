import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader } from 'semantic-ui-react'
import PageMetaTag from '../../common/pageMetaTag'
import PageFooter from '../../common/pageFooter'
import PortfolioCard from '../../common/portfolioCard'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        Http.post('api/front/get-page', { name: 'portfolio' }).then(
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
                                <h2>Case studios</h2>
                                <Grid padded='horizontally'>
                                    <Grid.Row columns={3} className='custom-row'>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.avollon.from} title={data.portfolios.avollon.title} description={data.portfolios.avollon.description}/>
                                        </Grid.Column>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.maora.from} title={data.portfolios.maora.title} description={data.portfolios.maora.description}/>
                                        </Grid.Column>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.osg.from} title={data.portfolios.osg.title} description={data.portfolios.osg.description}/>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={3} className='custom-row'>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.attitude.from} title={data.portfolios.attitude.title} description={data.portfolios.attitude.description}/>
                                        </Grid.Column>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.proguiden.from} title={data.portfolios.proguiden.title} description={data.portfolios.proguiden.description}/>
                                        </Grid.Column>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.apotek.from} title={data.portfolios.apotek.title} description={data.portfolios.apotek.description}/>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row columns={3} className='custom-row'>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.insurance.from} title={data.portfolios.insurance.title} description={data.portfolios.insurance.description}/>
                                        </Grid.Column>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.consulting.from} title={data.portfolios.consulting.title} description={data.portfolios.consulting.description}/>
                                        </Grid.Column>
                                        <Grid.Column className='custom-column'>
                                            <PortfolioCard from={data.portfolios.ibobil.from} title={data.portfolios.ibobil.title} description={data.portfolios.ibobil.description}/>
                                        </Grid.Column>
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