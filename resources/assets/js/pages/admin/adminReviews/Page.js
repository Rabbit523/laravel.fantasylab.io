import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import Http from '../../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            isLoaded: false,
            accordion: false,
            activeKey: []            
        }
        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.onCollapseChange = this.onCollapseChange.bind(this);
    }

    componentDidMount() {
        Http.get('/api/front/get-reviews')
        .then(
            res => {
                this.setState({ 
                    isLoaded: true, 
                    reviews: res.data
                });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { reviews } = this.state;
        const ref = this;
        reviews.map((item, index) =>{
            var key = type.split('_')[1];
            if (item.id == type.split('_')[0]) {
                item[key] = event.target.value;
                ref.setState({ reviews });
            }
        });
    }

    onAvatarChange(type, e){
        var infile = document.getElementById('input-file');
        var { reviews } = this.state;
        const ref = this;
        if (infile.files && infile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                reviews.map((item, index) =>{
                    if (item.id == type.split('_')[0]) {
                        item.avatar = event.target.result;
                        ref.setState({ reviews });
                    }
                });
            }
            reader.readAsDataURL(infile.files[0]);
        }
    }
    
    onCollapseChange(activeKey) {
        this.setState({ activeKey });
    }
    // Update review
    onUpdate(e, type) {
        const { reviews } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-review', { data: reviews[type-1], id: type})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Create a review
    onCreate(e, type) {
        const { reviews } = this.state;
        if (review[type-1].title.trim() == "" && review[type-1].description.trim() == "" && review[type-1].type.trim() == "" && review[type-1].avatar.trim() == "") {
            this.setState({ isLoaded: false });
            Http.post('/api/admin/create-review', { data: reviews[type-1], id: type})
            .then(
                res => {
                    this.setState({ isLoaded: true, reviews: res.data });
                }
            ).catch(err => {
                console.error(err);
            });
        }
    }
    // Add review item
    onAdd (e) {
        var { reviews } = this.state;
        var new_item = {
            title: "New Review",
            description: "",
            name: "",
            job: "",
            avatar: null,
            link: null,
            id: reviews[reviews.length - 1].id + 1
        };
        reviews.push(new_item);
        this.setState({ reviews });
    }
    // Cancel review item
    onCancel (e, type) {
        var { reviews } = this.state;
        reviews.splice(type - 1, 1);
        this.setState({ reviews });
    }
    // Delete review item
    onDelete (e, type) {
        if (confirm("Are you sure to remove this review?")) {
            this.setState({ isLoaded: false });
            Http.post('/api/admin/delete-review', { id: type })
            .then(
                res => {
                    this.setState({ isLoaded: true, reviews: res.data });
                }
            ).catch(err => {
                console.error(err);
            });
        }
    }
    render() {
        const { isLoaded, reviews, activeKey, accordion } = this.state;
        const ref = this;
        return (
            <div className='admin-page'>
            {isLoaded ?
                <Segment vertical textAlign='center'>
                    <Container>
                        <Grid padded='vertically'>
                            <Grid.Column width={16}>
                                <Card className='header-section'>
                                    <Card.Content>
                                        <Card.Header>Reviews</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                                {Object.keys(reviews).map((key, i) => (
                                                    <Panel header={reviews[key].title} key={i}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={reviews[key].title} onChange={(val) => ref.handleChange(val, reviews[key].id+'_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={reviews[key].description} onChange={(val) => ref.handleChange(val, reviews[key].id +'_description')} />
                                                        <Form.Input fluid label='Name' name='name' placeholder='name' className='input-form' value={reviews[key].name} onChange={(val)=> ref.handleChange(val, reviews[key].id+'_name')} />
                                                        <Form.Input fluid label='Job' name='job' placeholder='job' className='input-form' value={reviews[key].job} onChange={(val)=> ref.handleChange(val, reviews[key].id+'_job')} />
                                                        <Form.Input fluid label='Button Link' name='link' placeholder='link' className='input-form' value={reviews[key].link} onChange={(val)=> ref.handleChange(val, reviews[key].id+'_link')} />
                                                        <Form>
                                                            <label>Avatar Image</label>
                                                            <Form.Field>
                                                                <input accept='image/*' type='file' id='input-file' className='service_avatar' onChange={(e) => ref.onAvatarChange(reviews[key].id+'_avatar', e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            {reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onUpdate(e, reviews[key].id)}> Save </label>}
                                                            {reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onDelete(e, reviews[key].id)}> Delete </label> }
                                                            {!reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCreate(e, reviews[key].id)}> Create </label>}
                                                            {!reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCancel(e, reviews[key].id)}> Cancel </label>}
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