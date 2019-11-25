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
			icons: [],
			plans: {},
			deploys: {},
			manage: {},
			scale: {},
			features: {},
			servers: {},
			news: [],
			plan_activeKey: [],
			deploy_activeKey: [],
			manage_activeKey: [],
			scale_activeKey: [],
			feature_activeKey: [],
			server_activeKey: [],
			news_activeKey: [],
			accordion: false,
		};
		this.onImageUpload = this.onImageUpload.bind(this);
		this.onPlanCollapseChange = this.onPlanCollapseChange.bind(this);
		this.onDeployCollapseChange = this.onDeployCollapseChange.bind(this);
		this.onManageCollapseChange = this.onManageCollapseChange.bind(this);
		this.onScaleCollapseChange = this.onScaleCollapseChange.bind(this);
		this.onFeatureCollapseChange = this.onFeatureCollapseChange.bind(this);
		this.onServerCollapseChange = this.onServerCollapseChange.bind(this);
		this.onNewsCollapseChange = this.onNewsCollapseChange.bind(this);
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		Http.post(`${window.location.origin}/api/front/get-page`, { name: 'hosting' }).then(
			res => {
				var icons = [], plans = {}, deploys = {}, manage = {}, scale = {}, features = {}, servers = {}, news = [];
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
					} else if (key == 'servers') {
						servers = data[key];
					} else if (key == 'news') {
						news = data[key];
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
					servers,
					news
				});
				window.scrollTo(0, 0);
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Event for input fields change
	onHandleChange(event, type) {
		const { data, icons, plans, deploys, manage, scale, features, servers, news } = this.state;

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
			case 'server_main_title':
				servers.title = event.target.value;
				return this.setState({ servers });
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
			case 'no_server_main_title':
				servers.no_title = event.target.value;
				return this.setState({ servers });
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
						deploys[key].items[type.split("_")[2]].title = event.target.value;
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

		if (type.includes('server') && !type.includes('main')) {
			if (type.includes('no')) {
				if (!type.includes('option')) {
					var index = type.split('_')[3];
					var key = "no_" + type.split('_')[2];
					servers.data[index][key] = event.target.value;
					this.setState({ servers });
				} else {
					var temp = type.split('_')[1];
					var index = temp.split('server')[1];
					var sub_index = type.split('_')[4];
					var key = "no_" + type.split('_')[3];
					servers.data[index]['options'][sub_index][key] = event.target.value;
					this.setState({ servers });
				}
			} else {
				if (!type.includes('option')) {
					var index = type.split('_')[2];
					var key = type.split('_')[1];
					servers.data[index][key] = event.target.value;
					this.setState({ servers });
				} else {
					var temp = type.split('_')[0];
					var index = temp.split('server')[1];
					var sub_index = type.split('_')[3];
					var key = type.split('_')[2];
					servers.data[index]['options'][sub_index][key] = event.target.value;
					this.setState({ servers });
				}
			}
		}

		if (type.includes('news')) {
			if (type.includes('no')) {
				var index = type.split("_")[3];
				var key = "no_" + type.split("_")[2];
				news[index][key] = event.target.value;
			} else {
				var index = type.split("_")[2];
				var key = type.split("_")[1];
				news[index][key] = event.target.value;
			}
			this.setState({ news });
		}
	}
	// Event for image upload
	onImageUpload(type, e) {
		const { data, icons, plans, deploys, manage, scale, servers, news } = this.state;
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
		// Upload server image
		var Serverfiles = document.getElementsByClassName('server-file');
		Object.keys(Serverfiles).map((key, index) => {
			if (Serverfiles[index].files && Serverfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if (type.includes('server_avatar')) {
						var index = type.split('_')[2];
						servers.data[index].url = e.target.result;
						ref.setState({ servers });
					} else {
						console.log("it's not server file");
					}
				}
				reader.readAsDataURL(Serverfiles[index].files[0]);
			}
		});
		// Upload news image
		var Newsfiles = document.getElementsByClassName('news_avatar');
		Object.keys(Newsfiles).map((key, index) => {
			if (Newsfiles[index].files && Newsfiles[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					if (type.includes('news_avatar')) {
						var index = type.split('_')[2];
						news[index].url = e.target.result;
						ref.setState({ news });
					} else {
						console.log("it's not news file");
					}
				}
				reader.readAsDataURL(Newsfiles[index].files[0]);
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
	// Collapse Event for server items
	onServerCollapseChange(server_activeKey) {
		this.setState({ server_activeKey });
	}
	// Update servers
	onUpdateServerHeader() {
		var { data, servers } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'servers') {
				data[key] = servers;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'server_header' })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Update servers
	onUpdateServer(e, type) {
		var { data, servers } = this.state;
		const ref = this;
		Object.keys(data).map((key, index) => {
			if (key == 'servers') {
				data[key] = servers;
				ref.setState({ data });
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(data), type: 'server_item', index: type })
		.then(
			res => {
				this.setState({ isLoaded: true });
			}
		).catch(err => {
			console.error(err);
		});
	}
	// Collapse Event for news items
	onNewsCollapseChange(news_activeKey) {
		this.setState({ news_activeKey });
	}
	// Update blog section
	onUpdateNews(e, type) {
		var { news, data } = this.state;
		Object.keys(data).map((key, index) => {
			if (key == 'news') {
				data[key] = news;
			}
		});
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'hosting', data: JSON.stringify(news), type: 'news', service_type: type })
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
		const { isLoaded, accordion, data, icons, plans, plan_activeKey, deploys, deploy_activeKey, manage, manage_activeKey, scale, scale_activeKey, features, feature_activeKey, servers, server_activeKey, news, news_activeKey } = this.state;
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
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={plans.title} onChange={(val) => ref.onHandleChange(val, 'plan_main_title')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdatePlanHeader.bind(this)}> {translate('card.save')} </label>
															</div>
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
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={option.title} onChange={(val) => ref.onHandleChange(val, 'plan' + i + '_option_title_' + index)} />
																					<Form.Input fluid label={translate('card.info')} name='info' placeholder={translate('card.info')} className='input-form' value={option.info} onChange={(val) => ref.onHandleChange(val, 'plan' + i + '_option_info_' + index)} />
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
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={deploys[key].title} onChange={(val) => ref.onHandleChange(val, 'deploy_main_title_' + i)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={deploys[key].description} onChange={(val) => ref.onHandleChange(val, 'deploy_main_description_' + i)} />
																		{
																			deploys[key].items.map((item, index) => (
																				<div className="flex-form" key={index}>
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'deploy' + i + '_title_' + index)} />
																					<Form.Field className="flex-item">
																						<label>{translate('card.image')}</label>
																						<input accept='image/*' type='file' className='deploy-file' onChange={(e) => ref.onImageUpload('deploy' + i + '_' + index, e)} />
																					</Form.Field>
																				</div>
																			))
																		}
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
												<Card className='header-section'>
													<Card.Content>
														<Card.Header>{translate('card.server-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={servers.title} onChange={(val) => ref.onHandleChange(val, 'server_main_title')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={ref.onUpdateServerHeader.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onServerCollapseChange} activeKey={server_activeKey}>
																{servers.data.map((item, i) => (
																	<Panel header={item.title} key={i}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'server_title_' + i)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.onHandleChange(val, 'server_description_' + i)} />
																		<Form.Input fluid label={translate('card.cost')} name='cost' placeholder={translate('card.cost')} className='input-form' value={item.cost} onChange={(val) => ref.onHandleChange(val, 'server_cost_' + i)} />
																		<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.onHandleChange(val, 'server_color_' + i)} />
																		<Form>
																			<label>{translate('card.avatar-img')}</label>
																			<Form.Field>
																				<input accept='image/*' type='file' className='server-file' onChange={(e) => ref.onImageUpload('server_avatar_' + i, e)} />
																			</Form.Field>
																		</Form>
																		{
																			item.options.map((option, index) => (
																				<div className="flex-form" key={index}>
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={option.title} onChange={(val) => ref.onHandleChange(val, 'server' + i + '_option_title_' + index)} />
																					<Form.Input fluid label={translate('card.info')} name='info' placeholder={translate('card.info')} className='input-form' value={option.info} onChange={(val) => ref.onHandleChange(val, 'server' + i + '_option_info_' + index)} />
																				</div>
																			))
																		}
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateServer(e, i)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.news-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Collapse accordion={accordion} onChange={this.onNewsCollapseChange} activeKey={news_activeKey}>
																{news.map((item, i) => (
																	<Panel header={item.title} key={i}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'news_title_' + i)} />
																		<Form.Input fluid label={translate('card.author')} name='author' placeholder={translate('card.author')} className='input-form' value={item.author} onChange={(val) => ref.onHandleChange(val, 'news_author_' + i)} />
																		<Form.Input fluid label='Type' name='type' placeholder='type' className='input-form' value={item.type} onChange={(val) => ref.onHandleChange(val, 'news_type_' + i)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.description} onChange={(val) => ref.onHandleChange(val, 'news_description_' + i)} />
																		<Form.Input fluid label={translate('card.read')} name='read' placeholder={translate('card.read')} className='input-form' value={item.read} onChange={(val) => ref.onHandleChange(val, 'news_read_' + i)} />
																		<Form>
																			<label>{translate('card.image-upload')}</label>
																			<Form.Field>
																				<input accept='image/*' type='file' id='input-file' className='news_avatar' onChange={(e) => ref.onImageUpload("news_avatar_" + i, e)} />
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
																		{
																			deploys[key].items.map((item, index) => (
																				<div className="flex-form" key={index}>
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.title} onChange={(val) => ref.onHandleChange(val, 'deploy' + i + '_title_' + index)} />
																					<Form.Field className="flex-item">
																						<label>{translate('card.image')}</label>
																						<input accept='image/*' type='file' className='deploy-file' onChange={(e) => ref.onImageUpload('deploy' + i + '_' + index, e)} />
																					</Form.Field>
																				</div>
																			))
																		}
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
												<Card className='header-section'>
													<Card.Content>
														<Card.Header>{translate('card.server-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={servers.no_title} onChange={(val) => ref.onHandleChange(val, 'no_server_main_title')} />
															<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																<label className='ui floated button save-btn' onClick={this.onUpdateServerHeader.bind(this)}> {translate('card.save')} </label>
															</div>
															<Collapse accordion={accordion} onChange={this.onServerCollapseChange} activeKey={server_activeKey}>
																{servers.data.map((item, i) => (
																	<Panel header={item.no_title} key={i}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, 'no_server_title_' + i)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.onHandleChange(val, 'no_server_description_' + i)} />
																		<Form.Input fluid label={translate('card.cost')} name='cost' placeholder={translate('card.cost')} className='input-form' value={item.cost} onChange={(val) => ref.onHandleChange(val, 'server_cost_' + i)} />
																		<Form.Input fluid label={translate('card.color')} name='color' placeholder={translate('card.color')} className='input-form' value={item.color} onChange={(val) => ref.onHandleChange(val, 'server_color_' + i)} />
																		<Form>
																			<label>{translate('card.avatar-img')}</label>
																			<Form.Field>
																				<input accept='image/*' type='file' className='server-file' onChange={(e) => ref.onImageUpload('server_avatar_' + i, e)} />
																			</Form.Field>
																		</Form>
																		{
																			item.options.map((option, index) => (
																				<div className="flex-form" key={index}>
																					<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={option.no_title} onChange={(val) => ref.onHandleChange(val, 'no_server' + i + '_option_title_' + index)} />
																					<Form.Input fluid label={translate('card.info')} name='info' placeholder={translate('card.info')} className='input-form' value={option.no_info} onChange={(val) => ref.onHandleChange(val, 'no_server' + i + '_option_info_' + index)} />
																				</div>
																			))
																		}
																		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
																			<label className='ui floated button save-btn' onClick={(e) => ref.onUpdateServer(e, i)}> {translate('card.save')} </label>
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
														<Card.Header>{translate('card.news-section')}</Card.Header>
													</Card.Content>
													<Card.Content>
														<Card.Description>
															<Collapse accordion={accordion} onChange={this.onNewsCollapseChange} activeKey={news_activeKey}>
																{news.map((item, i) => (
																	<Panel header={item.no_title} key={i}>
																		<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={item.no_title} onChange={(val) => ref.onHandleChange(val, 'no_news_title_' + i)} />
																		<Form.Input fluid label={translate('card.author')} name='author' placeholder={translate('card.author')} className='input-form' value={item.author} onChange={(val) => ref.onHandleChange(val, 'news_author_' + i)} />
																		<Form.Input fluid label='Type' name='type' placeholder='type' className='input-form' value={item.no_type} onChange={(val) => ref.onHandleChange(val, 'no_news_type_' + i)} />
																		<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={item.no_description} onChange={(val) => ref.onHandleChange(val, 'no_news_description_' + i)} />
																		<Form.Input fluid label={translate('card.read')} name='read' placeholder={translate('card.read')} className='input-form' value={item.read} onChange={(val) => ref.onHandleChange(val, 'news_read_' + i)} />
																		<Form>
																			<label>{translate('card.image-upload')}</label>
																			<Form.Field>
																				<input accept='image/*' type='file' id='input-file' className='news-file' onChange={(e) => ref.onImageUpload("news_avatar_" + i, e)} />
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
					</React.Fragment>
				)}
			</Translate>
		)
	}
}

export default withLocalize(Page);