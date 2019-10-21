import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PageFooter from '../../common/pageFooter'
import PortfolioCard from '../../common/portfolioCard'

class PortfolioServer extends React.Component {

    render() {
        let data = this.props.page;
        return (
            <div className='portfolio-page'>
                <React.Fragment>
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
                                        <Grid.Column mobile={16} tablet={8} only="mobile tablet" as={Link} to={{ pathname: `/portfolio/${data.portfolios[key].url}` }}>
                                            <PortfolioCard from={data.portfolios[key].from} back_url={data.portfolios[key].back_url} title={data.portfolios[key].title} description={data.portfolios[key].description}/>
                                        </Grid.Column>
                                        <Grid.Column only="computer"  as={Link} to={{ pathname: `/portfolio/${data.portfolios[key].url}` }}>
                                            <PortfolioCard from={data.portfolios[key].from} back_url={data.portfolios[key].back_url} title={data.portfolios[key].title} description={data.portfolios[key].description}/>
                                        </Grid.Column>
                                    </React.Fragment>
                                ))}
                            </Grid>
                        </Container>
                    </div>
                    <PageFooter title={data.footer_title} description={data.footer_description} button={data.footer_button} link={data.footer_link} linkName={data.footer_link_name} url={data.footer_url} />
                    <div className='divide'></div>
                </React.Fragment>
            </div>
            
        );
    }
}

export default PortfolioServer;