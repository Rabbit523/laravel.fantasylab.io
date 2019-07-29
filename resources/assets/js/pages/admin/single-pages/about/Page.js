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

    handleChange(event, type) {
        var { list, counters } = this.state;
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

        counters.map(function (item, i) {
            var sub_key = type.split("_")[0];
            if (i == type.split("_")[1]) {
                counters[i][sub_key] = event.target.value;
                list['counters'] = counters;
                ref.setState({counters});
            }
        });
    }

    onAvatarChange(type, e){
        var infile = document.getElementById("input-file");
        var { list } = this.state;
        var ref = this;
        if (infile.files && infile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                list.header_url = e.target.result; ref.setState({list});
            }
            reader.readAsDataURL(infile.files[0]);
        }
    }    
    
    onCollapseChange(activeKey) {
        this.setState({ activeKey });
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
    
    render() {
        const { isLoaded, list, services, values, headquarters, guides, counters, news, activeKey, accordion } = this.state;
        const ref = this;
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

                                                <div className="admin-form-group" style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    {counters.map((item, i) => {
                                                        return (
                                                            <Form className="flex-form" key={i}>
                                                                <Form.Input fluid label="Number" name='text' className="input-form" value={item.number} onChange={(val)=>ref.handleChange(val, "number_"+i)} />
                                                                <Form.Input fluid label="Text" name='text' className="input-form" value={item.text} onChange={(val)=>ref.handleChange(val, "text_"+i)} />
                                                            </Form>
                                                        )
                                                    })}
                                                </div>
                                                <label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> Save </label>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                {/* <Grid.Column className="custom-column">
                                    <Card className="header-section">
                                        <Card.Content>
                                            <Card.Header>Portfolio Section</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                {
                                                    Object.keys(portfolios).map(function(key, i) {
                                                        return (
                                                            <div key={i} style={{display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: "10px 16px", color: '#666', cursor: 'pointer' }}>
                                                                <p style={{textTransform: 'uppercase', margin: 0}}>{key}</p>
                                                                <label onClick={(e) => ref.onDeletePortfolio(e, key)}><Icon name="trash outline" style={{cursor: 'pointer'}}></Icon></label>
                                                            </div>
                                                        )
                                                    })  
                                                }
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column> */}
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