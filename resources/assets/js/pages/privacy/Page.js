import React from 'react'
import { Container, Grid, Segment, Dimmer, Loader, Icon } from 'semantic-ui-react'
import PageMetaTag from '../../common/pageMetaTag'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            isPrivacy: true,
            isSecurity: false,
            isTerms: false,
            isConfident: false
        };
        // this.isSelected = this.isSelected.bind(this);
    }

    componentDidMount() {
        Http.post('api/front/get-page', { name: 'privacy' })
        .then(
            res => {
                this.setState({ isLoaded: true, data: JSON.parse(res.data.data) });
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
        const { isLoaded, data, isPrivacy, isSecurity, isTerms, isConfident} = this.state;
        return (
            <div className='privacy-page'>
                {isLoaded ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <Container className='custom-col-6 privacy-section'>
                            <Grid padded='horizontally'>
                                <Grid.Column computer={3} className='custom-column side-nav'>
                                    <h3>Legal</h3>
                                    <p onClick={this.isPrivacySelected.bind(this)} className="item privacy active">Privacy {isPrivacy && <Icon name="caret right"></Icon>}</p>
                                    <p onClick={this.isSecuritySelected.bind(this)} className={isSecurity?"item active": "item"}>Security {isSecurity && <Icon name="caret right"></Icon>}</p>
                                    <p onClick={this.isTermsSelected.bind(this)} className={isTerms?"item active":"item"}>Terms {isTerms && <Icon name="caret right"></Icon>}</p>
                                    <p onClick={this.isConfidentSelected.bind(this)} className={isConfident?"item active":"item"}>Confidently {isConfident && <Icon name="caret right"></Icon>}</p>
                                </Grid.Column>
                                {isPrivacy && <Grid.Column computer={13} className='custom-column'>
                                    
                                </Grid.Column>}
                                {isSecurity && <Grid.Column computer={13} className='custom-column'>
                                    
                                </Grid.Column>}
                                {isTerms && <Grid.Column computer={13} className='custom-column'>
                                    
                                </Grid.Column>}
                                {isConfident && <Grid.Column computer={13} className='custom-column'>
                                    
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