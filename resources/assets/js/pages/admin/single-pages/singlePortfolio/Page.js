import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, TextArea } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import Http from '../../../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            data: [],
            isLoaded: false,
            accordion: false,
            activeKey: []            
        }
        this.handleChange = this.handleChange.bind(this);
        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.onCollapseChange = this.onCollapseChange.bind(this);
    }

    componentDidMount() {
        const { type, page } = this.props.location.state;
        Http.post('/api/admin/get-portfolio-page', { type: page})
        .then(
            res => {
                if (type != "create_page") {
                    var list = JSON.parse(res.data.data);
                    this.setState({ isLoaded: true, list, data: res.data });
                } else {
                    var list = {
                        footer_back_url: "",
                        header_back_url: "",
                        header_description: "example",
                        title: "example",
                        header_sub_images: [
                            "example",
                            "example"
                        ],
                        main_description: [
                            {
                                title: "example",
                                text: "example",
                                sub: [
                                    "example",
                                    "example",
                                    "example"
                                ]
                            },
                            {
                                title: "example",
                                text: "example",
                                sub: [
                                    "example",
                                    "example",
                                    "example"
                                ]
                            },
                            {
                                title: "example",
                                text: "example",
                                sub: [
                                    "example",
                                    "example",
                                    "example"
                                ]
                            }
                        ],
                        review: {
                            avatar: "",
                            back_url: "",
                            description: "",
                            job: "",
                            name: "",
                            title: ""
                        },
                        services: [
                            {
                                backimage: "",
                                color: "",
                                description: "",
                                title: "",
                                type: "",
                                url: ""
                            },
                            {
                                backimage: "",
                                color: "",
                                description: "",
                                title: "",
                                type: "",
                                url: ""
                            },
                            {
                                backimage: "",
                                color: "",
                                description: "",
                                title: "",
                                type: "",
                                url: ""
                            }
                        ],
                        sub_images: [
                            {
                                url: "",
                                text: ""
                            },
                            {
                                url: "",
                                text: ""
                            }
                        ]
                    };
                    this.setState({ isLoaded: true, list, data: res.data });
                }
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { data, list } = this.state;
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
                list.description = event.target.value;
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

        list.services.map((item, index) => {
            var sub_key = type.split('_')[1];
            if (item.type == type.split('_')[0]) {
                item[sub_key] = event.target.value;
                ref.setState({ list });
            }
        });

        if (type.includes('review')) {
            var sub_key = type.split('_')[1];
            list.review[sub_key] = event.target.value;
            this.setState({ list });
        }
    }

    // Upload Images
    onAvatarChange(type, e){
        var { list } = this.state;       
        const ref = this;

        var headerfiles = document.getElementsByClassName('header-file');
        Object.keys(headerfiles).map((key, index) => {
            if (headerfiles[index].files && headerfiles[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type == "header") {
                        list.header_back_url = e.target.result;
                        ref.setState({ list });
                    } else {
                        list.footer_back_url = e.target.result;
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
                    list.header_sub_images[type] = e.target.result;
                    ref.setState({ list });
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

        var Servicefiles = document.getElementsByClassName('service_avatar');
        Object.keys(Servicefiles).map((key, index) => {
            if (Servicefiles[index].files && Servicefiles[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var sub_key = type.split('_')[1];                    
                    list.services.map((item, i) => {
                        if (item.type == type.split('_')[0]) {
                            item[sub_key] = e.target.result;
                            ref.setState({ list });
                        }
                    });
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
                    } else {
                        list.review.back_url = e.target.result;
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
        const { list, data } = this.state;
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
    
    render() {
        const { isLoaded, list, data, activeKey, accordion } = this.state;
        const ref = this;
        return (
            <div className='admin-page'>
            {isLoaded ?
                <Segment vertical textAlign='center'>
                    <Container>
                        <Grid padded='vertically'>
                            <Grid.Column className='custom-column' width={8}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Header Section</Card.Header>
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
                                                    value={list.description}
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
                                                <Form>
                                                    <label>Footer Image</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' className='header-file' onChange={(e) => this.onAvatarChange('footer', e)}/>
                                                    </Form.Field>
                                                </Form>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Form>
                                                    <label>Header Sub Image1</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' className='header-subImg-file' onChange={(e) => ref.onAvatarChange(0, e)}/>
                                                    </Form.Field>
                                                </Form>
                                                <Form>
                                                    <label>Header Sub Image2</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' className='header-subImg-file' onChange={(e) => ref.onAvatarChange(1, e)}/>
                                                    </Form.Field>
                                                </Form>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                {Object.keys(list.sub_images).map((key, index) => (
                                                    <Form key={index}>
                                                        <Form.Input fluid label='Text' name='text' placeholder='Icon text' className='input-form' value={list.sub_images[key].text} onChange={(val)=>ref.handleChange(val, 'subimage_text'+key)} />
                                                        <Form.Field>
                                                            <input accept='image/*' type='file' className='sub-file' onChange={(e) => ref.onAvatarChange(key, e)}/>
                                                        </Form.Field>
                                                    </Form>
                                                ))}
                                            </div>
                                            <label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column className='custom-column' width={8}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Sub Description Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            {list.main_description.map((item, i) => (
                                                <div className="description-group" key={i}>
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
                                                </div>)
                                            )}
                                            <label className='ui floated button save-btn' onClick={this.updateSubDescription.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column className='custom-column' width={8}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Services Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                                {list.services.map((item, i) => (
                                                    <Panel header={item.title} key={i}>
                                                        <Form.Input 
                                                            fluid 
                                                            label='Title' 
                                                            placeholder='title' 
                                                            className='input-form' 
                                                            value={item.title} 
                                                            onChange={(e) => ref.handleChange(e, item.type+'_title')} />
                                                        <Form.Input 
                                                            fluid 
                                                            label='Description' 
                                                            placeholder='description' 
                                                            className='input-form' 
                                                            value={item.description} 
                                                            onChange={(e) => ref.handleChange(e, item.type+'_description')} />
                                                        <Form.Input 
                                                            fluid 
                                                            label='Color' 
                                                            placeholder='color' 
                                                            className='input-form' 
                                                            value={item.color} 
                                                            onChange={(e)=> ref.handleChange(e, item.type+'_color')} />
                                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
                                                            <Form>
                                                                <label>Avatar Image</label>
                                                                <Form.Field>
                                                                    <input accept='image/*' type='file' className='service_avatar' onChange={(e) => ref.onAvatarChange(item.type+'_url', e)}/>
                                                                </Form.Field>
                                                            </Form>
                                                            <Form>
                                                                <label>Background Image</label>
                                                                <Form.Field>
                                                                    <input accept='image/*' type='file' className='service_avatar' onChange={(e) => ref.onAvatarChange(item.type+'_backimage', e)}/>
                                                                </Form.Field>
                                                            </Form>
                                                        </div>
                                                        <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateService(e, item.type)}> Save </label>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column className='custom-column' width={8}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Review Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label='title' name='review_title' placeholder='title' className='input-form' value={list.review.title} onChange={(val)=>ref.handleChange(val, 'review_title')} />
                                            <Form.Input fluid label='Name' name='name' placeholder='name' className='input-form' value={list.review.name} onChange={(val)=>ref.handleChange(val, 'review_name')} />
                                            <Form.Input fluid label='Job' name='Job' placeholder='job' className='input-form' value={list.review.job} onChange={(val)=>ref.handleChange(val, 'review_job')} />
                                            <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={list.review.description} onChange={(val)=>ref.handleChange(val, 'review_description')} />
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}> 
                                                <Form>
                                                    <label>Avatar Upload</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' className='review_img' onChange={(e) => ref.onAvatarChange('avatar', e)}/>
                                                    </Form.Field>
                                                </Form>
                                                <Form>
                                                    <label>Background Image Upload</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' className='review_img' onChange={(e) => ref.onAvatarChange('back_url', e)}/>
                                                    </Form.Field>
                                                </Form>
                                            </div>
                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateReview(e)}> Save </label>
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