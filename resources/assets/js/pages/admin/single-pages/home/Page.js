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
            header:{},
            services: {},
            badges: {},
            portfolios: {},
            carousels: [],
            news: [],
            isLoaded: false,
            accordion: false,
            service_activeKey: [],
            badge_activeKey: [],
            review_activeKey: [],
            news_activeKey: []
        }
        this.onAvatarChange = this.onAvatarChange.bind(this);
        this.onServiceCollapseChange = this.onServiceCollapseChange.bind(this);
        this.onBadgeCollapseChange = this.onBadgeCollapseChange.bind(this);
        this.onReviewCollapseChange = this.onReviewCollapseChange.bind(this);
        this.onNewsCollapseChange = this.onNewsCollapseChange.bind(this);
    }

    componentDidMount() {
        Http.post('/api/front/get-page', { name: 'home' })
        .then(
            res => {
                var list = JSON.parse(res.data.data);
                var header = {}, services = {}, badges = {}, portfolios = {}, carousels = [], news = [];
                Object.keys(list).map((key, index) => {
                    if (key == 'header') {
                        header = list[key];
                    } else if (key == 'services') {
                        services = list[key];
                    } else if (key == 'badges') {
                        badges = list[key];
                    } else if (key == 'portfolios') {
                        portfolios = list[key];
                    } else if (key == 'carousels') {
                        carousels = list[key];
                    } else if (key == 'news') {
                        news = list[key];
                    }
                });
                this.setState({ 
                    isLoaded: true, 
                    list,
                    header,
                    services,
                    badges,
                    portfolios,
                    carousels,
                    news
                });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        var { header, services, badges, carousels, news } = this.state;
        const ref = this;

        switch (type) {
            case 'meta_title':
                header.meta_title = event.target.value;
                return this.setState({ header });
            case 'meta_description':
                header.meta_description = event.target.value;
                return this.setState({ header });
            case 'header_title':
                header.header_title = event.target.value;
                return this.setState({ header });
            case 'header_description_title':
                header.header_description_title = event.target.value;
                return this.setState({ header });
            case 'header_description':
                header.header_description = event.target.value;
                return this.setState({ header });
        }

        Object.keys(services).map((key, index) => {
            if (type.includes(key)) {
                var sub_key = type.split('_')[1];
                services[key][sub_key] = event.target.value;
                ref.setState({ services });
            }
        });
        Object.keys(badges).map((key, index) => {
            if (type.includes(key)) {
                var sub_key = type.split('_')[1];
                badges[key][sub_key] = event.target.value;
                ref.setState({ badges });
            }
        });
        
        carousels.map((item, i) => {
            if (type.includes(i)) {
                var key = type.substr(0, type.length-1);
                item[key] = event.target.value;
                ref.setState({ carousels });
            }
        });

        news.map((item, i) => {
            if (type.includes(i)) {
                var key = type.substr(0, type.length-1);
                item[key] = event.target.value;
                ref.setState({ news });
            }
        });
    }

    onAvatarChange(type, e){
        var { header, services, badges, carousels, news } = this.state;
        var infile = document.getElementById('input-file');
        const ref = this;
        if (infile.files && infile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                if (type == 'header') { header.header_url = e.target.result; ref.setState({ header }); } 
                else if (type == 'footer') { header.footer_url = e.target.result; ref.setState({ header }); }
                else if (type == 'mobile_header') { 
                    console.log(e.target.result);
                    header.mobile_header = e.target.result; 
                    ref.setState({ header });
                }
            }
            reader.readAsDataURL(infile.files[0]);
        }
        //upload mobile header image
        var mobilefile = document.getElementById('mobile-file');
        if (mobilefile.files && mobilefile.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                header.mobile_header = e.target.result; 
                ref.setState({ header });
            }
            reader.readAsDataURL(mobilefile.files[0]);
        }
        // upload service images
        var files = document.getElementsByClassName('service_avatar');
        Object.keys(files).map((key, index) => {
            if (files[index].files && files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var temp = type.split('_');
                    var sub_key = temp[1];
                    Object.keys(services).map((key, i) => {
                        if (temp[0] == key) {
                            services[key][sub_key] = e.target.result;
                            ref.setState({ services });
                        }
                    });
                }
                reader.readAsDataURL(files[index].files[0]);
            }
        });

        // upload badge images
        var badge_files = document.getElementsByClassName('badge_avatar');
        Object.keys(badge_files).map((key, index) => {
            if (badge_files[index].files && badge_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    Object.keys(badges).map((key, i) => {
                        if (key == type) {
                            badges[key].url = e.target.result;
                            ref.setState({ badges });
                        }
                    });
                }
                reader.readAsDataURL(badge_files[index].files[0]);
            }
        });
        // upload carousel images
        var carousel_files = document.getElementsByClassName('review_avatar');
        Object.keys(carousel_files).map((key, index) => {
            if (carousel_files[index].files && carousel_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    carousels.map(function (item, i) {
                        if (i == type) {
                            item.avatar = e.target.result;
                            ref.setState({ carousels });
                        }
                    });
                }
                reader.readAsDataURL(carousel_files[index].files[0]);
            }
        });
        // upload news images
        var news_files = document.getElementsByClassName('news_avatar');
        Object.keys(news_files).map((key, index) => {
            if (news_files[index].files && news_files[index].files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    news.map((item, i) => {
                        if (i == type) {
                            item.url = e.target.result;
                            ref.setState({ news });
                        }
                    });
                }
                reader.readAsDataURL(news_files[index].files[0]);
            }
        });
    }
    
    onServiceCollapseChange(service_activeKey) {
        this.setState({ service_activeKey });
    }

    onBadgeCollapseChange(badge_activeKey) {
        this.setState({ badge_activeKey });
    }

    onReviewCollapseChange(review_activeKey) {
        this.setState({ review_activeKey });
    }

    onNewsCollapseChange(news_activeKey) {
        this.setState({ news_activeKey });
    }

    // Update header section
    updateHeader() {
        var { header , list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'header') {
                list[key] = header;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'home', data: JSON.stringify(header), type: 'header' })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update service section
    onUpdateService(e, type) {
        var { services , list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'services') {
                list[key] = services;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'home', data: JSON.stringify(services), type: 'service', service_type: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update badge section
    onUpdateBadge(e, type) {
        var { badges , list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'badges') {
                list[key] = badges;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'home', data: JSON.stringify(badges), type: 'badge', service_type: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update portfolio section
    onDeletePortfolio (e, type) {
        console.log(type);
    }
    // Update review section
    onUpdateCarousel (e, type) {
        var { carousels , list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'carousels') {
                list[key] = carousels;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'home', data: JSON.stringify(carousels), type: 'carousel', service_type: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    // Update blog section
    onUpdateNews (e, type) {
        var { news , list } = this.state;
        Object.keys(list).map((key, index) => {
            if (key == 'news') {
                list[key] = news;
            }
        });
        this.setState({ isLoaded: false });
        Http.post('/api/admin/update-page', { name: 'home', data: JSON.stringify(news), type: 'news', service_type: type })
        .then(
            res => {
                this.setState({ isLoaded: true });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    render() {
        const { isLoaded, header, services, badges, portfolios, carousels, news, service_activeKey, accordion, badge_activeKey, review_activeKey, news_activeKey } = this.state;
        const ref = this;
        return (
            <div className='admin-page home'>
            {isLoaded ?
                <Segment vertical textAlign='center'>
                    <Container>
                        <Grid padded='horizontally'>
                            <Grid.Row columns={3} className='custom-row'>
                                <Grid.Column className='custom-column'>
                                    <Card className='header-section'>
                                        <Card.Content>
                                            <Card.Header>Header Section</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                <Form.Input fluid label='Meta Title' name='meta_title' placeholder='Meta title' className='input-form' value={header.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
                                                <Form.Input fluid label='Meta Description' name='meta_description' placeholder='Meta description' className='input-form' value={header.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
                                                <Form.Input fluid label='Title' name='title' placeholder='Header title' className='input-form' value={header.header_title} onChange={(val) => this.handleChange(val, 'header_title')} />
                                                <Form.Input fluid label='Description Title' name='description_title' placeholder='Write about homepage' className='input-form' value={header.header_description_title} onChange={(val) => this.handleChange(val, 'header_description_title')} />
                                                <Form>
                                                    <label>Description</label>
                                                    <TextArea
                                                        placeholder='Tell us more'
                                                        value={header.header_description}
                                                        onChange={(val) => this.handleChange(val, 'header_description')}
                                                    />
                                                </Form>
                                                <Form>
                                                    <label>Header Image</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' id='input-file' onChange={(e) => this.onAvatarChange('header', e)}/>
                                                    </Form.Field>
                                                </Form>
                                                <Form>
                                                    <label>Header Mobile Image</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' id='mobile-file' onChange={(e) => this.onAvatarChange('mobile_header', e)}/>
                                                    </Form.Field>
                                                </Form>
                                                <Form>
                                                    <label>Footer Image</label>
                                                    <Form.Field>
                                                        <input accept='image/*' type='file' id='input-file' onChange={(e) => this.onAvatarChange('footer', e)}/>
                                                    </Form.Field>
                                                </Form>
                                                <label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> Save </label>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>

                                <Grid.Column className='custom-column'>
                                    <Card className='header-section'>
                                        <Card.Content>
                                            <Card.Header>Service Section</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                <Collapse accordion={accordion} onChange={this.onServiceCollapseChange} activeKey={service_activeKey}>
                                                    {Object.keys(services).map((key, i) => {
                                                        return (
                                                            <Panel header={services[key].title} key={i}>
                                                                <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={services[key].title} onChange={(val) => ref.handleChange(val, services[key].type+'_title')} />
                                                                <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={services[key].description} onChange={(val) => ref.handleChange(val, services[key].type+'_description')} />
                                                                <Form.Input fluid label='Color' name='color' placeholder='color' className='input-form' value={services[key].color} onChange={(val)=> ref.handleChange(val, services[key].type+'_color')} />
                                                                <Form>
                                                                    <label>Avatar Image</label>
                                                                    <Form.Field>
                                                                        <input accept='image/*' type='file' id='input-file' className='service_avatar' onChange={(e) => ref.onAvatarChange(services[key].type+'_avatar', e)}/>
                                                                    </Form.Field>
                                                                </Form>
                                                                <Form>
                                                                    <label>Background Image</label>
                                                                    <Form.Field>
                                                                        <input accept='image/*' type='file' id='input-file' className='service_avatar' onChange={(e) => ref.onAvatarChange(services[key].type+'_back', e)}/>
                                                                    </Form.Field>
                                                                </Form>
                                                                <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateService(e, services[key].type)}> Save </label>
                                                            </Panel>
                                                        )
                                                    })}
                                                </Collapse>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                                
                                <Grid.Column className='custom-column'>
                                    <Card className='header-section'>
                                        <Card.Content>
                                            <Card.Header>Badge Section</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                <Collapse accordion={accordion} onChange={this.onBadgeCollapseChange} activeKey={badge_activeKey}>
                                                    {Object.keys(badges).map((key, i) => {
                                                        return (
                                                            <Panel header={badges[key].title} key={i}>
                                                                <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={badges[key].title} onChange={(val) => ref.handleChange(val, key+'_title')} />
                                                                <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={badges[key].description} onChange={(val) => ref.handleChange(val, key+'_description')} />
                                                                <Form.Input fluid label='Color' name='color' placeholder='color' className='input-form' value={badges[key].color} onChange={(val) => ref.handleChange(val, key+'_color')} />
                                                                <Form>
                                                                    <label>Image Upload</label>
                                                                    <Form.Field>
                                                                        <input accept='image/*' type='file' id='input-file' className='badge_avatar' onChange={(e) => ref.onAvatarChange(key, e)}/>
                                                                    </Form.Field>
                                                                </Form>
                                                                <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateBadge(e, key)}> Save </label>
                                                            </Panel>
                                                        )
                                                    })}
                                                </Collapse>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={3} className='custom-row'>
                                <Grid.Column className='custom-column'>
                                    <Card className='header-section'>
                                        <Card.Content>
                                            <Card.Header>Portfolio Section</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                {Object.keys(portfolios).map((key, i) => {
                                                    return (
                                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
                                                            <p style={{textTransform: 'uppercase', margin: 0}}>{key}</p>
                                                            <label onClick={(e) => ref.onDeletePortfolio(e, key)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
                                                        </div>
                                                    )
                                                })}
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>

                                <Grid.Column className='custom-column'>
                                    <Card className='header-section'>
                                        <Card.Content>
                                            <Card.Header>Reviews Section</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                <Collapse accordion={accordion} onChange={this.onReviewCollapseChange} activeKey={review_activeKey}>
                                                    {carousels.map(function(item, i) {
                                                        return (
                                                            <Panel header={item.name} key={i}>
                                                                <Form.Input fluid label='Name' name='name' placeholder='name' className='input-form' value={item.name} onChange={(val)=>ref.handleChange(val, 'name'+i)} />
                                                                <Form.Input fluid label='Job' name='Job' placeholder='job' className='input-form' value={item.job} onChange={(val)=>ref.handleChange(val, 'job'+i)} />
                                                                <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val)=>ref.handleChange(val, 'description'+i)} />
                                                                <Form>
                                                                    <label>Image Upload</label>
                                                                    <Form.Field>
                                                                        <input accept='image/*' type='file' id='input-file' className='review_avatar' onChange={(e) => ref.onAvatarChange(i, e)}/>
                                                                    </Form.Field>
                                                                </Form>
                                                                <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateCarousel(e, i)}> Save </label>
                                                            </Panel>
                                                        )
                                                    })}
                                                </Collapse>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>

                                <Grid.Column className='custom-column'>
                                    <Card className='header-section'>
                                        <Card.Content>
                                            <Card.Header>News Section</Card.Header>
                                        </Card.Content>
                                        <Card.Content>
                                            <Card.Description>
                                                <Collapse accordion={accordion} onChange={this.onNewsCollapseChange} activeKey={news_activeKey}>
                                                    {news.map((item, i) => {
                                                        return (
                                                            <Panel header={item.title} key={i}>
                                                                <Form.Input fluid label='Title' name='title' placeholder='title' className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, 'title'+i)} />
                                                                <Form.Input fluid label='Author' name='author' placeholder='author' className='input-form' value={item.author} onChange={(val) => ref.handleChange(val, 'author'+i)} />
                                                                <Form.Input fluid label='Type' name='type' placeholder='type' className='input-form' value={item.type} onChange={(val) => ref.handleChange(val, 'type'+i)} />
                                                                <Form.Input fluid label='Description' name='description' placeholder='description' className='input-form' value={item.description} onChange={(val)=>ref.handleChange(val, 'description'+i)} />
                                                                <Form.Input fluid label='Read' name='read' placeholder='read' className='input-form' value={item.read} onChange={(val) =>ref.handleChange(val, 'read'+i)} />
                                                                <Form>
                                                                    <label>Image Upload</label>
                                                                    <Form.Field>
                                                                        <input accept='image/*' type='file' id='input-file' className='news_avatar' onChange={(e) => ref.onAvatarChange(i, e)}/>
                                                                    </Form.Field>
                                                                </Form>
                                                                <label className='ui floated button save-btn' onClick={(e) => ref.onUpdateNews(e, i)}> Save </label>
                                                            </Panel>
                                                        )
                                                    })}
                                                </Collapse>
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