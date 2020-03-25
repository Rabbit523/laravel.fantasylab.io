import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, TextArea } from 'semantic-ui-react'
import { Translate, withLocalize } from "react-localize-redux"
import Collapse, { Panel } from 'rc-collapse'
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
			headquater_activeKey: [],
			news_activeKey: []
		}
		this.onGuideCollapseChange = this.onGuideCollapseChange.bind(this);
		this.onValueCollapseChange = this.onValueCollapseChange.bind(this);
		this.onServiceCollapseChange = this.onServiceCollapseChange.bind(this);
		this.onHeadquaterCollapseChange = this.onHeadquaterCollapseChange.bind(this);
		this.onNewsCollapseChange = this.onNewsCollapseChange.bind(this);
	}

	componentDidMount() {
		Http.post('/api/front/get-page', { name: 'about' })
			.then(
				res => {
					var list = JSON.parse(res.data.data);
					var services = {}, values = {}, headquarters = {}, guides = [], counters = [], news = {}, service_title = "", no_service_title = "";
					Object.keys(list).map(function (key, index) {
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
						} else if (key == "news") {
							news = list[key];
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
		var { list, counters, guides, values, services, headquarters, news } = this.state;
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
			case 'service_main_title':
				services.title = event.target.value;
				return this.setState({ services });
			case 'no_meta_title':
				list.no_meta_title = event.target.value;
				return this.setState({ list });
			case 'no_meta_description':
				list.no_meta_description = event.target.value;
				return this.setState({ list });
			case 'no_title':
				list.no_title = event.target.value;
				return this.setState({ list });
			case 'no_description':
				list.no_description = event.target.value;
				return this.setState({ list });
			case 'no_headquartersTitle':
				headquarters.no_title = event.target.value;
				return this.setState({ headquarters });
			case 'no_headquartersDescription':
				headquarters.no_description = event.target.value;
				return this.setState({ headquarters });
			case 'no_service_main_title':
				services.no_title = event.target.value;
					return this.setState({ services });
			case 'news_main_title':
				news.title = event.target.value;
				return this.setState({ news });
			case 'news_main_no_title':
				news.no_title = event.target.value;
				return this.setState({ news });
		}

		counters.map(function (item, i) {
			if (ref.props.activeLanguage.code == 'en') {
				var sub_key = type.split("_")[0];
				if (i == type.split("_")[1]) {
					counters[i][sub_key] = event.target.value;
					list['counters'] = counters;
					ref.setState({ counters });
				}
			} else {
				var sub_key = type.split("_")[0] + "_" + type.split("_")[1];
				if (i == type.split("_")[2]) {
					counters[i][sub_key] = event.target.value;
					list['counters'] = counters;
					ref.setState({ counters });
				}
			}

		});

		guides.map(function (item, i) {
			if (type.includes('guide') && type.includes(i)) {
				if (type.includes('title')) {
					if (ref.props.activeLanguage.code == 'en') {
						item.title = event.target.value;
					} else {
						item.no_title = event.target.value;
					}
					return ref.setState({ guides });
				} else if (type.includes('description')) {
					if (ref.props.activeLanguage.code == 'en') {
						item.description = event.target.value;
					} else {
						item.no_description = event.target.value;
					}
					return ref.setState({ guides });
				}
			}
		});

		values.data.map(function (item, i) {
			if (type.includes('value')) {
				if (type.includes('title') && type.includes('main')) {
					if (ref.props.activeLanguage.code == 'en') {
						values.title = event.target.value;
					} else {
						values.no_title = event.target.value;
					}
					return ref.setState({ values });
				} else if (type.includes('title') && type.includes(i)) {
					if (ref.props.activeLanguage.code == 'en') {
						item.title = event.target.value;
					} else {
						item.no_title = event.target.value;
					}
					return ref.setState({ values });
				} else if (type.includes('description') && type.includes(i)) {
					if (ref.props.activeLanguage.code == 'en') {
						item.description = event.target.value;
					} else {
						item.no_description = event.target.value;
					}
					return ref.setState({ values });
				}
			}
		});

		if (type.includes('service')) {
			var key = type.split('_')[0];
			if (type.includes('color')) {
				var sub_key = type.split('_')[2];
				services[key][sub_key] = event.target.value;
			} else {
				if (this.props.activeLanguage.code == 'en') {
					var sub_key = type.split('_')[2];
					services[key][sub_key] = event.target.value;
				} else {
					var sub_key = type.split('_')[1] + "_" + type.split('_')[3];
					services[key][sub_key] = event.target.value;
				}
			}
			this.setState({ services });
		}

		headquarters.data.map(function (item, i) {
			if (type.includes('headquater') && type.includes(i)) {
				if (type.includes('title')) {
					if (ref.props.activeLanguage.code == 'en') {
						item.title = event.target.value;
					} else {
						item.no_title = event.target.value;
					}
					return ref.setState({ headquarters });
				} else if (type.includes('description')) {
					if (ref.props.activeLanguage.code == 'en') {
						item.description = event.target.value;
					} else {
						item.no_description = event.target.value;
					}
					return ref.setState({ headquarters });
				} else if (type.includes('button')) {
					if (ref.props.activeLanguage.code == 'en') {
						item.button = event.target.value;
					} else {
						item.no_button = event.target.value;
					}
					return ref.setState({ headquarters });
				}
			}
		});

		news.data.map(function (item, i) {
			if (type.includes('news') && type.includes(i)) {
				if (type.includes('title')) {
					if (ref.props.activeLanguage.code == 'en') {
						item.title = event.target.value;
					} else {
						item.no_title = event.target.value;
					}
					return ref.setState({ news });
				} else if (type.includes('description')) {
					if (ref.props.activeLanguage.code == 'en') {
						item.description = event.target.value;
					} else {
						item.no_description = event.target.value;
					}
					return ref.setState({ news });
				} else if (type.includes('author')) {
					item.author = event.target.value;
					return ref.setState({ news });
				}  else if (type.includes('type')) {
					item.type = event.target.value;
					return ref.setState({ news });
				}  else if (type.includes('read')) {
					item.read = event.target.value;
					return ref.setState({ news });
				}  else if (type.includes('time')) {
					item.time = event.target.value;
					return ref.setState({ news });
				}
			}
		});
	}

	// handle image upload 
	onAvatarChange(type, e) {
		var { list, guides, services, headquarters, news} = this.state;
		var ref = this;

		var infile = document.getElementById("input-file");
		if (infile.files && infile.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				list.header_url = e.target.result; ref.setState({ list });
			}
			reader.readAsDataURL(infile.files[0]);
		}

		var guide_files = document.getElementsByClassName("guide_avatar");
		Object.keys(guide_files).map((key, index) => {
			if (guide_files[index].files && guide_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
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

		var Servicefiles = document.getElementsByClassName('service-file');
		Object.keys(Servicefiles).map((key, index) => {
			if (Servicefiles[index].files && Servicefiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var sub_key = type.split('_')[1];
					var id = type.split('_')[2];
					if (type.includes('service')) {
						services[id][sub_key] = e.target.result;
						ref.setState({ services });
					}
				}
				reader.readAsDataURL(Servicefiles[index].files[0]);
			}
		});

		var headquater_files = document.getElementsByClassName("headquater-file");
		Object.keys(headquater_files).map((key, index) => {
			if (headquater_files[index].files && headquater_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
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
		
		var news_files = document.getElementsByClassName("news_avatar");
		Object.keys(news_files).map((key, index) => {
			if (news_files[index].files && news_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					news.data.map((item, i) => {
						if (type.includes(i)) {
							item.url = e.target.result;
							ref.setState({ news });
						}
					});
				}
				reader.readAsDataURL(news_files[index].files[0]);
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
	onNewsCollapseChange(news_activeKey) {
		this.setState({ news_activeKey });
	}
	// Update header section
	updateHeader() {
		var { list } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(list), type: 'header' })
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
		var { guides, list } = this.state;
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
		var { values, list } = this.state;
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
	onAddService(e) {
		var { services } = this.state;
		var new_item = {
			title: 'New Service',
			no_title: 'Ny tjeneste',
			description: '',
			no_description: '',
			backimage: null,
			avatar: null,
			url: 'web-development',
			no_url: '/no/webutvikling'
		};
		services.push(new_item);
		this.setState({ services });
	}
	onUpdateServiceTitle(e) {
		var { services, list } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'services') {
				list[key] = services;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(services), type: 'services_title' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	onUpdateService(e, type) {
		var { services, list } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'services') {
				list[key] = services;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(services), type: 'services_data', id: type })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	onDeleteService(e, type) {
		const { services } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(services), type: 'services_delete', id: type })
			.then(
				res => {
					this.setState({ isLoaded: true, services: res.data });
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

	// Update news
	onUpdateNewsTitle(e) {
		var { news, list } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'news') {
				list[key] = news;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(news), type: 'news_title' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update headquater items
	onUpdateNewsItem(e, type) {
		var { news, list } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'news') {
				list[key] = news;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'about', data: JSON.stringify(news), type: 'news_item', id: type })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	
	render() {
		const { isLoaded, list, services, values, headquarters, guides, counters, news, guide_activeKey, value_activeKey, service_activeKey, headquater_activeKey, news_activeKey, accordion } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		const ref = this;
		return (
			<Translate>
				{({ translate }) => (
					<div className="admin-page">
						{isLoaded ?
							<Segment vertical textAlign='center'>
								<Container>
									{lang == 'en' && <Grid>
										<Grid.Column computer={8}>
											<Card>
												<Card.Content>
													<Card.Header>{translate('card.header-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={list.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
														<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={list.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={list.title} onChange={(val) => this.handleChange(val, 'title')} />
														<Form>
															<label>{translate('card.description')}</label>
															<TextArea
																placeholder={translate('card.description-place')}
																value={list.description}
																onChange={(val) => this.handleChange(val, 'description')}
															/>
														</Form>
														<Form>
															<label>{translate('card.header-img')}</label>
															<Form.Field>
																<input accept="image/*" type="file" id="input-file" onChange={(e) => this.onAvatarChange("header", e)} />
															</Form.Field>
														</Form>

														<div className="admin-form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
															{counters.map((item, i) => (
																<Form className="flex-form" key={i}>
																	<Form.Input fluid label={translate('card.number')} name='text' className="input-form" value={item.number} onChange={(val) => ref.handleChange(val, "number_" + i)} />
																	<Form.Input fluid label={translate('card.text')} name='text' className="input-form" value={item.text} onChange={(val) => ref.handleChange(val, "text_" + i)} />
																</Form>
															))}
														</div>
														<label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column computer={8}>
											<Card>
												<Card.Content>
													<Card.Header>{translate('card.guide-items')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Collapse accordion={accordion} onChange={this.onGuideCollapseChange} activeKey={guide_activeKey}>
															{guides.map((item, index) => (
																<Panel header={item.title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index + '_guide_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index + '_guide_description')} />
																	<Form>
																		<label>{translate('card.avatar-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='guide_avatar' onChange={(e) => ref.onAvatarChange(index + '_avatar', e)} />
																		</Form.Field>
																	</Form>
																	<div className="flex-form">
																		<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateGuideItem(e, index)}> {translate('card.save')} </label>
																		<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteGuideItem(e, index)}> {translate('card.delete')} </label>
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
													<Card.Header>{translate('card.value-items')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={values.title} onChange={(val) => this.handleChange(val, 'value_main_title')} />
														<Collapse accordion={accordion} onChange={this.onValueCollapseChange} activeKey={value_activeKey}>
															{values.data.map((item, index) => (
																<Panel header={item.title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index + '_value_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index + '_value_description')} />
																	<div className="flex-form">
																		<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateValueItem(e, index)}> {translate('card.save')} </label>
																		<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteValueItem(e, index)}> {translate('card.delete')} </label>
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
													<Card.Header>{translate('card.service-section')}</Card.Header>
													<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={services.title} onChange={(val) => this.handleChange(val, 'service_main_title')} />
														<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateServiceTitle(e)}> {translate('card.save')} </label>
														<Collapse accordion={accordion} onChange={this.onServiceCollapseChange} activeKey={service_activeKey}>
															{services.data.map((item, index) => (
																<Panel header={item.title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index + '_service_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index + '_service_description')} />
																	<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.handleChange(val, index + '_service_color')} />
																	<Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={item.url} onChange={(val) => ref.handleChange(val, index + '_service_url')} />
																	<Form>
																		<label>{translate('card.avatar-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="service-file" onChange={(e) => this.onAvatarChange("service_avatar_" + index, e)} />
																		</Form.Field>
																	</Form>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="service-file" onChange={(e) => this.onAvatarChange("service_backimage_" + index, e)} />
																		</Form.Field>
																	</Form>
																	<div className="flex-form">
																		<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateService(e, index)}> {translate('card.save')} </label>
																		<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteService(e, index)}> {translate('card.delete')} </label>
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
													<Card.Header>{translate('card.headquarter-items')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={headquarters.title} onChange={(val) => ref.handleChange(val, 'headquartersTitle')} />
														<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={headquarters.description} onChange={(val) => ref.handleChange(val, 'headquartersDescription')} />
														<Form>
															<label>{translate('card.background-img')}</label>
															<Form.Field>
																<input accept="image/*" type="file" className="headquater-file" onChange={(e) => this.onAvatarChange("headquater_back", e)} />
															</Form.Field>
														</Form>
														<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquater(e)}> {translate('card.save')} </label>
														<Collapse accordion={accordion} onChange={this.onHeadquaterCollapseChange} activeKey={headquater_activeKey}>
															{headquarters.data.map((item, index) => (
																<Panel header={item.title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index + '_headquater_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index + '_headquater_description')} />
																	<Form.Input fluid label={translate('card.btn-name')} name='button' placeholder={translate('card.btn-name')} className='input-form' value={item.button} onChange={(val) => ref.handleChange(val, index + '_headquater_button')} />
																	<Form>
																		<label>{translate('card.avatar-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="headquater-file" onChange={(e) => this.onAvatarChange("headquater_avatar" + index, e)} />
																		</Form.Field>
																	</Form>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquaterItem(e, index)}> {translate('card.save')} </label>
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
													<Card.Header>{translate('card.news-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={news.title} onChange={(val) => this.handleChange(val, 'news_main_title')} />
														<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateNewsTitle(e)}> {translate('card.save')} </label>
														<Collapse accordion={accordion} onChange={this.onNewsCollapseChange} activeKey={news_activeKey}>
															{news.data.map((item, index) => (
																<Panel header={item.title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, 'news_title' + index)} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, 'news_description' + index)} />
																	<div className="flex-form">
																		<Form.Input fluid label={translate('card.author')} name='author' placeholder={translate('card.author')} className='input-form' value={item.author} onChange={(val) => ref.handleChange(val, 'news_author' + index)} />
																		<Form.Input fluid label='Type' name='type' placeholder='type' className='input-form' value={item.type} onChange={(val) => ref.handleChange(val, 'news_type' + index)} />
																	</div>
																	<div className="flex-form">
																		<Form.Input fluid label={translate('card.read')} name='read' placeholder={translate('card.read')} className='input-form' value={item.read} onChange={(val) => ref.handleChange(val, 'news_read' + index)} />
																		<Form.Input fluid label={translate('card.time')} name='read' placeholder={translate('card.time')} className='input-form' value={item.time} onChange={(val) => ref.handleChange(val, 'news_time' + index)} />
																	</div>
																	<Form>
																		<label>{translate('card.image-upload')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='news_avatar' onChange={(e) => ref.onAvatarChange(index + "_avatar", e)} />
																		</Form.Field>
																	</Form>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateNewsItem(e, index)}> {translate('card.save')} </label>
																</Panel>
															))}
														</Collapse>
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
									</Grid>}
									{lang == 'nb' && <Grid>
										<Grid.Column computer={8}>
											<Card>
												<Card.Content>
													<Card.Header>{translate('card.header-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={list.no_meta_title} onChange={(val) => this.handleChange(val, 'no_meta_title')} />
														<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={list.no_meta_description} onChange={(val) => this.handleChange(val, 'no_meta_description')} />
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={list.no_title} onChange={(val) => this.handleChange(val, 'no_title')} />
														<Form>
															<label>{translate('card.description')}</label>
															<TextArea
																placeholder={translate('card.description-place')}
																value={list.no_description}
																onChange={(val) => this.handleChange(val, 'no_description')}
															/>
														</Form>
														<Form>
															<label>{translate('card.header-img')}</label>
															<Form.Field>
																<input accept="image/*" type="file" id="input-file" onChange={(e) => this.onAvatarChange("header", e)} />
															</Form.Field>
														</Form>

														<div className="admin-form-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
															{counters.map((item, i) => (
																<Form className="flex-form" key={i}>
																	<Form.Input fluid label={translate('card.number')} name='text' className="input-form" value={item.number} onChange={(val) => ref.handleChange(val, "number_" + i)} />
																	<Form.Input fluid label={translate('card.text')} name='text' className="input-form" value={item.no_text} onChange={(val) => ref.handleChange(val, "no_text_" + i)} />
																</Form>
															))}
														</div>
														<label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column computer={8}>
											<Card>
												<Card.Content>
													<Card.Header>{translate('card.guide-items')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Collapse accordion={accordion} onChange={this.onGuideCollapseChange} activeKey={guide_activeKey}>
															{guides.map((item, index) => (
																<Panel header={item.no_title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, index + '_no_guide_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, index + '_no_guide_description')} />
																	<Form>
																		<label>{translate('card.avatar-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='guide_avatar' onChange={(e) => ref.onAvatarChange(index + '_avatar', e)} />
																		</Form.Field>
																	</Form>
																	<div className="flex-form">
																		<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateGuideItem(e, index)}> {translate('card.save')} </label>
																		<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteGuideItem(e, index)}> {translate('card.delete')} </label>
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
													<Card.Header>{translate('card.value-items')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={values.no_title} onChange={(val) => this.handleChange(val, 'no_value_main_title')} />
														<Collapse accordion={accordion} onChange={this.onValueCollapseChange} activeKey={value_activeKey}>
															{values.data.map((item, index) => (
																<Panel header={item.no_title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, index + '_no_value_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, index + '_no_value_description')} />
																	<div className="flex-form">
																		<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateValueItem(e, index)}> {translate('card.save')} </label>
																		<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteValueItem(e, index)}> {translate('card.delete')} </label>
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
													<Card.Header>{translate('card.service-section')}</Card.Header>
													<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={services.no_title} onChange={(val) => this.handleChange(val, 'no_service_main_title')} />
														<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateServiceTitle(e)}> {translate('card.save')} </label>
														<Collapse accordion={accordion} onChange={this.onServiceCollapseChange} activeKey={service_activeKey}>
															{services.data.map((item, index) => (
																<Panel header={item.no_title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, index + '_no_service_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, index + '_no_service_description')} />
																	<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.handleChange(val, index + '_service_color')} />
																	<Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={item.no_url} onChange={(val) => ref.handleChange(val, index + '_no_service_url')} />
																	<Form>
																		<label>{translate('card.avatar-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="service-file" onChange={(e) => this.onAvatarChange("service_avatar_" + index, e)} />
																		</Form.Field>
																	</Form>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="service-file" onChange={(e) => this.onAvatarChange("service_backimage_" + index, e)} />
																		</Form.Field>
																	</Form>
																	<div className="flex-form">
																		<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateService(e, index)}> {translate('card.save')} </label>
																		<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteService(e, index)}> {translate('card.delete')} </label>
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
													<Card.Header>{translate('card.headquarter-items')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={headquarters.no_title} onChange={(val) => ref.handleChange(val, 'no_headquartersTitle')} />
														<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={headquarters.no_description} onChange={(val) => ref.handleChange(val, 'no_headquartersDescription')} />
														<Form>
															<label>{translate('card.background-img')}</label>
															<Form.Field>
																<input accept="image/*" type="file" className="headquater-file" onChange={(e) => this.onAvatarChange("headquater_back", e)} />
															</Form.Field>
														</Form>
														<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquater(e)}> {translate('card.save')} </label>
														<Collapse accordion={accordion} onChange={this.onHeadquaterCollapseChange} activeKey={headquater_activeKey}>
															{headquarters.data.map((item, index) => (
																<Panel header={item.no_title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, index + '_no_headquater_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, index + '_no_headquater_description')} />
																	<Form.Input fluid label={translate('card.btn-name')} name='button' placeholder={translate('card.btn-name')} className='input-form' value={item.no_button} onChange={(val) => ref.handleChange(val, index + '_no_headquater_button')} />
																	<Form>
																		<label>{translate('card.avatar-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="headquater-file" onChange={(e) => this.onAvatarChange("headquater_avatar" + index, e)} />
																		</Form.Field>
																	</Form>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateHeadquaterItem(e, index)}> {translate('card.save')} </label>
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
													<Card.Header>{translate('card.news-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={news.no_title} onChange={(val) => this.handleChange(val, 'news_main_no_title')} />
														<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateNewsTitle(e)}> {translate('card.save')} </label>
														<Collapse accordion={accordion} onChange={this.onNewsCollapseChange} activeKey={news_activeKey}>
															{news.data.map((item, index) => (
																<Panel header={item.title} key={index}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, 'news_no_title' + index)} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, 'news_no_description' + index)} />
																	<div className="flex-form">
																		<Form.Input fluid label={translate('card.author')} name='author' placeholder={translate('card.author')} className='input-form' value={item.author} onChange={(val) => ref.handleChange(val, 'news_author' + index)} />
																		<Form.Input fluid label='Type' name='type' placeholder='type' className='input-form' value={item.type} onChange={(val) => ref.handleChange(val, 'news_type' + index)} />
																	</div>
																	<div className="flex-form">
																		<Form.Input fluid label={translate('card.read')} name='read' placeholder={translate('card.read')} className='input-form' value={item.read} onChange={(val) => ref.handleChange(val, 'news_read' + index)} />
																		<Form.Input fluid label={translate('card.time')} name='read' placeholder={translate('card.time')} className='input-form' value={item.time} onChange={(val) => ref.handleChange(val, 'news_time' + index)} />
																	</div>
																	<Form>
																		<label>{translate('card.image-upload')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='news_avatar' onChange={(e) => ref.onAvatarChange(index + "_avatar", e)} />
																		</Form.Field>
																	</Form>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateNewsItem(e, index)}> {translate('card.save')} </label>
																</Panel>
															))}
														</Collapse>
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
									</Grid>}
								</Container>
							</Segment>
							:
							<Segment className='page-loader'>
								<Dimmer active inverted>
									<Loader size='large'>{translate('alert.loading')}</Loader>
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