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
            reviews: {},
            technologies: {},
            isLoaded: false,
            accordion: false,
            activeKey: []
        }
        this.onCollapseChange = this.onCollapseChange.bind(this);
    }

    componentDidMount() {
        Http.post('/api/front/get-page', { name: 'service-branding' })
        .then(
            res => {
                var list = JSON.parse(res.data.data);
                var reviews = {}, technologies = {};
                
                Object.keys(list).map(function(key, index) {
                    if (key == "study") {
                        reviews = list[key];
                    } else if (key == "technologies") {
                        technologies = list[key];
                    }
                });
                this.setState({ 
                    isLoaded: true, 
                    list,
                    reviews,
                    technologies
                });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { list, reviews, technologies } = this.state;
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
        }

        Object.keys(technologies).map((key, i) => {
            if (type.includes('tech') && type.includes(key)) {
                if (type.includes('title')) {
                    technologies[key].lang = event.target.value;
                    this.setState({ technologies });
                } else if (type.includes('description')) {
                    technologies[key].text = event.target.value;
                    this.setState({ technologies });
                }
            }
        });
    }

    onAvatarChange(type, e){
        var { list, reviews, technologies } = this.state;
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

        var tech_files = document.getElementsByClassName('tech-file');
        Object.keys(tech_files).map((key, index) => {
            if (tech_files[index].files && tech_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    Object.keys(technologies).map(function (key, index) {
                        if (type.includes(key) && type.includes('tech')) {
                            technologies[key].icon = e.target.result;
                            ref.setState({ technologies });
                        }
                    });
                }
                reader.readAsDataURL(tech_files[index].files[0]);
            }
        });
    }    
    
    onCollapseChange(activeKey) {
        this.setState({ activeKey });
    }

    // Update header section
    updateHeader() {
        var { list } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: 'service-branding', data: JSON.stringify(list), type: 'header'})
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
        var { list, reviews } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'study') {
                list[key] = reviews;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: 'service-branding', data: JSON.stringify(reviews), type: 'study'})
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
        var { list, technologies } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'technologies') {
                list[key] = technologies;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: 'service-web', data: JSON.stringify(technologies), type: 'tech', id: type})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    render() {
        const { isLoaded, list, reviews, technologies, accordion, activeKey } = this.state;
        const ref = this;
        return (
            <div className="admin-page">
            {isLoaded ?
                <Segment vertical textAlign='center'>
                    <Grid>
                        <Grid.Column computer={6}>
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
                                        <Form>
                                            <label>Footer Image</label>
                                            <Form.Field>
                                                <input accept="image/*" type="file" id="input-file" onChange={(e) => this.onAvatarChange("footer", e)}/>
                                            </Form.Field>
                                        </Form>
                                        <label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> Save </label>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column computer={5}>
                            <Card>
                                <Card.Content>
                                    <Card.Header>Review Section</Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <Card.Description>
                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={reviews.title} onChange={(val) => this.handleChange(val, 'review_title')} />
                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={reviews.description} onChange={(val) => this.handleChange(val, 'review_description')} />
                                        <Form.Input fluid label="job" name='job' placeholder='Header title' className="input-form" value={reviews.job} onChange={(val)=>this.handleChange(val, 'review_job')} />
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
                        <Grid.Column computer={5}>
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
        );
    }
}

export default Page;