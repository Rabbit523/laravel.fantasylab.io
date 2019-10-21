import React from 'react'
import { Icon, Container, Grid, Segment, Card, Form, TextArea, Button } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: 470
    }
};

class Page extends React.Component {
    render() {
        let { page } = this.props;
        return (
            <div className='admin-page'>
                <Segment vertical textAlign='center'>
                    <Container>
                        <Grid padded='vertically'>
                            <Modal isOpen={isOpen} onRequestClose={this.closeModal} style={customStyles}>
                                <Button icon='close' onClick={this.closeModal}/>
                                {_reviews.length > 0 && _reviews.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'transparent', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                        <p style={{ textTransform: 'uppercase', margin: 0 }}>{item.job}</p>
                                        <label onClick={(e) => ref.onAddReviewItem(e, i)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label>
                                    </div>
                                ))}
                                {_reviews.length == 0 && (
                                    <div>
                                        <h2>Hi,<br/>Admin.</h2>
                                        <p>There is no more review item should be added.</p>
                                    </div>
                                )}
                            </Modal>
                            <Grid.Column width={8}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Header Section</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAddSubImage(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label='Meta Title' name='meta_title' placeholder='Meta title' className='input-form' value={data.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
                                            <Form.Input fluid label='Meta Description' name='meta_description' placeholder='Meta description' className='input-form' value={data.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
                                            <Form.Input fluid label='Title' name='title' placeholder='Header title' className='input-form' value={list.title} onChange={(val)=>this.handleChange(val, 'title')} />
                                            <Form>
                                                <label>Description</label>
                                                <TextArea
                                                    placeholder='Tell us more'
                                                    value={list.header_description}
                                                    onChange={(val) => this.handleChange(val, 'description')}
                                                />
                                            </Form>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
                                                <Form>
                                                    <label>Header Image</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' className='header-file' onChange={(e) => this.onAvatarChange('header', e)}/>
                                                    </Form.Field>
                                                </Form>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Form>
                                                    <label>Header Sub Image1</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' className='header-subImg-file' onChange={(e) => ref.onAvatarChange("header_sub0", e)}/>
                                                    </Form.Field>
                                                </Form>
                                                <Form>
                                                    <label>Header Sub Image2</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' className='header-subImg-file' onChange={(e) => ref.onAvatarChange("header_sub1", e)}/>
                                                    </Form.Field>
                                                </Form>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                {Object.keys(list.sub_images).map((key, index) => (
                                                    <div className="flex-form" key={index}>
                                                        <Form.Input fluid label='Text' name='text' placeholder='Icon text' className='input-form' value={list.sub_images[key].text} onChange={(val)=>ref.handleChange(val, 'subimage_text'+key)} />
                                                        <Form.Field className="flex-item">
                                                            <label>Image</label>
                                                            <input accept='image/*' type='file' className='sub-file' onChange={(e) => ref.onAvatarChange(key, e)}/>
                                                        </Form.Field>
                                                    </div>
                                                ))}
                                            </div>
                                            <label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
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
                            <Grid.Column width={8}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Sub Description Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onDescriptionCollapseChange} activeKey={description_activeKey}>
                                                {list.main_description.map((item, i) => (
                                                    <Panel header={i+1} key={i}>
                                                        <Form.Input fluid label='Title' name='sub_title' placeholder='title' className='input-form' value={item.title} onChange={(val) => this.handleChange(val, 'sub_title'+i)} />
                                                        <Form>
                                                            <label>Description</label>
                                                            <TextArea
                                                                placeholder='Tell us more'
                                                                value={item.text}
                                                                onChange={(val) => this.handleChange(val, 'sub_description'+i)}
                                                            />
                                                        </Form>
                                                        {Object.keys(item.sub).map((key, index) => (
                                                            <Form key={index}>
                                                                <Form.Input fluid label='Text' name='text' placeholder='text' className='input-form' value={item.sub[index]} onChange={(val)=>ref.handleChange(val, 'subtext'+i+index)} />
                                                            </Form>
                                                        ))}
                                                    </Panel>)
                                                )}
                                            </Collapse>
                                            <label className='ui floated button save-btn' onClick={this.updateSubDescription.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Services Section</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                                {services.map((item, i) => (
                                                    <Panel header={item.title} key={i}>
                                                        <Form.Input fluid label='Title' placeholder='title' className='input-form' value={item.title} onChange={(e) => ref.handleChange(e, 'service_title_'+i)} />
                                                        <Form.Input fluid label='Description' placeholder='description' className='input-form' value={item.description} onChange={(e) => ref.handleChange(e, 'service_description_'+i)} />
                                                        <Form.Input fluid label='URL' placeholder='url' className='input-form' value={item.url} onChange={(e) => ref.handleChange(e, 'service_url_'+i)} />
                                                        <Form.Input fluid label='Color' placeholder='color' className='input-form' value={item.color} onChange={(e)=> ref.handleChange(e, 'service_color_'+i)} />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
                                                            <Form>
                                                                <label>Avatar Image</label>
                                                                <Form.Field>
                                                                    <input accept='image/*' type='file' className='service-file' onChange={(e) => ref.onAvatarChange('service_avatar_'+i, e)}/>
                                                                </Form.Field>
                                                            </Form>
                                                            <Form>
                                                                <label>Background Image</label>
                                                                <Form.Field>
                                                                    <input accept='image/*' type='file' className='service-file' onChange={(e) => ref.onAvatarChange('service_backimage_'+i, e)}/>
                                                                </Form.Field>
                                                            </Form>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateService(e, i)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteService(e, i)}> Delete </label>
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Review Section</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAddReview(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            {reviews.map((item, i) => (
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                                    <p style={{textTransform: 'uppercase', margin: 0}}>{item.name}</p>
                                                    <label onClick={(e) => ref.onDeleteReview(e, item.id)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
                                                </div>
                                            ))}
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