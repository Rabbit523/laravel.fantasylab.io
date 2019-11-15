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
            list: [],
            headquarters: [],
            isLoaded: false,
            accordion: false,
            activeKey: []            
        }
        this.onCollapseChange = this.onCollapseChange.bind(this);
    }

    componentDidMount() {
        this.props.setActiveLanguage(this.props.lang);
        Http.post('/api/front/get-page', { name: 'contact' })
        .then(
            res => {
                var list = JSON.parse(res.data.data);
                var headquarters = [];
                Object.keys(list).map(function(key, index) {
                    if (key == "headquarters") {
                        headquarters = list[key];
                    }
                });
                this.setState({ 
                    isLoaded: true, 
                    list,
                    headquarters
                });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { list, headquarters } = this.state;
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
        }

        headquarters.map(function (item, i) {
            if (type.includes('headquarter') && type.includes(i)) {
                if (type.includes('title')) {
                    item.title = event.target.value;
                    return ref.setState({ headquarters });
                } else if (type.includes('description')) {
                    item.description = event.target.value;
                    return ref.setState({ headquarters });
                }
            }
        });
    }

    onAvatarChange(type, e){
        var { list, headquarters } = this.state;
        var ref = this;

        var infile = document.getElementById("input-file");
        if (infile.files && infile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                list.header_url = e.target.result; ref.setState({ list });
            }
            reader.readAsDataURL(infile.files[0]);
        }

        var headquarters_files = document.getElementsByClassName("headquarter_avatar");
        Object.keys(headquarters_files).map((key, index) => {
            if (headquarters_files[index].files && headquarters_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    headquarters.map((item, i) => {
                        if (type.includes(i)) {
                            item.avatar = e.target.result;
                            ref.setState({ headquarters });
                        }
                    });
                }
                reader.readAsDataURL(headquarters_files[index].files[0]);
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
        Http.post('/api/admin/update-page', {name: 'contact', data: JSON.stringify(list), type: 'header'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update guide items
    onUpdateHeadquarterItem(e, type) {
        var { headquarters , list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'headquarters') {
                list[key] = headquarters;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'contact', data: JSON.stringify(headquarters[type]), type: 'headquarters', id: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    render() {
        const { isLoaded, list, headquarters, accordion, activeKey } = this.state;
        const ref = this;
        return (
            <Translate>
                {({ translate }) => (
                    <div className="admin-page">
                    {isLoaded ?
                        <Segment vertical textAlign='center'>
                            <Container>
                                <Grid>
                                    <Grid.Column computer={8}>
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
                                                    <label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> Save </label>
                                                </Card.Description>
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                    <Grid.Column computer={8}>
                                        <Card>
                                            <Card.Content>
                                                <Card.Header>headquarters Items</Card.Header>
                                            </Card.Content>
                                            <Card.Content>
                                                <Card.Description>
                                                    <Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
                                                        {headquarters.map((item, index) => (
                                                            <Panel header={item.title} key={index}>
                                                                <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_headquarter_title')} />
                                                                <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_headquarter_description')} />
                                                                <Form>
                                                                    <label>Avatar Image</label>
                                                                    <Form.Field>
                                                                        <input accept='image/*' type='file' className='headquarter_avatar' onChange={(e) => ref.onAvatarChange(index+'_avatar', e)}/>
                                                                    </Form.Field>
                                                                </Form>
                                                                <div style={{display: 'flex'}}>
                                                                    <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquarterItem(e, index)}> Save </label>
                                                                    <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteHeadquarterItem(e, index)}> Delete </label>
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
                )}
            </Translate>
        );
    }
}

export default withLocalize(Page);