import React from 'react'
import {Button, Dimmer, Checkbox, Form, Grid, Header, Loader, Message, Segment} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'
import PhoneInput, { formatPhoneNumber, isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import flags from 'react-phone-number-input/flags'

class RegisterServer extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            name: 'required|min:3',
            email: 'required|email',
            password: 'required|min:6',
            password_confirmation: 'required|min:6',
            team: 'required'
        });
        this.state = {
            credentials: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                phone: '',
                team: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isSuccess: false,
            isLoading: false,
            errors: this.validator.errors,
            phone: '',
            checked: false,
            checkbox_border: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        const { errors } = this.validator;
        const { credentials } = this.state;
        credentials[name] = value;

        this.validator.validate(name, value)
        .then(() => {
            this.setState({ errors, credentials })
        });
    }

    handleCheckBoxClick() {
        this.setState({ checked: !this.state.checked, checkbox_border: !this.state.checked });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { credentials, phone, checked } = this.state;

        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    // Manually verify the password confirmation fields
                    if(this.passwordConfirmation(credentials)){
                        if (isValidPhoneNumber(phone)) {
                            if (checked) {
                                this.setState({
                                    isLoading: true
                                });
                                credentials.phone = phone;
                                this.submit(credentials);
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
                            this.setState({responseError});
                        }
                    }
                    else{
                        const responseError = {
                            isError: true,
                            code: 401,
                            text: "Oops! Password confirmation didn't match"
                        };
                        this.setState({ responseError });
                    }
                }
            });
    }

    passwordConfirmation(credentials){
        if(credentials.password == credentials.password_confirmation){
            return true;
        }
        else{
            return false;
        }
    }

    submit(credentials) {
        this.props.dispatch(AuthService.register(credentials))
            .then((result)  => {
                this.setState({
                    isLoading: false,
                    isSuccess: true,
                    credentials: {
                        name: '',
                        email: '',
                        password: '',
                        team: '',
                        password: '',
                        password_confirmation: ''
                    },
                    responseError : {
                        isError: false,
                        code: '',
                        text: ''
                    }
                });

            })
            .catch(({error, statusCode}) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({ responseError });
                this.setState({
                    isLoading: false
                });
            })
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    onSocialClick(event, data) {
        window.location.assign(`redirect/${data.service}`);
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to='/' replace/>
        }
        const { errors, phone, checkbox_border } = this.state;
        return (
            <React.Fragment>
                <Segment className='page-loader' style={{ display: this.state.isLoading ? 'block' : 'none' }}>
                    <Dimmer active inverted>
                        <Loader size='large'>Registering...</Loader>
                    </Dimmer>
                </Segment>

                <Grid textAlign='center' verticalAlign='middle' className='login-page register' >
                    <Grid.Column className="login-responsive">
                        <div className='login_title'>
                            <h2>Create a FantasyLab account</h2>
                            <Link to='/login' replace><h3>or sign in into your account</h3></Link>
                        </div>
                        {this.state.responseError.isError && <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>}
                        {this.state.isSuccess && <Message positive>
                            <Message.Content>
                                Registered Successfully ! <Link to='/login' replace>Login</Link> here
                            </Message.Content>
                        </Message>}
                        <Form size='large' className='login-form register'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    label='Name'                                    
                                    name='name'
                                    placeholder='Name'
                                    onChange={this.handleChange}
                                />
                                {errors.has('name') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('name')}
                                </Header>}
                                <Form.Input
                                    fluid
                                    label='Work email'
                                    name='email'
                                    placeholder='E-mail address'
                                    onChange={this.handleChange}
                                    error={errors.has('email')}
                                />
                                {errors.has('email') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('email')}
                                </Header>}
                                <Form.Input
                                    fluid
                                    label='Password'
                                    name='password'
                                    placeholder='Password'
                                    type='password'
                                    onChange={this.handleChange}
                                    error={errors.has('password')}
                                />
                                {errors.has('password') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password')}
                                </Header>}
                                <Form.Input
                                    fluid
                                    label='Confirm password'
                                    name='password_confirmation'
                                    placeholder='Confirm password'
                                    type='password'
                                    onChange={this.handleChange}
                                    error={errors.has('password_confirmation')}
                                />
                                {errors.has('password_confirmation') &&
                                <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password_confirmation')}
                                </Header>}
                                <div className='phone-form'>
                                    <label>Phone</label>
                                    <PhoneInput
                                        placeholder='Enter phone number'
                                        value={ phone }
                                        flags={flags}
                                        onChange={ phone => this.setState({ phone }) } 
                                        error={ phone ? (isValidPhoneNumber(phone) ? undefined : 'Invalid phone number') : 'Phone number required'}/>
                                </div>
                                <Form.Input
                                    fluid
                                    label='Team name'
                                    name='team'
                                    placeholder="e.g.'FantasyLab' or FantasyLab Finance"
                                    type='text'
                                    onChange={this.handleChange}
                                />
                                <div className={checkbox_border?'privacy-section': 'privacy-section checkbox_border'}>
                                    <Checkbox onClick={this.handleCheckBoxClick} label='By creating an account, I agree to our ' />
                                    <div className='terms-section'>
                                        <Link to='/terms-service' replace>Terms</Link> <span>and</span> <Link to='/privacy-policy' replace>Privacy</Link>
                                    </div>
                                </div>
                                <Button fluid size='large' className='primary-button' onClick={this.handleSubmit}>Create account</Button>
                                <Button onClick={this.onSocialClick.bind(this)} service='google' className='ui google icon button google-button'>
                                    <img src='images/google.png'/> Sign up with Google
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default RegisterServer;
