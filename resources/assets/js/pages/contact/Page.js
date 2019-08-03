import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader, Form, Checkbox, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PhoneInput, { formatPhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import ReeValidate from 'ree-validate'
import 'react-phone-number-input/style.css'
import flags from 'react-phone-number-input/flags'
import PageMetaTag from '../../common/pageMetaTag'
import HeadquaterItem from '../../common/headQuaterItem'
import Http from '../../Http'
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: 'required|min:3',
            email: 'required|email',
            message: 'required'
        });
        this.state = {
            isLoaded: false,
            errors: this.validator.errors,
            message: {
                name: '',
                email: '',
                message: '',
                phone: '',
                company: ''
            },
            phone: '',
            checked: false,
            checkbox_border: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    }

    componentDidMount() {
        Http.post('api/front/get-page', { name: 'contact' })
        .then(
            res => {
                this.setState({ isLoaded: true, data: JSON.parse(res.data.data) });
            }
        ).catch(err => {
            console.error(err);
        });
    }

    handleChange(event, type) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        
        if (name != 'company') {
            this.validator.validate(name, value)
            .then(() => {
                this.setState({ errors })
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
    }

    handleCheckBoxClick() {
        this.setState({ checked: !this.state.checked, checkbox_border: !this.state.checked });
    }

    handleSubmit(event) {
        const { message, phone, checked } = this.state;
        this.validator.validateAll(message)
            .then(success => {
                if (success) {
                    // Manually verify the password confirmation fields
                    if (isValidPhoneNumber(phone)) {
                        if (checked) {
                            this.setState({
                                isLoading: true
                            });
                            message.phone = phone;
                            this.submit(message);
                        } else {
                            this.setState({ checkbox_border: !this.state.checkbox_border });
                        }
                    }
                    else{
                        const responseError = {
                            isError: true,
                            code: 401,
                            text: "Oops! Phone number doesn't exit!"
                        };
                        this.setState({ responseError });
                    }
                } else {
                    const { errors } = this.validator;
                    const ref = this;
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

    submit(data) {
        console.log(data);
    }
    render() {
        const { isLoaded, data, errors, phone, checkbox_border } = this.state;
        return (
            <div className='contact-page'>
                {isLoaded ?
                    <React.Fragment>
                        <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description}/>
                        <div className='contact-header' style={{ backgroundImage: `url(${data.header_url})` }}>
                            <div className='header-gradient'>
                                <Container className='custom-col-6'>
                                    <div className='header-description'>
                                        <div className='header-text'>
                                            <h2>{data.title}</h2>
                                            <p>{data.description}</p>
                                        </div>
                                    </div>
                                    <Grid style={{paddingTop: 50}}>
                                        {data.headquarters.map((item, i) => (
                                            <Grid.Column mobile={16} tablet={8} computer={4} key={i}>
                                                <HeadquaterItem avatar={item.avatar} button={item.button} title={item.title} description={item.description} />
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
                                        <Form.Input label='Name' name='name' placeholder='Name' onChange={(val) => this.handleChange(val, 'name')}  error={errors.has('name')} />
                                        {errors.has('name') && <Header size='tiny' className='custom-error' color='red'>{errors.first('name')}</Header>}
                                        <Form.Input label='Company Name' name='company' placeholder='Your company' onChange={(val) => this.handleChange(val, 'company')} />
                                    </div>
                                    <div className="form-group">
                                        <Form.Input label='Work email' name='email' placeholder='E-mail address' className='input-form' onChange={(val) => this.handleChange(val, 'email')} error={errors.has('email')} />
                                        {errors.has('email') && <Header size='tiny' className='custom-error' color='red'>{errors.first('email')}</Header>}
                                        <div className='phone-form'>
                                            <label>Phone</label>
                                            <PhoneInput placeholder='Your phone number' value={phone} flags={flags} onChange={ phone => this.setState({ phone }) }  error={ phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'}/>
                                        </div>
                                    </div>
                                    <Form.Field label='What can we help you with?' name='message' placeholder='Write your message' control='textarea'  rows='5' onChange={(val)=>this.handleChange(val, 'message')} />
                                    {errors.has('message') && <Header size='tiny' className='custom-error' color='red'>{errors.first('message')}</Header>}
                                    <div className={checkbox_border?'privacy-section': 'privacy-section checkbox_border'}>
                                        <Checkbox onClick={this.handleCheckBoxClick} label="By clicking 'Send message', I agree to FantasyLab's " />
                                        <div className='terms-section'>
                                            <Link to='/privacy-policy' replace>Privacy Policy</Link>
                                        </div>
                                    </div>
                                    <Button fluid size='large' className='primary-button' onClick={this.handleSubmit}>Send message</Button>
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
            
        );
    }
}

export default Page;