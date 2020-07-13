import React from 'react'
import { Translate, withLocalize } from "react-localize-redux"
import { Button, Container, Grid, Dimmer, Segment, Loader, Form, Checkbox, Header, Select } from 'semantic-ui-react'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import Modal from 'react-modal'
import PageMetaTag from '../../common/pageMetaTag'
import PlanItem from '../../common/planItem'
import GuideCard from '../../common/guideCard'
import TextCard from '../../common/textCard'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import ReeValidate from 'ree-validate'
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
const options = {
	en: [
		{ key: 'plan', text: 'Enterprise Managed Hosting, NOK 3 600,- excl. VAT /pr. month', value: '3600' }
	],
	no: [
		{ key: 'plan', text: 'Enterprise Managed Hosting, NOK 3 600,- ekskl. MVA. /pr. måned', value: '3600' }
	]
};
class Page extends React.Component {
	constructor(props) {
		super(props);
		this.validator = new ReeValidate({
			name: 'required|min:2',
			email: 'required|email',
			message: 'required',
			company: 'required',
			phone: 'required',
			agreement: 'required'
		});
		this.state = {
			isLoaded: false,
			isOpen: false,
			isDistribution: true,
			isClickApp: false,
			isCustom: false,
			active_manage_type: '',
			active_scale_type: '',
			data: [],
			errors: this.validator.errors,
			phone_error: false,
			que_key: "",
			message: {
				name: '',
				email: '',
				message: '',
				phone: '',
				company: '',
				agreement: '',
				type: 'hosting'
			},
			phone: '',
			checked: false,
			checkbox_border: true
		};
		this.closeModal = this.closeModal.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
		this.onSelectChoice = this.onSelectChoice.bind(this);
		this.manageActiveType = this.manageActiveType.bind(this);
		this.scaleActiveType = this.scaleActiveType.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handler = this.handler.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
		this.questionHandler = this.questionHandler.bind(this);
		this.setScrollDown = this.setScrollDown.bind(this);
		this.myRef = React.createRef();
		this.contactRef = React.createRef();
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		Http.post(`${window.location.origin}/api/front/get-page`, { name: 'hosting' }).then(
			res => {
				this.setState({ isLoaded: true, data: JSON.parse(res.data.data), active_manage_type: 'Monitoring', active_scale_type: 'Load Balancers' });
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

	handler() {
		var { message } = this.state;
		message.phone = this.myRef.current.formatFullNumber(event.target.value);
		this.setState({ message });
	}

	onBlur() {
		var { message } = this.state;
		if (this.myRef.current.isValidNumber(message.phone)) {
			this.setState({ phone_error: false });
		}
	}

	handleChange(e, type) {
		const name = type == 'agreement' ? type : event.target.name;
		const value = type == 'agreement' ? e : event.target.value;
		const { errors } = this.validator;
		var { message } = this.state;
		
		this.validator.validate(name, value)
			.then(() => {
				if (errors.items.length == 0) {
					this.setState({ errors })
					$('input[name=' + type + ']').addClass('success');
					if (type == "message") {
						$('textarea[name=' + type + ']').addClass('success');
					} else if (type == 'agreement') {
						$('.selection.dropdown').addClass('success');
					}
				} else {
					this.setState({ errors })
					$('input[name=' + type + ']').removeClass('success');
					if (type == "message") {
						$('textarea[name=' + type + ']').removeClass('success');
					} else if (type == 'agreement') {
						$('.selection.dropdown').removeClass('success');
					}
				}
			});
		switch (type) {
			case 'name':
				message.name = event.target.value;
				return this.setState({ message });
			case 'company':
				message.company = event.target.value;
				return this.setState({ message });
			case 'email':
				message.email = event.target.value;
				return this.setState({ message });
			case 'message':
				message.message = event.target.value;
				return this.setState({ message });
			case 'agreement':
				message.agreement = value;
				return this.setState({ message });
		}
	}

	handleCheckBoxClick() {
		this.setState({ checked: !this.state.checked, checkbox_border: !this.state.checked });
	}

	handleSubmit(event) {
		const { message, checked } = this.state;
		const { errors } = this.validator;

		this.validator.validateAll(message)
			.then(success => {
				if (success) {
					if (!checked || !this.myRef.current.isValidNumber(message.phone)) {
						if (!checked) {
							this.setState({ checkbox_border: !this.state.checkbox_border });
						} else {
							this.setState({ phone_error: true });
						}
					} else {
						this.submit(message);
					}
				} else {
					const ref = this;
					if (!checked) {
						this.setState({ checkbox_border: !this.state.checkbox_border });
					}
					Object.keys(message).map((key, item) => {
						if (key != 'phone') {
							ref.validator.validate(key, message[key])
								.then(() => {
									ref.setState({ errors })
								});
						} else {
							if (!this.myRef.current.isValidNumber(message.phone)) {
								ref.setState({ phone_error: true });
							}
						}
					});
				}
			});
	}

	submit(data) {
		this.setState({ isLoaded: false, isLoading: true });
		Http.post('/api/send-order-request', { data: data })
		  .then(
		    res => {
		      this.setState({
		        isLoaded: true, isOpen: true, isLoading: false, message: {
					name: '',
					email: '',
					message: '',
					phone: '',
					company: '',
					agreement: '',
		        }, checked: false
		      });
		    }
		  ).catch(err => {
		    console.error(err);
		  });
	}

	questionHandler(val) {
		const { que_key } = this.state;
		if (que_key != val) {
			this.setState({ que_key: val })
		} else {
			this.setState({ que_key: "" })
		}
	}

	setScrollDown () {
		window.scrollTo({top: this.contactRef.current.offsetTop, behavior: 'smooth'});
	}

	render() {
		const { isLoaded, isLoading, isOpen, isDistribution, isClickApp, isCustom, data, active_manage_type, active_scale_type, errors, phone_error, checkbox_border, que_key } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		Modal.setAppElement('#app')
		if (lang=='nb' && !window.location.pathname.includes('no')) {
			this.props.setActiveLanguage('en');
		} else if (lang == 'en' && window.location.pathname.includes('no')){
			this.props.setActiveLanguage('nb');
    	}
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
									<h2>{lang=='en' ? 'Hi,' : 'Hei,'}<br />{lang=='en'?'visionary.':'visjonær.'}</h2>
									<p>{lang == 'en' ? 'Our team will get in touch with you shortly.' : 'Vårt team vil ta kontakt med deg snart.'}</p>
									<div className="button-group">
										<Button as={Link} to={lang=='en'?'/contact':'/no/kontakt'} className='primary-button'>{lang=='en'?'Contact us':'Kontakt oss'}</Button>
										<Button className='secondary-button' onClick={this.closeModal}>{lang=='en'?'Close':'Lukk'}</Button>
									</div>
								</Modal>
								<div className='hosting-header' style={{ backgroundImage: `url(${data.back_url})` }}>
									<div className='header-gradient mobile'>
										<Container className='custom-col-6 text-group'>
											<div className='header-description'>
												<div className='header-text'>
													<h1>{lang == 'en' ? data.title : data.no_title}</h1>
													<h5>{lang == 'en' ? ReactHtmlParser(data.description) : ReactHtmlParser(data.no_description)}</h5>
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
											<Grid columns={1}>
												{data.plans.data.map((item, i) => (
													<React.Fragment key={i}>
														<Grid.Column mobile={16} tablet={8} only="mobile">
															<PlanItem lang={lang} avatar={item.url} cost={item.cost} color={item.color} options={item.options} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} onScroll={this.setScrollDown} type="hosting"/>
														</Grid.Column>
														<Grid.Column only="computer">
															<PlanItem lang={lang} avatar={item.url} cost={item.cost} color={item.color} options={item.options} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} onScroll={this.setScrollDown} type="hosting"/>
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
												{isMobile && <Grid style={{ marginTop: 30 }}>
													{data.distributions.items.map((item, i) => (
														<Grid.Column mobile={8} key={i}>
															<GuideCard from='hosting' avatar={item.avatar} title={item.title} />
														</Grid.Column>
													))}
												</Grid>}
												{!isMobile && <div className='server-cards'>
													{data.distributions.items.map((item, i) => (
														<React.Fragment key={i}>
															<GuideCard from='hosting' avatar={item.avatar} title={item.title} />
														</React.Fragment>
													))}
												</div>}
											</div>}
										{isClickApp &&
											<div className="server-item">
												<h2>{lang == 'en' ? data.click_app.title : data.click_app.no_title}</h2>
												<p>{lang == 'en' ? data.click_app.description : data.click_app.no_description}</p>
												{isMobile && <Grid style={{ marginTop: 30 }}>
													{data.click_app.items.map((item, i) => (
														<Grid.Column mobile={8} key={i}>
															<GuideCard from='hosting' avatar={item.avatar} title={item.title} />
														</Grid.Column>
													))}
												</Grid>}
												{!isMobile && <div className='server-cards'>
													{data.click_app.items.map((item, i) => (
														<React.Fragment key={i}>
															<GuideCard from='hosting' avatar={item.avatar} title={item.title} />
														</React.Fragment>
													))}
												</div>}
											</div>}
										{isCustom &&
											<div className="server-item">
												<h2>{lang == 'en' ? data.custom_image.title : data.custom_image.no_title}</h2>
												<p>{lang == 'en' ? data.custom_image.description : data.custom_image.no_description}</p>
												<div className={isMobile ? 'server-cards custom' : 'server-cards'}>
													{data.custom_image.items.map((item, i) => (
														<div className='deploy-item' key={i}>
															<div className='avatar-item'>
																{i == 0 && !item.avatar && <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" aria-hidden="true" className="www-Icon www-Icon--xlarge bui-u-mb--regular"><defs><linearGradient x1="50.064%" y1="99.939%" x2="50.064%" y2=".494%" id="a"><stop stopColor="#0069FF" stopOpacity=".3" offset="0%"></stop><stop stopColor="#0069FF" stopOpacity="0" offset="100%"></stop></linearGradient></defs><g transform="translate(2 1)" fill="none" fillRule="evenodd"><ellipse fill="#FFFFFF" fillRule="nonzero" opacity=".6" cx="18.5" cy="28.462" rx="18.5" ry="7.021"></ellipse><ellipse stroke="#0069FF" strokeWidth="2" cx="18.5" cy="28.462" rx="18.5" ry="7.021"></ellipse><ellipse fill="#FFFFFF" fillRule="nonzero" opacity=".7" cx="18.5" cy="18.785" rx="18.5" ry="7.021"></ellipse><ellipse stroke="#0069FF" strokeWidth="2" cx="18.5" cy="18.785" rx="18.5" ry="7.021"></ellipse><ellipse fill="#FFFFFF" fillRule="nonzero" opacity=".7" cx="18.5" cy="9.297" rx="18.5" ry="7.021"></ellipse><ellipse stroke="#0069FF" strokeWidth="2" cx="18.5" cy="9.297" rx="18.5" ry="7.021"></ellipse><path d="M33.015 1.044H4.838V33.11s7.4 2.562 14.041 2.562c6.642 0 14.042-2.562 14.042-2.562V1.044h.094z" fill="url(#a)" fillRule="nonzero"></path><circle stroke="#120078" strokeWidth="2" fill="#FFFFFF" fillRule="nonzero" transform="rotate(-45 11.02 15.9)" cx="11.021" cy="15.901" r="1.992"></circle><circle stroke="#120078" strokeWidth="2" fill="#FFFFFF" fillRule="nonzero" transform="rotate(-45 17.937 35.601)" cx="17.937" cy="35.601" r="2.372"></circle><circle stroke="#120078" strokeWidth="2" fill="#FFFFFF" fillRule="nonzero" transform="rotate(-45 30.17 24.39)" cx="30.17" cy="24.389" r="2.846"></circle><circle stroke="#120078" strokeWidth="2" fill="#FFFFFF" fillRule="nonzero" transform="rotate(-45 26.59 2.911)" cx="26.59" cy="2.911" r="1.992"></circle></g></svg>}
																{i == 1 && !item.avatar && <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" aria-hidden="true" className="www-Icon www-Icon--xlarge bui-u-mb--regular"><defs><linearGradient id="a" x1="100.265%" x2="43.513%" y1="49.992%" y2="49.992%"><stop offset="0%" stopColor="#0069FF" stopOpacity=".3"></stop><stop offset="100%" stopColor="#0069FF" stopOpacity="0"></stop></linearGradient><linearGradient id="b" x1="100.265%" x2="43.513%" y1="50.562%" y2="50.562%"><stop offset="0%" stopColor="#0069FF" stopOpacity=".3"></stop><stop offset="100%" stopColor="#0069FF" stopOpacity="0"></stop></linearGradient><linearGradient id="c" x1="100.265%" x2="43.513%" y1="50.008%" y2="50.008%"><stop offset="0%" stopColor="#0069FF" stopOpacity=".3"></stop><stop offset="100%" stopColor="#0069FF" stopOpacity="0"></stop></linearGradient></defs><g fill="none" fillRule="evenodd" transform="translate(6 6)"><path fill="url(#a)" d="M27.02 22.102H2.98a1.932 1.932 0 0 0-1.95 1.952v3.044c0 1.092.858 1.95 1.95 1.95h24.118a1.932 1.932 0 0 0 1.95-1.95v-3.044c-.077-1.093-.936-1.952-2.028-1.952z"></path><path stroke="#120078" strokeWidth="1.75" d="M27.02 22.102H2.98a1.932 1.932 0 0 0-1.95 1.952v3.044c0 1.092.858 1.95 1.95 1.95h24.118a1.932 1.932 0 0 0 1.95-1.95v-3.044c-.077-1.093-.936-1.952-2.028-1.952z"></path><circle cx="5.4" cy="25.537" r="1.015" fill="#0069FF"></circle><circle cx="8.834" cy="25.537" r="1.015" fill="#0069FF" opacity=".3"></circle><circle cx="12.19" cy="25.537" r="1.015" fill="#0069FF" opacity=".3"></circle><path fill="#D8D8D8" stroke="#120078" strokeLinecap="round" strokeWidth="1.75" d="M25.38 25.537H19.45"></path><path fill="url(#b)" d="M27.02 11.488H2.98a1.932 1.932 0 0 0-1.95 1.951v3.044c0 1.093.858 1.951 1.95 1.951h24.118a1.932 1.932 0 0 0 1.95-1.951v-3.044c-.077-1.015-.936-1.951-2.028-1.951z"></path><path stroke="#0069FF" strokeWidth="1.75" d="M27.02 11.488H2.98a1.932 1.932 0 0 0-1.95 1.951v3.044c0 1.093.858 1.951 1.95 1.951h24.118a1.932 1.932 0 0 0 1.95-1.951v-3.044c-.077-1.015-.936-1.951-2.028-1.951z"></path><circle cx="5.4" cy="15" r="1.015" fill="#0069FF"></circle><circle cx="8.834" cy="15" r="1.015" fill="#0069FF" opacity=".3"></circle><circle cx="12.19" cy="15" r="1.015" fill="#0069FF" opacity=".3"></circle><path fill="#D8D8D8" stroke="#120078" strokeLinecap="round" strokeWidth="1.75" d="M25.38 15H19.45"></path><path fill="url(#c)" d="M27.02.951H2.98a1.932 1.932 0 0 0-1.95 1.951v3.044c0 1.093.858 1.952 1.95 1.952h24.118a1.932 1.932 0 0 0 1.95-1.952V2.902c-.077-1.092-.936-1.95-2.028-1.95z"></path><path stroke="#0069FF" strokeWidth="1.75" d="M27.02.951H2.98a1.932 1.932 0 0 0-1.95 1.951v3.044c0 1.093.858 1.952 1.95 1.952h24.118a1.932 1.932 0 0 0 1.95-1.952V2.902c-.077-1.092-.936-1.95-2.028-1.95z"></path><circle cx="5.4" cy="4.463" r="1.015" fill="#0069FF"></circle><circle cx="8.834" cy="4.463" r="1.015" fill="#0069FF" opacity=".3"></circle><circle cx="12.19" cy="4.463" r="1.015" fill="#0069FF" opacity=".3"></circle><path fill="#D8D8D8" stroke="#120078" strokeLinecap="round" strokeWidth="1.75" d="M25.38 4.463H19.45"></path></g></svg>}
																{i == 2 && !item.avatar && <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" aria-hidden="true" className="www-Icon www-Icon--xlarge bui-u-mb--regular"><defs><linearGradient x1="50%" y1="93.571%" x2="50%" y2="-.778%" id="a"><stop stopColor="#0069FF" stopOpacity=".25" offset="0%"></stop><stop stopColor="#0069FF" stopOpacity="0" offset="100%"></stop></linearGradient></defs><g fill="none" fillRule="evenodd"><path fill="url(#a)" fillRule="nonzero" d="M2.8.6h31.4v35.6H2.8z" transform="translate(2 1)"></path><g strokeWidth="2"><path d="M5.7 5.7l29.6 29.6M5.7 35.3L35.3 5.7" stroke="#0069FF" opacity=".3"></path><path d="M2.1 36.2c0-2.7 3.6-5.3 3.6-5.3s3.6 2.7 3.6 5.3c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6zM31.8 36.2c0-2.7 3.6-5.3 3.6-5.3s3.6 2.7 3.6 5.3c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6zM2.1 6.5c0-2.7 3.6-5.3 3.6-5.3s3.6 2.7 3.6 5.3c0 2-1.6 3.6-3.6 3.6S2.1 8.5 2.1 6.5zM31.8 6.5c0-2.7 3.6-5.3 3.6-5.3S39 3.9 39 6.5c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6z" stroke="#120078" fill="#FFFFFF" fillRule="nonzero"></path><path d="M14.5 21.9c0-4.5 6-8.9 6-8.9s6 4.5 6 8.9c0 3.3-2.7 6-6 6s-6-2.7-6-6z" stroke="#0069FF" fill="#FFFFFF" fillRule="nonzero"></path></g></g></svg>}
																{i == 3 && !item.avatar && <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" aria-hidden="true" className="www-Icon www-Icon--xlarge bui-u-mb--regular"><defs><linearGradient id="a" x1="49.868%" x2="49.868%" y1="2.976%" y2="101.08%"><stop offset="0%" stopColor="#0069FF" stopOpacity=".3"></stop><stop offset="100%" stopColor="#0069FF" stopOpacity="0"></stop></linearGradient></defs><g fill="none" fillRule="evenodd"><path fill="url(#a)" d="M1.465 9h36.651v24.907H1.466z" transform="translate(1 3)"></path><path fill="#120078" fillRule="nonzero" d="M4.14 5C3.482 5 3 5.482 3 6.14v28.744c0 .657.482 1.14 1.14 1.14h32.93c.657 0 1.14-.483 1.14-1.14V6.14c0-.664-.49-1.14-1.233-1.14H4.14zm0-2h32.837c1.834 0 3.232 1.357 3.232 3.14v28.744a3.105 3.105 0 0 1-3.14 3.14H4.14A3.105 3.105 0 0 1 1 34.883V6.14A3.105 3.105 0 0 1 4.14 3z"></path><path fill="#120078" d="M2 13v-2h37.023v2z"></path><path fill="#0069FF" fillRule="nonzero" d="M5.442 8.907v-2h2.14v2h-2.14zm4.93 0v-2h2.14v2h-2.14z"></path><path stroke="#0069FF" strokeWidth="2" d="M15.395 19.442h4.186m-11.07 0h4.745m10.883 5.21h3.628m-13.674 0h8.093m-13.674 0h3.441m7.442 5.302h5.396m-16.28 0h8.93"></path></g></svg>}
															</div>
															<div className='text-item'>
																<h3>{lang == 'en' ? item.title : item.no_title}</h3>
																<p>{lang == 'en' ? item.description : item.no_description}</p>
															</div>
														</div>
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
											<div className="ScrollArea">
												{data.manage.items.map((item, i) => (
													<div className={active_manage_type == item.type ? 'manage-item active' : 'manage-item'} key={i} onClick={() => this.manageActiveType(item.type)}>
														<div className="avatar">
															<img src={item.avatar} />
														</div>
														<p>{lang == 'en' ? item.title : item.no_title}</p>
													</div>
												))}
											</div>
										</div>
										<div className="body">
											{data.manage.items.map(function (item, i) {
												return (
													active_manage_type == item.type &&
													(<div className='item' key={i}>
														<div className="text">
															<h3>{lang == 'en' ? item.title : item.no_title}</h3>
															<p>{lang == 'en' ? item.description : item.no_description}</p>
															<Button className='primary-button' as={Link} to={lang == 'en' ? item.btn_link : item.no_btn_link}>{lang == 'en' ? item.btn_name : item.no_btn_name} </Button>
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
											<div className="ScrollArea">
												{data.scale.items.map((item, i) => (
													<div className={active_scale_type == item.type ? 'manage-item active' : 'manage-item'} key={i} onClick={() => this.scaleActiveType(item.type)}>
														<div className="avatar">
															<img src={item.avatar} />
														</div>
														<p>{lang == 'en' ? item.title : item.no_title}</p>
													</div>
												))}
											</div>
										</div>
										<div className="body">
											{data.scale.items.map(function (item, i) {
												return (
													active_scale_type == item.type &&
													(<div className='item' key={i}>
														{!isMobile && <div className="avatar">
															<img src={item.img} />
														</div>}
														<div className="text">
															<h3>{lang == 'en' ? item.title : item.no_title}</h3>
															<p>{lang == 'en' ? item.description : item.no_description}</p>
															<Button className='primary-button' as={Link} to={lang == 'en' ? item.btn_link : item.no_btn_link}>{lang == 'en' ? item.btn_name : item.no_btn_name} </Button>
														</div>
														{isMobile && <div className="avatar">
															<img src={item.img} />
														</div>}
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
								<div className="hosting-section contact" ref={this.contactRef}>
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.contact.title : data.contact.no_title}</h2>
										<h5>{lang == 'en' ? data.contact.des : data.contact.no_des}</h5>
										<Container className='custom-col-8'>
											<Form className='message-form'>
												<div className="d-flex">
													<div className="form-group">
														<Form.Input label={translate('contact.name')} name='name' placeholder={translate('contact.name')} onChange={(val) => this.handleChange(val, 'name')} error={errors.has('name')} />
														{errors.has('name') && <Header size='tiny' className='custom-error' color='red'>{errors.first('name') ? lang == 'en' ? 'The name is required.' : 'Navnet er påkrevd.' : ''}</Header>}
													</div>
													<div className="form-group">
														<Form.Input label={translate('contact.company-name')} name='company' placeholder={translate('contact.company-name')} onChange={(val) => this.handleChange(val, 'company')} error={errors.has('company')} />
														{errors.has('company') && <Header size='tiny' className='custom-error' color='red'>{errors.first('company') ? lang == 'en' ? 'The company is required.' : 'Selskapet er påkrevd.' : ''}</Header>}
													</div>
												</div>
												<div className="d-flex">
													<div className="form-group">
														<Form.Input label={translate('contact.email')} name='email' placeholder={translate('contact.email')} className='input-form' onChange={(val) => this.handleChange(val, 'email')} error={errors.has('email')} />
														{errors.has('email') && <Header size='tiny' className='custom-error' color='red'>{errors.first('email') ? lang == 'en' ? 'The email is required.' : 'E-postadressen er påkrevd.' : ''}</Header>}
													</div>
													<div className="form-group phone field">
														<label>{translate('contact.phone')}</label>
														<IntlTelInput
															ref={this.myRef}
															defaultCountry={'no'}
															preferredCountries={['us', 'gb', 'fr', 'de', 'nl', 'se', 'no', 'ch', 'dk', 'fi', 'pl', 'it']}
															onPhoneNumberChange={this.handler}
															onPhoneNumberBlur={this.onBlur}
														/>
														{errors.has('phone') && <Header size='tiny' className='custom-error' color='red'>{errors.first('phone') ? lang == 'en' ? 'The phone number is required.' : 'Telefonnummeret er påkrevd.' : ''}</Header>}
														{!errors.has('phone') && phone_error && <Header size='tiny' className='custom-error' color='red'>{lang == 'en' ? 'The phone number is invalid.' : 'Telefonnummeret er ugyldig.'}</Header>}
													</div>
												</div>
												<div className="d-flex one">
													<div className="form-group">
														<Form.Select control={Select} label={translate('contact.select-agreement')} name="agreement" placeholder={translate('contact.select-agreement')} options={ lang == 'en' ? options.en : options.no } error={errors.has('agreement')} onChange={(e, { value }) => this.handleChange(value, 'agreement')} />
														{errors.has('agreement') && <Header size='tiny' className='custom-error' color='red'>{lang == 'en' ? 'Select the agreement options.' : 'Velg avtalealternativer.'}</Header>}
													</div>
												</div>
												<div className="d-flex one">
													<div className="form-group">
														<Form.Field label={translate('contact.message')} name='message' placeholder={translate('contact.write-message')} control='textarea' rows='5' error={errors.has('message')} onChange={(val) => this.handleChange(val, 'message')} />
														{errors.has('message') && <Header size='tiny' className='custom-error' color='red'>{errors.first('message') ? lang == 'en' ? 'The message is required.' : 'Meldingen er påkrevd.' : ''}</Header>}
													</div>
												</div>
												<div className={checkbox_border ? 'privacy-section' : 'privacy-section error'}>
													<Checkbox onClick={this.handleCheckBoxClick} />
													<div className='terms-section'>
														<span>{translate('contact.clicking-agree-wp')}</span>
														<Link to={{ pathname: '/privacy', state: { pagename: 'privacy' } }} target="_blank" className='item-link'>{translate('footer.privacy')}</Link>
														<span>{translate('footer.and')}</span>
														<Link to={{ pathname: '/terms', state: { pagename: 'terms' } }} target="_blank" className='item-link'>{translate('footer.terms')}.</Link>
														<span>&nbsp;{translate('contact.hosting-extend-des')}</span>
													</div>
												</div>
												<Button fluid size='large' className={isLoading ? 'primary-button loading' : 'primary-button'} onClick={this.handleSubmit}>{translate('contact.send-request')}</Button>
											</Form>
										</Container>
									</Container>
								</div>
								<div className="hosting-section queue">
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.queue.title : data.queue.no_title}</h2>
										<h5>{lang == 'en' ? data.queue.des : data.queue.no_des}</h5>
									</Container>
									<div className="item-group">
										{data.queue.list.map((item, i) => (
											<div className={que_key == item.id ? "item active" : "item"} key={i}>
												<Container className='custom-col-6'>
													<Container className='custom-col-8'>
														<div className="question-tag" onClick={() => this.questionHandler(item.id)}>
															<p>{ lang=='en' ? item.ques : item.no_ques }</p>
															<Button>{que_key == item.id ? '-' : '+' }</Button>
														</div>
														<div className="answer-tag">{lang == 'en' ? ReactHtmlParser(item.answ) : ReactHtmlParser(item.no_answ)}</div>
													</Container>
												</Container>
											</div>
										))}
									</div>
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