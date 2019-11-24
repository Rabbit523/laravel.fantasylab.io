import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PageMetaTag from '../../common/pageMetaTag'
import PageFooter from '../../common/pageFooter'
import PortfolioCard from '../../common/portfolioCard'
import Http from '../../Http'
import { Translate, withLocalize } from 'react-localize-redux'

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			data: []
		}
	}

	componentDidMount() {
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		Http.post(`${window.location.origin}/api/front/get-page`, { name: 'portfolio' }).then(
			res => {
				this.setState({ isLoaded: true, data: JSON.parse(res.data.page.data) });
				window.scrollTo(0, 0);
			}
		).catch(err => {
			console.error(err);
		});
	}

	render() {
		const { isLoaded, data } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		return (
			<Translate>
				{({ translate }) => (
					<div className='portfolio-page'>
						{isLoaded ?
							<React.Fragment>
								<PageMetaTag meta_title={lang == 'en' ? data.meta_title : data.no_meta_title} meta_description={lang == 'en' ? data.meta_description : data.no_meta_description} />
								<div className='portfolio-header' style={{ backgroundImage: `url(${data.header_url})` }}>
									<div className='header-gradient'>
										<Container className='custom-col-6'>
											<div className='portfolio-header-description'>
												<div className='portfolio-header-text'>
													<h1>{lang == 'en' ? data.title : data.no_title}</h1>
													<p>{lang == 'en' ? data.description : data.no_description}</p>
												</div>
												<div className='portfolio-header-figure'>
													{data.icon_urls.map((item, i) => (
														<div className='figure' key={i}>
															<img src={`${item.path}`} />
															<p>{lang == 'en' ? item.text : item.no_text}</p>
														</div>
													))}
												</div>
											</div>
										</Container>
									</div>
								</div>
								<div className='portfolio-studios'>
									<Container className='custom-col-6'>
										<h2>{translate('portfolio.case-studio')}</h2>
										<Grid columns={3}>
											{Object.keys(data.portfolios).map((key, index) => (
												<React.Fragment key={index}>
													<Grid.Column mobile={16} tablet={8} only="mobile tablet" as={Link} to={{ pathname: `/portfolio/${data.portfolios[key].url}` }}>
														<PortfolioCard from={data.portfolios[key].from} back_url={data.portfolios[key].back_url} title={data.portfolios[key].title} description={data.portfolios[key].description} />
													</Grid.Column>
													<Grid.Column only="computer" as={Link} to={{ pathname: `/portfolio/${data.portfolios[key].url}` }}>
														<PortfolioCard from={data.portfolios[key].from} back_url={data.portfolios[key].back_url} title={data.portfolios[key].title} description={data.portfolios[key].description} />
													</Grid.Column>
												</React.Fragment>
											))}
										</Grid>
									</Container>
								</div>
								<PageFooter title={lang == 'en' ? data.footer_title : data.no_footer_title} description={lang == 'en' ? data.footer_description : data.no_footer_description} button={lang == 'en' ? data.footer_button : data.no_footer_button} link={lang == 'en' ? data.footer_link : data.no_footer_link} linkName={lang == 'en' ? data.footer_link_name : data.no_footer_link_name} url={data.footer_url} />
								<div className='divide'></div>
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