import React from 'react'
import { Container, Grid, Segment, Dimmer, Loader, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'
import PageMetaTag from '../../common/pageMetaTag'
import Http from '../../Http'

class Page extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			isPrivacy: false,
			isSecurity: false,
			isTerms: false,
			isConfident: false
		};
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		if (this.props.location.state != undefined) {
			const { pagename } = this.props.location.state;
			Http.post(`${window.location.origin}/api/front/get-page`, { name: 'privacy' })
				.then(
					res => {
						if (pagename != null && pagename == "privacy") {
							this.setState({ isLoaded: true, isPrivacy: true, data: JSON.parse(res.data.data) });
						} else if (pagename != null && pagename == 'security') {
							this.setState({ isLoaded: true, isSecurity: true, data: JSON.parse(res.data.data) });
						} else if (pagename != null && pagename == 'terms') {
							this.setState({ isLoaded: true, isTerms: true, data: JSON.parse(res.data.data) });
						} else if (pagename != null && pagename == 'confidentiality') {
							this.setState({ isLoaded: true, isConfident: true, data: JSON.parse(res.data.data) });
						} else {
							this.setState({ isLoaded: true, isPrivacy: true, data: JSON.parse(res.data.data) });
						}
						window.scrollTo(0, 0);
					}
				).catch(err => {
					console.error(err);
				});
		} else {
			let path = this.props.location.pathname.split("/")[1];
			Http.post(`${window.location.origin}/api/front/get-page`, { name: 'privacy' })
				.then(
					res => {
						if (path == "privacy") {
							this.setState({ isLoaded: true, isPrivacy: true, data: JSON.parse(res.data.data) });
						} else if (path == 'security') {
							this.setState({ isLoaded: true, isSecurity: true, data: JSON.parse(res.data.data) });
						} else if (path == 'terms') {
							this.setState({ isLoaded: true, isTerms: true, data: JSON.parse(res.data.data) });
						} else if (path == 'confidentiality') {
							this.setState({ isLoaded: true, isConfident: true, data: JSON.parse(res.data.data) });
						}
						window.scrollTo(0, 0);
					}
				).catch(err => {
					console.error(err);
				});
		}
	}

	isPrivacySelected() {
		this.setState({ isPrivacy: true, isSecurity: false, isTerms: false, isConfident: false });
	}
	isSecuritySelected() {
		this.setState({ isPrivacy: false, isSecurity: true, isTerms: false, isConfident: false });
	}
	isTermsSelected() {
		this.setState({ isPrivacy: false, isSecurity: false, isTerms: true, isConfident: false });
	}
	isConfidentSelected() {
		this.setState({ isPrivacy: false, isSecurity: false, isTerms: false, isConfident: true });
	}

	render() {
		const { isLoaded, data, isPrivacy, isSecurity, isTerms, isConfident } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		return (
			<Translate>
				{({ translate }) => (
					<div className='privacy-page'>
						{isLoaded ?
							<React.Fragment>
								<PageMetaTag meta_title={lang == 'en' ? data.meta_title : data.no_meta_title} meta_description={lang == 'en' ? data.meta_description : data.no_meta_description} />
								<Container className='custom-col-6 privacy-section'>
									<Grid padded='horizontally'>
										<Grid.Column computer={3} tablet={3} mobile={0} className='custom-column side-nav'>
											<h3>{translate('footer.legal')}</h3>
											<Link to={{ pathname: '/privacy', state: { pagename: 'privacy' } }} className={isPrivacy ? "item active" : "item"}>{translate('footer.privacy')} {isPrivacy && <Icon name="caret right"></Icon>}</Link>
											<Link to={{ pathname: '/security', state: { pagename: 'security' } }} className={isSecurity ? "item active" : "item"}>{translate('footer.data-processor')} {isSecurity && <Icon name="caret right"></Icon>}</Link>
											<Link to={{ pathname: '/terms', state: { pagename: 'terms' } }} className={isTerms ? "item active" : "item"}>{translate('footer.terms')} {isTerms && <Icon name="caret right"></Icon>}</Link>
											<Link to={{ pathname: '/confidentiality', state: { pagename: 'confidentiality' } }} className={isConfident ? "item active" : "item"}>{translate('footer.confidentiality')} {isConfident && <Icon name="caret right"></Icon>}</Link>
										</Grid.Column>
										{isPrivacy && <Grid.Column computer={13} tablet={13} mobile={16} className='custom-column'>
											{lang == 'en' ? ReactHtmlParser(data.privacy) : ReactHtmlParser(data.no_privacy)}
										</Grid.Column>}
										{isSecurity && <Grid.Column computer={13} tablet={13} mobile={16} className='custom-column'>
											{lang == 'en' ? ReactHtmlParser(data.security) : ReactHtmlParser(data.no_security)}
										</Grid.Column>}
										{isTerms && <Grid.Column computer={13} tablet={13} mobile={16} className='custom-column'>
											{lang == 'en' ? ReactHtmlParser(data.terms) : ReactHtmlParser(data.no_terms)}
										</Grid.Column>}
										{isConfident && <Grid.Column computer={13} tablet={13} mobile={16} className='custom-column'>
											{lang == 'en' ? ReactHtmlParser(data.confident) : ReactHtmlParser(data.no_confident)}
										</Grid.Column>}
									</Grid>
								</Container>
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