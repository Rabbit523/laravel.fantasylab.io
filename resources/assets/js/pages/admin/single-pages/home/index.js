import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, TextArea, Button } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse'
import { Translate, withLocalize } from "react-localize-redux"
import 'rc-collapse/assets/index.css'
import Http from '../../../../Http'
import Modal from 'react-modal'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		height: 470
	}
};

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			header: {},
			footer: {},
			services: [],
			badges: {},
			portfolios: {},
			_portfolios: {},
			rest_items: [],
			carousels: [],
			_reviews: [],
			rest_reviews: [],
			news: [],
			isLoaded: false,
			isOpen: false,
			isPortfolio: false,
			isReview: false,
			accordion: false,
			service_activeKey: [],
			badge_activeKey: [],
			news_activeKey: []
		}
		this.onAvatarChange = this.onAvatarChange.bind(this);
		this.onServiceCollapseChange = this.onServiceCollapseChange.bind(this);
		this.onBadgeCollapseChange = this.onBadgeCollapseChange.bind(this);
		this.onNewsCollapseChange = this.onNewsCollapseChange.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount() {
		Http.post('/api/front/get-page', { name: 'home' })
			.then(
				res => {
					var list = JSON.parse(res.data.page.data);
					var header = {}, footer = {}, services = [], badges = {}, portfolios = {}, carousels = [], news = [];
					Object.keys(list).map((key, index) => {
						if (key == 'header') {
							header = list[key];
						} else if (key == 'footer') {
							footer = list[key];
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
						footer,
						services,
						badges,
						portfolios,
						_portfolios: res.data.portfolio,
						_reviews: res.data.review,
						carousels,
						news
					});
				}
			).catch(err => {
				console.error(err);
			});
	}

	handleChange(event, type) {
		var { header, footer, services, badges, carousels, news } = this.state;
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
			case 'footer_title':
				footer.title = event.target.value;
				return this.setState({ footer });
			case 'footer_description':
				footer.description = event.target.value;
				return this.setState({ footer });
			case 'footer_button':
				footer.button = event.target.value;
				return this.setState({ footer });
			case 'footer_link':
				footer.link = event.target.value;
				return this.setState({ footer });
			case 'footer_link_name':
				footer.link_name = event.target.value;
				return this.setState({ footer });
			case 'no_meta_title':
				header.no_meta_title = event.target.value;
				return this.setState({ header });
			case 'no_meta_description':
				header.no_meta_description = event.target.value;
				return this.setState({ header });
			case 'no_header_title':
				header.no_header_title = event.target.value;
				return this.setState({ header });
			case 'no_header_description_title':
				header.no_header_description_title = event.target.value;
				return this.setState({ header });
			case 'no_header_description':
				header.no_header_description = event.target.value;
				return this.setState({ header });
			case 'no_footer_title':
				footer.no_title = event.target.value;
				return this.setState({ footer });
			case 'no_footer_description':
				footer.no_description = event.target.value;
				return this.setState({ footer });
			case 'no_footer_button':
				footer.no_button = event.target.value;
				return this.setState({ footer });
			case 'no_footer_link':
				footer.no_link = event.target.value;
				return this.setState({ footer });
			case 'no_footer_link_name':
				footer.no_link_name = event.target.value;
				return this.setState({ footer });
		}

		if (type.includes('service')) {
			if (type.includes('title') && type.includes('description') && type.includes('url')) {
				if (this.props.lang == 'en') {
					var key = type.split('_')[1];
					var sub_key = type.split('_')[2];
					services[sub_key][key] = event.target.value;
				} else {
					var key = type.split('_')[0] + "_" + type.split('_')[2];
					var sub_key = type.split('_')[3];
					services[sub_key][key] = event.target.value;
				}
			} else {
				var key = type.split('_')[1];
				var sub_key = type.split('_')[2];
				services[sub_key][key] = event.target.value;
			}
			this.setState({ services });
		}

		Object.keys(badges).map((key, index) => {
			if (type.includes('color')) {
				var sub_key = type.split('_')[1];
				badges[key][sub_key] = event.target.value;
			} else if (type.includes(key)){
				if (this.props.lang == 'en') {
					var sub_key = type.split('_')[1];
					badges[key][sub_key] = event.target.value;
				} else {
					var sub_key = type.split('_')[1] + "_" + type.split('_')[2];
					badges[key][sub_key] = event.target.value;
				}
			}
			ref.setState({ badges });
		});

		carousels.map((item, i) => {
			if (type.includes(i)) {
				var key = type.substr(0, type.length - 1);
				item[key] = event.target.value;
				ref.setState({ carousels });
			}
		});

		news.map((item, i) => {
			if (type.includes(i)) {
				var key = type.substr(0, type.length - 1);
				item[key] = event.target.value;
				ref.setState({ news });
			}
		});
	}

	onAvatarChange(type, e) {
		const { header, footer, services, badges, carousels, news } = this.state;
		const ref = this;

		var infile = document.getElementById('input-file');
		if (infile.files && infile.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				header.header_url = e.target.result; ref.setState({ header });
			}
			reader.readAsDataURL(infile.files[0]);
		}

		var footerfile = document.getElementById('footer-file');
		if (footerfile.files && footerfile.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				footer.url = e.target.result; ref.setState({ footer });
			}
			reader.readAsDataURL(footerfile.files[0]);
		}

		//upload mobile header image
		var mobilefile = document.getElementById('mobile-file');
		if (mobilefile.files && mobilefile.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				header.mobile_header = e.target.result;
				ref.setState({ header });
			}
			reader.readAsDataURL(mobilefile.files[0]);
		}
		// upload service images
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

		// upload badge images
		var badge_files = document.getElementsByClassName('badge_avatar');
		Object.keys(badge_files).map((key, index) => {
			if (badge_files[index].files && badge_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
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
				reader.onload = function (e) {
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
				reader.onload = function (e) {
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

	onNewsCollapseChange(news_activeKey) {
		this.setState({ news_activeKey });
	}

	// Update header section
	updateHeader() {
		var { header, list } = this.state;
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
	// Update footer section
	updateFooter() {
		var { footer, list } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'footer') {
				list[key] = footer;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'home', data: JSON.stringify(footer), type: 'footer' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}

	// Update service section
	onAddService(e) {
		var { services } = this.state;
		var new_item = {
			title: 'New Service',
			no_title: "",
			description: '',
			no_description: '',
			backimage: null,
			avatar: null,
			url: 'web',
			no_url: ""
		};
		services.push(new_item);
		this.setState({ services });
	}
	onUpdateService(e, type) {
		var { services, list } = this.state;
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
	onDeleteService(e, type) {
		const { list, data, services } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { data: list, id: data.id, type: 'service_delete', key: type })
			.then(
				res => {
					this.setState({ isLoaded: true, services: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}

	// Update badge section
	onUpdateBadge(e, type) {
		var { badges, list } = this.state;
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

	// Close modal
	closeModal() {
		this.setState({ isOpen: false });
	}

	// Portfolio functions
	onAddPortfolio(e) {
		var { portfolios, _portfolios, rest_items } = this.state;
		var types = [], rest_items = [];
		Object.keys(portfolios).map((key, i) => {
			types.push(key);
		});
		_portfolios.map((item, i) => {
			if (!types.includes(item.type)) {
				rest_items.push(item);
			}
		});
		this.setState({ isOpen: true, isPortfolio: true, isReview: false, rest_items });
	}
	onAddPortfolioItem(e, key) {
		var { rest_items } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/add-portfolio-page', { data: rest_items[key], from: 'home' })
			.then(
				res => {
					this.setState({ isLoaded: true, isOpen: false, isPortfolio: false, portfolios: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}
	onDeletePortfolio(e, type) {
		this.setState({ isLoaded: false });
		Http.post('/api/admin/delete-portfolio-page', { type: type, from: 'home' })
			.then(
				res => {
					this.setState({ isLoaded: true, isPortfolio: false, portfolios: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}

	//Review functions
	onAddReview(e) {
		var { carousels, _reviews, rest_reviews } = this.state;
		var types = [], rest_reviews = [];
		carousels.map((item, i) => {
			types.push(item.title);
		});
		_reviews.map((item, i) => {
			if (!types.includes(item.title)) {
				rest_reviews.push(item);
			}
		});
		this.setState({ isOpen: true, isReview: true, isPortfolio: false, rest_reviews });
	}
	onAddReviewItem(e, key) {
		var { rest_reviews } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/add-review-page', { data: rest_reviews[key], from: 'home' })
			.then(
				res => {
					this.setState({ isLoaded: true, isOpen: false, isReview: false, carousels: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}
	onDeleteReview(e, type) {
		this.setState({ isLoaded: false });
		Http.post('/api/admin/delete-review-page', { type: type, from: 'home' })
			.then(
				res => {
					this.setState({ isLoaded: true, isReview: false, carousels: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}

	// Update review section
	onUpdateCarousel(e, type) {
		var { carousels, list } = this.state;
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
	onUpdateNews(e, type) {
		var { news, list } = this.state;
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
		const { isLoaded, isOpen, isPortfolio, isReview, header, footer, services, badges, portfolios, rest_items, carousels, rest_reviews, news, service_activeKey, accordion, badge_activeKey, news_activeKey } = this.state;
		const ref = this;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		return (
			<Translate>
				{({ translate }) => (
					<div className='admin-page home'>
						{isLoaded ?
							<Segment vertical textAlign='center'>
								<Modal isOpen={isOpen} onRequestClose={this.closeModal} style={customStyles}>
									<Button icon='close' onClick={this.closeModal} />
									{rest_items.length > 0 && isPortfolio && rest_items.map((item, i) => (
										<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'transparent', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
											<p style={{ textTransform: 'uppercase', margin: 0 }}>{item.type}</p>
											<label onClick={(e) => ref.onAddPortfolioItem(e, i)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label>
										</div>
									))}
									{rest_items.length == 0 && isPortfolio && (
										<div>
											<h2>Hi,<br />Admin.</h2>
											<p>There is no more portfolio item should be added.</p>
										</div>
									)}
									{rest_reviews.length > 0 && isReview && rest_reviews.map((item, i) => (
										<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'transparent', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
											<p style={{ textTransform: 'uppercase', margin: 0 }}>{item.title}</p>
											<label onClick={(e) => ref.onAddReviewItem(e, i)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label>
										</div>
									))}
									{rest_reviews.length == 0 && isReview && (
										<div>
											<h2>Hi,<br />Admin.</h2>
											<p>There is no more review item should be added.</p>
										</div>
									)}
								</Modal>
								{lang === 'en' && <Grid>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.header-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={header.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
													<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={header.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={header.header_title} onChange={(val) => this.handleChange(val, 'header_title')} />
													<Form.Input fluid label={translate('card.description-title')} name='description_title' placeholder={translate('card.des-title-place')} className='input-form' value={header.header_description_title} onChange={(val) => this.handleChange(val, 'header_description_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={header.header_description}
															onChange={(val) => this.handleChange(val, 'header_description')}
														/>
													</Form>
													<Form>
														<label>{translate('card.header-img')}</label>
														<Form.Field>
															<input accept='image/*' type='file' id='input-file' onChange={(e) => this.onAvatarChange('header', e)} />
														</Form.Field>
													</Form>
													<Form>
														<label>{translate('card.header-mobile-img')}</label>
														<Form.Field>
															<input accept='image/*' type='file' id='mobile-file' onChange={(e) => this.onAvatarChange('mobile_header', e)} />
														</Form.Field>
													</Form>
													<label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.footer-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={footer.title} onChange={(val) => this.handleChange(val, 'footer_title')} />
													<Form.Input fluid label={translate('card.btn-name')} name='button' placeholder={translate('card.btn-name')} className='input-form' value={footer.button} onChange={(val) => this.handleChange(val, 'footer_button')} />
													<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={footer.description} onChange={(val) => this.handleChange(val, 'footer_description')} />
													<Form.Input fluid label={translate('card.link')} name='link' placeholder={translate('card.link')} className='input-form' value={footer.link} onChange={(val) => this.handleChange(val, 'footer_link')} />
													<Form.Input fluid label={translate('card.link-name')} name='link_name' placeholder={translate('card.link-name')} className='input-form' value={footer.link_name} onChange={(val) => this.handleChange(val, 'footer_link_name')} />
													<Form>
														<label>{translate('card.footer-img')}</label>
														<Form.Field>
															<input accept='image/*' type='file' id='footer-file' onChange={(e) => this.onAvatarChange('footer', e)} />
														</Form.Field>
													</Form>
													<label className='ui floated button save-btn' onClick={this.updateFooter.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.service-section')}</Card.Header>
												<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Collapse accordion={accordion} onChange={this.onServiceCollapseChange} activeKey={service_activeKey}>
														{services.map((item, i) => (
															<Panel header={item.title} key={i}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, 'service_title_' + i)} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, 'service_description_' + i)} />
																<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.handleChange(val, 'service_color_' + i)} />
																<Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={item.url} onChange={(val) => ref.handleChange(val, 'service_url_' + i)} />
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<Form>
																		<label>{translate('card.avatar-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='service-file' onChange={(e) => ref.onAvatarChange('service_avatar_' + i, e)} />
																		</Form.Field>
																	</Form>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='service-file' onChange={(e) => ref.onAvatarChange('service_backimage_' + i, e)} />
																		</Form.Field>
																	</Form>
																</div>
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateService(e, i)}> {translate('card.save')} </label>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteService(e, i)}> {translate('card.delete')} </label>
																</div>
															</Panel>
														))}
													</Collapse>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.badge-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Collapse accordion={accordion} onChange={this.onBadgeCollapseChange} activeKey={badge_activeKey}>
														{Object.keys(badges).map((key, i) => (
															<Panel header={badges[key].title} key={i}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={badges[key].title} onChange={(val) => ref.handleChange(val, key + '_title')} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={badges[key].description} onChange={(val) => ref.handleChange(val, key + '_description')} />
																<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={badges[key].color} onChange={(val) => ref.handleChange(val, key + '_color')} />
																<Form>
																	<label>{translate('card.image-upload')}</label>
																	<Form.Field>
																		<input accept='image/*' type='file' id='input-file' className='badge_avatar' onChange={(e) => ref.onAvatarChange(key, e)} />
																	</Form.Field>
																</Form>
																<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateBadge(e, key)}> {translate('card.save')} </label>
															</Panel>
														))}
													</Collapse>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.portfolio-section')}</Card.Header>
												<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddPortfolio(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													{Object.keys(portfolios).map((key, i) => (
														<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
															<p style={{ textTransform: 'uppercase', margin: 0 }}>{key}</p>
															<label onClick={(e) => ref.onDeletePortfolio(e, key)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
														</div>
													))}
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.review-section')}</Card.Header>
												<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddReview(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													{carousels.map((item, i) => (
														<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
															<p style={{ textTransform: 'uppercase', margin: 0 }}>{item.title}</p>
															<label onClick={(e) => ref.onDeleteReview(e, i)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
														</div>
													))}
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.news-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Collapse accordion={accordion} onChange={this.onNewsCollapseChange} activeKey={news_activeKey}>
														{news.map((item, i) => (
															<Panel header={item.title} key={i}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, 'title' + i)} />
																<Form.Input fluid label={translate('card.author')} name='author' placeholder={translate('card.author')} className='input-form' value={item.author} onChange={(val) => ref.handleChange(val, 'author' + i)} />
																<Form.Input fluid label='Type' name='type' placeholder='type' className='input-form' value={item.type} onChange={(val) => ref.handleChange(val, 'type' + i)} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, 'description' + i)} />
																<Form.Input fluid label={translate('card.read')} name='read' placeholder={translate('card.read')} className='input-form' value={item.read} onChange={(val) => ref.handleChange(val, 'read' + i)} />
																<Form>
																	<label>{translate('card.image-upload')}</label>
																	<Form.Field>
																		<input accept='image/*' type='file' id='input-file' className='news_avatar' onChange={(e) => ref.onAvatarChange(i, e)} />
																	</Form.Field>
																</Form>
																<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateNews(e, i)}> {translate('card.save')} </label>
															</Panel>
														))}
													</Collapse>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
								</Grid>}
								{lang === 'nb' && <Grid>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.header-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={header.no_meta_title} onChange={(val) => this.handleChange(val, 'no_meta_title')} />
													<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={header.no_meta_description} onChange={(val) => this.handleChange(val, 'no_meta_description')} />
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={header.no_header_title} onChange={(val) => this.handleChange(val, 'no_header_title')} />
													<Form.Input fluid label={translate('card.description-title')} name='description_title' placeholder={translate('card.des-title-place')} className='input-form' value={header.no_header_description_title} onChange={(val) => this.handleChange(val, 'no_header_description_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={header.no_header_description}
															onChange={(val) => this.handleChange(val, 'no_header_description')}
														/>
													</Form>
													<Form>
														<label>{translate('card.header-img')}</label>
														<Form.Field>
															<input accept='image/*' type='file' id='input-file' onChange={(e) => this.onAvatarChange('header', e)} />
														</Form.Field>
													</Form>
													<Form>
														<label>{translate('card.header-mobile-img')}</label>
														<Form.Field>
															<input accept='image/*' type='file' id='mobile-file' onChange={(e) => this.onAvatarChange('mobile_header', e)} />
														</Form.Field>
													</Form>
													<label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.footer-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={footer.no_title} onChange={(val) => this.handleChange(val, 'no_footer_title')} />
													<Form.Input fluid label={translate('card.btn-name')} name='button' placeholder={translate('card.btn-name')} className='input-form' value={footer.no_button} onChange={(val) => this.handleChange(val, 'no_footer_button')} />
													<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={footer.no_description} onChange={(val) => this.handleChange(val, 'no_footer_description')} />
													<Form.Input fluid label={translate('card.link')} name='link' placeholder={translate('card.link')} className='input-form' value={footer.no_link} onChange={(val) => this.handleChange(val, 'no_footer_link')} />
													<Form.Input fluid label={translate('card.link-name')} name='link_name' placeholder={translate('card.link-name')} className='input-form' value={footer.no_link_name} onChange={(val) => this.handleChange(val, 'no_footer_link_name')} />
													<Form>
														<label>{translate('card.footer-img')}</label>
														<Form.Field>
															<input accept='image/*' type='file' id='footer-file' onChange={(e) => this.onAvatarChange('footer', e)} />
														</Form.Field>
													</Form>
													<label className='ui floated button save-btn' onClick={this.updateFooter.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.service-section')}</Card.Header>
												<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Collapse accordion={accordion} onChange={this.onServiceCollapseChange} activeKey={service_activeKey}>
														{services.map((item, i) => (
															<Panel header={item.no_title} key={i}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, 'no_service_title_' + i)} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, 'no_service_description_' + i)} />
																<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.handleChange(val, 'service_color_' + i)} />
																<Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={item.no_url} onChange={(val) => ref.handleChange(val, 'no_service_url_' + i)} />
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<Form>
																		<label>{translate('card.avatar-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='service-file' onChange={(e) => ref.onAvatarChange('service_avatar_' + i, e)} />
																		</Form.Field>
																	</Form>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='service-file' onChange={(e) => ref.onAvatarChange('service_backimage_' + i, e)} />
																		</Form.Field>
																	</Form>
																</div>
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateService(e, i)}> {translate('card.save')} </label>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteService(e, i)}> {translate('card.delete')} </label>
																</div>
															</Panel>
														))}
													</Collapse>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.badge-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Collapse accordion={accordion} onChange={this.onBadgeCollapseChange} activeKey={badge_activeKey}>
														{Object.keys(badges).map((key, i) => (
															<Panel header={badges[key].title} key={i}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={badges[key].no_title} onChange={(val) => ref.handleChange(val, key + '_no_title')} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={badges[key].no_description} onChange={(val) => ref.handleChange(val, key + '_no_description')} />
																<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={badges[key].color} onChange={(val) => ref.handleChange(val, key + '_color')} />
																<Form>
																	<label>{translate('card.image-upload')}</label>
																	<Form.Field>
																		<input accept='image/*' type='file' id='input-file' className='badge_avatar' onChange={(e) => ref.onAvatarChange(key, e)} />
																	</Form.Field>
																</Form>
																<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateBadge(e, key)}> {translate('card.save')} </label>
															</Panel>
														))}
													</Collapse>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.portfolio-section')}</Card.Header>
												<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddPortfolio(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													{Object.keys(portfolios).map((key, i) => (
														<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
															<p style={{ textTransform: 'uppercase', margin: 0 }}>{key}</p>
															<label onClick={(e) => ref.onDeletePortfolio(e, key)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
														</div>
													))}
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.review-section')}</Card.Header>
												<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddReview(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													{carousels.map((item, i) => (
														<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
															<p style={{ textTransform: 'uppercase', margin: 0 }}>{item.title}</p>
															<label onClick={(e) => ref.onDeleteReview(e, i)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
														</div>
													))}
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card className='header-section'>
											<Card.Content>
												<Card.Header>{translate('card.news-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Collapse accordion={accordion} onChange={this.onNewsCollapseChange} activeKey={news_activeKey}>
														{news.map((item, i) => (
															<Panel header={item.no_title} key={i}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, 'no_title' + i)} />
																<Form.Input fluid label={translate('card.author')} name='author' placeholder={translate('card.author')} className='input-form' value={item.author} onChange={(val) => ref.handleChange(val, 'author' + i)} />
																<Form.Input fluid label='Type' name='type' placeholder='type' className='input-form' value={item.no_type} onChange={(val) => ref.handleChange(val, 'no_type' + i)} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, 'no_description' + i)} />
																<Form.Input fluid label={translate('card.read')} name='read' placeholder={translate('card.read')} className='input-form' value={item.read} onChange={(val) => ref.handleChange(val, 'read' + i)} />
																<Form>
																	<label>{translate('card.image-upload')}</label>
																	<Form.Field>
																		<input accept='image/*' type='file' id='input-file' className='news_avatar' onChange={(e) => ref.onAvatarChange(i, e)} />
																	</Form.Field>
																</Form>
																<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateNews(e, i)}> {translate('card.save')} </label>
															</Panel>
														))}
													</Collapse>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
								</Grid>}
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