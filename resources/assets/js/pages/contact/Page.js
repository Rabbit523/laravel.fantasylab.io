import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader, Form, Checkbox, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Translate, withLocalize } from "react-localize-redux"
import PhoneInput, { formatPhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import ReeValidate from 'ree-validate'
import 'react-phone-number-input/style.css'
import flags from 'react-phone-number-input/flags'
import PageMetaTag from '../../common/pageMetaTag'
import HeadquaterItem from '../../common/headQuaterItem'
import Http from '../../Http'

const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%'
    }
};

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: 'required|min:2',
            email: 'required|email',
            message: 'required'
        });
        this.state = {
            isLoaded: false,
            isLoading: false,
            isTablet: false,
            errors: this.validator.errors,
            phoneError: true,
            message: {
                name: '',
                email: '',
                message: '',
                phone: '',
                company: ''
            },
            phone: '',
            checked: false,
            checkbox_border: true,
            isOpen: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.props.setActiveLanguage(this.props.lang);
        if (!window.location.origin) {
            window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
        }
        Http.post(`${window.location.origin}/api/front/get-page`, { name: 'contact' })
        .then(
            res => {
                if (window.innerWidth <= 1024) {
                    this.setState({ isLoaded: true, isTablet: true, data: JSON.parse(res.data.data) });
                } else {
                    this.setState({ isLoaded: true, isTablet: false, data: JSON.parse(res.data.data) });
                }
                window.scrollTo(0, 0);
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(phone, type) {
        if (type != "phone") {
            const name = event.target.name;
            const value = event.target.value;
            const { errors } = this.validator;
            
            if (name != 'company') {
                this.validator.validate(name, value)
                .then(() => {
                    if (errors.items.length == 0) {
                        this.setState({ errors })
                        $('input[name='+ type + ']').addClass('success');
                        if (type == "message") {
                            $('textarea[name='+ type + ']').addClass('success');
                        }
                    } else {
                        this.setState({ errors })
                        $('input[name='+ type + ']').removeClass('success');
                        if (type == "message") {
                            $('textarea[name='+ type + ']').removeClass('success');
                        }
                    }
                });
            }
    
            var {message} = this.state;
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
            }
        } else {
            var {message} = this.state;
            if (isValidPhoneNumber(phone)) {
                message.phone = phone;
                this.setState({ phone, message, phoneError: false });                
            } else {
                this.setState({ phone, phoneError: true });
            }
        }
    }

    handleCheckBoxClick() {
        this.setState({ checked: !this.state.checked, checkbox_border: !this.state.checked });
    }

    handleSubmit(event) {
        const { message, checked, checkbox_border } = this.state;
        
        this.validator.validateAll(message)
            .then(success => {
                if (success) {
                    if (!checked) {
                        this.setState({ checkbox_border: !this.state.checkbox_border });
                    } else {
                        this.setState({ isLoaded: false, isLoading: true });
                        this.submit(message);
                    }
                } else {
                    const { errors } = this.validator;
                    const ref = this;

                    if (!checked) {
                        this.setState({ checkbox_border: !this.state.checkbox_border });
                    }
                    Object.keys(message).map((key, item) => {
                        if (key != 'phone' && key != 'company') {
                            ref.validator.validate(key, message[key])
                            .then(() => {
                                ref.setState({ errors })
                            }); 
                        }
                    });
                }
            });
    }

    closeModal() {
        this.setState({ isOpen: false });
    }

    submit(data) {
        Http.post('/api/send-message', { data: data })
        .then(
            res => {
                this.setState({ isLoaded: true, isOpen: true, isLoading: false });
            }
        ).catch(err => {
            console.error(err);
        });
    }
    render() {
        const { isLoaded, isLoading, isOpen, isTablet, data, errors, phone, phoneError, checkbox_border } = this.state;
        const { lang } = this.props;
        return (
            <Translate>
                {({ translate }) => (
                    <div className='contact-page'>
                        {isLoaded ?
                            <React.Fragment>
                                <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                                <Modal
                                    isOpen={isOpen}
                                    onRequestClose={this.closeModal}
                                    style={customStyles}
                                    className="notice-modal"
                                    >
                                    <Button icon='close' onClick={this.closeModal}/>
                                    <h2>Thank you,<br/>Visionary.</h2>
                                    <p>We have received your request. We will get in touch within 24 hours.</p>
                                    <div className="button-group">
                                        <Button className='secondary-button' onClick={this.closeModal}>Close</Button> 
                                    </div>
                                </Modal>
                                <div className='contact-header' style={{ backgroundImage: `url(${data.header_url})` }}>
                                    <div className='header-gradient'>
                                        <Container className='custom-col-6'>
                                            <div className='header-description'>
                                                <div className='header-text'>
                                                    <h1>{lang=='en'?data.title:data.no_title}</h1>
                                                    <h2>{lang=='en'?data.description:data.no_description}</h2>
                                                </div>
                                            </div>
                                            <Grid style={{paddingTop: 50}}>
                                                {data.headquarters.map((item, i) => (
                                                    <Grid.Column mobile={16} tablet={8} computer={isTablet?8:4} key={i}>
                                                        <HeadquaterItem avatar={item.avatar} button={lang=='en'?item.button:item.no_button} title={lang=='en'?item.title:item.no_title} description={lang=='en'?item.description:item.no_description} type={item.type}/>
                                                    </Grid.Column>
                                                ))}
                                            </Grid>
                                        </Container>
                                    </div>
                                </div>
                                <div className='contact-section'>
                                    <Container className='custom-col-6'>
                                        <Form className='message-form'>
                                            <div className="form-group">
                                                <Form.Input label={translate('contact.name')} name='name' placeholder={translate('contact.name')} onChange={(val) => this.handleChange(val, 'name')}  error={errors.has('name')} />
                                                {errors.has('name') && <Header size='tiny' className='custom-error' color='red'>{errors.first('name')}</Header>}
                                                <Form.Input label={translate('contact.company-name')} name='company' placeholder={translate('contact.your-company')} onChange={(val) => this.handleChange(val, 'company')} />
                                            </div>
                                            <div className="form-group">
                                                <Form.Input label={translate('contact.work-email')} name='email' placeholder={translate('contact.email-address')} className='input-form' onChange={(val) => this.handleChange(val, 'email')} error={errors.has('email')} />
                                                {errors.has('email') && <Header size='tiny' className='custom-error' color='red'>{errors.first('email')}</Header>}
                                                {/* <div className='phone-form'>
                                                    <label>Phone</label>
                                                    <PhoneInput placeholder='Your phone number' className={phoneError?'':'success'} value={phone} flags={flags} onChange={ (phone) => this.handleChange(phone, 'phone') }  error={ phone && (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number')}/>
                                                </div> */}
                                                <Form.Input label={translate('contact.phone')} name='phone' placeholder={translate('contact.your-phone')} className='input-form' onChange={(val) => this.handleChange(val, 'phone')} error={errors.has('phone')} />
                                                {errors.has('phone') && <Header size='tiny' className='custom-error' color='red'>{errors.first('phone')}</Header>}
                                            </div>
                                            <Form.Field label={translate('contact.message')} name='message' placeholder={translate('contact.write-message')} control='textarea'  rows='5' error={errors.has('message')} onChange={(val)=>this.handleChange(val, 'message')} />
                                            {errors.has('message') && <Header size='tiny' className='custom-error' color='red'>{errors.first('message')}</Header>}
                                            <div className={checkbox_border?'privacy-section': 'privacy-section error'}>
                                                <Checkbox onClick={this.handleCheckBoxClick} label={translate('contact.clicking-agree')} />
                                                <div className='terms-section'>
                                                    <Link to={{ pathname: '/privacy', state:{ pagename: 'privacy' } }} className='item-link'>{translate('contact.privacy-policy')}</Link>
                                                </div>
                                            </div>
                                            <Button fluid size='large' className={isLoading?'primary-button loading':'primary-button'} onClick={this.handleSubmit}>{translate('contact.send-message')}</Button>
                                        </Form>
                                    </Container>
                                </div>
                                <section className='divide'></section>
                            </React.Fragment>
                            :
                            <Segment className='page-loader'>
                                <Dimmer active inverted>
                                    <Loader size='large'>Loading...</Loader>
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