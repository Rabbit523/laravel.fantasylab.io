import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, TextArea, Button } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import Http from '../../../../Http'
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
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            services: [],
            _reviews: [],
            reviews: [],
            data: [],
            isLoaded: false,
            isOpen: false,
            accordion: false,
            activeKey: [],
            description_activeKey: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.onCollapseChange = this.onCollapseChange.bind(this);
        this.onDescriptionCollapseChange = this.onDescriptionCollapseChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        const { page } = this.props.location.state;
        Http.post('/api/admin/get-portfolio-page', { type: page })
        .then(
            res => {
                var list = JSON.parse(res.data.portfolio.data);
                this.setState({ isLoaded: true, list, data: res.data.portfolio, services: list.services, reviews: list.reviews, _reviews: res.data.review });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { data, list, services } = this.state;
        const ref = this;
        switch (type) {
            case 'meta_title':
                data.meta_title = event.target.value;
                return this.setState({ data });
            case 'meta_description':
                data.meta_description = event.target.value;
                return this.setState({ data });
            case 'title':
                list.title = event.target.value;
                return this.setState({ list });
            case 'description':
                list.header_description = event.target.value;
                return this.setState({ list });
            case 'footer_title':
                list.footer_title = event.target.value;
                return this.setState({ list });
            case 'footer_description':
                list.footer_description = event.target.value;
                return this.setState({ list });
            case 'footer_button':
                list.footer_button = event.target.value;
                return this.setState({ list });
            case 'footer_link':
                list.footer_link = event.target.value;
                return this.setState({ list });
            case 'footer_link_name':
                list.footer_link_name = event.target.value;
                return this.setState({ list });
        }
        
        list.main_description.map((item, index) =>{
            if (type.includes('subtext')) {
                var keys = type.split('subtext')[1];
                list.main_description[keys.charAt(0)].sub[keys.charAt(1)] = event.target.value;
                ref.setState({ list });
            } else if(type.includes('sub_title')) {
                var sub_key = type.split('sub_title')[1];
                list.main_description[sub_key]['title'] = event.target.value;
                ref.setState({ list });
            } else if (type.includes('sub_description')) {
                var sub_key = type.split('sub_description')[1];
                list.main_description[sub_key]['text'] = event.target.value;
                ref.setState({ list });
            }
        });

        if (type.includes('subimage')) {
            var key = type.charAt(type.length-1);
            list.sub_images[key].text = event.target.value;
            ref.setState({ list });
        }

        if (type.includes('service')) {
            var key = type.split('_')[1];
            var sub_key = type.split('_')[2];
            services[sub_key][key] = event.target.value;
            this.setState({ services });
        }

        if (type.includes('review')) {
            var sub_key = type.split('_')[1];
            list.review[sub_key] = event.target.value;
            this.setState({ list });
        }
    }

    // Upload Images
    onAvatarChange(type, e){
        var { list, services } = this.state;       
        const ref = this;

        var headerfiles = document.getElementsByClassName('header-file');
        Object.keys(headerfiles).map((key, index) => {
            if (headerfiles[index].files && headerfiles[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type == "header") {
                        list.header_back_url = e.target.result;
                        ref.setState({ list });
                    }
                }
                reader.readAsDataURL(headerfiles[index].files[0]);
            }
        });
        
        var headerSubfiles = document.getElementsByClassName('header-subImg-file');
        Object.keys(headerSubfiles).map((key, index) => {
            if (headerSubfiles[index].files && headerSubfiles[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type.includes("header_sub")) {
                        var key = type.split('header_sub')[1];
                        list.header_sub_images[key] = e.target.result;
                        ref.setState({ list });    
                    }
                }
                reader.readAsDataURL(headerSubfiles[index].files[0]);
            }
        });

        var Subfiles = document.getElementsByClassName('sub-file');
        Object.keys(Subfiles).map((key, index) => {
            if (Subfiles[index].files && Subfiles[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    list.sub_images[type].url = e.target.result;
                    ref.setState({ list });
                }
                reader.readAsDataURL(Subfiles[index].files[0]);
            }
        });

        var footer_file = document.getElementById('footer-file');
        if (footer_file.files && footer_file.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (type == 'footer') { list.footer_url = e.target.result; ref.setState({ list }); }
            }
            reader.readAsDataURL(footer_file.files[0]);
        }
        
        var Servicefiles = document.getElementsByClassName('service-file');
        Object.keys(Servicefiles).map((key, index) => {
            if (Servicefiles[index].files && Servicefiles[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var sub_key = type.split('_')[1];
                    var id = type.split('_')[2];
                    if (type.includes('service')) {
                        services[id][sub_key] = e.target.result;
                        ref.setState({ services });    
                    }
                }
                reader.readAsDataURL(Servicefiles[index].files[0]);
            }
        });

        var Reviewfiles = document.getElementsByClassName('review_img');
        Object.keys(Reviewfiles).map((key, index) => {
            if (Reviewfiles[index].files && Reviewfiles[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type == "avatar") {
                        list.review.avatar = e.target.result;
                        ref.setState({ list });
                    } else if (type == "back_url") {
                        list.review.back_url = e.target.result;
                        ref.setState({ list });
                    } else {
                        list.review.logo_url = e.target.result;
                        ref.setState({ list });
                    }
                }
                reader.readAsDataURL(Reviewfiles[index].files[0]);
            }
        });
    }
    
    onCollapseChange(activeKey) {
        this.setState({ activeKey });
    }
    onDescriptionCollapseChange(description_activeKey) {
        this.setState({ description_activeKey });
    }
    onAddSubImage(e) {
        const { list } = this.state;
        var new_item = {
            url: '',
            text: 'example'
        };
        list.sub_images.push(new_item);
        this.setState({ list });
    }
    onAddService (e) {
        var { services, data } = this.state;
        var new_item = {
            title: 'New Service',
            description: '',
            backimage: '',
            avatar: '',
            url: 'web'
        };
        services.push(new_item);
        this.setState({ services });
    }
    // Update header section
    updateHeader() {
        const { list, data } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-portfolio-page', { data: list, id: data.id, meta_title: data.meta_title, meta_description: data.meta_description, type: 'header'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    updateFooter() {
        const { list, data } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-portfolio-page', { data: list, id: data.id, type: 'footer'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update sub descriptions
    updateSubDescription(e, type) {
        const { list, data } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-portfolio-page', { data: list, id: data.id, type: 'description'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update services
    onUpdateService (e, type) {
        const { list, data, services } = this.state;
        list.services = services;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-portfolio-page', { data: list, id: data.id, type: 'service'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Delete service item
    onDeleteService(e, type) {
        const { list, data, services } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-portfolio-page', { data: list, id: data.id, type: 'service_delete', key: type})
        .then(
            res => {
                this.setState({ isLoaded: true, services: res.data });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Close modal
    closeModal() {
        this.setState({ isOpen: false });
    }
    // Update review section
    onUpdateReview(e) {
        const { list, data } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-portfolio-page', { data: list, id: data.id, type: 'review'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    onAddReviewItem (e, key) {
        const { page } = this.props.location.state;
        var { _reviews } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/add-review-page', { data: _reviews[key], page: page, from: 'portfolio' })
        .then(
            res => {
                var reviews = [];
                reviews.push(_reviews[key]);
                this.setState({ isLoaded: true, isOpen: false, reviews });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    onAddReview(e) {
        var { reviews } = this.state;
        if (reviews.length > 0) return;        
      
        this.setState({ isOpen: true }); 
    }
    onDeleteReview(e, type) {
        const { page } = this.props.location.state;
        Http.post('/api/admin/delete-review-page', { page: page, from: 'portfolio' })
        .then(
            res => {
                this.setState({ isLoaded: true, isOpen: false, reviews: [] });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    render() {
        const { isLoaded, isOpen, list, data, services, activeKey, accordion, description_activeKey, reviews, _reviews } = this.state;
        const ref = this;
        return (
            <div className='admin-page'>
            {isLoaded ?
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
            :
                <Segment className='page-loader'>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading...</Loader>
                    </Dimmer>
                </Segment>
            }
            </div>
        );
    }
}

export default Page;