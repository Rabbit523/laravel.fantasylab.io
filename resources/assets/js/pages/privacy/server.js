import React from 'react'
import { Container, Grid, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isPrivacy: false,
            isSecurity: false,
            isTerms: false,
            isConfident: false
        };
    }

    render() {
        const { isPrivacy, isSecurity, isTerms, isConfident} = this.state;
        let path = this.props.location.pathname.split("/")[1];
        if (path == "privacy") {
            this.setState({ sPrivacy: true });
        } else if(path == 'security') {
            this.setState({ isSecurity: true });
        } else if (path == 'terms') {
            this.setState({ isTerms: true });
        } else if (path == 'confidentiality') {
            this.setState({ isConfident: true });
        }
        let data = this.props.page;
        return (
            <div className='privacy-page'>
                <React.Fragment>
                    <Container className='custom-col-6 privacy-section'>
                        <Grid padded='horizontally'>
                            <Grid.Column computer={3} tablet={3} mobile={0} className='custom-column side-nav'>
                                <h3>Legal</h3>
                                <Link to={{pathname:'/privacy', state:{pagename:'privacy'}}} className={isPrivacy?"item active": "item"}>Privacy {isPrivacy && <Icon name="caret right"></Icon>}</Link>
                                <Link to={{pathname:'/security', state:{pagename:'security'}}} className={isSecurity?"item active": "item"}>Data Processor {isSecurity && <Icon name="caret right"></Icon>}</Link>
                                <Link to={{pathname:'/terms', state:{pagename: 'terms'}}} className={isTerms?"item active":"item"}>Terms {isTerms && <Icon name="caret right"></Icon>}</Link>
                                <Link to={{pathname:'/confidentiality', state:{pagename:'confidentiality'}}} className={isConfident?"item active":"item"}>Confidentiality {isConfident && <Icon name="caret right"></Icon>}</Link>
                            </Grid.Column>
                            {isPrivacy && <Grid.Column computer={13} tablet={13} mobile={16} className='custom-column'>
                                {ReactHtmlParser(data.privacy)}
                            </Grid.Column>}
                            {isSecurity && <Grid.Column computer={13} tablet={13} mobile={16} className='custom-column'>
                                {ReactHtmlParser(data.security)}
                            </Grid.Column>}
                            {isTerms && <Grid.Column computer={13} tablet={13} mobile={16} className='custom-column'>
                                {ReactHtmlParser(data.terms)}
                            </Grid.Column>}
                            {isConfident && <Grid.Column computer={13} tablet={13} mobile={16} className='custom-column'>
                                {ReactHtmlParser(data.confident)}
                            </Grid.Column>}
                        </Grid>
                    </Container>
                    <section className='divide'></section>
                </React.Fragment>
            </div>
        );
    }
}

export default Page;