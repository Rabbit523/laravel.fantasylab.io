import React from 'react'
import { Translate, withLocalize } from "react-localize-redux"
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, TextArea, Button } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse'
import Http from '../../../../Http'

class Page extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			data: [],
			header: {},
			icons: [],
			plans: {},
			plan_activeKey: [],
			accordion: false,
		};
		this.onImageUpload = this.onImageUpload.bind(this);
		this.onPlanCollapseChange = this.onPlanCollapseChange.bind(this);
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		Http.post(`${window.location.origin}/api/front/get-page`, { name: 'hosting' }).then(
			res => {
				var icons = [], plans = {};
				var data = JSON.parse(res.data.data);
				console.log(JSON.parse(res.data.data));
				Object.keys(data).map((key, index) => {
					if (key == 'icons') {
						icons = data[key];
					} if (key == 'plans') {
						plans = data[key];
					}
				});
				this.setState({
					isLoaded: true,
					data,
					icons,
					plans
				});
				window.scrollTo(0, 0);
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Event for input fields change
	onHandleChange(event, type) {
		const { data, icons, plans } = this.state;

		console.log(type);
		switch (type) {
			case 'meta_title':
				data.meta_title = event.target.value;
				return this.setState({ data });
			case 'meta_description':
				data.meta_description = event.target.value;
				return this.setState({ data });
			case 'header_title':
				data.title = event.target.value;
				return this.setState({ data });
			case 'header_description':
				data.description = event.target.value;
				return this.setState({ data });
			case 'plan_title':
				plans.title = event.target.value;
				return this.setState({ plans });
			case 'no_meta_title':
				data.no_meta_title = event.target.value;
				return this.setState({ data });
			case 'no_meta_description':
				data.no_meta_description = event.target.value;
				return this.setState({ data });
			case 'no_header_title':
				data.no_title = event.target.value;
				return this.setState({ data });
			case 'no_header_description':
				data.no_description = event.target.value;
				return this.setState({ data });
			case 'no_plan_title':
				plans.no_title = event.target.value;
				return this.setState({ plans });
		}

		if (type.includes('icon')) {
			if (type.includes('no')) {
				var index = type.split('_')[2];
				icons[index].no_text = event.target.value;
				this.setState({ icons });
			} else {
				var index = type.split('_')[1];
				icons[index].text = event.target.value;
				this.setState({ icons });
			}
		}

		if (type.includes('plan') && !type.includes('main')) {
			if (type.includes('no')) {
				if (!type.includes('option')) {
					var index = type.split('_')[3];
					var key = "no_"+type.split('_')[2];
					plans.data[index][key] = event.target.value;
					this.setState({ plans });
				} else {
					var temp = type.split('_')[1];
					var index = temp.split('plan')[1];
					var sub_index = type.split('_')[4];
					var key = "no_"+type.split('_')[3];
					plans.data[index]['options'][sub_index][key] = event.target.value;
					this.setState({ plans });
				}
			} else {
				if (!type.includes('option')) {
					var index = type.split('_')[2];
					var key = type.split('_')[1];
					plans.data[index][key] = event.target.value;
					this.setState({ plans });
				} else {
					var temp = type.split('_')[0];
					var index = temp.split('plan')[1];
					var sub_index = type.split('_')[3];
					var key = type.split('_')[2];
					plans.data[index]['options'][sub_index][key] = event.target.value;
					this.setState({ plans });
				}
			}
		}
	}
	// Event for image upload
	onImageUpload(type, e) {
		const { data, icons, plans } = this.state;
		const ref = this;

		console.log(type);
		// Upload header background image
		var Headerfiles = document.getElementsByClassName('header-file');
		Object.keys(Headerfiles).map((key, index) => {
			if (Headerfiles[index].files && Headerfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if (type.includes('header')) {
						data.back_url = e.target.result;
						ref.setState({ data });
					}
				}
				reader.readAsDataURL(Headerfiles[index].files[0]);
			}
		});
		// Upload header background image
		var Iconfiles = document.getElementsByClassName('icon-file');
		Object.keys(Iconfiles).map((key, index) => {
			if (Iconfiles[index].files && Iconfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if (type.includes('icon')) {
						var index = type.split('_')[1];
						icons[index].icon = e.target.result;
						ref.setState({ icons });
					}
				}
				reader.readAsDataURL(Iconfiles[index].files[0]);
			}
		});
		// Upload header background image
		var Planfiles = document.getElementsByClassName('plan-file');
		Object.keys(Planfiles).map((key, index) => {
			if (Planfiles[index].files && Planfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if (type.includes('plan_avatar')) {
						var index = type.split('_')[2];
						plans.data[index].url = e.target.result;
						ref.setState({ plans });
					} else {
						console.log("it's not plan file");
					}
				}
				reader.readAsDataURL(Planfiles[index].files[0]);
			}
		});
	}
	// Collapse Event for plan items
	onPlanCollapseChange(plan_activeKey) {
		this.setState({ plan_activeKey });
	}
	// Update title, description, meta title, meta description, header image and icons in the header
	updateHeader() {
		var { data, icons } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'icons') {
				data[key] = icons;
				ref.setState({ data });
			}
		});
		console.log(data);
	}
	// Update plans
	onUpdatePlan() {
		var { data, plans } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'plans') {
				data[key] = plans;
				ref.setState({ data });
			}
		});
		console.log(data);
	}
	render() {
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		const { isLoaded, accordion, data, icons, plans, plan_activeKey } = this.state;
		const ref = this;
		return (
			<Translate>
				{({ translate }) => (
					<React.Fragment>
						<div className="admin-page">
							{
								isLoaded ?
									<Segment vertical textAlign='center'>
										{lang == 'en' && <Grid>
											<Grid.Column computer={8}>
												<Card>
													<Card.Content>
														<Card.Header>{translate('card.header-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={data.meta_title} onChange={(val) => this.onHandleChange(val, 'meta_title')} />
															<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={data.meta_description} onChange={(val) => this.onHandleChange(val, 'meta_description')} />
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={data.title} onChange={(val) => this.onHandleChange(val, 'header_title')} />
															<Form>
																<label>{translate('card.description')}</label>
																<TextArea
																	placeholder={translate('card.description-place')}
																	value={data.description}
																	onChange={(val) => this.onHandleChange(val, 'header_description')}
																/>
															</Form>
															<Form>
																<label>{translate('card.header-img')}</label>
																<Form.Field>
																	<input accept="image/*" type="file" className="header-file" onChange={(e) => this.onImageUpload("header", e)} />
																</Form.Field>
															</Form>
															{icons.map((item, index) => (
																<div className="flex-form" key={index}>
																	<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={item.text} onChange={(val) => ref.onHandleChange(val, 'icon_' + index)} />
																	<Form.Field className="flex-item">
																		<label>{translate('card.image')}</label>
																		<input accept='image/*' type='file' className='icon-file' onChange={(e) => ref.onImageUpload('icon_' + index, e)} />
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
														<Card.Header>{translate('card.plan-section')}</Card.Header>
														<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Collapse accordion={accordion} onChange={this.onPlanCollapseChange} activeKey={plan_activeKey}>
																{plans.data.map((item, i) => (
																	<Panel header={item.title} key={i}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'plan_title_' + i)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.onHandleChange(val, 'plan_description_' + i)} />
																		<Form.Input fluid label={translate('card.cost')} name='cost' placeholder={translate('card.cost')} className='input-form' value={item.cost} onChange={(val) => ref.onHandleChange(val, 'plan_cost_' + i)} />
																		<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.onHandleChange(val, 'plan_color_' + i)} />
																		<Form>
																			<label>{translate('card.avatar-img')}</label>
																			<Form.Field>
																				<input accept='image/*' type='file' className='plan-file' onChange={(e) => ref.onImageUpload('plan_avatar_' + i, e)} />
																			</Form.Field>
																		</Form>
																		{
																			item.options.map((option, index) => (
																				<div className="flex-form" key={index}>
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={option.title} onChange={(val) => ref.onHandleChange(val, 'plan'+i + '_option_title_' + index)} />
																					<Form.Input fluid label={translate('card.info')} name='info' placeholder={translate('card.info')} className='input-form' value={option.info} onChange={(val) => ref.onHandleChange(val, 'plan'+i+'_option_info_' + index)} />
																				</div>
																			))
																		}
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdatePlan(e, i)}> {translate('card.save')} </label>
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
															<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={data.no_meta_title} onChange={(val) => this.onHandleChange(val, 'no_meta_title')} />
															<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={data.no_meta_description} onChange={(val) => this.onHandleChange(val, 'no_meta_description')} />
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={data.no_title} onChange={(val) => this.onHandleChange(val, 'no_header_title')} />
															<Form>
																<label>{translate('card.description')}</label>
																<TextArea
																	placeholder={translate('card.description-place')}
																	value={data.no_description}
																	onChange={(val) => this.onHandleChange(val, 'no_header_description')}
																/>
															</Form>
															<Form>
																<label>{translate('card.header-img')}</label>
																<Form.Field>
																	<input accept="image/*" type="file" className="header-file" onChange={(e) => this.onImageUpload("header", e)} />
																</Form.Field>
															</Form>
															{icons.map((item, index) => (
																<div className="flex-form" key={index}>
																	<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={item.no_text} onChange={(val) => ref.onHandleChange(val, 'no_icon_' + index)} />
																	<Form.Field className="flex-item">
																		<label>{translate('card.image')}</label>
																		<input accept='image/*' type='file' className='icon-file' onChange={(e) => ref.onImageUpload('icon_' + index, e)} />
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
														<Card.Header>{translate('card.plan-section')}</Card.Header>
														<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAddService(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Collapse accordion={accordion} onChange={this.onPlanCollapseChange} activeKey={plan_activeKey}>
																{plans.data.map((item, i) => (
																	<Panel header={item.no_title} key={i}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, 'no_plan_title_' + i)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.onHandleChange(val, 'no_plan_description_' + i)} />
																		<Form.Input fluid label={translate('card.cost')} name='cost' placeholder={translate('card.cost')} className='input-form' value={item.cost} onChange={(val) => ref.onHandleChange(val, 'plan_cost_' + i)} />
																		<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.onHandleChange(val, 'plan_color_' + i)} />
																		<Form>
																			<label>{translate('card.avatar-img')}</label>
																			<Form.Field>
																				<input accept='image/*' type='file' className='plan-file' onChange={(e) => ref.onImageUpload('plan_avatar_' + i, e)} />
																			</Form.Field>
																		</Form>
																		{
																			item.options.map((option, index) => (
																				<div className="flex-form" key={index}>
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={option.no_title} onChange={(val) => ref.onHandleChange(val, 'no_plan'+i + '_option_title_' + index)} />
																					<Form.Input fluid label={translate('card.info')} name='info' placeholder={translate('card.info')} className='input-form' value={option.no_info} onChange={(val) => ref.onHandleChange(val, 'no_plan'+i+'_option_info_' + index)} />
																				</div>
																			))
																		}
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdatePlan(e, i)}> {translate('card.save')} </label>
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
					</React.Fragment>
				)}
			</Translate>
		)
	}
}

export default withLocalize(Page);