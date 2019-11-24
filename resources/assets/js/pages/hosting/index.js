import React from 'react'
import { Translate, withLocalize } from "react-localize-redux"
import { Button, Container, Grid, Dimmer, Segment, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import PageMetaTag from '../../common/pageMetaTag'
import PlanItem from '../../common/planItem'
import GuideCard from '../../common/guideCard'
import TextCard from '../../common/textCard'
import Gallery from '../../common/carousel'
import NewsCard from '../../common/newsCard'
import Http from '../../Http'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

class Page extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			isOpen: false,
			isDistribution: true,
			isClickApp: false,
			isCustom: false,
			active_manage_type: '',
			active_scale_type: '',
			data: []
		};
		this.closeModal = this.closeModal.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
		this.onSelectChoice = this.onSelectChoice.bind(this);
		this.manageActiveType = this.manageActiveType.bind(this);
		this.scaleActiveType = this.scaleActiveType.bind(this);
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		Http.post(`${window.location.origin}/api/front/get-page`, { name: 'hosting' }).then(
			res => {
				this.setState({ isLoaded: true, data: JSON.parse(res.data.data), active_manage_type: 'Monitoring', active_scale_type: 'Load Balancers' });
				window.scrollTo(0, 0);
			}
		).catch(err => {
			console.error(err);
		});
	}

	closeModal() {
		this.setState({ isOpen: false });
	}

	triggerModal(event) {
		event.preventDefault();
		this.setState({ isOpen: true });
	}

	onSelectChoice(choice) {
		switch (choice) {
			case 'distribution':
				this.setState({ isCustom: false, isDistribution: true, isClickApp: false });
				break;
			case 'clickapp':
				this.setState({ isCustom: false, isDistribution: false, isClickApp: true });
				break;
			case 'custom':
				this.setState({ isCustom: true, isDistribution: false, isClickApp: false });
				break;
		}
	}

	manageActiveType(active) {
		this.setState({ active_manage_type: active });
	}

	scaleActiveType(active) {
		this.setState({ active_scale_type: active });
	}

	render() {
		const { isLoaded, isOpen, isDistribution, isClickApp, isCustom, data, active_manage_type, active_scale_type } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		Modal.setAppElement('#app')
		return (
			<Translate>
				{({ translate }) => (
					<div className='hosting-page'>
						{isLoaded ?
							<React.Fragment>
								<PageMetaTag meta_title={lang == 'en' ? data.meta_title : data.no_meta_title} meta_description={lang == 'en' ? data.meta_description : data.no_meta_description} />
								<Modal
									isOpen={isOpen}
									onRequestClose={this.closeModal}
									style={customStyles}
								>
									<Button icon='close' onClick={this.closeModal} />
									<h2>Hi,<br />Visionary.</h2>
									<p>Our web app is under development.</p>
									<div className="button-group">
										<Button as={Link} to='/contact' className='primary-button'>Contact us</Button>
										<Button className='secondary-button' onClick={this.closeModal}>Close</Button>
									</div>
								</Modal>
								<div className='hosting-header' style={{ backgroundImage: `url(${data.back_url})` }}>
									<div className='header-gradient mobile'>
										<Container className='custom-col-6 text-group'>
											<div className='header-description'>
												<div className='header-text'>
													<h1>{lang == 'en' ? data.title : data.no_title}</h1>
													<p>{lang == 'en' ? data.description : data.no_description}</p>
												</div>
											</div>
											<Container className='custom-col-6'>
												<div className='figures'>
													{data.icons.map((item, i) => (
														<div className='figure' key={i}>
															<img src={`${item.icon}`} />
															<p>{lang == 'en' ? item.text : item.no_text}</p>
														</div>
													))}
												</div>
											</Container>
										</Container>
									</div>
								</div>
								<div className='hosting-section starter-group'>
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.plans.title : data.plans.no_title}</h2>
										<Container className='custom-col-8'>
											<Grid columns={3}>
												{data.plans.data.map((item, i) => (
													<React.Fragment key={i}>
														<Grid.Column mobile={16} tablet={8} only="mobile">
															<PlanItem lang={lang} avatar={item.url} cost={item.cost} color={item.color} options={item.options} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />
														</Grid.Column>
														<Grid.Column only="computer">
															<PlanItem lang={lang} avatar={item.url} cost={item.cost} color={item.color} options={item.options} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />
														</Grid.Column>
													</React.Fragment>
												))}
											</Grid>
										</Container>
									</Container>
								</div>
								<div className='hosting-section server-group'>
									<Container className='custom-col-6'>
										<div className='header'>
											<p onClick={() => this.onSelectChoice('distribution')} className={isDistribution ? 'active' : ''}>{translate('hosting.distribution')}</p>
											<p onClick={() => this.onSelectChoice('clickapp')} className={isClickApp ? 'active' : ''}>{translate('hosting.click-app')}</p>
											<p onClick={() => this.onSelectChoice('custom')} className={isCustom ? 'active' : ''}>{translate('hosting.custom-image')}</p>
										</div>
										{isDistribution &&
											<div className="server-item">
												<h2>{lang == 'en' ? data.distributions.title : data.distributions.no_title}</h2>
												<p>{lang == 'en' ? data.distributions.description : data.distributions.no_description}</p>
												<div className='server-cards'>
													{data.distributions.items.map((item, i) => (
														<React.Fragment key={i}>
															<GuideCard from='hosting' avatar={item.avatar} title={item.title} />
														</React.Fragment>
													))}
												</div>
											</div>}
										{isClickApp &&
											<div className="server-item">
												<h2>{lang == 'en' ? data.click_app.title : data.click_app.no_title}</h2>
												<p>{lang == 'en' ? data.click_app.description : data.click_app.no_description}</p>
												<div className='server-cards'>
													{data.click_app.items.map((item, i) => (
														<React.Fragment key={i}>
															<GuideCard from='hosting' avatar={item.avatar} title={item.title} />
														</React.Fragment>
													))}
												</div>
											</div>}
										{isCustom &&
											<div className="server-item">
												<h2>{lang == 'en' ? data.custom_image.title : data.custom_image.no_title}</h2>
												<p>{lang == 'en' ? data.custom_image.description : data.custom_image.no_description}</p>
												<div className='server-cards'>
													{data.custom_image.items.map((item, i) => (
														<React.Fragment key={i}>
															<GuideCard from='hosting' avatar={item.avatar} title={item.title} />
														</React.Fragment>
													))}
												</div>
											</div>}
									</Container>
								</div>
								<div className="hosting-section manage">
									<Container className='custom-col-6'>
										<p className="section-title">{translate('hosting.manage')}</p>
										<h2>{lang == 'en' ? data.manage.title : data.manage.no_title}</h2>
										<p>{lang == 'en' ? data.manage.description : data.manage.no_description}</p>
										<div className="header">
											<hr />
											{data.manage.items.map((item, i) => (
												<div className={active_manage_type == item.type ? 'manage-item active' : 'manage-item'} key={i} onClick={() => this.manageActiveType(item.type)}>
													<div className="avatar">
														<img src={item.avatar} />
													</div>
													<p>{lang == 'en' ? item.title : item.no_title}</p>
												</div>
											))}
										</div>
										<div className="body">
											{data.manage.items.map(function (item, i) {
												return (
													active_manage_type == item.type &&
													(<div className='item' key={i}>
														<div className="text">
															<h3>{lang == 'en' ? item.title : item.no_title}</h3>
															<p>{lang == 'en' ? item.description : item.no_description}</p>
															<Button className='primary-button' onClick={(event) => this.triggerModal(event)}>{lang == 'en' ? item.btn_name : item.no_btn_name} </Button>
														</div>
														<div className="avatar">
															<img src={item.img} />
														</div>
													</div>));
											}
											)}
										</div>
									</Container>
								</div>
								<div className="hosting-section scale">
									<Container className='custom-col-6'>
										<p className="section-title">{translate('hosting.scale')}</p>
										<h2>{lang == 'en' ? data.scale.title : data.scale.no_title}</h2>
										<p>{lang == 'en' ? data.scale.description : data.scale.no_description}</p>
										<div className="header">
											<hr />
											{data.scale.items.map((item, i) => (
												<div className={active_scale_type == item.type ? 'manage-item active' : 'manage-item'} key={i} onClick={() => this.scaleActiveType(item.type)}>
													<div className="avatar">
														<img src={item.avatar} />
													</div>
													<p>{lang == 'en' ? item.title : item.no_title}</p>
												</div>
											))}
										</div>
										<div className="body">
											{data.scale.items.map(function (item, i) {
												return (
													active_scale_type == item.type &&
													(<div className='item' key={i}>
														<div className="avatar">
															<img src={item.img} />
														</div>
														<div className="text">
															<h3>{lang == 'en' ? item.title : item.no_title}</h3>
															<p>{lang == 'en' ? item.description : item.no_description}</p>
															<Button className='primary-button' onClick={(event) => this.triggerModal(event)}>{lang == 'en' ? item.btn_name : item.no_btn_name} </Button>
														</div>
													</div>));
											}
											)}
										</div>
									</Container>
								</div>
								<div className="hosting-section feature">
									<Container className='custom-col-6'>
										<p className="section-title">{translate('hosting.feature')}</p>
										<h2>{lang == 'en' ? data.features.title : data.features.no_title}</h2>
										<p>{lang == 'en' ? data.features.description : data.features.no_description}</p>
										<Grid>
											{data.features.items.map((item, i) => (
												<React.Fragment key={i}>
													<Grid.Column mobile={16} tablet={8} computer={4}>
														<TextCard from='hosting' color='#070e28' title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />
													</Grid.Column>
												</React.Fragment>
											))}
										</Grid>
									</Container>
								</div>
								<div className='hosting-section servers'>
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.servers.title : data.servers.no_title}</h2>
										<Container className='custom-col-8'>
											<Grid columns={3}>
												{data.servers.data.map((item, i) => (
													<React.Fragment key={i}>
														<Grid.Column mobile={16} tablet={8} only="mobile">
															<PlanItem lang={lang} avatar={item.url} cost={item.cost} color={item.color} options={item.options} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />
														</Grid.Column>
														<Grid.Column only="computer">
															<PlanItem lang={lang} avatar={item.url} cost={item.cost} color={item.color} options={item.options} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} />
														</Grid.Column>
													</React.Fragment>
												))}
											</Grid>
										</Container>
									</Container>
								</div>
								<div className='hosting-section servers'>
									<Container className="custom-col-6">
										<h2>{translate('hosting.news')}</h2>
										<Grid columns={3}>
											{data.news.map((item, i) => (
												<Grid.Column key={i} only="computer" onClick={(event) => this.triggerModal(event)}>
													<NewsCard url={item.url} author={item.author} type={lang == 'en' ? item.type : item.no_type} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} time={item.time} read={item.read} />
												</Grid.Column>
											))}
										</Grid>
										<Grid>
											<Grid.Column only="tablet mobile" onClick={(event) => this.triggerModal(event)}>
												<Gallery type="news" items={data.news} lang={lang} />
											</Grid.Column>
										</Grid>
									</Container>
								</div>
							</React.Fragment>
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