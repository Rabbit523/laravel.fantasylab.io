import React from 'react'
import { Icon, Container, Grid, Segment, Card, Form, TextArea, Button } from 'semantic-ui-react'
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
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        >
                        <Button icon='close' onClick={this.closeModal}/>
                        {rest_items.length > 0 && rest_items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'transparent', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                <p style={{ textTransform: 'uppercase', margin: 0 }}>{item.type}</p>
                                <label onClick={(e) => ref.onAddPortfolio(e, i)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label>
                            </div>
                        ))}
                        {rest_items.length == 0 && (
                            <div>
                                <h2>Hi,<br/>Admin.</h2>
                                <p>There is no more portfolio item should be added.</p>
                            </div>
                        )}
                    </Modal>
                    <Container>
                        <Grid>
                            <Grid.Column computer={6}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Header Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label='Meta Title' name='meta_title' placeholder='Meta title' className='input-form' value={list.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
                                            <Form.Input fluid label='Meta Description' name='meta_description' placeholder='Meta description' className='input-form' value={list.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
                                            <Form.Input fluid label='Title' name='title' placeholder='Header title' className='input-form' value={list.title} onChange={(val)=>this.handleChange(val, 'title')} />
                                            <Form>
                                                <label>Description</label>
                                                <TextArea
                                                    placeholder='Tell us more'
                                                    value={list.description}
                                                    onChange={(val) => this.handleChange(val, 'description')}
                                                />
                                            </Form>
                                            <Form>
                                                <label>Header Image</label>
                                                <Form.Field>
                                                    <input accept='image/*' type='file' id='input-file' onChange={(e) => this.onAvatarChange('header', e)}/>
                                                </Form.Field>
                                            </Form>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                {Object.keys(list.icon_urls).map((key, index) => (
                                                    <Form key={index}>
                                                        <Form.Input fluid label='Text' name='text' placeholder='Icon text' className='input-form' value={list.icon_urls[key].text} onChange={(val)=>ref.handleChange(val, key)} />
                                                        <Form.Field>
                                                            <input accept='image/*' type='file' id='input-file' className='icon-file' onChange={(e) => ref.onAvatarChange(key, e)}/>
                                                        </Form.Field>
                                                    </Form>
                                                ))}
                                            </div>
                                            <label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={5}>
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
                            <Grid.Column computer={5}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Portfolio Section</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            {Object.keys(portfolios).map((key, i) => (
                                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                                    <p style={{ textTransform: 'uppercase', margin: 0 }}>{key}</p>
                                                    <label onClick={(e) => ref.onDeletePortfolio(e, key)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
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