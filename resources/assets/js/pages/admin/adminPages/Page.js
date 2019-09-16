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
                                    !item.page_name.includes('privacy') && <List.Item key={i} as={Link} to={`/admin/single-page/${item.page_name}`}>
                                        <List.Icon name='tag' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header><p>{item.admin_page_name}</p></List.Header>
                                            <List.Description>Updated at {item.updated_at}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                ))}
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