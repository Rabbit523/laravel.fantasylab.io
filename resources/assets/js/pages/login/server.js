import React from 'react'
import { Button, Checkbox, Dimmer, Form, Grid, Header, Icon, Loader, Message, Segment } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import ReeValidate from 'ree-validate'
import AuthService from '../../services'

class LoginServer extends React.Component {
    constructor(props) {
        super(props);
        this.validator = new ReeValidate({
            email: 'required|email',
            password: 'required|min:6'
        });

        this.state = {
            credentials: {
                email: '',
                password: ''
            },
            responseError: {
                isError: false,
                code: '',
                text: ''
            },
            isLoaded: false,
            errors: this.validator.errors
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        const { credentials } = this.state;
        this.validator.validateAll(credentials)
            .then(success => {
                if (success) {
                    this.setState({
                        isLoaded: true
                    });
                    this.submit(credentials);
                }
            });
    }

    submit(credentials) {
        alert("dasdsa");
        console.log({credentials});
        this.props.dispatch(AuthService.login(credentials))
            .catch(({ error, statusCode }) => {
                const responseError = {
                    isError: true,
                    code: statusCode,
                    text: error
                };
                this.setState({ responseError });
                this.setState({
                    isLoaded: false
                });
            })

    }

    onSocialClick(event, data) {
        window.location.assign(`redirect/${data.service}`);
    }
   
    render() {
        const { isAuthenticated, isAdmin } = this.props.status;
        const { from } = this.props.location.state || { from: { pathname: isAdmin ? '/admin/pages' : '/' } };

        if (isAuthenticated) {
            return (
                <Redirect to={from} />
            )
        }
        const { errors } = this.state;
        return (
            <React.Fragment>
                <Segment className='page-loader' style={{ display: this.state.isLoaded ? 'block' : 'none' }}>
                    <Dimmer active inverted>
                        <Loader size='large'>Authenticating...</Loader>
                    </Dimmer>
                </Segment>
                <Grid textAlign='center' verticalAlign='middle' className='login-page'>
                    <Grid.Column className="login-responsive">
                        <div className='login_title'>
                            <h2>Sign into FantasyLab</h2>                            
                            <Link to='/register' replace><h3>or create a free FantasyLab account</h3></Link>
                        </div>
                        {this.state.responseError.isError && <Message negative>
                            <Message.Content>
                                {this.state.responseError.text}
                            </Message.Content>
                        </Message>}
                        <Form size='large' className='login-form'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    label='Work email'
                                    name='email'
                                    placeholder='E-mail address'
                                    className='input-form'
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
                                    className='input-form'
                                    type='password'
                                    onChange={this.handleChange}
                                    error={errors.has('password')}
                                />
                                {errors.has('password') && <Header size='tiny' className='custom-error' color='red'>
                                    {errors.first('password')}
                                </Header>}
                                <div className='remember-section'>
                                    <Checkbox label='Remember me' />
                                    <Link to='/forgot-password' replace><Icon name='lock'/>Forgot password?</Link>
                                </div>
                                <Button fluid size='large' className='primary-button' onClick={this.handleSubmit}>Login</Button>
                                <Button onClick={this.onSocialClick.bind(this)} service='google' className='ui google icon button google-button'>
                                    <img src='images/google.png'/> Login with Google
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </React.Fragment>
        );
    }
}

export default LoginServer;
