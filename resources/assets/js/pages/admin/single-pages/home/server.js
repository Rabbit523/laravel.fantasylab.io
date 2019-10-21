import React from 'react'
import { Icon, Grid, Segment, Card, Form, TextArea, Button } from 'semantic-ui-react'
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
            <div className='admin-page home'>
                <Segment vertical textAlign='center'>
                    <Modal isOpen={isOpen} onRequestClose={this.closeModal} style={customStyles}>
                        <Button icon='close' onClick={this.closeModal}/>
                        {rest_items.length > 0 && isPortfolio && rest_items.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'transparent', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                <p style={{ textTransform: 'uppercase', margin: 0 }}>{item.type}</p>
                                <label onClick={(e) => ref.onAddPortfolioItem(e, i)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label>
                            </div>
                        ))}
                        {rest_items.length == 0 && isPortfolio && (
                            <div>
                                <h2>Hi,<br/>Admin.</h2>
                                <p>There is no more portfolio item should be added.</p>
                            </div>
                        )}
                        {rest_reviews.length > 0 && isReview && rest_reviews.map((item, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'transparent', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                <p style={{ textTransform: 'uppercase', margin: 0 }}>{item.title}</p>
                                <label onClick={(e) => ref.onAddReviewItem(e, i)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label>
                            </div>
                        ))}
                        {rest_reviews.length == 0 && isReview && (
                            <div>
                                <h2>Hi,<br/>Admin.</h2>
                                <p>There is no more review item should be added.</p>
                            </div>
                        )}
                    </Modal>
                    <Grid>
                        <Grid.Column computer={8}>
                            <Card className='header-section'>
                                <Card.Content>
                                    <Card.Header>Header Section</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Form.Input fluid label='Meta Title' name='meta_title' placeholder='Meta title' className='input-form' value={header.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
                                        <Form.Input fluid label='Meta Description' name='meta_description' placeholder='Meta description' className='input-form' value={header.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
                                        <Form.Input fluid label='Title' name='title' placeholder='Header title' className='input-form' value={header.header_title} onChange={(val) => this.handleChange(val, 'header_title')} />
                                        <Form.Input fluid label='Description Title' name='description_title' placeholder='Write about homepage' className='input-form' value={header.header_description_title} onChange={(val) => this.handleChange(val, 'header_description_title')} />
                                        <Form>
                                            <label>Description</label>
                                            <TextArea
                                                placeholder='Tell us more'
                                                value={header.header_description}
                                                onChange={(val) => this.handleChange(val, 'header_description')}
                                            />
                                        </Form>
                                        <Form>
                                            <label>Header Image</label>
                                            <Form.Field>
                                                <input accept='image/*' type='file' id='input-file' onChange={(e) => this.onAvatarChange('header', e)}/>
                                            </Form.Field>
                                        </Form>
                                        <Form>
                                            <label>Header Mobile Image</label>
                                            <Form.Field>
                                                <input accept='image/*' type='file' id='mobile-file' onChange={(e) => this.onAvatarChange('mobile_header', e)}/>
                                            </Form.Field>
                                        </Form>
                                        <label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> Save </label>
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
                                        <Form.Input fluid label='Title' name='title' placeholder='Footer title' className='input-form' value={footer.title} onChange={(val) => this.handleChange(val, 'footer_title')} />
                                        <Form.Input fluid label='Button' name='button' placeholder='button name' className='input-form' value={footer.button} onChange={(val) => this.handleChange(val, 'footer_button')} />
                                        <Form.Input fluid label='Description' name='description' placeholder='footer description' className='input-form' value={footer.description} onChange={(val) => this.handleChange(val, 'footer_description')} />
                                        <Form.Input fluid label='Link' name='link' placeholder='footer link' className='input-form' value={footer.link} onChange={(val) => this.handleChange(val, 'footer_link')} />
                                        <Form.Input fluid label='Link Name' name='link_name' placeholder='footer link' className='input-form' value={footer.link_name} onChange={(val) => this.handleChange(val, 'footer_link_name')} />
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
                            <Card className='header-section'>
                                <Card.Content>
                                    <Card.Header>Service Section</Card.Header>
                                    <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Collapse accordion={accordion} onChange={this.onServiceCollapseChange} activeKey={service_activeKey}>
                                            {services.map((item, i) => (
                                                <Panel header={item.title} key={i}>
                                                    <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, 'service_title_'+i)} />
                                                    <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, 'service_description_'+i)} />
                                                    <Form.Input fluid label='Color' name='color' placeholder='color' className='input-form' value={item.color} onChange={(val)=> ref.handleChange(val, 'service_color_'+i)} />
                                                    <Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={item.url} onChange={(val)=> ref.handleChange(val, 'service_url_'+i)} />
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
                        <Grid.Column computer={8}>
                            <Card className='header-section'>
                                <Card.Content>
                                    <Card.Header>Badge Section</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Collapse accordion={accordion} onChange={this.onBadgeCollapseChange} activeKey={badge_activeKey}>
                                            {Object.keys(badges).map((key, i) => (
                                                <Panel header={badges[key].title} key={i}>
                                                    <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={badges[key].title} onChange={(val) => ref.handleChange(val, key+'_title')} />
                                                    <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={badges[key].description} onChange={(val) => ref.handleChange(val, key+'_description')} />
                                                    <Form.Input fluid label='Color' name='color' placeholder='color' className='input-form' value={badges[key].color} onChange={(val) => ref.handleChange(val, key+'_color')} />
                                                    <Form>
                                                        <label>Image Upload</label>
                                                        <Form.Field>
                                                            <input accept='image/*' type='file' id='input-file' className='badge_avatar' onChange={(e) => ref.onAvatarChange(key, e)}/>
                                                        </Form.Field>
                                                    </Form>
                                                    <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateBadge(e, key)}> Save </label>
                                                </Panel>
                                            ))}
                                        </Collapse>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Card className='header-section'>
                                <Card.Content>
                                    <Card.Header>Portfolio Section</Card.Header>
                                    <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAddPortfolio(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        {Object.keys(portfolios).map((key, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                                <p style={{textTransform: 'uppercase', margin: 0}}>{key}</p>
                                                <label onClick={(e) => ref.onDeletePortfolio(e, key)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
                                            </div>
                                        ))}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Card className='header-section'>
                                <Card.Content>
                                    <Card.Header>Reviews Section</Card.Header>
                                    <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAddReview(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        {carousels.map((item, i) => (
                                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                                <p style={{textTransform: 'uppercase', margin: 0}}>{item.title}</p>
                                                <label onClick={(e) => ref.onDeleteReview(e, i)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
                                            </div>
                                        ))}
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={8}>
                            <Card className='header-section'>
                                <Card.Content>
                                    <Card.Header>News Section</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Collapse accordion={accordion} onChange={this.onNewsCollapseChange} activeKey={news_activeKey}>
                                            {news.map((item, i) => (
                                                <Panel header={item.title} key={i}>
                                                    <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, 'title'+i)} />
                                                    <Form.Input fluid label='Author' name='author' placeholder='author' className='input-form' value={item.author} onChange={(val) => ref.handleChange(val, 'author'+i)} />
                                                    <Form.Input fluid label='Type' name='type' placeholder='type' className='input-form' value={item.type} onChange={(val) => ref.handleChange(val, 'type'+i)} />
                                                    <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val)=>ref.handleChange(val, 'description'+i)} />
                                                    <Form.Input fluid label='Read' name='read' placeholder='read' className='input-form' value={item.read} onChange={(val) =>ref.handleChange(val, 'read'+i)} />
                                                    <Form>
                                                        <label>Image Upload</label>
                                                        <Form.Field>
                                                            <input accept='image/*' type='file' id='input-file' className='news_avatar' onChange={(e) => ref.onAvatarChange(i, e)}/>
                                                        </Form.Field>
                                                    </Form>
                                                    <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateNews(e, i)}> Save </label>
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