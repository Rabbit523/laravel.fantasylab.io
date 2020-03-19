import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form } from 'semantic-ui-react'
import { Translate, withLocalize } from "react-localize-redux"
import Collapse, { Panel } from 'rc-collapse'
import 'rc-collapse/assets/index.css'
import Http from '../../../Http'

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			reviews: [],
			isLoaded: false,
			accordion: false,
			activeKey: []
		}
		this.onAvatarChange = this.onAvatarChange.bind(this);
		this.onCollapseChange = this.onCollapseChange.bind(this);
	}

	componentDidMount() {
		Http.get('/api/front/get-reviews')
			.then(
				res => {
					this.setState({
						isLoaded: true,
						reviews: res.data
					});
				}
			).catch(err => {
				console.error(err);
			});
	}

	handleChange(event, type) {
		var { reviews } = this.state;
		const ref = this;
		reviews.map((item, index) => {
			var key = type.split('_')[0];
			if (item.id == key) {
				if (type.includes('description')) {
					if (ref.props.lang == 'en' || ref.props.lang == undefined) {
						var k = type.split('_')[1];
						item[k] = event.target.value;
					} else {
						var k = "no_" + type.split('_')[2];
						item[k] = event.target.value;
					}
				} else {
					var k = type.split('_')[1];
					item[k] = event.target.value;
				}
				ref.setState({ reviews });
			}
		});
	}

	onAvatarChange(type, e) {
		var { reviews } = this.state;
		const ref = this;

		var avatarFiles = document.getElementsByClassName('avatar-file');
		Object.keys(avatarFiles).map((key, index) => {
			if (avatarFiles[index].files && avatarFiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var sub_key = type.split('_')[0];
					reviews[sub_key].avatar = e.target.result;
					ref.setState({ reviews });
				}
				reader.readAsDataURL(avatarFiles[index].files[0]);
			}
		});

		var logoFiles = document.getElementsByClassName('logo-file');
		Object.keys(logoFiles).map((key, index) => {
			if (logoFiles[index].files && logoFiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var sub_key = type.split('_')[0];
					reviews[sub_key].logo_url = e.target.result;
					ref.setState({ reviews });
				}
				reader.readAsDataURL(logoFiles[index].files[0]);
			}
		});

		var backFiles = document.getElementsByClassName('back-file');
		Object.keys(backFiles).map((key, index) => {
			if (backFiles[index].files && backFiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var sub_key = type.split('_')[0];
					reviews[sub_key].back_url = e.target.result;
					ref.setState({ reviews });
				}
				reader.readAsDataURL(backFiles[index].files[0]);
			}
		});
	}

	onCollapseChange(activeKey) {
		this.setState({ activeKey });
	}
	// Update review
	onUpdate(e, type) {
		const { reviews } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-review', { data: reviews[type], id: reviews[type].id })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Create a review
	onCreate(e, type) {
		const { reviews } = this.state;
		if (reviews[type].title.trim() != "" && reviews[type].name.trim() != "") {
			this.setState({ isLoaded: false });
			Http.post('/api/admin/create-review', { data: reviews[type] })
				.then(
					res => {
						this.setState({ isLoaded: true, reviews: res.data });
					}
				).catch(err => {
					console.error(err);
				});
		}
	}
	// Add review item
	onAdd(e) {
		var { reviews } = this.state;
		var new_item = {
			title: "New Review",
			description: "",
			no_description: "",
			name: "",
			job: "",
			avatar: null,
			logo_url: null,
			back_url: null,
			id: reviews[reviews.length - 1].id + 1
		};
		reviews.push(new_item);
		this.setState({ reviews });
	}
	// Cancel review item
	onCancel(e, type) {
		var { reviews } = this.state;
		reviews.splice(type, 1);
		this.setState({ reviews });
	}
	// Delete review item
	onDelete(e, type) {
		const { reviews } = this.state;
		if (confirm("Are you sure to remove this review?")) {
			this.setState({ isLoaded: false });
			Http.post('/api/admin/delete-review', { id: reviews[type].id })
				.then(
					res => {
						this.setState({ isLoaded: true, reviews: res.data });
					}
				).catch(err => {
					console.error(err);
				});
		}
	}
	
	render() {
		const { isLoaded, reviews, activeKey, accordion } = this.state;
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
													<Card.Header>{translate('sidebar.reviews')}</Card.Header>
													<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Collapse accordion={accordion} onChange={this.onCollapseChange} activeKey={activeKey}>
															{Object.keys(reviews).map((key, i) => (
																<Panel header={reviews[key].title} key={i}>
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={reviews[key].title} onChange={(val) => ref.handleChange(val, reviews[key].id + '_title')} />
																	{lang == 'en' && <Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={reviews[key].description} onChange={(val) => ref.handleChange(val, reviews[key].id + '_description')} />}
																	{lang == 'nb' && <Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={reviews[key].no_description} onChange={(val) => ref.handleChange(val, reviews[key].id + '_no_description')} />}
																	<Form.Input fluid label={translate('card.name')} name='name' placeholder={translate('card.name')} className='input-form' value={reviews[key].name} onChange={(val) => ref.handleChange(val, reviews[key].id + '_name')} />
																	<Form.Input fluid label={translate('card.job')} name='job' placeholder={translate('card.job')} className='input-form' value={reviews[key].job} onChange={(val) => ref.handleChange(val, reviews[key].id + '_job')} />
																	<div style={{ display: 'flex' }}>
																		<Form style={{ width: '100%' }}>
																			<label>{translate('card.logo-img')}</label>
																			<Form.Field>
																				<input accept='image/*' type='file' id='input-file' className="logo-file" onChange={(e) => ref.onAvatarChange(i + '_logo', e)} />
																			</Form.Field>
																		</Form>
																		<Form style={{ width: '100%' }}>
																			<label>{translate('card.avatar-img')}</label>
																			<Form.Field>
																				<input accept='image/*' type='file' id='input-file' className="avatar-file" onChange={(e) => ref.onAvatarChange(i + '_avatar', e)} />
																			</Form.Field>
																		</Form>
																	</div>
																	<Form>
																		<label>{translate('card.background-img')}</label>
																		<Form.Field>
																			<input accept='image/*' type='file' id='input-file' className="back-file" onChange={(e) => ref.onAvatarChange(i + '_back', e)} />
																		</Form.Field>
																	</Form>
																	<div style={{ display: 'flex' }}>
																		{reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onUpdate(e, i)}> {translate('card.save')} </label>}
																		{reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onDelete(e, i)}> {translate('card.delete')} </label>}
																		{!reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCreate(e, i)}> {translate('card.create')} </label>}
																		{!reviews[key].created_at && <label className='ui floated button save-btn' onClick={(e) => ref.onCancel(e, i)}> {translate('card.cancel')} </label>}
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