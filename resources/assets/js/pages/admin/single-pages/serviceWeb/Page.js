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
            services: {},
            values: {},
            headquarters: {},
            guides: [],
            counters: [],
            news: {},
            isLoaded: false,
            accordion: false,
            activeKey: []            
        }
        // this.onCollapseChange = this.onCollapseChange.bind(this);
    }

    componentDidMount() {
        Http.post('/api/front/get-page', { name: 'serviceWeb' })
        .then(
            res => {
                var list = JSON.parse(res.data.data);
                this.setState({ 
                    isLoaded: true, 
                    list
                });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { list } = this.state;
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
                return this.setState({list});
            case 'description':
                list.description = event.target.value;
                return this.setState({list});
        }
    }

    onAvatarChange(type, e){
        var infile = document.getElementById("input-file");
        var { list } = this.state;
        var ref = this;
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
    }    
    
    // Update header section
    updateHeader() {
        var { list } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: 'serviceWeb', data: JSON.stringify(list), type: 'header'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    
    render() {
        const { isLoaded, list } = this.state;
        return (
            <div className="admin-page">
            {isLoaded ?
                <Segment vertical textAlign='center'>
                    <Container>
                        <Grid padded="vertically">
                            <Grid.Row columns={2} className="custom-row">
                                <Grid.Column className="custom-column">
                                    <Card className="header-section">
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
                            </Grid.Row>
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