import React from 'react'
import { Container, Grid, Segment, Dimmer, Loader, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import PageMetaTag from '../../common/pageMetaTag'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            isPrivacy: false,
            isSecurity: false,
            isTerms: false,
            isConfident: false
        };
        // this.isSelected = this.isSelected.bind(this);
    }

    componentDidMount() {
        const { pagename } = this.props.location.state;
        Http.post('api/front/get-page', { name: 'privacy' })
        .then(
            res => {
                if (pagename == "privacy") {
                    this.setState({ isLoaded: true, isPrivacy: true, data: JSON.parse(res.data.data) });
                } else if(pagename == 'security') {
                    this.setState({ isLoaded: true, isSecurity: true, data: JSON.parse(res.data.data) });
                } else if (pagename == 'terms') {
                    this.setState({ isLoaded: true, isTerms: true, data: JSON.parse(res.data.data) });
                } else {
                    this.setState({ isLoaded: true, isConfident: true, data: JSON.parse(res.data.data) });
                }
                window.scrollTo(0, 0);
            }
        ).catch(err => {
            console.error(err);
        });
    }

    isPrivacySelected () {
        this.setState({ isPrivacy: true, isSecurity: false, isTerms: false, isConfident: false });
    }
    isSecuritySelected () {
        this.setState({ isPrivacy: false, isSecurity: true, isTerms: false, isConfident: false });
    }
    isTermsSelected () {
        this.setState({ isPrivacy: false, isSecurity: false, isTerms: true, isConfident: false });
    }
    isConfidentSelected () {
        this.setState({ isPrivacy: false, isSecurity: false, isTerms: false, isConfident: true });
    }

    render() {
        const { isLoaded, data, privacy, isPrivacy, isSecurity, isTerms, isConfident} = this.state;
        return (
            <div className='privacy-page'>
                {isLoaded ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <Container className='custom-col-6 privacy-section'>
                            <Grid padded='horizontally'>
                                <Grid.Column computer={3} className='custom-column side-nav'>
                                    <h3>Legal</h3>
                                    <Link to={{pathname:'/privacy', state:{pagename:'privacy'}}} className={isPrivacy?"item active": "item"}>Privacy {isPrivacy && <Icon name="caret right"></Icon>}</Link>
                                    <Link to={{pathname:'/security', state:{pagename:'security'}}} className={isSecurity?"item active": "item"}>Security {isSecurity && <Icon name="caret right"></Icon>}</Link>
                                    <Link to={{pathname:'/terms', state:{pagename: 'terms'}}} className={isTerms?"item active":"item"}>Terms {isTerms && <Icon name="caret right"></Icon>}</Link>
                                    <Link to={{pathname:'/confidentiality', state:{pagename:'confidentiality'}}} className={isConfident?"item active":"item"}>Confidently {isConfident && <Icon name="caret right"></Icon>}</Link>
                                </Grid.Column>
                                {isPrivacy && <Grid.Column computer={13} className='custom-column'>
                                    {ReactHtmlParser(data.privacy)}
                                </Grid.Column>}
                                {isSecurity && <Grid.Column computer={13} className='custom-column'>
                                    {ReactHtmlParser(data.security)}
                                </Grid.Column>}
                                {isTerms && <Grid.Column computer={13} className='custom-column'>
                                    {ReactHtmlParser(data.terms)}
                                </Grid.Column>}
                                {isConfident && <Grid.Column computer={13} className='custom-column'>
                                    {ReactHtmlParser(data.confident)}
                                </Grid.Column>}
                            </Grid>
                        </Container>
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