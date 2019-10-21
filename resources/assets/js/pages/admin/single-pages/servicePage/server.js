import React from 'react'
import { Icon, Grid, Segment, Card, Form, TextArea } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';

class Page extends React.Component {
    render() {
        let { page } = this.props;
        return (
            <div className="admin-page">
                <Segment vertical textAlign='center'>
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
                                        {Object.keys(list.icons).map((key, index) => (
                                            <div className="flex-form" key={index}>
                                                <Form.Input fluid label='Text' name='text' placeholder='Icon text' className='input-form' value={list.icons[key].text} onChange={(val)=>ref.handleChange(val, 'icon' + key)}/>
                                                <Form.Field className="flex-item">
                                                    <label>Image</label>
                                                    <input accept='image/*' type='file' className='icon-file' onChange={(e) => ref.onAvatarChange('icon' + key, e)}/>
                                                </Form.Field>
                                            </div>
                                        ))}
                                        <label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> Save </label>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Card className='header-section'>
                                <Card.Content>
                                    <Card.Header>Footer Section</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Form.Input fluid label='Title' name='title' placeholder='Footer title' className='input-form' value={list.footer_title} onChange={(val) => this.handleChange(val, 'footer_title')} />
                                        <Form.Input fluid label='Button' name='button' placeholder='button name' className='input-form' value={list.footer_button} onChange={(val) => this.handleChange(val, 'footer_button')} />
                                        <Form.Input fluid label='Description' name='description' placeholder='footer description' className='input-form' value={list.footer_description} onChange={(val) => this.handleChange(val, 'footer_description')} />
                                        <Form.Input fluid label='Link' name='link' placeholder='footer link' className='input-form' value={list.footer_link} onChange={(val) => this.handleChange(val, 'footer_link')} />
                                        <Form.Input fluid label='Link Name' name='link_name' placeholder='footer link' className='input-form' value={list.footer_link_name} onChange={(val) => this.handleChange(val, 'footer_link_name')} />
                                        <Form>
                                            <label>Footer Image</label>
                                            <Form.Field>
                                                <input accept='image/*' type='file' id='footer-file' onChange={(e) => this.onAvatarChange('footer', e)}/>
                                            </Form.Field>
                                        </Form>
                                        <label className='ui floated button save-btn' onClick={this.updateFooter.bind(this)}> Save </label>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Starting Section</Card.Header>
                                    <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAddItem(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Form.Input fluid label='Starting Title' name='start_title' placeholder='starting title' className='input-form' value={starting_title} onChange={(val) => ref.handleChange(val, 'starting_title')} />
                                        <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateStartTitle(e)}> Save </label>
                                        <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                            {starting.map((item, index) => (
                                                <Panel header={item.title} key={index}>
                                                    <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_start_title')} />
                                                    <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_start_description')} />
                                                    <Form.Input fluid label='Color' name='color' placeholder='color' className='input-form' value={item.color} onChange={(val) => ref.handleChange(val, index +'_start_color')} />
                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                        <Form>
                                                            <label>Icon Image</label>
                                                            <Form.Field>
                                                                <input accept="image/*" type="file" className="start-file" onChange={(e) => this.onAvatarChange(index+"_start_url", e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <label className='ui floated button delete-btn' onClick={(e) => ref.onDeleteStartImages(e, index+"_url")}> Delete </label>
                                                    </div>
                                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                                        <Form>
                                                            <label>Background Image</label>
                                                            <Form.Field>
                                                                <input accept="image/*" type="file" className="start-file" onChange={(e) => this.onAvatarChange(index+"_start_backimage", e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <label className='ui floated button delete-btn' onClick={(e) => ref.onDeleteStartImages(e, index+"_backimage")}> Delete </label>
                                                    </div>
                                                    <div style={{display: 'flex'}}>
                                                        <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateStartItem(e, index)}> Save </label>
                                                        <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteStartItem(e, index)}> Delete </label>
                                                    </div>
                                                </Panel>
                                            ))}
                                        </Collapse>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Review Section</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={reviews.title} onChange={(val) => this.handleChange(val, 'review_title')} />
                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={reviews.description} onChange={(val) => this.handleChange(val, 'review_description')} />
                                        <Form.Input fluid label="Job" name='job' placeholder='Header title' className="input-form" value={reviews.job} onChange={(val)=>this.handleChange(val, 'review_job')} />
                                        <Form.Input fluid label="URL" name='url' placeholder='button url' className="input-form" value={reviews.path} onChange={(val)=>this.handleChange(val, 'review_url')} />
                                        <Form>
                                            <label>Background Image</label>
                                            <Form.Field>
                                                <input accept="image/*" type="file" className="review-file" onChange={(e) => this.onAvatarChange("back", e)}/>
                                            </Form.Field>
                                        </Form>
                                        <Form>
                                            <label>avatar Image</label>
                                            <Form.Field>
                                                <input accept="image/*" type="file" className="review-file" onChange={(e) => this.onAvatarChange("avatar", e)}/>
                                            </Form.Field>
                                        </Form>
                                        <label className="ui floated button save-btn" onClick={this.updateReview.bind(this)}> Save </label>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>            
                        <Grid.Column computer={8}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Technologies</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                            {Object.keys(technologies).map((key, index) => (
                                                <Panel header={technologies[index].lang} key={key}>
                                                    <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={technologies[index].lang} onChange={(val) => ref.handleChange(val, index+'tech_title')} />
                                                    <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={technologies[index].text} onChange={(val) => ref.handleChange(val, index +'tech_description')} />
                                                    <Form>
                                                        <label>Icon Image</label>
                                                        <Form.Field>
                                                            <input accept="image/*" type="file" className="tech-file" onChange={(e) => this.onAvatarChange(index+"tech", e)}/>
                                                        </Form.Field>
                                                    </Form>
                                                    <div style={{display: 'flex'}}>
                                                        <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateTechItem(e, index)}> Save </label>
                                                        <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteTechItem(e, index)}> Delete </label>
                                                    </div>
                                                </Panel>
                                            ))}
                                        </Collapse>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Process section</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Collapse accordion={accordion} onChange={this.onCollapseProcessChange} activeKey={process_activeKey}>
                                            {estimation.map((item, i) => (
                                                <Panel header={item.title} key={i}>
                                                    <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, 'estimation_title_' + i)} />
                                                    <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, 'estimation_description_' + i)} />
                                                    <Form>
                                                        <label>Icon Image</label>
                                                        <Form.Field>
                                                            <input accept="image/*" type="file" className="estimation-file" onChange={(e) => this.onAvatarChange("estimation" + i, e)}/>
                                                        </Form.Field>
                                                    </Form>
                                                    <div style={{display: 'flex'}}>
                                                        <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateProcessItem(e, i)}> Save </label>
                                                    </div>
                                                </Panel>
                                            ))}
                                        </Collapse>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                </Segment>            
            </div>
        );
    }
}

export default Page;