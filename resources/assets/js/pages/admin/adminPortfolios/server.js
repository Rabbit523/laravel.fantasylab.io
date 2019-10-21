import React from 'react'
import { Icon, Container, Grid, Segment, Card, Form, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';

class Page extends React.Component {
    
    render() {
        let { page } = this.props;
        return (
            <div className='admin-page'>
                <Segment vertical textAlign='center'>
                    <Container>
                        <Grid padded='vertically'>
                            <Grid.Column width={16}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Portfolios</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                                {Object.keys(portfolios).map((key, i) => (
                                                    <Panel header={portfolios[key].title} key={i}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={portfolios[key].title} onChange={(val) => ref.handleChange(val, i +'_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={portfolios[key].description} onChange={(val) => ref.handleChange(val, i +'_description')} />
                                                        <Form.Input fluid label='type' name='type' placeholder='type' className='input-form' value={portfolios[key].type} onChange={(val)=> ref.handleChange(val, i +'_type')} />
                                                        <Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={portfolios[key].url} onChange={(val)=> ref.handleChange(val, i +'_url')} />
                                                        <Form>
                                                            <label>Logo Image</label>
                                                            <Form.Field>
                                                                <input accept='image/*' type='file' id='input-file' className='service_avatar' onChange={(e) => ref.onAvatarChange(i+'_avatar', e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <Form>
                                                            <label>Background Image</label>
                                                            <Form.Field>
                                                                <input accept='image/*' type='file' className='service_back' onChange={(e) => ref.onAvatarChange(i+'_back', e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            {portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onUpdate(e, i)}> Save </label>}
                                                            {portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onDelete(e, portfolios[key].id)}> Delete </label>}
                                                            {!portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCreate(e, i)}> Create </label>}
                                                            {!portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCancel(e, i)}> Cancel </label>}
                                                            {!portfolios[key].data && <Label className='ui floated button save-btn' as={Link} to={{ pathname: '/admin/single-page/single_portfolio', state:{ page: `${portfolios[key].type}` }}}> Create CMS </Label> }
                                                            {portfolios[key].data && <Label className='ui floated button save-btn' as={Link} to={{ pathname: '/admin/single-page/single_portfolio', state:{ page: `${portfolios[key].type}` }}}> Edit CMS </Label> }
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </Segment>           
            </div>
        );
    }
}

export default Page;