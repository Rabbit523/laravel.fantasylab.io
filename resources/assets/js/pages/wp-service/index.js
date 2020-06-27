import React from 'react'
import { Translate, withLocalize } from "react-localize-redux"
import { Button, Container, Grid, Dimmer, Segment, Loader, Form, Checkbox, Header, Select } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import PageMetaTag from '../../common/pageMetaTag'
import GuideCard from '../../common/guideCard'
import PlanItem from '../../common/planItem'
import AlertItem from '../../common/alertItem'
import Http from '../../Http'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import ReeValidate from 'ree-validate'
import ReactHtmlParser from 'react-html-parser'

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

const options = [
  { key: 'basic', text: 'WordPress Service Agreement, Basic - NOK 499,- excl. VAT', value: 'basic' },
  { key: 'enterprise', text: 'WordPress Service Agreement, Enterprise - NOK 999,- excl. VAT', value: 'enterprise' }
];

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
			isLoading: false,
			isOpen: false,
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
				agreement: ''
			},
			phone: '',
			checked: false,
			checkbox_border: true
		};
		this.closeModal = this.closeModal.bind(this);
		this.triggerModal = this.triggerModal.bind(this);
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
		Http.post(`${window.location.origin}/api/front/get-page`, { name: 'wp-service' }).then(
			res => {
				this.setState({ isLoaded: true, data: JSON.parse(res.data.data) });
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
		Http.post('/api/send-message', { data: data })
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
		this.setState({ que_key: val });
	}

	setScrollDown () {
		window.scrollTo({top: this.contactRef.current.offsetTop, behavior: 'smooth'});
	}

	render() {
		const { isLoaded, isLoading, isOpen, data, errors, phone_error, checkbox_border, que_key } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		Modal.setAppElement('#app')
		if (lang == 'nb' && !window.location.pathname.includes('no')) {
			this.props.setActiveLanguage('en');
		} else if (lang == 'en' && window.location.pathname.includes('no')) {
			this.props.setActiveLanguage('nb');
		}
		return (
			<Translate>
				{({ translate }) => (
					<div className='wpservice-page' ref={this.myRef}>
						{isLoaded ?
							<React.Fragment>
								<PageMetaTag meta_title={lang == 'en' ? data.meta_title : data.no_meta_title} meta_description={lang == 'en' ? data.meta_description : data.no_meta_description} />
								<Modal
									isOpen={isOpen}
									onRequestClose={this.closeModal}
									style={customStyles}
								>
									<Button icon='close' onClick={this.closeModal} />
									<h2>{lang == 'en' ? 'Hi,' : 'Hei,'}<br />{lang == 'en' ? 'visionary.' : 'visjonær.'}</h2>
									<p>{lang == 'en' ? 'Our web app is under development.' : 'Vår web app er under utvikling.'}</p>
									<div className="button-group">
										<Button as={Link} to={lang == 'en' ? '/contact' : '/no/kontakt'} className='primary-button'>{lang == 'en' ? 'Contact us' : 'Kontakt oss'}</Button>
										<Button className='secondary-button' onClick={this.closeModal}>{lang == 'en' ? 'Close' : 'Lukk'}</Button>
									</div>
								</Modal>
								<div className='wpservice-header' style={{ backgroundImage: `url(${data.header.back_url})` }}>
									<div className='header-gradient mobile'>
										<Container className='custom-col-6 text-group'>
											<div className='header-description'>
												<div className='header-text'>
													<h1>{lang == 'en' ? data.header.title : data.header.no_title}</h1>
													<h5>{lang == 'en' ? ReactHtmlParser(data.header.description) : ReactHtmlParser(data.header.no_description)}</h5>
												</div>
											</div>
											<Container className='custom-col-6'>
												<div className='figures'>
													{data.header.items.map((item, i) => (
														<div className='figure' key={i}>
															<img src={`${item.path}`} />
															<p>{lang == 'en' ? item.title : item.no_title}</p>
														</div>
													))}
												</div>
											</Container>
										</Container>
									</div>
								</div>
								<div className='wpservice-section starter-group'>
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.header.list.title : data.header.list.no_title}</h2>
										<Container className='custom-col-8'>
											<Grid columns={3}>
												{data.header.list.items.map((item, i) => (
													<React.Fragment key={i}>
														<Grid.Column mobile={16} tablet={8} only="mobile">
															<PlanItem lang={lang} avatar={item.url} cost={item.cost} color={item.color} options={item.options} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.des : item.no_des} type="wp"  onScroll={this.setScrollDown}/>
														</Grid.Column>
														<Grid.Column only="computer">
															<PlanItem lang={lang} avatar={item.url} cost={item.cost} color={item.color} options={item.options} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.des : item.no_des} type="wp"  onScroll={this.setScrollDown}/>
														</Grid.Column>
													</React.Fragment>
												))}
											</Grid>
										</Container>
									</Container>
								</div>
								<div className="wpservice-section alert">
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.alert.title : data.alert.no_title}</h2>
										<h5>{lang == 'en' ? data.alert.des : data.alert.no_des}</h5>
										<Container className='custom-col-8'>
											<Grid columns={3}>
												{data.alert.list.map((item, i) => (
													<React.Fragment key={i}>
														<Grid.Column mobile={16} tablet={8} only="mobile">
															<AlertItem lang={lang} data={item} id={i + 1} />
														</Grid.Column>
														<Grid.Column only="computer">
															<AlertItem lang={lang} data={item} id={i + 1} />
														</Grid.Column>
													</React.Fragment>
												))}
											</Grid>
										</Container>
									</Container>
								</div>
								<div className="wpservice-section consider">
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.consider.title : data.consider.no_title}</h2>
										<h5>{lang == 'en' ? data.consider.des : data.consider.no_des}</h5>
										<Container className='custom-col-8'>
											<Grid columns={4}>
												{data.consider.items.map((item, i) => (
													<React.Fragment key={i}>
														<Grid.Column mobile={16} tablet={8} only="mobile">
															<div className='figure' key={i}>
																<img src={`${item.url}`} />
																<h3 className="title">{lang == 'en' ? item.title : item.no_title}</h3>
																<p className="des">{lang == 'en' ? item.des : item.no_des}</p>
															</div>
														</Grid.Column>
														<Grid.Column only="computer">
															<div className='figure' key={i}>
																<img src={`${item.url}`} />
																<h3 className="title">{lang == 'en' ? item.title : item.no_title}</h3>
																<p className="des">{lang == 'en' ? item.des : item.no_des}</p>
															</div>
														</Grid.Column>
													</React.Fragment>
												))}
											</Grid>
										</Container>
									</Container>
								</div>
								<div className="wpservice-section plan">
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.plans.title : data.plans.no_title}</h2>
										<h5>{lang == 'en' ? data.plans.des : data.plans.no_des}</h5>
										<Container className='custom-col-8'>
											<Grid columns={3}>
												{data.plans.items.map((item, i) => (
													<React.Fragment key={i}>
														<Grid.Column mobile={16} tablet={8} only="mobile">
															<GuideCard avatar={item.url} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.des : item.no_des}/>
														</Grid.Column>
														<Grid.Column only="computer">
															<GuideCard avatar={item.url} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.des : item.no_des}/>
														</Grid.Column>
													</React.Fragment>
												))}
											</Grid>
										</Container>
									</Container>
								</div>
								<div className="wpservice-section questions">
									<Container className='custom-col-6'>
										<h2>{lang == 'en' ? data.questions.title : data.questions.no_title}</h2>
										<h5>{lang == 'en' ? data.questions.des : data.questions.no_des}</h5>
										<div className="item-group">
											{data.questions.items.map((item, i) => (
												<div className="item" key={i}>
													<div className="avatar-item">
														<img src={`${item.url}`} />
													</div>
													<div className="text-item">
														<h3 className="title">{i + 1}. {lang == 'en' ? item.title : item.no_title}</h3>
														<p className="description">{lang == 'en' ? item.des : item.no_des}</p>
													</div>
												</div>
											))}
										</div>
									</Container>
								</div>
								<div className="wpservice-section contact" ref={this.contactRef}>
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
														<Form.Select control={Select} label={translate('contact.select-agreement')} name="agreement" placeholder={translate('contact.select-agreement')} options={options} error={errors.has('agreement')} onChange={(e, { value }) => this.handleChange(value, 'agreement')} />
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
														<span>&nbsp;{translate('contact.wp-extend-des')}</span>
													</div>
												</div>
												<Button fluid size='large' className={isLoading ? 'primary-button loading' : 'primary-button'} onClick={this.handleSubmit}>{translate('contact.send-request')}</Button>
											</Form>
										</Container>
									</Container>
								</div>
								<div className="wpservice-section queue">
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
														<div className="answer-tag">{ lang == 'en' ? item.answ : item.no_answ }</div>
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