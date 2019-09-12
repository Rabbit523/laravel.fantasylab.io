import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Collapse, { Panel } from 'rc-collapse';
import 'rc-collapse/assets/index.css';
import Http from '../../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolios: [],
            isLoaded: false,
            accordion: false,
            activeKey: []            
        }
        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.onCollapseChange = this.onCollapseChange.bind(this);
    }

    componentDidMount() {
        Http.get('/api/front/get-portfolios')
        .then(
            res => {
                this.setState({ 
                    isLoaded: true, 
                    portfolios: res.data
                });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { portfolios } = this.state;
        const ref = this;
        portfolios.map((item, index) =>{
            var key = type.split('_')[1];
            if (item.id == type.split('_')[0]) {
                item[key] = event.target.value;
                ref.setState({ portfolios });
            }
        });
    }

    onAvatarChange(type, e){
        var infile = document.getElementById('input-file');
        var { portfolios } = this.state;
        const ref = this;
        if (infile.files && infile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                portfolios.map((item, index) =>{
                    if (item.id == type.split('_')[0]) {
                        item.avatar = event.target.result;
                        ref.setState({ portfolios });
                    }
                });
            }
            reader.readAsDataURL(infile.files[0]);
        }
    }
    
    onCollapseChange(activeKey) {
        this.setState({ activeKey });
    }
    // Update a portfolio
    onUpdate(e, type) {
        const { portfolios } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-portfolio', { data: portfolios[type-1], id: type})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Create a portfolio
    onCreate(e, type) {
        const { portfolios } = this.state;
        console.log(portfolios[type-1].title.trim());
        console.log(portfolios[type-1].description.trim());
        console.log(portfolios[type-1].type.trim());
        console.log(portfolios[type-1].avatar.trim());
        if (portfolios[type-1].title.trim() != "" && portfolios[type-1].description.trim() != "" && portfolios[type-1].type.trim() != "" && portfolios[type-1].avatar.trim() != "") {
            this.setState({ isLoaded: false });
            Http.post('/api/admin/create-portfolio', { data: portfolios[type-1], id: type})
            .then(
                res => {
                    this.setState({ isLoaded: true, portfolios: res.data });
                }
            ).catch(err => {
                console.error(err);
            });
        }
    }
    // Add a portfolio
    onAdd (e) {
        var { portfolios } = this.state;
        var new_item = {
            title: "New Portfolio",
            description: "",
            type: "",
            avatar: "",
            id: portfolios.length + 1
        };
        portfolios.push(new_item);
        this.setState({ portfolios });
    }
    // Cancel a portfolio
    onCancel (e, type) {
        var { portfolios } = this.state;
        portfolios.splice(type - 1, 1);
        this.setState({ portfolios });
    }
    // Delete a portfolio
    onDelete (e, type) {
        if (confirm("Are you sure to remove this portfolio?")) {
            this.setState({ isLoaded: false });
            Http.post('/api/admin/delete-portfolio', { id: type })
            .then(
                res => {
                    this.setState({ isLoaded: true, portfolios: res.data });
                }
            ).catch(err => {
                console.error(err);
            });
        }
    }
    render() {
        const { isLoaded, portfolios, activeKey, accordion } = this.state;
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
                                        <Card.Header>Portfolios</Card.Header>
                                        <Card.Description style={{position: 'absolute', top: 4, right: 20}}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                                {Object.keys(portfolios).map((key, i) => (
                                                    <Panel header={portfolios[key].title} key={i}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={portfolios[key].title} onChange={(val) => ref.handleChange(val, portfolios[key].id+'_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={portfolios[key].description} onChange={(val) => ref.handleChange(val, portfolios[key].id +'_description')} />
                                                        <Form.Input fluid label='type' name='type' placeholder='type' className='input-form' value={portfolios[key].type} onChange={(val)=> ref.handleChange(val, portfolios[key].id+'_type')} />
                                                        <Form>
                                                            <label>Avatar Image</label>
                                                            <Form.Field>
                                                                <input accept='image/*' type='file' id='input-file' className='service_avatar' onChange={(e) => ref.onAvatarChange(portfolios[key].id+'_avatar', e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            {portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onUpdate(e, portfolios[key].id)}> Save </label>}
                                                            {portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onDelete(e, portfolios[key].id)}> Delete </label>}
                                                            {!portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCreate(e, portfolios[key].id)}> Create </label>}
                                                            {!portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCancel(e, portfolios[key].id)}> Cancel </label>}
                                                            {!portfolios[key].data && <Label className='ui floated button save-btn' as={Link} to={{ pathname: '/admin/single-page/single_portfolio', state:{ type: 'create_page', page: `${portfolios[key].type}` }}}> Create CMS </Label> }
                                                            {portfolios[key].data && <Label className='ui floated button save-btn' as={Link} to={{ pathname: '/admin/single-page/single_portfolio', state:{ type: 'edit_page', page: `${portfolios[key].type}` }}}> Edit CMS </Label> }
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