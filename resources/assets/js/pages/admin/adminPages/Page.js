import React from 'react'
import { Grid, Dimmer, Segment, Loader, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Http from '../../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        Http.get('/api/admin/pages').then(
            res => {
                this.setState({ isLoaded: true, list: res.data });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    render() {
        const { isLoaded, list } = this.state;
        return (
            <div className='admin-pages'>
            {isLoaded ?
                <Segment vertical textAlign='center'>
                    <Grid padded='horizontally'>
                        <Grid.Column width={8}>
                            <List selection divided relaxed>
                                {list.map((item, i) => (
                                    <List.Item key={i} as={Link} to={`/admin/single-page/${item.page_name}`}>
                                        <List.Icon name='github' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header><p>{item.page_name}</p></List.Header>
                                            <List.Description>Updated at {item.updated_at}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                ))}
                            </List>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <List selection divided relaxed>
                                <List.Item as={Link} to={`/admin/portfolios`}>
                                    <List.Icon name='github' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header><p>Portfolios</p></List.Header>
                                    </List.Content>
                                </List.Item>
                                <List.Item as={Link} to={`/admin/reviews`}>
                                    <List.Icon name='github' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header><p>Reviews</p></List.Header>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid>
                 </Segment>
                :
                <Segment className='page-loader'>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading...</Loader>
                    </Dimmer>
                </Segment>}
            </div>
        );
    }
}

export default Page;