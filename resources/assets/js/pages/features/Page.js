import React from 'react'
import { Header, Segment, Dimmer, Loader } from 'semantic-ui-react'
import PageMetaTag from '../../common/pageMetaTag'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        };
    }

    componentDidMount() {
        Http.post('api/front/get-page', { name: 'features' })
        .then(
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
            <div className='features-page'>
                {isLoaded ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <Segment vertical textAlign='center' style={{minHeight: '100vh'}}>
                            <Header as='h1'>Features</Header>
                        </Segment>
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