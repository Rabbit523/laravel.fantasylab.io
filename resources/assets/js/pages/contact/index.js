import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader, Form, Checkbox, Button, Header, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Translate, withLocalize } from "react-localize-redux"
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import ReeValidate from 'ree-validate'
import PageMetaTag from '../../common/pageMetaTag'
import HeadquaterItem from '../../common/headQuaterItem'
import Http from '../../Http'

const customStyles = {
  content: {
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
      message: 'required',
      company: 'required',
      phone: 'required'
    });
    this.state = {
      isLoaded: false,
      isLoading: false,
      isTablet: false,
      errors: this.validator.errors,
      phone_error: false,
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
      isOpen: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handler = this.handler.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
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
    const name = event.target.name;
    const value = event.target.value;
    const { errors } = this.validator;
    var { message } = this.state;

    this.validator.validate(name, value)
      .then(() => {
        if (errors.items.length == 0) {
          this.setState({ errors })

          $('input[name=' + type + ']').addClass('success');
          if (type == "message") {
            $('textarea[name=' + type + ']').addClass('success');
          }

        } else {
          this.setState({ errors })
          $('input[name=' + type + ']').removeClass('success');
          if (type == "message") {
            $('textarea[name=' + type + ']').removeClass('success');
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

  closeModal() {
    this.setState({ isOpen: false });
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
              company: ''
            }, checked: false
          });
        }
      ).catch(err => {
        console.error(err);
      });
  }
  render() {
    const { isLoaded, isLoading, isOpen, isTablet, data, errors, phone_error, checkbox_border } = this.state;
    const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
    if (lang == 'nb' && !window.location.pathname.includes('no')) {
      this.props.setActiveLanguage('en');
    } else if (lang == 'en' && window.location.pathname.includes('no')) {
      this.props.setActiveLanguage('nb');
    }
    return (
      <Translate>
        {({ translate }) => (
          <div className='contact-page'>
            {isLoaded ?
              <React.Fragment>
                <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description} />
                <Modal
                  isOpen={isOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}
                  className="notice-modal"
                >
                  <Button icon='close' onClick={this.closeModal} />
                  <h2>{lang == 'en' ? 'Thank you,' : 'Takk,'} <br />{lang == 'en' ? 'visionary.' : 'visjonær.'}</h2>
                  <p>{lang == 'en' ? 'We have received your request. We will get in touch within 24 hours.' : 'Vi har mottatt forespørselen din. Vi tar kontakt innen 24 timer.'}</p>
                  <div className="button-group">
                    <Button className='secondary-button' onClick={this.closeModal}>{lang == 'en' ? 'Close' : 'Lukk'}</Button>
                  </div>
                </Modal>
                <div className='contact-header' style={{ backgroundImage: `url(${data.header_url})` }}>
                  <div className='header-gradient'>
                    <Container className='custom-col-6'>
                      <div className='header-description'>
                        <div className='header-text'>
                          <h1>{lang == 'en' ? data.title : data.no_title}</h1>
                          <h2>{lang == 'en' ? data.description : data.no_description}</h2>
                        </div>
                      </div>
                      <Grid style={{ paddingTop: 50 }}>
                        {data.headquarters.map((item, i) => (
                          <Grid.Column mobile={16} tablet={8} computer={isTablet ? 8 : 4} key={i}>
                            <HeadquaterItem lang={lang} avatar={item.avatar} button={lang == 'en' ? item.button : item.no_button} title={lang == 'en' ? item.title : item.no_title} description={lang == 'en' ? item.description : item.no_description} type={item.type} />
                          </Grid.Column>
                        ))}
                      </Grid>
                    </Container>
                  </div>
                </div>
                <div className='contact-section'>
                  <Container className='custom-col-6'>
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
                      <div className="d-flex">
                        <div className="form-group no-padding">
                          <Form.Field label={translate('contact.message')} name='message' placeholder={translate('contact.write-message')} control='textarea' rows='5' error={errors.has('message')} onChange={(val) => this.handleChange(val, 'message')} />
                          {errors.has('message') && <Header size='tiny' className='custom-error' color='red'>{errors.first('message') ? lang == 'en' ? 'The message is required.' : 'Meldingen er påkrevd.' : ''}</Header>}
                        </div>
                      </div>
                      <div className={checkbox_border ? 'privacy-section' : 'privacy-section error'}>
                        <Checkbox onClick={this.handleCheckBoxClick} label={translate('contact.clicking-agree')} />
                        <div className='terms-section'>
                          <Link to={{ pathname: '/privacy', state: { pagename: 'privacy' } }} target="_blank" className='item-link'>{translate('contact.privacy-policy')}</Link>
                        </div>
                      </div>
                      <Button fluid size='large' className={isLoading ? 'primary-button loading' : 'primary-button'} onClick={this.handleSubmit}>{translate('contact.send-message')}</Button>
                    </Form>
                  </Container>
                </div>
                <section className='divide'></section>
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