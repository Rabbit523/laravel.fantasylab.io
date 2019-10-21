import React from 'react'
import { Container, Grid, Segment, Card, Form, TextArea } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';

class Page extends React.Component {

    render() {
        let { page } = this.props;
        return (
            <div className="admin-page">
                <Segment vertical textAlign='center'>
                    <Container>
                        <Grid>
                            <Grid.Column computer={8}>
                                <Card className="header-section">
                                    <Card.Content>
                                        <Card.Header>Header Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label='Meta Title' name='meta_title' placeholder='Meta title' className='input-form' value={list.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
                                            <Form.Input fluid label='Meta Description' name='meta_description' placeholder='Meta description' className='input-form' value={list.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
                                            <Form.Input fluid label="Title" name='title' placeholder='Header title' className="input-form" value={list.title} onChange={(val)=>this.handleChange(val, 'title')} />
                                            <Form>
                                                <label>Description</label>
                                                <TextArea
                                                    placeholder='Tell us more'
                                                    value={ list.description }
                                                    onChange={ (val) => this.handleChange(val, 'description') }
                                                />
                                            </Form>
                                            <Form>
                                                <label>Header Image</label>
                                                <Form.Field>
                                                    <input accept="image/*" type="file" id="input-file" onChange={(e) => this.onAvatarChange("header", e)}/>
                                                </Form.Field>
                                            </Form>
                                            <label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={8}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>headquarters Items</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                                {headquarters.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_headquarter_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_headquarter_description')} />
                                                        <Form>
                                                            <label>Avatar Image</label>
                                                            <Form.Field>
                                                                <input accept='image/*' type='file' className='headquarter_avatar' onChange={(e) => ref.onAvatarChange(index+'_avatar', e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquarterItem(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteHeadquarterItem(e, index)}> Delete </label>
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