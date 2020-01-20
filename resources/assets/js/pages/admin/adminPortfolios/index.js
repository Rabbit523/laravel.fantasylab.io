import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import Collapse, { Panel } from 'rc-collapse'
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
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		if (lang == 'en') {
			portfolios[type.split('_')[0]][type.split('_')[1]] = event.target.value;
		} else {
			var key = type.split('_')[1] + "_" + type.split('_')[2];
			portfolios[type.split('_')[0]][key] = event.target.value;
		}
		this.setState({ portfolios });
	}

	onAvatarChange(type, e) {
		var { portfolios } = this.state;
		const ref = this;

		var infile = document.getElementById('input-file');
		if (infile.files && infile.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				portfolios.map((item, index) => {
					if (item.id == type.split('_')[0]) {
						item.avatar = e.target.result;
						ref.setState({ portfolios });
					}
				});
			}
			reader.readAsDataURL(infile.files[0]);
		}

		var backFiles = document.getElementsByClassName('service_back');
		Object.keys(backFiles).map((key, index) => {
			if (backFiles[index].files && backFiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var sub_key = type.split('_')[0];
					portfolios[sub_key].back_url = e.target.result;
					ref.setState({ portfolios });
				}
				reader.readAsDataURL(backFiles[index].files[0]);
			}
		});

		var backFiles = document.getElementsByClassName('service_avatar');
		Object.keys(backFiles).map((key, index) => {
			if (backFiles[index].files && backFiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var sub_key = type.split('_')[0];
					portfolios[sub_key].avatar = e.target.result;
					ref.setState({ portfolios });
				}
				reader.readAsDataURL(backFiles[index].files[0]);
			}
		});
	}

	onCollapseChange(activeKey) {
		this.setState({ activeKey });
	}
	// Update a portfolio
	onUpdate(e, type) {
		const { portfolios } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-portfolio', { data: portfolios[type], id: portfolios[type].id })
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
		if (portfolios[type].title.trim() != "" && portfolios[type].description.trim() != "" && portfolios[type].type.trim() != "" && portfolios[type].avatar.trim() != "") {
			this.setState({ isLoaded: false });
			Http.post('/api/admin/create-portfolio', { data: portfolios[type], id: type })
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
	onAdd(e) {
		var { portfolios } = this.state;
		var new_item = {
			title: "New Portfolio",
			no_title: "",
			description: "",
			no_description: "",
			type: "",
			avatar: null,
			url: '',
			id: portfolios.length + 1
		};
		portfolios.push(new_item);
		this.setState({ portfolios });
	}
	// Cancel a portfolio
	onCancel(e, type) {
		var { portfolios } = this.state;
		portfolios.splice(type - 1, 1);
		this.setState({ portfolios });
	}
	// Delete a portfolio
	onDelete(e, type) {
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
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		const ref = this;
		return (
			<Translate>
				{({ translate }) => (
					<div className='admin-page'>
						{isLoaded ?
							<Segment vertical textAlign='center'>
								<Container>
									<Grid padded='vertically'>
										<Grid.Column width={16}>
											<Card className='header-section'>
												<Card.Content>
													<Card.Header>{translate('navigation.portfolio')}</Card.Header>
													<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
															{lang == 'en' && Object.keys(portfolios).map((key, i) => (
																<Panel header={portfolios[key].title} key={i}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={portfolios[key].title} onChange={(val) => ref.handleChange(val, i + '_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={portfolios[key].description} onChange={(val) => ref.handleChange(val, i + '_description')} />
																	<Form.Input fluid label='type' name='type' placeholder='type' className='input-form' value={portfolios[key].type} onChange={(val) => ref.handleChange(val, i + '_type')} />
																	<Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={portfolios[key].url} onChange={(val) => ref.handleChange(val, i + '_url')} />
																	<Form>
																		<label>{translate('card.logo-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' id='input-file' className='service_avatar' onChange={(e) => ref.onAvatarChange(i + '_avatar', e)} />
																		</Form.Field>
																	</Form>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='service_back' onChange={(e) => ref.onAvatarChange(i + '_back', e)} />
																		</Form.Field>
																	</Form>
																	<div style={{ display: 'flex' }}>
																		{portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onUpdate(e, i)}> {translate('card.save')} </label>}
																		{portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onDelete(e, portfolios[key].id)}> {translate('card.delete')} </label>}
																		{!portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCreate(e, i)}> {translate('card.create')} </label>}
																		{!portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCancel(e, i)}> {translate('card.cancel')} </label>}
																		{!portfolios[key].data && <Label className='ui floated button save-btn' as={Link} to={{ pathname: '/admin/single-page/single_portfolio', state: { page: `${portfolios[key].type}` } }}> {translate('card.create-cms')} </Label>}
																		{portfolios[key].data && <Label className='ui floated button save-btn' as={Link} to={{ pathname: '/admin/single-page/single_portfolio', state: { page: `${portfolios[key].type}` } }}> {translate('card.edit-cms')} </Label>}
																	</div>
																</Panel>
															))}
															{lang == 'nb' && Object.keys(portfolios).map((key, i) => (
																<Panel header={portfolios[key].no_title} key={i}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={portfolios[key].no_title} onChange={(val) => ref.handleChange(val, i + '_no_title')} />
																	<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={portfolios[key].no_description} onChange={(val) => ref.handleChange(val, i + '_no_description')} />
																	<Form.Input fluid label='type' name='type' placeholder='type' className='input-form' value={portfolios[key].type} onChange={(val) => ref.handleChange(val, i + '_type')} />
																	<Form.Input fluid label='URL' name='url' placeholder='url' className='input-form' value={portfolios[key].url} onChange={(val) => ref.handleChange(val, i + '_url')} />
																	<Form>
																		<label>{translate('card.logo-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' id='input-file' className='service_avatar' onChange={(e) => ref.onAvatarChange(i + '_avatar', e)} />
																		</Form.Field>
																	</Form>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' className='service_back' onChange={(e) => ref.onAvatarChange(i + '_back', e)} />
																		</Form.Field>
																	</Form>
																	<div style={{ display: 'flex' }}>
																		{portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onUpdate(e, i)}> {translate('card.save')} </label>}
																		{portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onDelete(e, portfolios[key].id)}> {translate('card.delete')} </label>}
																		{!portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCreate(e, i)}> {translate('card.create')} </label>}
																		{!portfolios[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCancel(e, i)}> {translate('card.cancel')} </label>}
																		{!portfolios[key].data && <Label className='ui floated button save-btn' as={Link} to={{ pathname: '/admin/single-page/single_portfolio', state: { page: `${portfolios[key].type}` } }}> {translate('card.create-cms')} </Label>}
																		{portfolios[key].data && <Label className='ui floated button save-btn' as={Link} to={{ pathname: '/admin/single-page/single_portfolio', state: { page: `${portfolios[key].type}` } }}> {translate('card.edit-cms')} </Label>}
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