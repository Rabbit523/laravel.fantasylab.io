import React from 'react'
import { Container, Dimmer, Segment, Loader, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Http from '../../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isLoaded: false
        }
        this.columns = [
            { Header: 'Name', accessor: 'page_name' }, { Header: 'Updated Date', accessor: 'updated_at' }
        ]
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
                    <Container className='custom-col-6'>
                        <List selection divided relaxed>
                            {list.map(function (item, i) {
                                return (
                                    <List.Item key={i} as={Link} to={`/admin/single-page/${item.page_name}`}>
                                        <List.Icon name='github' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header><p>{item.page_name}</p></List.Header>
                                            <List.Description>Updated at {item.updated_at}</List.Description>
                                        </List.Content>
                                    </List.Item>
                                )
                            })}
                        </List>
                    </Container>
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