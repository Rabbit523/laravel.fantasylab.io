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
            guide_activeKey: [],
            values_activeKey: [],
            service_activeKey: [],
            headquater_activeKey: []
        }
        this.onGuideCollapseChange = this.onGuideCollapseChange.bind(this);
        this.onValueCollapseChange = this.onValueCollapseChange.bind(this);
        this.onServiceCollapseChange = this.onServiceCollapseChange.bind(this);
        this.onHeadquaterCollapseChange = this.onHeadquaterCollapseChange.bind(this);
    }

    componentDidMount() {
        Http.post('/api/front/get-page', { name: 'about' })
        .then(
            res => {
                var list = JSON.parse(res.data.data);
                var services = {}, values = {}, headquarters = {}, guides = [], counters = [], news = {};
                Object.keys(list).map(function(key, index) {
                    if (key == "values") {
                        values = list[key];
                    } else if (key == "services") {
                        services = list[key];
                    } else if (key == "headquarters") {
                        headquarters = list[key];
                    } else if (key == "guides") {
                        guides = list[key];
                    } else if (key == "counters") {
                        counters = list[key];
                    }
                });
                this.setState({
                    isLoaded: true, 
                    list,
                    services,
                    values,
                    headquarters,
                    guides,
                    counters,
                    news
                });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    // handle input text
    handleChange(event, type) {
        var { list, counters, guides, values, services, headquarters } = this.state;
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
            case 'headquartersTitle':
                headquarters.title = event.target.value;
                return this.setState({ headquarters });
            case 'headquartersDescription':
                headquarters.description = event.target.value;
                return this.setState({ headquarters });
        }

        counters.map(function (item, i) {
            var sub_key = type.split("_")[0];
            if (i == type.split("_")[1]) {
                counters[i][sub_key] = event.target.value;
                list['counters'] = counters;
                ref.setState({ counters });
            }
        });

        guides.map(function (item, i) {
            if (type.includes('guide') && type.includes(i)) {
                if (type.includes('title')) {
                    item.title = event.target.value;
                    return ref.setState({ guides });
                } else if (type.includes('description')) {
                    item.description = event.target.value;
                    return ref.setState({ guides });
                }
            }
        });

        values.data.map(function (item, i) {
            if (type.includes('value')) {
                if (type.includes('title') && type.includes('main')) {
                    values.title = event.target.value;
                    return ref.setState({ values });
                } else if (type.includes('title') && type.includes(i)) {
                    item.title = event.target.value;
                    return ref.setState({ values });
                } else if (type.includes('description') && type.includes(i)) {
                    item.description = event.target.value;
                    return ref.setState({ values });
                }
            }
        });

        services.data.map(function (item, i) {
            if (type.includes('service')) {
                if (type.includes('title') && type.includes('main')) {
                    services.title = event.target.value;
                    return ref.setState({ services });
                } else if (type.includes('title') && type.includes(i)) {
                    item.title = event.target.value;
                    return ref.setState({ services });
                } else if (type.includes('description') && type.includes(i)) {
                    item.description = event.target.value;
                    return ref.setState({ services });
                }
            }
        });
        
        headquarters.data.map(function (item, i) {
            if (type.includes('headquater') && type.includes(i)) {
                if (type.includes('title')) {
                    item.title = event.target.value;
                    return ref.setState({ headquarters });
                } else if (type.includes('description')) {
                    item.description = event.target.value;
                    return ref.setState({ headquarters });
                } else if (type.includes('button')) {
                    item.button = event.target.value;
                    return ref.setState({ headquarters });
                }
            }
        });
    }

    // handle image upload 
    onAvatarChange(type, e){
        var { list, guides, services, headquarters } = this.state;
        var ref = this;

        var infile = document.getElementById("input-file");
        if (infile.files && infile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                list.header_url = e.target.result; ref.setState({list});
            }
            reader.readAsDataURL(infile.files[0]);
        }

        var guide_files = document.getElementsByClassName("guide_avatar");
        Object.keys(guide_files).map((key, index) => {
            if (guide_files[index].files && guide_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    guides.map((item, i) => {
                        if (type.includes(i)) {
                            item.avatar = e.target.result;
                            ref.setState({ guides });
                        }
                    });
                }
                reader.readAsDataURL(guide_files[index].files[0]);
            }
        });

        var service_files = document.getElementsByClassName("service-file");
        Object.keys(service_files).map((key, index) => {
            if (service_files[index].files && service_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    services.data.map((item, i) => {
                        if (type.includes('header') && type.includes(i)) {
                            item.url = e.target.result;
                            ref.setState({ services });
                        } else if (type.includes('back') && type.includes(i)) {
                            item.backimage = e.target.result;
                            ref.setState({ services });
                        }
                    });
                }
                reader.readAsDataURL(service_files[index].files[0]);
            }
        });

        var headquater_files = document.getElementsByClassName("headquater-file");
        Object.keys(headquater_files).map((key, index) => {
            if (headquater_files[index].files && headquater_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    if (type.includes('headquater_back')) {
                        headquarters.backimage = e.target.result;
                        ref.setState({ headquarters });
                    } else if (type.includes('headquater_avatar')) {
                        headquarters.data.map((item, i) => {
                            if (type.includes(i)) {
                                item.avatar = e.target.result;
                                ref.setState({ headquarters });
                            }
                        });
                    }
                }
                reader.readAsDataURL(headquater_files[index].files[0]);
            }
        });
    } 

    // handle collapse show/hide item
    onGuideCollapseChange(guide_activeKey) {
        this.setState({ guide_activeKey });
    }
    onValueCollapseChange(value_activeKey) {
        this.setState({ value_activeKey });
    }
    onServiceCollapseChange(service_activeKey) {
        this.setState({ service_activeKey });
    }
    onHeadquaterCollapseChange(headquater_activeKey) {
        this.setState({ headquater_activeKey });
    }

    // Update header section
    updateHeader() {
        var { list } = this.state;
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', {name: 'about', data: JSON.stringify(list), type: 'header'})
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update guide items
    onUpdateGuideItem(e, type) {
        var { guides , list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'guides') {
                list[key] = guides;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(guides[type]), type: 'guides', id: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update value items
    onUpdateValueItem(e, type) {
        var { values , list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'values') {
                list[key] = values;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(values), type: 'values', id: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update service items
    onUpdateServiceItem(e, type) {
        var { services, list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'services') {
                list[key] = services;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(services), type: 'services', id: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update headquater
    onUpdateHeadquater(e) {
        var { headquarters, list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'headquarters') {
                list[key] = headquarters;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(headquarters), type: 'headquarters' })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update headquater items
    onUpdateHeadquaterItem(e, type) {
        var { headquarters, list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'headquarters') {
                list[key] = headquarters;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(headquarters), type: 'headquarter-item', id: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    render() {
        const { isLoaded, list, services, values, headquarters, guides, counters, guide_activeKey, value_activeKey, service_activeKey, headquater_activeKey, accordion } = this.state;
        const ref = this;
        return (
            <div className="admin-page">
            {isLoaded ?
                <Segment vertical textAlign='center'>
                    <Container>
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

                                            <div className="admin-form-group" style={{display: 'flex', justifyContent: 'space-between'}}>
                                                {counters.map((item, i) => (
                                                    <Form className="flex-form" key={i}>
                                                        <Form.Input fluid label="Number" name='text' className="input-form" value={item.number} onChange={(val)=>ref.handleChange(val, "number_"+i)} />
                                                        <Form.Input fluid label="Text" name='text' className="input-form" value={item.text} onChange={(val)=>ref.handleChange(val, "text_"+i)} />
                                                    </Form>
                                                ))}
                                            </div>
                                            <label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={8}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Guides Items</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Collapse accordion={accordion} onChange={this.onGuideCollapseChange} activeKey={guide_activeKey}>
                                                {guides.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_guide_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_guide_description')} />
                                                        <Form>
                                                            <label>Avatar Image</label>
                                                            <Form.Field>
                                                                <input accept='image/*' type='file' className='guide_avatar' onChange={(e) => ref.onAvatarChange(index+'_avatar', e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateGuideItem(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteGuideItem(e, index)}> Delete </label>
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={5}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Value Items</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label="Title" name='title' placeholder='Header title' className="input-form" value={values.title} onChange={(val)=>this.handleChange(val, 'value_main_title')} />
                                            <Collapse accordion={accordion} onChange={this.onValueCollapseChange} activeKey={value_activeKey}>
                                                {values.data.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_value_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_value_description')} />
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateValueItem(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteValueItem(e, index)}> Delete </label>
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={5}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Service Items</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label="Title" name='title' placeholder='Header title' className="input-form" value={services.title} onChange={(val)=>this.handleChange(val, 'service_main_title')} />
                                            <Collapse accordion={accordion} onChange={this.onServiceCollapseChange} activeKey={service_activeKey}>
                                                {services.data.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_service_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_service_description')} />
                                                        <Form>
                                                            <label>Header Image</label>
                                                            <Form.Field>
                                                                <input accept="image/*" type="file" className="service-file" onChange={(e) => this.onAvatarChange("header_" + index, e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <Form>
                                                            <label>Header Background Image</label>
                                                            <Form.Field>
                                                                <input accept="image/*" type="file" className="service-file" onChange={(e) => this.onAvatarChange("back_" + index, e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateServiceItem(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteServiceItem(e, index)}> Delete </label>
                                                        </div>
                                                    </Panel>
                                                ))}
                                            </Collapse>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column computer={5}>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>Headquarters Items</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={headquarters.title} onChange={(val) => ref.handleChange(val, 'headquartersTitle')} />
                                            <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={headquarters.description} onChange={(val) => ref.handleChange(val, 'headquartersDescription')} />
                                            <Form>
                                                <label>Background Image</label>
                                                <Form.Field>
                                                    <input accept="image/*" type="file" className="headquater-file" onChange={(e) => this.onAvatarChange("headquater_back", e)}/>
                                                </Form.Field>
                                            </Form>
                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquater(e)}> Save </label>
                                            <Collapse accordion={accordion} onChange={this.onHeadquaterCollapseChange} activeKey={headquater_activeKey}>
                                                {headquarters.data.map((item, index) => (
                                                    <Panel header={item.title} key={index}>
                                                        <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index+'_headquater_title')} />
                                                        <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index +'_headquater_description')} />
                                                        <Form.Input fluid label='Button' name='button' placeholder='button name' className='input-form' value={item.button} onChange={(val) => ref.handleChange(val, index +'_headquater_button')} />
                                                        <Form>
                                                            <label>Avatar Image</label>
                                                            <Form.Field>
                                                                <input accept="image/*" type="file" className="headquater-file" onChange={(e) => this.onAvatarChange("headquater_avatar" + index, e)}/>
                                                            </Form.Field>
                                                        </Form>
                                                        <div style={{display: 'flex'}}>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquaterItem(e, index)}> Save </label>
                                                            <label className='ui floated button save-btn' onClick={(e) => ref.onDeleteHeadquaterItem(e, index)}> Delete </label>
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