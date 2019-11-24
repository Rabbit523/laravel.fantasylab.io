import React from 'react'
import { Grid, Segment, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Page extends React.Component {
    
    render() {
        const list = this.props.page;
        console.log(this.props.status);
        return (
            <div className='admin-pages'>
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
            </div>
        );
    }
}

export default Page;