import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, TextArea } from 'semantic-ui-react'
import { Translate, withLocalize } from "react-localize-redux"
import Collapse, { Panel } from 'rc-collapse'
import 'rc-collapse/assets/index.css'
import Http from '../../../../Http'

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page_name: '',
            list: [],
            reviews: {},
            technologies: {},
            starting: [],
            starting_title: "",
            isLoaded: false,
            accordion: false,
            activeKey: [],
            process_activeKey: [],
            start_activeKey: []
        }
        this.onCollapseChange = this.onCollapseChange.bind(this);
        this.onCollapseProcessChange = this.onCollapseProcessChange.bind(this);
        this.onCollapseStartingChange = this.onCollapseStartingChange.bind(this);
    }

    componentDidMount() {
        this.props.setActiveLanguage(this.props.lang);
        const { pathname } = this.props.location;
        var page_name = pathname.split('/admin/single-page/')[1];
        this.setState({ page_name });

        Http.post('/api/front/get-page', { name: page_name })
        .then(
            res => {
                var list = JSON.parse(res.data.data);
                var reviews = {}, technologies = {}, estimation = [], starting = [], starting_title = "";
                Object.keys(list).map(function(key, index) {
                    if (key == "study") {
                        reviews = list[key];
                    } else if (key == "technologies") {
                        technologies = list[key];
                    } else if (key == "estimation") {
                        estimation = list[key];
                    } else if (key == 'starting') {
                        starting = list[key].data;
                        starting_title = list[key].start_title;
                    }
                });
                this.setState({ 
                    isLoaded: true, 
                    list,
                    reviews,
                    technologies,
                    estimation,
                    starting,
                    starting_title
                });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { list, reviews, technologies, estimation, starting, starting_title } = this.state;
        var ref = this;
        switch (type) {
            case 'meta_title':
                list.meta_title = event.target.value;
                return this.setState({ list });
            case 'meta_description':
                list.meta_description = event.target.value;
                return this.setState({ list });
            case 'title':
                list.title = event.target.value;
                return this.setState({ list });
            case 'description':
                list.description = event.target.value;
                return this.setState({ list });
            case 'review_title':
                reviews.title = event.target.value;
                return this.setState({ reviews });
            case 'review_description':
                reviews.description = event.target.value;
                return this.setState({ reviews });
            case 'review_job':
                reviews.job = event.target.value;
                return this.setState({ reviews });
            case 'review_url':
                reviews.path = event.target.value;
                return this.setState({ reviews });
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
            case 'starting_title':
                starting_title = event.target.value;
                return this.setState({ starting_title });
        }

        if (type.includes('icon')) {
            Object.keys(list.icons).map((key, i) => {
                var sub_key = type.split('icon')[1];
                list.icons[sub_key].text = event.target.value;
                ref.setState({ list });
            });
        }
        
        if (type.includes('start')) {
            var index = type.split('_')[0];
            var key = type.split('_')[2];
            starting[index][key] = event.target.value;
            ref.setState({ starting });
        }

        if (type.includes('estimation')) {
            var sub_key = type.split('_')[2];
            var key = type.split('_')[1];
            estimation[sub_key][key] = event.target.value;
            ref.setState({ estimation });
        }

        Object.keys(technologies).map((key, i) => {
            if (type.includes('tech') && type.includes(key)) {
                if (type.includes('title')) {
                    technologies[key].lang = event.target.value;
                    ref.setState({ technologies });
                } else if (type.includes('description')) {
                    technologies[key].text = event.target.value;
                    ref.setState({ technologies });
                }
            }
        });
    }
    onAvatarChange(type, e){
        var { list, reviews, technologies, estimation, starting } = this.state;
        var ref = this;

        var infile = document.getElementById("input-file");
        if (infile.files && infile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                if (type == 'header') {
                    list.header_url = e.target.result; ref.setState({ list });
                } else {
                    list.footer_url = e.target.result; ref.setState({ list });
                }
            }
            reader.readAsDataURL(infile.files[0]);
        }

        var footer_file = document.getElementById('footer-file');
        if (footer_file.files && footer_file.files[0]) {
            var reader = new FileReader();
            reader.onload = new FileReader();
            reader.onload = function (e) {
                if (type == 'footer') { list.footer_url = e.target.result; ref.setState({ list }); }
            }
            reader.readAsDataURL(footer_file.files[0]);
        }

        var review_files = document.getElementsByClassName('review-file');
        Object.keys(review_files).map((key, index) => {
            if (review_files[index].files && review_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type.includes('back')) {
                        reviews.backimage = e.target.result;
                        ref.setState({ reviews });
                    } else if (type.includes('avatar')) {
                        reviews.avatar = e.target.result;
                        ref.setState({ reviews });
                    }
                }
                reader.readAsDataURL(review_files[index].files[0]);
            }
        });

        var icon_files = document.getElementsByClassName('icon-file');
        Object.keys(icon_files).map((key, index) => {
            if (icon_files[index].files && icon_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type.includes('icon')) {
                        var sub_key = type.split('icon')[1];
                        list.icons[sub_key].icon = e.target.result;
                        ref.setState({ list });
                    }
                }
                reader.readAsDataURL(icon_files[index].files[0]);
            }
        });
        
        var tech_files = document.getElementsByClassName('tech-file');
        Object.keys(tech_files).map((key, index) => {
            if (tech_files[index].files && tech_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type.includes('tech')) {
                        var sub_key = type.split('tech')[0];
                        technologies[sub_key].icon = e.target.result;
                        ref.setState({ technologies });
                    }
                }
                reader.readAsDataURL(tech_files[index].files[0]);
            }
        });

        var estimation_files = document.getElementsByClassName('estimation-file');
        Object.keys(estimation_files).map((key, index) => {
            if (estimation_files[index].files && estimation_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type.includes('estimation')) {
                        var sub_key = type.split('estimation')[1];
                        estimation[sub_key].url = e.target.result;
                        ref.setState({ estimation });
                    }
                }
                reader.readAsDataURL(estimation_files[index].files[0]);
            }
        });

        var start_files = document.getElementsByClassName('start-file');
        Object.keys(start_files).map((key, index) => {
            if (start_files[index].files && start_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var index = type.split("_")[0];
                    if (type.includes('start_backimage')) {
                        starting[index].backimage = e.target.result;
                        ref.setState({ starting });
                    } else if (type.includes('start_url')) {
                        starting[index].url = e.target.result;
                        ref.setState({ starting });
                    }
                }
                reader.readAsDataURL(start_files[index].files[0]);
            }
        });
    }    
    
    onCollapseChange(activeKey) {
        this.setState({ activeKey });
    }
    onCollapseProcessChange(process_activeKey) {
        this.setState({ process_activeKey });
    }
    onCollapseStartingChange(start_activeKey) {
        this.setState({ start_activeKey });
    }

    onUpdateStartTitle(e) {
        var { list, page_name, starting_title } = this.state;
        list.starting.start_title = starting_title;
        this.setState({ list });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: page_name, data: JSON.stringify(list), type: 'start_title'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    onAddItem(e) {
        let { starting } = this.state;
        let new_item = {
            title: "",
            description: "",
            color: "",
            url: null,
            backimage: null
        };
        starting.push(new_item);
        this.setState({ starting });
    }
    onUpdateStartItem(e, index) {
        var { list, page_name, starting } = this.state;
        list.starting = starting;
        this.setState({ list });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: page_name, data: JSON.stringify(list), type: 'start_update', id: index})
        .then(
            res => {
                this.setState({ isLoaded: true, list: res.data });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    onDeleteStartItem(e, index) {
        var { list, page_name } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: page_name, data: JSON.stringify(list), type: 'start_delete', id: index})
        .then(
            res => {
                this.setState({ isLoaded: true, starting: res.data });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    onDeleteStartImages(e, type) {
        var { list, page_name } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: page_name, data: JSON.stringify(list), type: 'start_delete_image', id: type.split("_")[0], key: type.split("_")[1]})
        .then(
            res => {
                this.setState({ isLoaded: true, starting: res.data });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update header section
    updateHeader() {
        var { list, page_name } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: page_name, data: JSON.stringify(list), type: 'header'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update footer section
    updateFooter() {
        var { list, page_name } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(list), type: 'footer' })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    //Update review section
    updateReview() {
        var { list, reviews, page_name } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'study') {
                list[key] = reviews;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: page_name, data: JSON.stringify(reviews), type: 'study'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    //Update technologies item
    onUpdateTechItem(e, type) {
        var { list, technologies, page_name } = this.state;        
        Object.keys(list).map((key, index) => {
            if (key == 'technologies') {
                list[key] = technologies;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: page_name, data: JSON.stringify(technologies), type: 'tech', id: type})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    //Update estimation section
    onUpdateProcessItem(e, type) {
        var { list, estimation, page_name } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'estimation') {
                list[key] = estimation;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: page_name, data: JSON.stringify(estimation), type: 'estimation', id: type})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    render() {
        const { isLoaded, list, reviews, technologies, starting, starting_title, estimation, accordion, activeKey, process_activeKey, start_activeKey } = this.state;
        const ref = this;
        return (
            <Translate>
                {({ translate }) => (
                    <div className="admin-page">
                    {isLoaded ?
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
                    :
                        <Segment className='page-loader'>
                            <Dimmer active inverted>
                                <Loader size='large'>Loading...</Loader>
                            </Dimmer>
                        </Segment>
                    }
                    </div>
                )}
            </Translate>
        );
    }
}

export default withLocalize(Page);