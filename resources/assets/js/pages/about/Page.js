import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader } from 'semantic-ui-react'
import PageMetaTag from '../../common/pageMetaTag'
import GuideCard from '../../common/guideCard'
import TextCard from '../../common/textCard'
import ServiceItem from '../../common/serviceItem'
import HeadquaterItem from '../../common/headQuaterItem'
import NewsCard from '../../common/newsCard'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    componentDidMount() {
        Http.post('api/front/get-page', { name: 'about' }).then(
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
            <div className="about-page">
                {isLoaded ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <div className="about-header" style={{backgroundImage: `url(${data.header_url})`}}>
                            <div className="header-gradient">
                                <Container className="custom-col-6">
                                    <div className="header-description">
                                        <div className="header-text">
                                            <h1>{data.title}</h1>
                                            <p>{data.description}</p>
                                        </div>
                                        <Container className="custom-col-6">
                                            <div className="counter-box">
                                                {
                                                    data.counters.map(function(item, i) {
                                                        return (
                                                            <div className="box" key={i}>
                                                                <h4>{item.number}</h4>
                                                                <p>{item.text}</p>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Container>
                                    </div>
                                    <div className="guide-tags">
                                        <Grid padded="horizontally">
                                            <Grid.Row className="custom-row" columns={data.guides.length}>
                                            {
                                                data.guides.map(function(item, i) {
                                                    return (
                                                        <Grid.Column key={i} className="custom-column">
                                                            <GuideCard avatar={item.avatar} title={item.title} description={item.description}/>
                                                        </Grid.Column>
                                                    )
                                                })
                                            }
                                            </Grid.Row>
                                        </Grid>
                                    </div>
                                </Container>
                            </div>
                        </div>
                        <div className="about-section">
                            <Container className="custom-col-6">
                                <h3>{data.values.title}</h3>
                                <Grid padded="horizontally">
                                    <Grid.Column width={8}>
                                        {data.values.data.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i < 3 &&  <TextCard color={item.color} title={item.title} description={item.description} />}
                                            </React.Fragment>
                                        ))}
                                    </Grid.Column>
                                    <Grid.Column width={8} style={{marginTop: 20}}>
                                        {data.values.data.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i >= 3 &&  <TextCard color={item.color} title={item.title} description={item.description} />}
                                            </React.Fragment>
                                        ))}
                                    </Grid.Column>
                                </Grid>
                            </Container>
                        </div>
                        <div className="about-section">
                            <Container className="custom-col-6">
                                <h3>{data.services.title}</h3>
                                <Grid padded="horizontally">
                                    <Grid.Row columns={2} className="custom-row">
                                        {data.services.data.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i<2 && 
                                                    <Grid.Column className="custom-column">
                                                        <ServiceItem url={item.url} type={item.type} title={item.title} color={item.color} description={item.description} backimage={item.backimage} />
                                                    </Grid.Column>
                                                }
                                            </React.Fragment>
                                        ))}
                                    </Grid.Row>
                                    <Grid.Row columns={4} className="custom-row">
                                        {data.services.data.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i>=2 && 
                                                    <Grid.Column className="custom-column">
                                                        <ServiceItem url={item.url} type={item.type} title={item.title} color={item.color} description={item.description} backimage={item.backimage} />
                                                    </Grid.Column>
                                                }
                                            </React.Fragment>
                                        ))}
                                    </Grid.Row>
                                </Grid>
                            </Container>
                        </div>
                        <div className="about-section">
                            <Container className="custom-col-6">
                                <h3>{data.headquarters.title}</h3>
                                <p>{data.headquarters.description}</p>
                                <div style={{backgroundImage: `url(${ data.headquarters.backimage})`, backgroundSize: 'cover'}}>
                                    <Grid padded="horizontally" style={{paddingTop: 100}}>
                                        <Grid.Row columns={4} className="custom-row">
                                            {data.headquarters.data.map((item, i) => (
                                                <Grid.Column className="custom-column" key={i}>
                                                    <HeadquaterItem avatar={item.avatar} button={item.button} title={item.title} description={item.description} />
                                                </Grid.Column>
                                            ))}
                                        </Grid.Row>
                                    </Grid>
                                </div>
                            </Container>
                        </div>
                        <div className="about-section">
                            <section className="home-section">
                                <Container className="custom-col-6">
                                    <h3>{data.news.title}</h3>
                                    <Grid padded="horizontally">
                                        <Grid.Row columns={3} className="custom-row">
                                            {
                                                data.news.data.map(function (item, i) {
                                                    return (
                                                        <Grid.Column key={i} className="custom-column">
                                                            <NewsCard url={item.url} author={item.author} type={item.type} title={item.title} description={item.description} time={item.time} read={item.read} />
                                                        </Grid.Column>
                                                    )
                                                })
                                            }
                                        </Grid.Row>
                                    </Grid>
                                </Container>
                            </section>
                        </div>
                        <section className="divide"></section>
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