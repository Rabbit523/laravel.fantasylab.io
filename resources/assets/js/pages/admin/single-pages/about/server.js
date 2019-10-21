import React from 'react'
import { Icon, Container, Grid, Segment, Card, Form, TextArea } from 'semantic-ui-react'
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
                                <Card>
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

                                            <div className="admin-form-group" style={{display: 'flex', justifyContent: 'space-between'}}>
                                                {counters.map((item, i) => (
                                                    <Form className="flex-form" key={i}>
                                                        <Form.Input fluid label="Number" name='text' className="input-form" value={item.number} onChange={(val)=>ref.handleChange(val, "number_"+i)} />
                                                        <Form.Input fluid label="Text" name='text' className="input-form" value={item.text} onChange={(val)=>ref.handleChange(val, "text_"+i)} />
                                                    </Form>
                                                ))}
                                            </div>
                                            <label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={8}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Guides Items</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onGuideCollapseChange} activeKey={guide_activeKey}>
                                                {guides.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_guide_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_guide_description')} />
                                                        <Form>
                                                            <label>Avatar Image</label>
                                                            <Form.Field>
                                                                <input accept='image/*' type='file' className='guide_avatar' onChange={(e) => ref.onAvatarChange(index+'_avatar', e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateGuideItem(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteGuideItem(e, index)}> Delete </label>
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={5}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Value Items</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label="Title" name='title' placeholder='Header title' className="input-form" value={values.title} onChange={(val)=>this.handleChange(val, 'value_main_title')} />
                                            <Collapse accordion={accordion} onChange={this.onValueCollapseChange} activeKey={value_activeKey}>
                                                {values.data.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_value_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_value_description')} />
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateValueItem(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteValueItem(e, index)}> Delete </label>
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={5}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Service Items</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label="Title" name='title' placeholder='Header title' className="input-form" value={service_title} onChange={(val)=>this.handleChange(val, 'service_main_title')} />
                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateServiceTitle(e)}> Save </label>
                                            <Collapse accordion={accordion} onChange={this.onServiceCollapseChange} activeKey={service_activeKey}>
                                                {services.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_service_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_service_description')} />
                                                        <Form.Input fluid label='Color' name='color' placeholder='color' className='input-form' value={item.color} onChange={(val)=> ref.handleChange(val, index+'_service_color')} />
                                                        <Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={item.url} onChange={(val)=> ref.handleChange(val, index+'_service_url')} />
                                                        <Form>
                                                            <label>Avatar Image</label>
                                                            <Form.Field>
                                                                <input accept="image/*" type="file" className="service-file" onChange={(e) => this.onAvatarChange("service_avatar_" + index, e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <Form>
                                                            <label>Background Image</label>
                                                            <Form.Field>
                                                                <input accept="image/*" type="file" className="service-file" onChange={(e) => this.onAvatarChange("service_backimage_" + index, e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateService(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteService(e, index)}> Delete </label>
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={5}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Headquarters Items</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={headquarters.title} onChange={(val) => ref.handleChange(val, 'headquartersTitle')} />
                                            <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={headquarters.description} onChange={(val) => ref.handleChange(val, 'headquartersDescription')} />
                                            <Form>
                                                <label>Background Image</label>
                                                <Form.Field>
                                                    <input accept="image/*" type="file" className="headquater-file" onChange={(e) => this.onAvatarChange("headquater_back", e)}/>
                                                </Form.Field>
                                            </Form>
                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquater(e)}> Save </label>
                                            <Collapse accordion={accordion} onChange={this.onHeadquaterCollapseChange} activeKey={headquater_activeKey}>
                                                {headquarters.data.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_headquater_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_headquater_description')} />
                                                        <Form.Input fluid label='Button' name='button' placeholder='button name' className='input-form' value={item.button} onChange={(val) => ref.handleChange(val, index +'_headquater_button')} />
                                                        <Form>
                                                            <label>Avatar Image</label>
                                                            <Form.Field>
                                                                <input accept="image/*" type="file" className="headquater-file" onChange={(e) => this.onAvatarChange("headquater_avatar" + index, e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquaterItem(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteHeadquaterItem(e, index)}> Delete </label>
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