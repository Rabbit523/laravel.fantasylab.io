import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader } from 'semantic-ui-react'
import PageMetaTag from '../../common/pageMetaTag'
import GuideCard from '../../common/guideCard'
import TextCard from '../../common/textCard'
import ServiceItem from '../../common/serviceItem'
import HeadquaterItem from '../../common/headQuaterItem'
import NewsCard from '../../common/newsCard'
import Gallery from '../../common/carousel'
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
                window.scrollTo(0, 0);
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
                                                {data.counters.map((item, i) => (
                                                    <div className="box" mobile={16} tablet={8} computer={4}key={i}>
                                                        <h4>{item.number}</h4>
                                                        <p>{item.text}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Container>
                                    </div>
                                    <div className="guide-tags">
                                        <Grid columns={4}>
                                            {data.guides.map((item, index) => (
                                                <Grid.Column className="box" mobile={16} tablet={8} computer={4} key={index}>
                                                    <GuideCard avatar={item.avatar} title={item.title} description={item.description}/>
                                                </Grid.Column>
                                            ))}
                                        </Grid>
                                    </div>
                                </Container>
                            </div>
                        </div>
                        <div className="about-section">
                            <Container className="custom-col-6">
                                <h2>{data.values.title}</h2>
                                <Grid>
                                    <Grid.Column mobile={16} tablet={16} computer={8}>
                                        {data.values.data.map((item, i) => (
                                            <React.Fragment key={i}>
                                                {i < 3 &&  <TextCard color={item.color} title={item.title} description={item.description} />}
                                            </React.Fragment>
                                        ))}
                                    </Grid.Column>
                                    <Grid.Column mobile={16} tablet={16} computer={8} style={{marginTop: 20}}>
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
                                <h2>{data.services.title}</h2>
                                <Grid>
                                    {data.services.data.map((item, i) => (
                                        <React.Fragment key={i}>
                                            {i<2 && 
                                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                                    <ServiceItem url={item.url} type={item.type} title={item.title} color={item.color} description={item.description} backimage={item.backimage} />
                                                </Grid.Column>}
                                            {i>=2 && 
                                                <Grid.Column mobile={16} tablet={8} computer={4}>
                                                    <ServiceItem url={item.url} type={item.type} title={item.title} color={item.color} description={item.description} backimage={item.backimage} />
                                                </Grid.Column>}
                                        </React.Fragment>
                                    ))}
                                </Grid>
                            </Container>
                        </div>
                        <div className="about-section headquarter">
                            <Container className="custom-col-6">
                                <h2>{data.headquarters.title}</h2>
                                <p className="sub_title">{data.headquarters.description}</p>
                                <div className="headquarters" style={{backgroundImage: `url(${ data.headquarters.backimage})`, backgroundSize: 'cover'}}>
                                    <Grid className="headquater-item">
                                        {data.headquarters.data.map((item, i) => (
                                            <Grid.Column  mobile={16} tablet={8} computer={4} key={i}>
                                                <HeadquaterItem avatar={item.avatar} button={item.button} title={item.title} description={item.description} />
                                            </Grid.Column>
                                        ))}
                                    </Grid>
                                </div>
                            </Container>
                        </div>
                        <div className="about-section">
                            <section className="home-section">
                                <Container className="custom-col-6">
                                    <h2>{data.news.title}</h2>
                                    <Grid columns={3}>
                                        {data.news.data.map((item, i) => (
                                            <Grid.Column key={i} only="computer">
                                                <NewsCard url={item.url} author={item.author} type={item.type} title={item.title} description={item.description} time={item.time} read={item.read} />
                                            </Grid.Column>
                                        ))}
                                    </Grid>
                                    <Grid>
                                        <Grid.Column only="mobile">
                                            <Gallery type="news" items={data.news.data} />
                                        </Grid.Column>
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