import React from 'react'
import { Translate, withLocalize } from "react-localize-redux"
import { Grid, Dimmer, Segment, Loader, Card, Form, TextArea } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse'
import Http from '../../../../Http'

class Page extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			data: [],
			header: {},
			alert: [],
			consider: {},
			plans: {},
			questions: {},
			contact: {},
			queue: {},
			headerItem_activeKey: [],
			headerList_activeKey: [],
			headerListOption_activeKey: [],
			headerListItem_activeKey: [],
			alert_activeKey: [],
			alertItem_activeKey: [],
			consider_activeKey: [],
			plans_activeKey: [],
			question_activeKey: [],
			queue_activeKey: [],
			accordion: false,
			accordion1: false,
			accordion2: false,
		};
		this.onImageUpload = this.onImageUpload.bind(this);
		this.onHeaderItemCollapseChange = this.onHeaderItemCollapseChange.bind(this);
		this.onHeaderListCollapseChange = this.onHeaderListCollapseChange.bind(this);
		this.onHeaderListOptionsCollapseChange = this.onHeaderListOptionsCollapseChange.bind(this);
		this.onHeaderListItemsCollapseChange = this.onHeaderListItemsCollapseChange.bind(this);
		this.onAlertCollapseChange = this.onAlertCollapseChange.bind(this);
		this.onAlertItemCollapseChange = this.onAlertItemCollapseChange.bind(this);
		this.onConsiderCollapseChange = this.onConsiderCollapseChange.bind(this);
		this.onPlansCollapseChange = this.onPlansCollapseChange.bind(this);
		this.onQuestionCollapseChange = this.onQuestionCollapseChange.bind(this);
		this.onQueueCollapseChange = this.onQueueCollapseChange.bind(this);
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		Http.post(`${window.location.origin}/api/front/get-page`, { name: 'wp-service' }).then(
			res => {
				var header = {}, alert = {}, consider = {}, plans = {}, questions = {}, contact = {}, queue = {};
				var data = JSON.parse(res.data.data);
				Object.keys(data).map((key, index) => {
					if (key == 'header') {
						header = data[key];
					} else if (key == 'alert') {
						alert = data[key];
					} else if (key == 'consider') {
						consider = data[key];
					} else if (key == 'plans') {
						plans = data[key];
					} else if (key == 'questions') {
						questions = data[key];
					} else if (key == 'contact') {
						contact = data[key];
					} else if (key == 'queue') {
						queue = data[key];
					}
				});
				this.setState({
					isLoaded: true,
					data,
					header,
					alert,
					consider,
					plans,
					questions,
					contact,
					queue
				});
				window.scrollTo(0, 0);
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Collapse Event for header items
	onHeaderItemCollapseChange(headerItem_activeKey) {
		this.setState({ headerItem_activeKey });
	}
	onHeaderListCollapseChange(headerList_activeKey) {
		this.setState({ headerList_activeKey });
	}
	onHeaderListCollapseChange(headerList_activeKey) {
		this.setState({ headerList_activeKey });
	}
	onHeaderListItemsCollapseChange(headerListItem_activeKey) {
		this.setState({ headerListItem_activeKey });
	}
	onHeaderListOptionsCollapseChange(headerListOption_activeKey) {
		this.setState({ headerListOption_activeKey });
	}
	onAlertCollapseChange(alert_activeKey) {
		this.setState({ alert_activeKey });
	}
	onAlertItemCollapseChange(alertItem_activeKey) {
		this.setState({ alertItem_activeKey });
	}
	onConsiderCollapseChange(consider_activeKey) {
		this.setState({ consider_activeKey });
	}
	onPlansCollapseChange(plans_activeKey) {
		this.setState({ plans_activeKey });
	}
	onQuestionCollapseChange(question_activeKey) {
		this.setState({ question_activeKey });
	}
	onQueueCollapseChange(queue_activeKey) {
		this.setState({ queue_activeKey });
	}
	// Event for input fields change
	onHandleChange(event, type) {
		const { data, header, alert, consider, plans, questions, contact, queue } = this.state;

		switch (type) {
			case 'meta_title':
				data.meta_title = event.target.value;
				return this.setState({ data });
			case 'meta_description':
				data.meta_description = event.target.value;
				return this.setState({ data });
			case 'no_meta_title':
				data.no_meta_title = event.target.value;
				return this.setState({ data });
			case 'no_meta_description':
				data.no_meta_description = event.target.value;
				return this.setState({ data });
			case 'contact_title':
				contact.title = event.target.value;
				return this.setState({ contact });
			case 'contact_no_title':
				contact.no_title = event.target.value;
				return this.setState({ contact });
			case 'contact_des':
				contact.des = event.target.value;
				return this.setState({ contact });
			case 'contact_no_des':
				contact.no_des = event.target.value;
				return this.setState({ contact });
		}

		if (type.includes('header')) {
			const arr = type.split('_');
			if (type.includes('no')) {
				if (type.includes('list') && type.includes('option') && type.includes('item')) {
					var index0 = arr[1].split('list')[1];
					var index1 = arr[2].split('option')[1];
					var index2 = arr[3].split('item')[1];
					header.list.items[index0].options[index1].items[index2]['no_title'] = event.target.value;
				} else if (type.includes('list') && type.includes('option')) {
					var index0 = arr[1].split('list')[1];
					var index1 = arr[2].split('option')[1];
					header.list.items[index0].options[index1]['no_title'] = event.target.value;
				} else if (type.includes('list')) {
					if (type.includes('main')) {
						header.list.no_title = event.target.value;
					} else {
						var index = arr[1].split('list')[1];
						var key = arr[2];
						if (type.includes('btn')) {
							if (type.includes('name')) {
								key = 'btn_no_name';
							} else {
								key = 'btn_no_link';
							}
						} else {
							key = arr[2] + "_" + arr[3];
						}
						header.list.items[index][key] = event.target.value;
					}
				} else if (type.includes('check')) {
					var index = arr[1].split('check')[1];
					header.items[index]['no_title'] = event.target.value;
				} else {
					var key = arr[1] + "_" + arr[2];
					header[key] = event.target.value;	
				}
			} else {
				if (type.includes('list') && type.includes('option') && type.includes('item')) {
					var index0 = arr[1].split('list')[1];
					var index1 = arr[2].split('option')[1];
					var index2 = arr[3].split('item')[1];
					header.list.items[index0].options[index1].items[index2]['title'] = event.target.value;
				} else if (type.includes('list') && type.includes('option')) {
					var index0 = arr[1].split('list')[1];
					var index1 = arr[2].split('option')[1];
					header.list.items[index0].options[index1]['title'] = event.target.value;
				} else if (type.includes('list')) {
					if (type.includes('main')) {
						header.list.title = event.target.value;
					} else {
						var index = arr[1].split('list')[1];
						var key = arr[2];
						if (type.includes('btn')) {
							if (type.includes('name')) {
								key = 'btn_name';
							} else {
								key = 'btn_link';
							}
						} else {
							key = arr[2];
						}
						header.list.items[index][key] = event.target.value;
					}
				} else if (type.includes('check')) {
					var key = arr[2];
					var index = arr[1].split('check')[1];
					header.items[index][key] = event.target.value;
				} else {
					var key = arr[1];
					header[key] = event.target.value;	
				}
			}
			this.setState({ header });
		}

		if (type.includes('alert')) {
			const arr = type.split('_');
			if (type.includes('no')) {
				if (type.includes('list') && type.includes('item')) {
					var index0 = arr[1].split('list')[1];
					var index1 = arr[2].split('item')[1];
					alert.list[index0].items[index1]['no_text'] = event.target.value;
				} else if (type.includes('list')) {
					var index = arr[1].split('list')[1];
					var key = arr[2] + "_" + arr[3];
					alert.list[index][key] = event.target.value;
				} else {					
					var key = arr[1] + "_" + arr[2];
					alert[key] = event.target.value;
				}
			} else {
				if (type.includes('list') && type.includes('item')) {
					var index0 = arr[1].split('list')[1];
					var index1 = arr[2].split('item')[1];
					alert.list[index0].items[index1]['text'] = event.target.value;
				} else if (type.includes('list')) {
					var index = arr[1].split('list')[1];
					var key = arr[2];
					alert.list[index][key] = event.target.value;
				} else {					
					var key = arr[1];
					alert[key] = event.target.value;
				}
			}
			this.setState({ alert });
		}

		if (type.includes('consider')) {
			const arr = type.split("_");
			if (type.includes('no')) {
				if (type.includes('item')) {
					var index = arr[1].split('item')[1];
					var key = arr[2] + "_" + arr[3];
					consider.items[index][key] = event.target.value;
				} else {
					var key = arr[1] + "_" + arr[2];
					consider[key] = event.target.value;
				}
			} else {
				if (type.includes('item')) {
					var index = arr[1].split('item')[1];
					var key = arr[2];
					consider.items[index][key] = event.target.value;
				} else {
					var key = arr[1];
					consider[key] = event.target.value;
				}
			}
			this.setState({ consider });
		}

		if (type.includes('plans')) {
			const arr = type.split("_");
			if (type.includes('no')) {
				if (type.includes('item')) {
					var index = arr[1].split('item')[1];
					var key = arr[2] + "_" + arr[3];
					plans.items[index][key] = event.target.value;
				} else {
					var key = arr[1] + "_" + arr[2];
					plans[key] = event.target.value;
				}
			} else {
				if (type.includes('item')) {
					var index = arr[1].split('item')[1];
					var key = arr[2];
					plans.items[index][key] = event.target.value;
				} else {
					var key = arr[1];
					plans[key] = event.target.value;
				}
			}
			this.setState({ plans });
		}

		if (type.includes('questions')) {
			const arr = type.split("_");
			if (type.includes('no')) {
				if (type.includes('item')) {
					var index = arr[1].split('item')[1];
					var key = arr[2] + "_" + arr[3];
					questions.items[index][key] = event.target.value;
				} else {
					var key = arr[1] + "_" + arr[2];
					questions[key] = event.target.value;
				}
			} else {
				if (type.includes('item')) {
					var index = arr[1].split('item')[1];
					var key = arr[2];
					questions.items[index][key] = event.target.value;
				} else {
					var key = arr[1];
					questions[key] = event.target.value;
				}
			}
			this.setState({ questions });
		}

		if (type.includes('queue')) {
			const arr = type.split("_");
			if (type.includes('no')) {
				if (type.includes('item')) {
					var index = arr[1].split('item')[1];
					var key = arr[2] + "_" + arr[3];
					queue.list[index][key] = event.target.value;
				} else {
					var key = arr[1] + "_" + arr[2];
					queue[key] = event.target.value;
				}
			} else {
				if (type.includes('item')) {
					var index = arr[1].split('item')[1];
					var key = arr[2];
					queue.list[index][key] = event.target.value;
				} else {
					var key = arr[1];
					queue[key] = event.target.value;
				}
			}
			this.setState({ queue });
		}
	}
	// Event for image upload
	onImageUpload(type, e) {
		const { header, consider, plans, questions } = this.state;
		const ref = this;
		// Upload header images
		var Headerfiles = document.getElementsByClassName('header-file');
		Object.keys(Headerfiles).map((key, index) => {
			if (Headerfiles[index].files && Headerfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					const arr = type.split("_");
					if (type.includes('back')) {
						header.back_url = e.target.result;
						ref.setState({ header });
					} else if (type.includes('check')) {
						var index = arr[1].split('check')[1];
						header.items[index].path = e.target.result;
						ref.setState({ header });
					} else {
						var index = arr[1].split('list')[1];
						header.list.items[index].path = e.target.result;
						ref.setState({ header });
					}
				}
				reader.readAsDataURL(Headerfiles[index].files[0]);
			}
		});
		// Upload consider image
		var Considerfiles = document.getElementsByClassName('consider-file');
		Object.keys(Considerfiles).map((key, index) => {
			if (Considerfiles[index].files && Considerfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					const arr = type.split("_");
					var index = arr[1].split('item')[1];
					consider.items[index].url = e.target.result;
					ref.setState({ consider });
				}
				reader.readAsDataURL(Considerfiles[index].files[0]);
			}
		});
		// Upload plans image
		var Plansfiles = document.getElementsByClassName('plans-file');
		Object.keys(Plansfiles).map((key, index) => {
			if (Plansfiles[index].files && Plansfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					const arr = type.split("_");
					var index = arr[1].split('item')[1];
					plans.items[index].url = e.target.result;
					ref.setState({ plans });
				}
				reader.readAsDataURL(Plansfiles[index].files[0]);
			}
		});
		// Upload question image
		var Questionsfiles = document.getElementsByClassName('questions-file');
		Object.keys(Questionsfiles).map((key, index) => {
			if (Questionsfiles[index].files && Questionsfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					const arr = type.split("_");
					var index = arr[1].split('item')[1];
					questions.items[index].url = e.target.result;
					ref.setState({ questions });
				}
				reader.readAsDataURL(Questionsfiles[index].files[0]);
			}
		});
	}
	// Update title, description, meta title, meta description, header image and icons in the header
	updateHeader() {
		var { data, header } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'header') {
				data[key] = header;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'wp-service', data: JSON.stringify(data), type: 'header' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update Alert Section
	updateAlert() {
		var { data, alert } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'alert') {
				data[key] = alert;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'wp-service', data: JSON.stringify(alert), type: 'alert' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update Consider Section
	updateConsider() {
		var { data, consider } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'consider') {
				data[key] = consider;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'wp-service', data: JSON.stringify(consider), type: 'consider' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update Plan Section
	updatePlans() {
		var { data, plans } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'plans') {
				data[key] = plans;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'wp-service', data: JSON.stringify(plans), type: 'plans' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update Questions Section
	updateQuestions() {
		var { data, questions } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'questions') {
				data[key] = questions;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'wp-service', data: JSON.stringify(questions), type: 'questions' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update Contact Section
	updateContact() {
		var { data, contact } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'contact') {
				data[key] = contact;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'wp-service', data: JSON.stringify(contact), type: 'contact' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update Queue Section
	updateQueue() {
		var { data, queue } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'queue') {
				data[key] = queue;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'wp-service', data: JSON.stringify(queue), type: 'queue' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	render() {
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		const { isLoaded, accordion, accordion1, accordion2, data, header, headerItem_activeKey, headerList_activeKey, headerListOption_activeKey, headerListItem_activeKey, alert, alert_activeKey, alertItem_activeKey, consider, consider_activeKey, plans, plans_activeKey, questions, question_activeKey, contact, queue, queue_activeKey } = this.state;
		const ref = this;
		return (
			<Translate>
				{({ translate }) => (
					<React.Fragment>
						<div className="admin-page">
							{ isLoaded ? <Segment vertical textAlign='center'>
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
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={header.title} onChange={(val) => this.onHandleChange(val, 'header_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={header.description}
															onChange={(val) => this.onHandleChange(val, 'header_description')}
														/>
													</Form>
													<Form>
														<label>{translate('card.header-img')}</label>
														<Form.Field>
															<input accept="image/*" type="file" className="header-file" onChange={(e) => this.onImageUpload("header_back", e)} />
														</Form.Field>
													</Form>
													<label>{translate('card.check-items')}</label>
													<Collapse accordion={accordion} onChange={this.onHeaderItemCollapseChange} activeKey={headerItem_activeKey}>
														{header.items.map((item, index) => (
															<Panel header={item.title} key={index}>
																<div className="flex-form">
																	<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, `header_check${index}_title`)} />
																	<Form.Field className="flex-item">
																		<label>{translate('card.image')}</label>
																		<input accept='image/*' type='file' className='header-file' onChange={(e) => ref.onImageUpload(`header_check${index}`, e)} />
																	</Form.Field>
																</div>
															</Panel>
														))}
													</Collapse>
													<label>{translate('card.service-categories')}</label>
													<Form.Input fluid name='title' placeholder={translate('card.title')} className="input-form" value={header.list.title} onChange={(val) => this.onHandleChange(val, 'header_list_main_title')} />
													<Collapse accordion={accordion} onChange={this.onHeaderListCollapseChange} activeKey={headerList_activeKey}>
														{header.list.items.map((item, index) => (
															<Panel header={item.title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='text' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, `header_list${index}_title`)} />
																	<Form.Input fluid label={translate('card.description')} name='text' placeholder={translate('card.description')} className='input-form' value={item.des} onChange={(val) => ref.onHandleChange(val, `header_list${index}_des`)} />
																	<Form.Input fluid label={translate('card.cost')} name='text' placeholder={translate('card.cost')} className='input-form' value={item.cost} onChange={(val) => ref.onHandleChange(val, `header_list${index}_cost`)} />
																	<div className="flex-form">
																		<Form.Input fluid label={translate('card.btn_name')} name='text' placeholder={translate('card.btn_name')} className='input-form' value={item.btn_name} onChange={(val) => ref.onHandleChange(val, `header_list${index}_btn_name`)} />
																		<Form.Input fluid label={translate('card.btn_link')} name='text' placeholder={translate('card.btn_link')} className='input-form' value={item.btn_link} onChange={(val) => ref.onHandleChange(val, `header_list${index}_btn_link`)} />
																	</div>
																	<Form.Field className="flex-item">
																		<label>{translate('card.image')}</label>
																		<input accept='image/*' type='file' className='header-file' onChange={(e) => ref.onImageUpload(`header_list${index}`, e)} />
																	</Form.Field>
																	<label>{translate('card.options')}</label>
																	<Collapse accordion={accordion1} onChange={this.onHeaderListOptionsCollapseChange} activeKey={headerListOption_activeKey}>
																	{item.options.map((option, key) => (
																		<Panel header={option.title} key={key}>
																			<Form.Input fluid name='title' placeholder={translate('card.title')} className="input-form" value={option.title} onChange={(val) => this.onHandleChange(val, `header_list${index}_option${key}_title`)} />
																			<label>{translate('card.items')}</label>
																			<Collapse accordion={accordion2} onChange={this.onHeaderListItemsCollapseChange} activeKey={headerListItem_activeKey}>
																			{option.items.map((val, i) => (
																				<Panel header={val.title} key={i}>
																					<Form.Input fluid name='title' placeholder={translate('card.title')} className="input-form" value={val.title} onChange={(val) => this.onHandleChange(val, `header_list${index}_option${key}_item${i}_title`)} />
																				</Panel>
																			))}
																			</Collapse>
																		</Panel>
																	))}
																	</Collapse>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.alert-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={alert.title} onChange={(val) => this.onHandleChange(val, 'alert_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={alert.des}
															onChange={(val) => this.onHandleChange(val, 'alert_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onAlertCollapseChange} activeKey={alert_activeKey}>
														{alert.list.map((item, index) => (
															<Panel header={item.title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, `alert_list${index}_title`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.des}
																			onChange={(val) => this.onHandleChange(val, `alert_list${index}_des`)}
																		/>
																	</Form>
																	<label>{translate('card.items')}</label>
																	<Collapse accordion={accordion} onChange={this.onAlertItemCollapseChange} activeKey={alertItem_activeKey}>
																	{item.items.map((sel, key) => (
																		<Panel header={sel.text} key={key}>
																			<Form.Input fluid name='text' placeholder={translate('card.text')} className='input-form' value={sel.text} onChange={(val) => ref.onHandleChange(val, `alert_list${index}_item${key}_text`)} />
																		</Panel>
																	))}
																	</Collapse>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateAlert.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.consider-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={consider.title} onChange={(val) => this.onHandleChange(val, 'consider_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={consider.des}
															onChange={(val) => this.onHandleChange(val, 'consider_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onConsiderCollapseChange} activeKey={consider_activeKey}>
														{consider.items.map((item, index) => (
															<Panel header={item.title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={item.title} onChange={(val) => this.onHandleChange(val, `consider_item${index}_title`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.des}
																			onChange={(val) => this.onHandleChange(val, `consider_item${index}_des`)}
																		/>
																	</Form>
																	<Form>
																		<label>{translate('card.image-upload')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="consider-file" onChange={(e) => this.onImageUpload(`consider_item${index}`, e)} />
																		</Form.Field>
																	</Form>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateConsider.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.plan-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={plans.title} onChange={(val) => this.onHandleChange(val, 'plans_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={plans.des}
															onChange={(val) => this.onHandleChange(val, 'plans_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onPlansCollapseChange} activeKey={plans_activeKey}>
														{plans.items.map((item, index) => (
															<Panel header={item.title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={item.title} onChange={(val) => this.onHandleChange(val, `plans_item${index}_title`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.des}
																			onChange={(val) => this.onHandleChange(val, `plans_item${index}_des`)}
																		/>
																	</Form>
																	<Form>
																		<label>{translate('card.image-upload')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="plans-file" onChange={(e) => this.onImageUpload(`plans_item${index}`, e)} />
																		</Form.Field>
																	</Form>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updatePlans.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.question-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={questions.title} onChange={(val) => this.onHandleChange(val, 'questions_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={questions.des}
															onChange={(val) => this.onHandleChange(val, 'questions_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onQuestionCollapseChange} activeKey={question_activeKey}>
														{questions.items.map((item, index) => (
															<Panel header={item.title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={item.title} onChange={(val) => this.onHandleChange(val, `questions_item${index}_title`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.des}
																			onChange={(val) => this.onHandleChange(val, `questions_item${index}_des`)}
																		/>
																	</Form>
																	<Form>
																		<label>{translate('card.image-upload')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="questions-file" onChange={(e) => this.onImageUpload(`questions_item${index}`, e)} />
																		</Form.Field>
																	</Form>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateQuestions.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.contact-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={contact.title} onChange={(val) => this.onHandleChange(val, 'contact_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={contact.des}
															onChange={(val) => this.onHandleChange(val, 'contact_des')}
														/>
													</Form>
													<label className="ui floated button save-btn" onClick={this.updateContact.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.queue-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={queue.title} onChange={(val) => this.onHandleChange(val, 'queue_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={queue.des}
															onChange={(val) => this.onHandleChange(val, 'queue_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onQueueCollapseChange} activeKey={queue_activeKey}>
														{queue.list.map((item, index) => (
															<Panel header={item.ques} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={item.ques} onChange={(val) => this.onHandleChange(val, `queue_item${index}_ques`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.answ}
																			onChange={(val) => this.onHandleChange(val, `queue_item${index}_answ`)}
																		/>
																	</Form>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateQueue.bind(this)}> {translate('card.save')} </label>
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
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={header.no_title} onChange={(val) => this.onHandleChange(val, 'header_no_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={header.no_description}
															onChange={(val) => this.onHandleChange(val, 'header_no_description')}
														/>
													</Form>
													<Form>
														<label>{translate('card.header-img')}</label>
														<Form.Field>
															<input accept="image/*" type="file" className="header-file" onChange={(e) => this.onImageUpload("header_back", e)} />
														</Form.Field>
													</Form>
													<label>{translate('card.check-items')}</label>
													<Collapse accordion={accordion} onChange={this.onHeaderItemCollapseChange} activeKey={headerItem_activeKey}>
														{header.items.map((item, index) => (
															<Panel header={item.no_title} key={index}>
																<div className="flex-form">
																	<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, `header_check${index}_no_title`)} />
																	<Form.Field className="flex-item">
																		<label>{translate('card.image')}</label>
																		<input accept='image/*' type='file' className='header-file' onChange={(e) => ref.onImageUpload(`header_check${index}`, e)} />
																	</Form.Field>
																</div>
															</Panel>
														))}
													</Collapse>
													<label>{translate('card.service-categories')}</label>
													<Form.Input fluid name='title' placeholder={translate('card.title')} className="input-form" value={header.list.no_title} onChange={(val) => this.onHandleChange(val, 'header_list_main_no_title')} />
													<Collapse accordion={accordion} onChange={this.onHeaderListCollapseChange} activeKey={headerList_activeKey}>
														{header.list.items.map((item, index) => (
															<Panel header={item.no_title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='text' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, `header_list${index}_no_title`)} />
																	<Form.Input fluid label={translate('card.description')} name='text' placeholder={translate('card.description')} className='input-form' value={item.no_des} onChange={(val) => ref.onHandleChange(val, `header_list${index}_no_des`)} />
																	<Form.Input fluid label={translate('card.cost')} name='text' placeholder={translate('card.cost')} className='input-form' value={item.cost} onChange={(val) => ref.onHandleChange(val, `header_list${index}_cost`)} />
																	<div className="flex-form">
																		<Form.Input fluid label={translate('card.btn_name')} name='text' placeholder={translate('card.btn_name')} className='input-form' value={item.btn_no_name} onChange={(val) => ref.onHandleChange(val, `header_list${index}_btn_no_name`)} />
																		<Form.Input fluid label={translate('card.btn_link')} name='text' placeholder={translate('card.btn_link')} className='input-form' value={item.btn_no_link} onChange={(val) => ref.onHandleChange(val, `header_list${index}_btn_no_link`)} />
																	</div>
																	<Form.Field className="flex-item">
																		<label>{translate('card.image')}</label>
																		<input accept='image/*' type='file' className='header-file' onChange={(e) => ref.onImageUpload(`header_list${index}`, e)} />
																	</Form.Field>
																	<label>{translate('card.options')}</label>
																	<Collapse accordion={accordion1} onChange={this.onHeaderListOptionsCollapseChange} activeKey={headerListOption_activeKey}>
																	{item.options.map((option, key) => (
																		<Panel header={option.no_title} key={key}>
																			<Form.Input fluid name='title' placeholder={translate('card.title')} className="input-form" value={option.no_title} onChange={(val) => this.onHandleChange(val, `header_list${index}_option${key}_no_title`)} />
																			<label>{translate('card.items')}</label>
																			<Collapse accordion={accordion2} onChange={this.onHeaderListItemsCollapseChange} activeKey={headerListItem_activeKey}>
																			{option.items.map((val, i) => (
																				<Panel header={val.no_title} key={i}>
																					<Form.Input fluid name='title' placeholder={translate('card.title')} className="input-form" value={val.no_title} onChange={(val) => this.onHandleChange(val, `header_list${index}_option${key}_item${i}_no_title`)} />
																				</Panel>
																			))}
																			</Collapse>
																		</Panel>
																	))}
																	</Collapse>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.alert-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={alert.no_title} onChange={(val) => this.onHandleChange(val, 'alert_no_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={alert.no_des}
															onChange={(val) => this.onHandleChange(val, 'alert_no_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onAlertCollapseChange} activeKey={alert_activeKey}>
														{alert.list.map((item, index) => (
															<Panel header={item.no_title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, `alert_list${index}_no_title`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.no_des}
																			onChange={(val) => this.onHandleChange(val, `alert_list${index}_no_des`)}
																		/>
																	</Form>
																	<label>{translate('card.items')}</label>
																	<Collapse accordion={accordion} onChange={this.onAlertItemCollapseChange} activeKey={alertItem_activeKey}>
																	{item.items.map((sel, key) => (
																		<Panel header={sel.no_text} key={key}>
																			<Form.Input fluid name='text' placeholder={translate('card.text')} className='input-form' value={sel.no_text} onChange={(val) => ref.onHandleChange(val, `alert_list${index}_item${key}_no_text`)} />
																		</Panel>
																	))}
																	</Collapse>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateAlert.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.consider-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={consider.no_title} onChange={(val) => this.onHandleChange(val, 'consider_no_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={consider.no_des}
															onChange={(val) => this.onHandleChange(val, 'consider_no_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onConsiderCollapseChange} activeKey={consider_activeKey}>
														{consider.items.map((item, index) => (
															<Panel header={item.no_title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={item.no_title} onChange={(val) => this.onHandleChange(val, `consider_item${index}_no_title`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.no_des}
																			onChange={(val) => this.onHandleChange(val, `consider_item${index}_no_des`)}
																		/>
																	</Form>
																	<Form>
																		<label>{translate('card.image-upload')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="consider-file" onChange={(e) => this.onImageUpload(`consider_item${index}`, e)} />
																		</Form.Field>
																	</Form>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateConsider.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.plan-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={plans.no_title} onChange={(val) => this.onHandleChange(val, 'plans_no_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={plans.no_des}
															onChange={(val) => this.onHandleChange(val, 'plans_no_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onPlansCollapseChange} activeKey={plans_activeKey}>
														{plans.items.map((item, index) => (
															<Panel header={item.no_title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={item.no_title} onChange={(val) => this.onHandleChange(val, `plans_item${index}_no_title`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.no_des}
																			onChange={(val) => this.onHandleChange(val, `plans_item${index}_no_des`)}
																		/>
																	</Form>
																	<Form>
																		<label>{translate('card.image-upload')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="plans-file" onChange={(e) => this.onImageUpload(`plans_item${index}`, e)} />
																		</Form.Field>
																	</Form>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updatePlans.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.question-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={questions.no_title} onChange={(val) => this.onHandleChange(val, 'questions_no_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={questions.no_des}
															onChange={(val) => this.onHandleChange(val, 'questions_no_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onQuestionCollapseChange} activeKey={question_activeKey}>
														{questions.items.map((item, index) => (
															<Panel header={item.no_title} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={item.no_title} onChange={(val) => this.onHandleChange(val, `questions_item${index}_no_title`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.no_des}
																			onChange={(val) => this.onHandleChange(val, `questions_item${index}_no_des`)}
																		/>
																	</Form>
																	<Form>
																		<label>{translate('card.image-upload')}</label>
																		<Form.Field>
																			<input accept="image/*" type="file" className="questions-file" onChange={(e) => this.onImageUpload(`questions_item${index}`, e)} />
																		</Form.Field>
																	</Form>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateQuestions.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.contact-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={contact.no_title} onChange={(val) => this.onHandleChange(val, 'contact_no_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={contact.no_des}
															onChange={(val) => this.onHandleChange(val, 'contact_no_des')}
														/>
													</Form>
													<label className="ui floated button save-btn" onClick={this.updateContact.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
									<Grid.Column computer={8}>
										<Card>
											<Card.Content>
												<Card.Header>{translate('card.queue-section')}</Card.Header>
											</Card.Content>
											<Card.Content>
												<Card.Description>
													<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={queue.no_title} onChange={(val) => this.onHandleChange(val, 'queue_no_title')} />
													<Form>
														<label>{translate('card.description')}</label>
														<TextArea
															placeholder={translate('card.description-place')}
															value={queue.no_des}
															onChange={(val) => this.onHandleChange(val, 'queue_no_des')}
														/>
													</Form>
													<label>{translate('card.items')}</label>
													<Collapse accordion={accordion} onChange={this.onQueueCollapseChange} activeKey={queue_activeKey}>
														{queue.list.map((item, index) => (
															<Panel header={item.no_ques} key={index}>
																<div className="admin-form-group">
																	<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className="input-form" value={item.no_ques} onChange={(val) => this.onHandleChange(val, `queue_item${index}_no_ques`)} />
																	<Form>
																		<label>{translate('card.description')}</label>
																		<TextArea
																			placeholder={translate('card.description-place')}
																			value={item.no_answ}
																			onChange={(val) => this.onHandleChange(val, `queue_item${index}_no_answ`)}
																		/>
																	</Form>
																</div>
															</Panel>
														))}
													</Collapse>
													<label className="ui floated button save-btn" onClick={this.updateQueue.bind(this)}> {translate('card.save')} </label>
												</Card.Description>
											</Card.Content>
										</Card>
									</Grid.Column>
								</Grid>}
							</Segment>
							: <Segment className='page-loader'>
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