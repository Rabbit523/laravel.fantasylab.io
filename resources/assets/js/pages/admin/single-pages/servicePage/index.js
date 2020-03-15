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
			page_name: '',
			list: [],
			reviews: {},
			technologies: {},
			translate_titles: {},
			starting: [],
			starting_title: "",
			no_starting_title: "",
			isLoaded: false,
			accordion: false,
			activeKey: [],
			process_activeKey: [],
			start_activeKey: []
		}
		this.onCollapseChange = this.onCollapseChange.bind(this);
		this.onCollapseProcessChange = this.onCollapseProcessChange.bind(this);
		this.onCollapseStartingChange = this.onCollapseStartingChange.bind(this);
	}

	componentDidMount() {
		const { pathname } = this.props.location;
		var page_name = pathname.split('/admin/single-page/')[1];
		this.setState({ page_name });

		Http.post('/api/front/get-page', { name: page_name })
			.then(
				res => {
					var list = JSON.parse(res.data.data);
					var reviews = {}, technologies = {}, estimation = [], starting = [], starting_title = "", no_starting_title = "", translate_titles = {};
					Object.keys(list).map(function (key, index) {
						if (key == "study") {
							reviews = list[key];
						} else if (key == "technologies") {
							technologies = list[key];
						} else if (key == "estimation") {
							estimation = list[key];
						} else if (key == 'starting') {
							starting = list[key].data;
							starting_title = list[key].start_title;
							no_starting_title = list[key].no_start_title;
						} else if (key == 'translate_titles') {
							translate_titles = list[key];
						}
					});
					this.setState({
						isLoaded: true,
						list,
						reviews,
						technologies,
						estimation,
						starting,
						starting_title,
						no_starting_title,
						translate_titles
					});
				}
			).catch(err => {
				console.error(err);
			});
	}

	handleChange(event, type) {
		var { list, reviews, technologies, estimation, starting, starting_title, no_starting_title, translate_titles } = this.state;
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
			case 'review_url':
				reviews.path = event.target.value;
				return this.setState({ reviews });
			case 'footer_title':
				list.footer_title = event.target.value;
				return this.setState({ list });
			case 'footer_description':
				list.footer_description = event.target.value;
				return this.setState({ list });
			case 'footer_button':
				list.footer_button = event.target.value;
				return this.setState({ list });
			case 'footer_link':
				list.footer_link = event.target.value;
				return this.setState({ list });
			case 'footer_link_name':
				list.footer_link_name = event.target.value;
				return this.setState({ list });
			case 'starting_title':
				starting_title = event.target.value;
				list.starting.start_title = starting_title;
				return this.setState({ starting_title, list });
			case 'no_starting_title':
				no_starting_title = event.target.value;
				list.starting.no_start_title = no_starting_title;
				return this.setState({ no_starting_title, list });
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
			case 'no_review_title':
				reviews.no_title = event.target.value;
				return this.setState({ reviews });
			case 'no_review_description':
				reviews.no_description = event.target.value;
				return this.setState({ reviews });
			case 'no_footer_title':
				list.no_footer_title = event.target.value;
				return this.setState({ list });
			case 'no_footer_description':
				list.no_footer_description = event.target.value;
				return this.setState({ list });
			case 'no_footer_button':
				list.no_footer_button = event.target.value;
				return this.setState({ list });
			case 'no_footer_link':
				list.no_footer_link = event.target.value;
				return this.setState({ list });
			case 'no_footer_link_name':
				list.no_footer_link_name = event.target.value;
				return this.setState({ list });
			case 'tech_title':
				translate_titles.tech = event.target.value;
				return this.setState({ translate_titles });
			case 'no_tech_title':
				translate_titles.no_tech = event.target.value;
				return this.setState({ translate_titles });
			case 'estimation_title':
				translate_titles.estimation = event.target.value;
				return this.setState({ translate_titles });
			case 'estimation_no_title':
				translate_titles.no_estimation = event.target.value;
				return this.setState({ translate_titles });
			case 'estimation_des':
				translate_titles.estimation_des = event.target.value;
				return this.setState({ translate_titles });
			case 'estimation_no_des':
				translate_titles.no_estimation_des = event.target.value;
				return this.setState({ translate_titles });
		}

		if (type.includes('icon')) {
			Object.keys(list.icons).map((key, i) => {
				var sub_key = type.split('icon')[1];
				if (ref.props.lang == 'en' || ref.props.lang == undefined) {
					list.icons[sub_key].text = event.target.value;
				} else {
					list.icons[sub_key].no_text = event.target.value;
				}
				ref.setState({ list });
			});
		}

		if (type.includes('start')) {
			var index = type.split('_')[0];
			if (type.includes('title') || type.includes('description')) {
				if (this.props.lang == 'en' || ref.props.lang == undefined) {
					var sub_key = type.split('_')[2];
					starting[index][sub_key] = event.target.value;
				} else {
					var sub_key = type.split('_')[1] + "_" + type.split('_')[3];
					starting[index][sub_key] = event.target.value;
				}
			} else {
				var sub_key = type.split('_')[2];
				starting[index][sub_key] = event.target.value;
			}
			ref.setState({ starting });
		}

		if (type.includes('estimation')) {
			if (type.includes('title') || type.includes('description')) {
				if (this.props.lang == 'en' || ref.props.lang == undefined) {
					var sub_key = type.split('_')[2];
					var key = type.split('_')[1];
					estimation[sub_key][key] = event.target.value;
				} else {
					var sub_key = type.split('_')[3];
					var key = type.split('_')[0] + "_" + type.split('_')[2];
					estimation[sub_key][key] = event.target.value;
				}
			} else {
				var sub_key = type.split('_')[2];
				var key = type.split('_')[1];
				estimation[sub_key][key] = event.target.value;
			}
			ref.setState({ estimation });
		}

		Object.keys(technologies).map((key, i) => {
			if (type.includes('tech') && type.includes(key)) {
				if (type.includes('title')) {
					technologies[key].lang = event.target.value;
					ref.setState({ technologies });
				} else if (type.includes('description')) {
					if (ref.props.lang == 'en' || ref.props.lang == undefined) {
						technologies[key].text = event.target.value;
					} else {
						technologies[key].no_text = event.target.value;
					}
					ref.setState({ technologies });
				}
			}
		});
	}
	onAvatarChange(type, e) {
		var { list, reviews, technologies, estimation, starting } = this.state;
		var ref = this;

		var infile = document.getElementById("input-file");
		if (infile.files && infile.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				if (type == 'header') {
					list.header_url = e.target.result; ref.setState({ list });
				} else {
					list.footer_url = e.target.result; ref.setState({ list });
				}
			}
			reader.readAsDataURL(infile.files[0]);
		}

		var footer_file = document.getElementById('footer-file');
		if (footer_file.files && footer_file.files[0]) {
			var reader = new FileReader();
			reader.onload = new FileReader();
			reader.onload = function (e) {
				if (type == 'footer') { list.footer_url = e.target.result; ref.setState({ list }); }
			}
			reader.readAsDataURL(footer_file.files[0]);
		}

		var review_files = document.getElementsByClassName('review-file');
		Object.keys(review_files).map((key, index) => {
			if (review_files[index].files && review_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
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

		var icon_files = document.getElementsByClassName('icon-file');
		Object.keys(icon_files).map((key, index) => {
			if (icon_files[index].files && icon_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if (type.includes('icon')) {
						var sub_key = type.split('icon')[1];
						list.icons[sub_key].icon = e.target.result;
						ref.setState({ list });
					}
				}
				reader.readAsDataURL(icon_files[index].files[0]);
			}
		});

		var tech_files = document.getElementsByClassName('tech-file');
		Object.keys(tech_files).map((key, index) => {
			if (tech_files[index].files && tech_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if (type.includes('tech')) {
						var sub_key = type.split('tech')[0];
						technologies[sub_key].icon = e.target.result;
						ref.setState({ technologies });
					}
				}
				reader.readAsDataURL(tech_files[index].files[0]);
			}
		});

		var estimation_files = document.getElementsByClassName('estimation-file');
		Object.keys(estimation_files).map((key, index) => {
			if (estimation_files[index].files && estimation_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if (type.includes('estimation')) {
						var sub_key = type.split('estimation')[1];
						estimation[sub_key].url = e.target.result;
						ref.setState({ estimation });
					}
				}
				reader.readAsDataURL(estimation_files[index].files[0]);
			}
		});

		var start_files = document.getElementsByClassName('start-file');
		Object.keys(start_files).map((key, index) => {
			if (start_files[index].files && start_files[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var index = type.split("_")[0];
					if (type.includes('start_backimage')) {
						starting[index].backimage = e.target.result;
						ref.setState({ starting });
					} else if (type.includes('start_url')) {
						starting[index].url = e.target.result;
						ref.setState({ starting });
					}
				}
				reader.readAsDataURL(start_files[index].files[0]);
			}
		});
	}

	onCollapseChange(activeKey) {
		this.setState({ activeKey });
	}
	onCollapseProcessChange(process_activeKey) {
		this.setState({ process_activeKey });
	}
	onCollapseStartingChange(start_activeKey) {
		this.setState({ start_activeKey });
	}

	onUpdateStartTitle(e) {
		var { list, page_name } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(list), type: 'start_title' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	onAddItem(e) {
		let { starting } = this.state;
		let new_item = {
			title: "",
			description: "",
			color: "",
			url: null,
			backimage: null
		};
		starting.push(new_item);
		this.setState({ starting });
	}
	onUpdateStartItem(e, index) {
		var { list, page_name, starting } = this.state;
		list.starting = starting;
		this.setState({ list });
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(list), type: 'start_update', id: index })
			.then(
				res => {
					this.setState({ isLoaded: true, list: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}
	onDeleteStartItem(e, index) {
		var { list, page_name } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(list), type: 'start_delete', id: index })
			.then(
				res => {
					this.setState({ isLoaded: true, starting: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}
	onDeleteStartImages(e, type) {
		var { list, page_name } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(list), type: 'start_delete_image', id: type.split("_")[0], key: type.split("_")[1] })
			.then(
				res => {
					this.setState({ isLoaded: true, starting: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update header section
	updateHeader() {
		var { list, page_name } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(list), type: 'header' })
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
		var { list, page_name } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(list), type: 'footer' })
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
		var { list, reviews, page_name } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'study') {
				list[key] = reviews;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(reviews), type: 'study' })
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
		var { list, technologies, page_name } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'technologies') {
				list[key] = technologies;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(technologies), type: 'tech', id: type })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Update technologies title
	onUpdateTechTitle(e, val) {
		var { list, translate_titles, page_name } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'translate_titles') {
				list[key] = translate_titles;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(translate_titles), type: 'tech_title' })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	//Update estimation section
	onUpdateProcessItem(e, type) {
		var { list, estimation, page_name } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'estimation') {
				list[key] = estimation;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(estimation), type: 'estimation', id: type })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	//Update estimation title
	onUpdateEstimationTitle(e, type) {
		var { list, translate_titles, page_name } = this.state;
		Object.keys(list).map((key, index) => {
			if (key == 'translate_titles') {
				list[key] = translate_titles;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: page_name, data: JSON.stringify(translate_titles), type: 'estimation_title' })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	render() {
		const { isLoaded, list, reviews, technologies, starting, starting_title, no_starting_title, estimation, accordion, activeKey, process_activeKey, start_activeKey, translate_titles } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		const ref = this;
		return (
			<Translate>
				{({ translate }) => (
					<div className="admin-page">
						{isLoaded ?
							<Segment vertical textAlign='center'>
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
													{Object.keys(list.icons).map((key, index) => (
														<div className="flex-form" key={index}>
															<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={list.icons[key].text} onChange={(val) => ref.handleChange(val, 'icon' + key)} />
															<Form.Field className="flex-item">
																<label>{translate('card.image')}</label>
																<input accept='image/*' type='file' className='icon-file' onChange={(e) => ref.onAvatarChange('icon' + key, e)} />
															</Form.Field>
														</div>
													))}
													<label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
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
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={list.footer_title} onChange={(val) => this.handleChange(val, 'footer_title')} />
													<Form.Input fluid label={translate('card.btn-name')} name='button' placeholder={translate('card.btn-name')} className='input-form' value={list.footer_button} onChange={(val) => this.handleChange(val, 'footer_button')} />
													<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={list.footer_description} onChange={(val) => this.handleChange(val, 'footer_description')} />
													<Form.Input fluid label={translate('card.link')} name='link' placeholder={translate('card.link')} className='input-form' value={list.footer_link} onChange={(val) => this.handleChange(val, 'footer_link')} />
													<Form.Input fluid label={translate('card.link-name')} name='link_name' placeholder={translate('card.link-name')} className='input-form' value={list.footer_link_name} onChange={(val) => this.handleChange(val, 'footer_link_name')} />
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
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.starting-section')}</Card.Header>
												<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddItem(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='start_title' placeholder={translate('card.title')} className='input-form' value={starting_title} onChange={(val) => ref.handleChange(val, 'starting_title')} />
													<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateStartTitle(e)}> {translate('card.save')} </label>
													<Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
														{starting.map((item, index) => (
															<Panel header={item.title} key={index}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, index + '_start_title')} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, index + '_start_description')} />
																<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.handleChange(val, index + '_start_color')} />
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<Form>
																		<label>{translate('card.icon-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="start-file" onChange={(e) => this.onAvatarChange(index + "_start_url", e)} />
																		</Form.Field>
																	</Form>
																	<label className='ui floated button delete-btn' onClick={(e) => ref.onDeleteStartImages(e, index + "_url")}> {translate('card.delete')} </label>
																</div>
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="start-file" onChange={(e) => this.onAvatarChange(index + "_start_backimage", e)} />
																		</Form.Field>
																	</Form>
																	<label className='ui floated button delete-btn' onClick={(e) => ref.onDeleteStartImages(e, index + "_backimage")}> {translate('card.delete')} </label>
																</div>
																<div style={{ display: 'flex' }}>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateStartItem(e, index)}> {translate('card.save')} </label>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteStartItem(e, index)}> {translate('card.delete')} </label>
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
												<Card.Header>{translate('card.review-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={reviews.title} onChange={(val) => this.handleChange(val, 'review_title')} />
													<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={reviews.description} onChange={(val) => this.handleChange(val, 'review_description')} />
													<Form.Input fluid label={translate('card.job')} name='job' placeholder={translate('card.job')} className="input-form" value={reviews.job} onChange={(val) => this.handleChange(val, 'review_job')} />
													<Form.Input fluid label="URL" name='url' placeholder='button url' className="input-form" value={reviews.path} onChange={(val) => this.handleChange(val, 'review_url')} />
													<Form>
														<label>{translate('card.background-img')}</label>
														<Form.Field>
															<input accept="image/*" type="file" className="review-file" onChange={(e) => this.onAvatarChange("back", e)} />
														</Form.Field>
													</Form>
													<Form>
														<label>{translate('card.avatar-img')}</label>
														<Form.Field>
															<input accept="image/*" type="file" className="review-file" onChange={(e) => this.onAvatarChange("avatar", e)} />
														</Form.Field>
													</Form>
													<label className="ui floated button save-btn" onClick={this.updateReview.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.technologies')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='tech_title' placeholder={translate('card.title')} className='input-form' value={translate_titles.tech} onChange={(val) => ref.handleChange(val, 'tech_title')} />
													<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateTechTitle(e)}> {translate('card.save')} </label>
													<Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
														{Object.keys(technologies).map((key, index) => (
															<Panel header={technologies[index].lang} key={key}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={technologies[index].lang} onChange={(val) => ref.handleChange(val, index + 'tech_title')} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={technologies[index].text} onChange={(val) => ref.handleChange(val, index + 'tech_description')} />
																<Form>
																	<label>{translate('card.icon-img')}</label>
																	<Form.Field>
																		<input accept="image/*" type="file" className="tech-file" onChange={(e) => this.onAvatarChange(index + "tech", e)} />
																	</Form.Field>
																</Form>
																<div style={{ display: 'flex' }}>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateTechItem(e, index)}> {translate('card.save')} </label>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteTechItem(e, index)}> {translate('card.delete')} </label>
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
												<Card.Header>{translate('card.process-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='estimation_title' placeholder={translate('card.title')} className='input-form' value={translate_titles.estimation} onChange={(val) => ref.handleChange(val, 'estimation_title')} />
													<Form.Input fluid label={translate('card.description')} name='estimation_des' placeholder={translate('card.title')} className='input-form' value={translate_titles.estimation_des} onChange={(val) => ref.handleChange(val, 'estimation_des')} />
													<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateEstimationTitle(e)}> {translate('card.save')} </label>
													<Collapse accordion={accordion} onChange={this.onCollapseProcessChange} activeKey={process_activeKey}>
														{estimation.map((item, i) => (
															<Panel header={item.title} key={i}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.handleChange(val, 'estimation_title_' + i)} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.handleChange(val, 'estimation_description_' + i)} />
																<Form>
																	<label>{translate('card.icon-img')}</label>
																	<Form.Field>
																		<input accept="image/*" type="file" className="estimation-file" onChange={(e) => this.onAvatarChange("estimation" + i, e)} />
																	</Form.Field>
																</Form>
																<div style={{ display: 'flex' }}>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateProcessItem(e, i)}> {translate('card.save')} </label>
																</div>
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
													{Object.keys(list.icons).map((key, index) => (
														<div className="flex-form" key={index}>
															<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={list.icons[key].no_text} onChange={(val) => ref.handleChange(val, 'no_icon' + key)} />
															<Form.Field className="flex-item">
																<label>{translate('card.image')}</label>
																<input accept='image/*' type='file' className='icon-file' onChange={(e) => ref.onAvatarChange('icon' + key, e)} />
															</Form.Field>
														</div>
													))}
													<label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
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
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={list.no_footer_title} onChange={(val) => this.handleChange(val, 'no_footer_title')} />
													<Form.Input fluid label={translate('card.btn-name')} name='button' placeholder={translate('card.btn-name')} className='input-form' value={list.no_footer_button} onChange={(val) => this.handleChange(val, 'no_footer_button')} />
													<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={list.no_footer_description} onChange={(val) => this.handleChange(val, 'no_footer_description')} />
													<Form.Input fluid label={translate('card.link')} name='link' placeholder={translate('card.link')} className='input-form' value={list.no_footer_link} onChange={(val) => this.handleChange(val, 'no_footer_link')} />
													<Form.Input fluid label={translate('card.link-name')} name='link_name' placeholder={translate('card.link-name')} className='input-form' value={list.no_footer_link_name} onChange={(val) => this.handleChange(val, 'no_footer_link_name')} />
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
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.starting-section')}</Card.Header>
												<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddItem(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='start_title' placeholder={translate('card.title')} className='input-form' value={no_starting_title} onChange={(val) => ref.handleChange(val, 'no_starting_title')} />
													<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateStartTitle(e)}> {translate('card.save')} </label>
													<Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
														{starting.map((item, index) => (
															<Panel header={item.no_title} key={index}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, index + '_no_start_title')} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, index + '_no_start_description')} />
																<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.handleChange(val, index + '_start_color')} />
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<Form>
																		<label>{translate('card.icon-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="start-file" onChange={(e) => this.onAvatarChange(index + "_start_url", e)} />
																		</Form.Field>
																	</Form>
																	<label className='ui floated button delete-btn' onClick={(e) => ref.onDeleteStartImages(e, index + "_url")}> {translate('card.delete')} </label>
																</div>
																<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="start-file" onChange={(e) => this.onAvatarChange(index + "_start_backimage", e)} />
																		</Form.Field>
																	</Form>
																	<label className='ui floated button delete-btn' onClick={(e) => ref.onDeleteStartImages(e, index + "_backimage")}> {translate('card.delete')} </label>
																</div>
																<div style={{ display: 'flex' }}>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateStartItem(e, index)}> {translate('card.save')} </label>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteStartItem(e, index)}> {translate('card.delete')} </label>
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
												<Card.Header>{translate('card.review-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={reviews.no_title} onChange={(val) => this.handleChange(val, 'no_review_title')} />
													<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={reviews.no_description} onChange={(val) => this.handleChange(val, 'no_review_description')} />
													<Form.Input fluid label={translate('card.job')} name='job' placeholder={translate('card.job')} className="input-form" value={reviews.job} onChange={(val) => this.handleChange(val, 'review_job')} />
													<Form.Input fluid label="URL" name='url' placeholder='button url' className="input-form" value={reviews.path} onChange={(val) => this.handleChange(val, 'review_url')} />
													<Form>
														<label>{translate('card.background-img')}</label>
														<Form.Field>
															<input accept="image/*" type="file" className="review-file" onChange={(e) => this.onAvatarChange("back", e)} />
														</Form.Field>
													</Form>
													<Form>
														<label>{translate('card.avatar-img')}</label>
														<Form.Field>
															<input accept="image/*" type="file" className="review-file" onChange={(e) => this.onAvatarChange("avatar", e)} />
														</Form.Field>
													</Form>
													<label className="ui floated button save-btn" onClick={this.updateReview.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.technologies')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='tech_title' placeholder={translate('card.title')} className='input-form' value={translate_titles.no_tech} onChange={(val) => ref.handleChange(val, 'no_tech_title')} />
													<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateTechTitle(e)}> {translate('card.save')} </label>
													<Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
														{Object.keys(technologies).map((key, index) => (
															<Panel header={technologies[index].lang} key={key}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={technologies[index].lang} onChange={(val) => ref.handleChange(val, index + 'tech_title')} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={technologies[index].no_text} onChange={(val) => ref.handleChange(val, index + 'no_tech_description')} />
																<Form>
																	<label>{translate('card.icon-img')}</label>
																	<Form.Field>
																		<input accept="image/*" type="file" className="tech-file" onChange={(e) => this.onAvatarChange(index + "tech", e)} />
																	</Form.Field>
																</Form>
																<div style={{ display: 'flex' }}>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateTechItem(e, index)}> {translate('card.save')} </label>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onDeleteTechItem(e, index)}> {translate('card.delete')} </label>
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
												<Card.Header>{translate('card.process-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='estimation_title' placeholder={translate('card.title')} className='input-form' value={translate_titles.no_estimation} onChange={(val) => ref.handleChange(val, 'estimation_no_title')} />
													<Form.Input fluid label={translate('card.description')} name='estimation_des' placeholder={translate('card.title')} className='input-form' value={translate_titles.no_estimation_des} onChange={(val) => ref.handleChange(val, 'estimation_no_des')} />
													<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateEstimationTitle(e)}> {translate('card.save')} </label>
													<Collapse accordion={accordion} onChange={this.onCollapseProcessChange} activeKey={process_activeKey}>
														{estimation.map((item, i) => (
															<Panel header={item.no_title} key={i}>
																<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.handleChange(val, 'no_estimation_title_' + i)} />
																<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.handleChange(val, 'no_estimation_description_' + i)} />
																<Form>
																	<label>{translate('card.icon-img')}</label>
																	<Form.Field>
																		<input accept="image/*" type="file" className="estimation-file" onChange={(e) => this.onAvatarChange("estimation" + i, e)} />
																	</Form.Field>
																</Form>
																<div style={{ display: 'flex' }}>
																	<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateProcessItem(e, i)}> {translate('card.save')} </label>
																</div>
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