import React from 'react'
import { Header, Segment, Dimmer, Loader, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { Translate, withLocalize } from "react-localize-redux"
import PageMetaTag from '../../common/pageMetaTag'
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
      isOpen: true
    };

    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    if (!window.location.origin) {
      window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    Http.post(`${window.location.origin}/api/front/get-page`, { name: 'blog' })
      .then(
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
    this.props.history.go(-1);
  }

  render() {
    const { isLoaded, isOpen, data } = this.state;
    const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
    Modal.setAppElement('#app')
    return (
      <Translate>
        {({ translate }) => (
          <div className='blog-page'>
            <Modal
              isOpen={isOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
            >
              <Button icon='close' onClick={this.closeModal} />
              <h2>{lang=='en' ? 'Hi,' : 'Hei,'}<br />{lang=='en'?'Visionary.':'Visjonær.'}</h2>
							<p>{lang=='en' ? 'Our web app is under development.' : 'Vår web app er under utvikling.'}</p>
							<div className="button-group">
								<Button as={Link} to={lang=='en'?'/contact':'/no/kontakt'} className='primary-button'>{lang=='en'?'Contact us':'Kontakt oss'}</Button>
								<Button className='secondary-button' onClick={this.closeModal}>{lang=='en'?'Close':'Lukk'}</Button>
							</div>
            </Modal>
            {isLoaded && !isOpen ?
              <React.Fragment>
                <PageMetaTag meta_title={data.meta_title} meta_description={data.meta_description} />
                <Segment vertical textAlign='center' style={{ minHeight: '100vh' }}>
                  <Header as='h1'>Blog</Header>
                </Segment>
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