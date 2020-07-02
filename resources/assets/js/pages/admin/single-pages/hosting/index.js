import React from 'react'
import { Translate, withLocalize } from "react-localize-redux"
import { Grid, Dimmer, Segment, Loader, Card, Form, Icon, TextArea } from 'semantic-ui-react'
import Collapse, { Panel } from 'rc-collapse'
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-nb-NO';
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
			deploys: {},
			manage: {},
			scale: {},
			features: {},
			contact: {},
			queue: {},
			plan_activeKey: [],
			deploy_activeKey: [],
			deploy_sub_activeKey: [],
			manage_activeKey: [],
			scale_activeKey: [],
			feature_activeKey: [],
			queue_activeKey: [],
			accordion: false,
		};
		this.onImageUpload = this.onImageUpload.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onNbDescriptionChange = this.onNbDescriptionChange.bind(this);
		this.onPlanCollapseChange = this.onPlanCollapseChange.bind(this);
		this.onDeployCollapseChange = this.onDeployCollapseChange.bind(this);
		this.onDeploySubCollapseChange = this.onDeploySubCollapseChange.bind(this);
		this.onManageCollapseChange = this.onManageCollapseChange.bind(this);
		this.onScaleCollapseChange = this.onScaleCollapseChange.bind(this);
		this.onFeatureCollapseChange = this.onFeatureCollapseChange.bind(this);
		this.onQueueCollapseChange = this.onQueueCollapseChange.bind(this);
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		Http.post(`${window.location.origin}/api/front/get-page`, { name: 'hosting' }).then(
			res => {
				var icons = [], plans = {}, deploys = {}, manage = {}, scale = {}, features = {}, contact = {}, queue = {};
				var data = JSON.parse(res.data.data);
				Object.keys(data).map((key, index) => {
					if (key == 'icons') {
						icons = data[key];
					} else if (key == 'plans') {
						plans = data[key];
					} else if (key == 'distributions') {
						deploys.distributions = data[key];
					} else if (key == 'click_app') {
						deploys.click_app = data[key];
					} else if (key == 'custom_image') {
						deploys.custom_image = data[key];
					} else if (key == 'manage') {
						manage = data[key];
					} else if (key == 'scale') {
						scale = data[key];
					} else if (key == 'features') {
						features = data[key];
					} else if (key == 'contact') {
						contact = data[key];
					} else if (key == 'queue') {
						queue = data[key];
					}
				});
				this.setState({
					isLoaded: true,
					data,
					icons,
					plans,
					manage,
					deploys,
					scale,
					features,
					contact,
					queue
				});
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Header description change event
	onDescriptionChange(content) {
		const { data } = this.state;
		data.description = content;
		this.setState({ data });
	}
	onNbDescriptionChange(content) {
		const { data } = this.state;
		data.no_description = content;
		this.setState({ data });
	}
	// Event for input fields change
	onHandleChange(event, type) {
		const { data, icons, plans, deploys, manage, scale, features, contact, queue } = this.state;

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
			case 'plan_main_title':
				plans.title = event.target.value;
				return this.setState({ plans });
			case 'manage_main_title':
				manage.title = event.target.value;
				return this.setState({ manage });
			case 'manage_main_description':
				manage.description = event.target.value;
				return this.setState({ manage });
			case 'scale_main_title':
				scale.title = event.target.value;
				return this.setState({ scale });
			case 'scale_main_description':
				scale.description = event.target.value;
				return this.setState({ scale });
			case 'feature_main_title':
				features.title = event.target.value;
				return this.setState({ features });
			case 'feature_main_description':
				features.description = event.target.value;
				return this.setState({ features });
			case 'no_meta_title':
				data.no_meta_title = event.target.value;
				return this.setState({ data });
			case 'no_meta_description':
				data.no_meta_description = event.target.value;
				return this.setState({ data });
			case 'no_header_title':
				data.no_title = event.target.value;
				return this.setState({ data });
			case 'no_plan_main_title':
				plans.no_title = event.target.value;
				return this.setState({ plans });
			case 'no_manage_main_title':
				manage.no_title = event.target.value;
				return this.setState({ manage });
			case 'no_manage_main_description':
				manage.no_description = event.target.value;
				return this.setState({ manage });
			case 'no_scale_main_title':
				scale.no_title = event.target.value;
				return this.setState({ scale });
			case 'no_scale_main_description':
				scale.no_description = event.target.value;
				return this.setState({ scale });
			case 'no_feature_main_title':
				features.no_title = event.target.value;
				return this.setState({ features });
			case 'no_feature_main_description':
				features.no_description = event.target.value;
				return this.setState({ features });
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
					var key = "no_" + type.split('_')[2];
					plans.data[index][key] = event.target.value;
					this.setState({ plans });
				} else {
					var temp = type.split('_')[1];
					var index = temp.split('plan')[1];
					var sub_index = type.split('_')[4];
					var key = "no_" + type.split('_')[3];
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
		
		if (type.includes('deploy')) {
			Object.keys(deploys).map((key, index) => {
				if (type.includes('main')) {
					if (type.includes('no')) {
						if (index == type.split("_")[4]) {
							deploys[key]["no_" + type.split("_")[3]] = event.target.value;
							this.setState({ deploys });
						}
					} else {
						if (index == type.split("_")[3]) {
							deploys[key][type.split("_")[2]] = event.target.value;
							this.setState({ deploys });
						}
					}
				} else {
					var temp = type.split("_")[0];
					if (index == temp.split("deploy")[1]) {
						if (type.includes('no')) {
							var sub_index = type.split("_")[3];
							var key_val = "no_" + type.split("_")[2];
							deploys[key].items[sub_index][key_val] = event.target.value;
						} else {
							var sub_index = type.split("_")[2];
							var key_val = type.split("_")[1];
							deploys[key].items[sub_index][key_val] = event.target.value;
						}
						this.setState({ deploys });
					}
				}
			});
		}

		if (type.includes('manage') && !type.includes('main')) {
			if (type.includes('no')) {
				if (type.includes('btn')) {
					var index = type.split("_")[4];
					var key = "no_btn_" + type.split("_")[3];
				} else {
					var index = type.split("_")[3];
					var key = "no_" + type.split("_")[2];
				}
				manage.items[index][key] = event.target.value;
				this.setState({ manage });
			} else {
				if (type.includes('btn')) {
					var index = type.split("_")[3];
					var key = "btn_" + type.split("_")[2];
				} else {
					var index = type.split("_")[2];
					var key = type.split("_")[1];
				}
				manage.items[index][key] = event.target.value;
				this.setState({ manage });
			}
		}

		if (type.includes('scale') && !type.includes('main')) {
			if (type.includes('no')) {
				if (type.includes('btn')) {
					var index = type.split("_")[4];
					var key = "no_btn_" + type.split("_")[3];
				} else {
					var index = type.split("_")[3];
					var key = "no_" + type.split("_")[2];
				}
				scale.items[index][key] = event.target.value;
				this.setState({ scale });
			} else {
				if (type.includes('btn')) {
					var index = type.split("_")[3];
					var key = "btn_" + type.split("_")[2];
				} else {
					var index = type.split("_")[2];
					var key = type.split("_")[1];
				}
				scale.items[index][key] = event.target.value;
				this.setState({ scale });
			}
		}

		if (type.includes('feature') && !type.includes('main')) {
			if (type.includes('no')) {
				var index = type.split("_")[3];
				var key = "no_" + type.split("_")[2];
				features.items[index][key] = event.target.value;
				this.setState({ features });
			} else {
				var index = type.split("_")[2];
				var key = type.split("_")[1];
				features.items[index][key] = event.target.value;
				this.setState({ features });
			}
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
		const { data, icons, plans, deploys, manage, scale } = this.state;
		const ref = this;

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
		// Upload icon image
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
		// Upload plan image
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
		// Upload deploy image
		var Deployfiles = document.getElementsByClassName('deploy-file');
		Object.keys(Deployfiles).map((key, index) => {
			if (Deployfiles[index].files && Deployfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					Object.keys(deploys).map((key, i) => {
						var temp = type.split("_")[0];
						if (i == temp.split("deploy")[1]) {
							deploys[key].items[type.split("_")[1]]['avatar'] = e.target.result;
							ref.setState({ deploys });
						}
					});
				}
				reader.readAsDataURL(Deployfiles[index].files[0]);
			}
		});
		// Upload manage image
		var Managefiles = document.getElementsByClassName('manage-file');
		Object.keys(Managefiles).map((key, index) => {
			if (Managefiles[index].files && Managefiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var index = type.split("_")[1];
					if (type.includes('avatar')) {
						manage.items[index]['avatar'] = event.target.result;
					} else {
						manage.items[index]['img'] = event.target.result;
					}
					ref.setState({ manage });
				}
				reader.readAsDataURL(Managefiles[index].files[0]);
			}
		});
		// Upload scale image
		var Scalefiles = document.getElementsByClassName('scale-file');
		Object.keys(Scalefiles).map((key, index) => {
			if (Scalefiles[index].files && Scalefiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					var index = type.split("_")[1];
					if (type.includes('avatar')) {
						scale.items[index]['avatar'] = event.target.result;
					} else {
						scale.items[index]['img'] = event.target.result;
					}
					ref.setState({ scale });
				}
				reader.readAsDataURL(Scalefiles[index].files[0]);
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
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'header' })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Update Plan header
	onUpdatePlanHeader() {
		var { data, plans } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'plans') {
				data[key] = plans;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'plan_header' })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Plan item event
	onAddPlanItem(e, i) {
		var { plans } = this.state;
		var new_item = {
			title: 'New Option',
			no_title: 'Nytt alternativ',
			info: '',
			no_info: ''
		};
		plans.data[i].options.push(new_item);
		this.setState({ plans });
	}
	onDeletePlanItem(e, i, index) {
		var { plans } = this.state;
		plans.data[i].options.splice(index, 1);
		this.setState({ plans });
	}
	// Update plans
	onUpdatePlan(e, index) {
		var { data, plans } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'plans') {
				data[key] = plans;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'plan_item', index: index })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Collapse Event for deploy items
	onDeployCollapseChange(deploy_activeKey) {
		this.setState({ deploy_activeKey });
	}
	// Collapse Event for deploy sub items
	onDeploySubCollapseChange(deploy_sub_activeKey) {
		this.setState({ deploy_sub_activeKey });
	}
	// Update deploys
	onUpdateDeploy(e, index) {
		var { data, deploys } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'distributions') {
				data[key] = deploys['distributions'];
				ref.setState({ data });
			} else if (key == 'click_app') {
				data[key] = deploys['click_app'];
				ref.setState({ data });
			} else if (key == 'custom_image') {
				data[key] = deploys['custom_image'];
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'deploy', index: index })
		.then(
			res => {
				console.log({res});
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Collapse Event for manage items
	onManageCollapseChange(manage_activeKey) {
		this.setState({ manage_activeKey });
	}
	// Update manage
	onUpdateManage() {
		var { data, manage } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'manage') {
				data[key] = manage;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'manage_header' })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Update manage
	onUpdateManageItem(e, type) {
		var { data, manage } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'manage') {
				data[key] = manage;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'manage_item', index: type })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Collapse Event for scale items
	onScaleCollapseChange(scale_activeKey) {
		this.setState({ scale_activeKey });
	}
	// Update scale
	onUpdateScale() {
		var { data, scale } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'scale') {
				data[key] = scale;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'scale_header' })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Update scale
	onUpdateScaleItem(e, type) {
		var { data, scale } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'scale') {
				data[key] = scale;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'scale_item', index: type })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Collapse Event for features items
	onFeatureCollapseChange(feature_activeKey) {
		this.setState({ feature_activeKey });
	}
	// Update features
	onUpdateFeature() {
		var { data, features } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'features') {
				data[key] = features;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'feature_header' })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Update feature items
	onUpdateFeatureItem(e, type) {
		var { data, features } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'features') {
				data[key] = features;
				ref.setState({ data });
			}
		});	
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'feature_item', index: type })
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
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(contact), type: 'contact' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	onQueueCollapseChange(queue_activeKey) {
		this.setState({ queue_activeKey });
	}
	// Update Queue Section
	addQueue() {
		var { queue } = this.state;
		const index = queue.list.length - 1;
		const new_item = {
			id: queue.list[index].id + 1,
			ques: "New question",
			no_ques: "Nytt spørsmål",
			answ: "",
			no_answ: ""
		};
		queue.list.push(new_item);
		this.setState({ queue });
	}
	deleteQueueItem(e, key) {
		var { queue } = this.state;
		queue.list.splice(key, 1);
		this.setState({ queue });
	}
	onAnswerChange(content, index, type) {
		const { queue } = this.state;
		if (type.includes('no')) {
			queue.list[index]['no_answ'] = content;
		} else {
			queue.list[index]['answ'] = content;
		}
		this.setState({ queue });
	}
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
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(queue), type: 'queue' })
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
		const { isLoaded, accordion, data, icons, plans, plan_activeKey, deploys, deploy_activeKey, deploy_sub_activeKey, manage, manage_activeKey, scale, scale_activeKey, features, feature_activeKey, contact, queue, queue_activeKey } = this.state;
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
																<ReactSummernote
																	value={data.description}
																	options={{
																		lang: 'en-EN',
																		height: 350,
																		dialogsInBody: true,
																		insertTableMaxSize: {
																			col: 20,
																			row: 20
																		},
																		table: [
																			['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																			['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																		],
																		link: [
																			['link', ['linkDialogShow', 'unlink']]
																		],
																		toolbar: [
																			['style', ['style']],
																			['font', ['bold', 'underline', 'clear']],
																			['fontname', ['fontname']],
																			['color', ['color']],
																			['para', ['ul', 'ol', 'paragraph']],
																			['table', ['table']],
																			['insert', ['link', 'picture', 'video']],
																			['view', ['fullscreen', 'codeview']]
																		]
																	}}
																	onChange={this.onDescriptionChange}
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
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={plans.title} onChange={(val) => ref.onHandleChange(val, 'plan_main_title')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdatePlanHeader.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onPlanCollapseChange} activeKey={plan_activeKey} >
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
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={option.title} onChange={(val) => ref.onHandleChange(val, 'plan' + i + '_option_title_' + index)} />
																					<Form.Input fluid label={translate('card.info')} name='info' placeholder={translate('card.info')} className='input-form' value={option.info} onChange={(val) => ref.onHandleChange(val, 'plan' + i + '_option_info_' + index)} />
																					<label className='ui floated button trash-btn' onClick={(e) => ref.onDeletePlanItem(e, i, index)}> <Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon> </label>
																				</div>
																			))
																		}
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onAddPlanItem(e, i)}> {translate('card.add')} </label>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdatePlan(e, i)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.deploy-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Collapse accordion={accordion} onChange={this.onDeployCollapseChange} activeKey={deploy_activeKey}>
																{Object.keys(deploys).map((key, i) => (
																	<Panel header={deploys[key].title} key={i}>
																		<Form.Input fluid label={translate('card.title')} placeholder={translate('card.title')} className='input-form' value={deploys[key].title} onChange={(val) => ref.onHandleChange(val, 'deploy_main_title_' + i)} />
																		<Form.Input fluid label={translate('card.description')} placeholder={translate('card.description')} className='input-form' value={deploys[key].description} onChange={(val) => ref.onHandleChange(val, 'deploy_main_description_' + i)} />
																		<Collapse accordion={accordion} onChange={this.onDeploySubCollapseChange} activeKey={deploy_sub_activeKey}>
																		{ deploys[key].items.map((item, index) => (																				
																			<Panel header={item.title} key={index}>
																				<Form.Field className="flex-item">
																					<label>{translate('card.image')}</label>
																					<input accept='image/*' type='file' className='deploy-file' onChange={(e) => ref.onImageUpload('deploy' + i + '_' + index, e)} />
																				</Form.Field>
																				<Form.Input fluid label={translate('card.title')} placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'deploy' + i + '_title_' + index)} />
																				{i == 2 && <Form.Input fluid label={translate('card.description')} placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.onHandleChange(val, 'deploy' + i + '_description_' + index)} />}
																			</Panel>
																		))}
																		</Collapse>
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateDeploy(e, i)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.manage-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={manage.title} onChange={(val) => ref.onHandleChange(val, 'manage_main_title')} />
															<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={manage.description} onChange={(val) => ref.onHandleChange(val, 'manage_main_description')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdateManage.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onManageCollapseChange} activeKey={manage_activeKey}>
																{manage.items.map((item, index) => (
																	<Panel header={item.title} key={index}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'manage_title_' + index)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.onHandleChange(val, 'manage_description_' + index)} />
																		<Form.Input fluid label={translate('card.btn-name')} name='title' placeholder={translate('card.btn-name')} className='input-form' value={item.btn_name} onChange={(val) => ref.onHandleChange(val, 'manage_btn_name_' + index)} />
																		<Form.Input fluid label={translate('card.link')} name='description' placeholder={translate('card.link')} className='input-form' value={item.btn_link} onChange={(val) => ref.onHandleChange(val, 'manage_btn_link_' + index)} />
																		<div className="flex-form">
																			<Form.Field className="flex-item">
																				<label>{translate('card.avatar-img')}</label>
																				<input accept='image/*' type='file' className='manage-file' onChange={(e) => ref.onImageUpload('avatar_' + index, e)} />
																			</Form.Field>
																			<Form.Field className="flex-item">
																				<label>{translate('card.image')}</label>
																				<input accept='image/*' type='file' className='manage-file' onChange={(e) => ref.onImageUpload('background_' + index, e)} />
																			</Form.Field>
																		</div>
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateManageItem(e, index)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.scale-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={scale.title} onChange={(val) => ref.onHandleChange(val, 'scale_main_title')} />
															<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={scale.description} onChange={(val) => ref.onHandleChange(val, 'scale_main_description')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdateScale.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onScaleCollapseChange} activeKey={scale_activeKey}>
																{scale.items.map((item, index) => (
																	<Panel header={item.title} key={index}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'scale_title_' + index)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.onHandleChange(val, 'scale_description_' + index)} />
																		<Form.Input fluid label={translate('card.btn-name')} name='title' placeholder={translate('card.btn-name')} className='input-form' value={item.btn_name} onChange={(val) => ref.onHandleChange(val, 'scale_btn_name_' + index)} />
																		<Form.Input fluid label={translate('card.link')} name='description' placeholder={translate('card.link')} className='input-form' value={item.btn_link} onChange={(val) => ref.onHandleChange(val, 'scale_btn_link_' + index)} />
																		<div className="flex-form">
																			<Form.Field className="flex-item">
																				<label>{translate('card.avatar-img')}</label>
																				<input accept='image/*' type='file' className='scale-file' onChange={(e) => ref.onImageUpload('avatar_' + index, e)} />
																			</Form.Field>
																			<Form.Field className="flex-item">
																				<label>{translate('card.image')}</label>
																				<input accept='image/*' type='file' className='scale-file' onChange={(e) => ref.onImageUpload('background_' + index, e)} />
																			</Form.Field>
																		</div>
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateScaleItem(e, index)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.feature-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={features.title} onChange={(val) => ref.onHandleChange(val, 'feature_main_title')} />
															<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={features.description} onChange={(val) => ref.onHandleChange(val, 'feature_main_description')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdateFeature.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onFeatureCollapseChange} activeKey={feature_activeKey}>
																{features.items.map((item, index) => (
																	<Panel header={item.title} key={index}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'feature_title_' + index)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.onHandleChange(val, 'feature_description_' + index)} />
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateFeatureItem(e, index)}> {translate('card.save')} </label>
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
																			<ReactSummernote
																				value={item.answ}
																				options={{
																					lang: 'en-EN',
																					height: 350,
																					dialogsInBody: true,
																					insertTableMaxSize: {
																						col: 20,
																						row: 20
																					},
																					table: [
																						['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																						['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																					],
																					link: [
																						['link', ['linkDialogShow', 'unlink']]
																					],
																					toolbar: [
																						['style', ['style']],
																						['font', ['bold', 'underline', 'clear']],
																						['fontname', ['fontname']],
																						['color', ['color']],
																						['para', ['ul', 'ol', 'paragraph']],
																						['table', ['table']],
																						['insert', ['link', 'picture', 'video']],
																						['view', ['fullscreen', 'codeview']]
																					]
																				}}
																				onChange={(val) => this.onAnswerChange(val, index, 'en')}
																			/>
																			<label className="ui floated button save-btn" onClick={(e) => ref.deleteQueueItem(e, index)}> {translate('card.delete')} </label>
																		</div>
																	</Panel>
																))}
															</Collapse>
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className="ui floated button save-btn" onClick={this.addQueue.bind(this)}> {translate('card.add')} </label>
																<label className="ui floated button save-btn" onClick={this.updateQueue.bind(this)}> {translate('card.save')} </label>
															</div>
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
																<ReactSummernote
																	value={data.no_description}
																	options={{
																		lang: 'nb-NO',
																		height: 350,
																		dialogsInBody: true,
																		insertTableMaxSize: {
																			col: 20,
																			row: 20
																		},
																		table: [
																			['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																			['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																		],
																		link: [
																			['link', ['linkDialogShow', 'unlink']]
																		],
																		toolbar: [
																			['style', ['style']],
																			['font', ['bold', 'underline', 'clear']],
																			['fontname', ['fontname']],
																			['color', ['color']],
																			['para', ['ul', 'ol', 'paragraph']],
																			['table', ['table']],
																			['insert', ['link', 'picture', 'video']],
																			['view', ['fullscreen', 'codeview']]
																		]
																	}}
																	onChange={this.onNbDescriptionChange}
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
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={plans.no_title} onChange={(val) => ref.onHandleChange(val, 'no_plan_main_title')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdatePlanHeader.bind(this)}> {translate('card.save')} </label>
															</div>
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
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={option.no_title} onChange={(val) => ref.onHandleChange(val, 'no_plan' + i + '_option_title_' + index)} />
																					<Form.Input fluid label={translate('card.info')} name='info' placeholder={translate('card.info')} className='input-form' value={option.no_info} onChange={(val) => ref.onHandleChange(val, 'no_plan' + i + '_option_info_' + index)} />
																					<label className='ui floated button trash-btn' onClick={(e) => ref.onDeletePlanItem(e, i, index)}> <Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon> </label>
																				</div>
																			))
																		}
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onAddPlanItem(e, i)}> {translate('card.add')} </label>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdatePlan(e, i)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.deploy-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Collapse accordion={accordion} onChange={this.onDeployCollapseChange} activeKey={deploy_activeKey}>
																{Object.keys(deploys).map((key, i) => (
																	<Panel header={deploys[key].no_title} key={i}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={deploys[key].no_title} onChange={(val) => ref.onHandleChange(val, 'deploy_main_no_title_' + i)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={deploys[key].no_description} onChange={(val) => ref.onHandleChange(val, 'deploy_main_no_description_' + i)} />
																		<Collapse accordion={accordion} onChange={this.onDeploySubCollapseChange} activeKey={deploy_sub_activeKey}>
																		{ deploys[key].items.map((item, index) => (
																			<Panel header={i == 2 ? item.no_title : item.title} key={index}>
																				<Form.Field className="flex-item">
																					<label>{translate('card.image')}</label>
																					<input accept='image/*' type='file' className='deploy-file' onChange={(e) => ref.onImageUpload('deploy' + i + '_' + index, e)} />
																				</Form.Field>
																				{i != 2 && <Form.Input fluid label={translate('card.title')} placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'deploy' + i + '_title_' + index)} />}
																				{i == 2 && <Form.Input fluid label={translate('card.title')} placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, 'deploy' + i + '_no_title_' + index)} />}
																				{i == 2 && <Form.Input fluid label={translate('card.description')} placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.onHandleChange(val, 'deploy' + i + '_no_description_' + index)} />}
																			</Panel>
																		))}
																		</Collapse>
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateDeploy(e, i)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.manage-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={manage.no_title} onChange={(val) => ref.onHandleChange(val, 'no_manage_main_title')} />
															<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={manage.no_description} onChange={(val) => ref.onHandleChange(val, 'no_manage_main_description')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdateManage.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onManageCollapseChange} activeKey={manage_activeKey}>
																{manage.items.map((item, index) => (
																	<Panel header={item.no_title} key={index}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, 'no_manage_title_' + index)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.onHandleChange(val, 'no_manage_description_' + index)} />
																		<Form.Input fluid label={translate('card.btn-name')} name='title' placeholder={translate('card.btn-name')} className='input-form' value={item.no_btn_name} onChange={(val) => ref.onHandleChange(val, 'no_manage_btn_name_' + index)} />
																		<Form.Input fluid label={translate('card.link')} name='description' placeholder={translate('card.link')} className='input-form' value={item.no_btn_link} onChange={(val) => ref.onHandleChange(val, 'no_manage_btn_link_' + index)} />
																		<div className="flex-form">
																			<Form.Field className="flex-item">
																				<label>{translate('card.avatar-img')}</label>
																				<input accept='image/*' type='file' className='manage-file' onChange={(e) => ref.onImageUpload('avatar_' + index, e)} />
																			</Form.Field>
																			<Form.Field className="flex-item">
																				<label>{translate('card.image')}</label>
																				<input accept='image/*' type='file' className='manage-file' onChange={(e) => ref.onImageUpload('background_' + index, e)} />
																			</Form.Field>
																		</div>
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateManageItem(e, index)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.scale-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={scale.no_title} onChange={(val) => ref.onHandleChange(val, 'no_scale_main_title')} />
															<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={scale.no_description} onChange={(val) => ref.onHandleChange(val, 'no_scale_main_description')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdateScale.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onScaleCollapseChange} activeKey={scale_activeKey}>
																{scale.items.map((item, index) => (
																	<Panel header={item.no_title} key={index}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, 'no_scale_title_' + index)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.onHandleChange(val, 'no_scale_description_' + index)} />
																		<Form.Input fluid label={translate('card.btn-name')} name='title' placeholder={translate('card.btn-name')} className='input-form' value={item.no_btn_name} onChange={(val) => ref.onHandleChange(val, 'no_scale_btn_name_' + index)} />
																		<Form.Input fluid label={translate('card.link')} name='description' placeholder={translate('card.link')} className='input-form' value={item.no_btn_link} onChange={(val) => ref.onHandleChange(val, 'no_scale_btn_link_' + index)} />
																		<div className="flex-form">
																			<Form.Field className="flex-item">
																				<label>{translate('card.avatar-img')}</label>
																				<input accept='image/*' type='file' className='scale-file' onChange={(e) => ref.onImageUpload('avatar_' + index, e)} />
																			</Form.Field>
																			<Form.Field className="flex-item">
																				<label>{translate('card.image')}</label>
																				<input accept='image/*' type='file' className='scale-file' onChange={(e) => ref.onImageUpload('background_' + index, e)} />
																			</Form.Field>
																		</div>
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateScaleItem(e, index)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.feature-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={features.no_title} onChange={(val) => ref.onHandleChange(val, 'no_feature_main_title')} />
															<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={features.no_description} onChange={(val) => ref.onHandleChange(val, 'no_feature_main_description')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdateFeature.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onFeatureCollapseChange} activeKey={feature_activeKey}>
																{features.items.map((item, index) => (
																	<Panel header={item.no_title} key={index}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, 'no_feature_title_' + index)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.onHandleChange(val, 'no_feature_description_' + index)} />
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateFeatureItem(e, index)}> {translate('card.save')} </label>
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
																			<ReactSummernote
																				value={item.no_answ}
																				options={{
																					lang: 'nb-NO',
																					height: 350,
																					dialogsInBody: true,
																					insertTableMaxSize: {
																						col: 20,
																						row: 20
																					},
																					table: [
																						['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																						['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																					],
																					link: [
																						['link', ['linkDialogShow', 'unlink']]
																					],
																					toolbar: [
																						['style', ['style']],
																						['font', ['bold', 'underline', 'clear']],
																						['fontname', ['fontname']],
																						['color', ['color']],
																						['para', ['ul', 'ol', 'paragraph']],
																						['table', ['table']],
																						['insert', ['link', 'picture', 'video']],
																						['view', ['fullscreen', 'codeview']]
																					]
																				}}
																				onChange={(val) => this.onAnswerChange(val, index, 'no')}
																			/>
																			<label className="ui floated button save-btn" onClick={(e) => ref.deleteQueueItem(e, index)}> {translate('card.delete')} </label>
																		</div>
																	</Panel>
																))}
															</Collapse>
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className="ui floated button save-btn" onClick={this.addQueue.bind(this)}> {translate('card.add')} </label>
																<label className="ui floated button save-btn" onClick={this.updateQueue.bind(this)}> {translate('card.save')} </label>
															</div>
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