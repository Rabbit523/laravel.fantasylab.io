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
		console.log(this.props.location);
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
			const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
			let path = lang=='en' ? this.props.location.pathname.split("/")[1] : this.props.location.pathname.split("/")[2];
			Http.post(`${window.location.origin}/api/front/get-page`, { name: 'privacy' })
			.then(
				res => {
					if (path == "privacy" || path == 'personvern') {
						this.setState({ isLoaded: true, isPrivacy: true, data: JSON.parse(res.data.data) });
					} else if (path == 'security' || path == 'sikkerhet') {
						this.setState({ isLoaded: true, isSecurity: true, data: JSON.parse(res.data.data) });
					} else if (path == 'terms' || path == 'avsnitt') {
						this.setState({ isLoaded: true, isTerms: true, data: JSON.parse(res.data.data) });
					} else if (path == 'confidentiality' || path == 'sikker') {
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
										<Grid.Column computer={3} tablet={3} className='custom-column side-nav'>
											<h3>{translate('footer.legal')}</h3>
											<Link to={{ pathname: lang=='en'?'/privacy':'/no/personvern', state: { pagename: 'privacy' } }} className={isPrivacy ? "item active" : "item"}>{translate('footer.privacy')} {isPrivacy && <Icon name="caret right"></Icon>}</Link>
											<Link to={{ pathname: lang=='en'?'/security':'/no/sikkerhet', state: { pagename: 'security' } }} className={isSecurity ? "item active" : "item"}>{translate('footer.data-processor')} {isSecurity && <Icon name="caret right"></Icon>}</Link>
											<Link to={{ pathname: lang=='en'?'/terms':'/no/avsnitt', state: { pagename: 'terms' } }} className={isTerms ? "item active" : "item"}>{translate('footer.terms')} {isTerms && <Icon name="caret right"></Icon>}</Link>
											<Link to={{ pathname: lang=='en'?'/confidentiality':'/no/sikker', state: { pagename: 'confidentiality' } }} className={isConfident ? "item active" : "item"}>{translate('footer.confidentiality')} {isConfident && <Icon name="caret right"></Icon>}</Link>
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