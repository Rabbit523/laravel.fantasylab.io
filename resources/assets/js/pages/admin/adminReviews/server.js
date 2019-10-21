import React from 'react'
import { Icon, Container, Grid, Segment, Card, Form } from 'semantic-ui-react'
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
                                        <Card.Header>Reviews</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                                {Object.keys(reviews).map((key, i) => (
                                                    <Panel header={reviews[key].title} key={i}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={reviews[key].title} onChange={(val) => ref.handleChange(val, reviews[key].id+'_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={reviews[key].description} onChange={(val) => ref.handleChange(val, reviews[key].id +'_description')} />
                                                        <Form.Input fluid label='Name' name='name' placeholder='name' className='input-form' value={reviews[key].name} onChange={(val)=> ref.handleChange(val, reviews[key].id+'_name')} />
                                                        <Form.Input fluid label='Job' name='job' placeholder='job' className='input-form' value={reviews[key].job} onChange={(val)=> ref.handleChange(val, reviews[key].id+'_job')} />
                                                        <div style={{display: 'flex'}}>
                                                            <Form style={{width: '100%'}}>
                                                                <label>Logo Image</label>
                                                                <Form.Field>
                                                                    <input accept='image/*' type='file' id='input-file' className="logo-file" onChange={(e) => ref.onAvatarChange(i+'_logo', e)}/>
                                                                </Form.Field>
                                                            </Form>
                                                            <Form style={{width: '100%'}}>
                                                                <label>Avatar Image</label>
                                                                <Form.Field>
                                                                    <input accept='image/*' type='file' id='input-file' className="avatar-file" onChange={(e) => ref.onAvatarChange(i+'_avatar', e)}/>
                                                                </Form.Field>
                                                            </Form>
                                                        </div>
                                                        <Form>
                                                            <label>Background Image</label>
                                                            <Form.Field>
                                                                <input accept='image/*' type='file' id='input-file' className="back-file" onChange={(e) => ref.onAvatarChange(i+'_back', e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            {reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onUpdate(e, i)}> Save </label>}
                                                            {reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onDelete(e, i)}> Delete </label> }
                                                            {!reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCreate(e, i)}> Create </label>}
                                                            {!reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCancel(e, i)}> Cancel </label>}
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