import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader, Icon } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import PageMetaTag from '../../common/pageMetaTag'
import PageFooter from '../../common/pageFooter'
import ServiceItem from '../../common/serviceItem'
import Http from '../../Http'

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoaded: false,
			isExisted: false,
		};
	}

	componentDidMount() {
		this.props.setActiveLanguage(this.props.lang);
		const { type } = this.props.match.params;
		if (!window.location.origin) {
			window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
		}
		Http.post(`${window.location.origin}/api/front/get-portfolio-page`, { type: type })
			.then(
				res => {
					var data = JSON.parse(res.data.data);
					var page = res.data;
					if (data.header_description != 'example') {
						this.setState({ isLoaded: true, isExisted: true, data, page });
					} else {
						this.setState({ isLoaded: true, isExisted: false });
					}
					window.scrollTo(0, 0);
				}
			).catch(err => {
				console.error(err);
				this.setState({ isLoaded: true });
			});
	}

	render() {
		const { isLoaded, isExisted, data, page } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		if (lang=='nb' && !window.location.pathname.includes('no')) {
			return (
				<Redirect to={`/no${this.props.location.pathname}`} />
			)
		}
		return (
			<Translate>
				{({ translate }) => (
					<div className='singlePortfolio-page'>
						{isLoaded ? isExisted ?
							<React.Fragment>
								<PageMetaTag meta_title={lang == 'en' ? page.meta_title : page.no_meta_title} meta_description={lang == 'en' ? page.meta_description : page.no_meta_description} />
								<div className='singlePortfolio-header' style={{ backgroundImage: `url(${data.header_back_url})` }}>
									<div className='header-gradient'>
										<Container className='custom-col-6'>
											<div className='header-description'>
												<div className='header-text'>
													<h2>{lang == 'en' ? data.title : data.no_title}</h2>
													<p>{lang == 'en' ? data.header_description : data.no_header_description}</p>
												</div>
											</div>
											<div className="image-group">
												<img src={`${data.header_sub_images[0]}`} />
												{data.header_sub_images[1] != null && (<img src={`${data.header_sub_images[1]}`} className="sub-img" />)}
											</div>
										</Container>
									</div>
								</div>
								{data.main_description.length > 0 && <section className='portfolio-section'>
									<Container className='custom-col-6'>
										<Grid columns={3}>
											{data.main_description.map((item, index) => (
												item.title != null && <React.Fragment key={index}>
													<Grid.Column mobile={16} tablet={16} only="mobile" className="main_description">
														<h3 className="sub_title">{lang == 'en' ? item.title : item.no_title}</h3>
														<p className="sub_text">{lang == 'en' ? item.text : item.no_text}</p>
														{Object.keys(item.sub).map((key, i) => (
															item.sub[key] && (<div className="sub_descriptions" key={i}>
																<div className="round_number">{i + 1}</div>
																<p>{lang == 'en' ? item.sub[key].text : item.sub[key].no_text}</p>
															</div>)
														))}
													</Grid.Column>
													<Grid.Column only="computer" className="main_description">
														<h3 className="sub_title">{lang == 'en' ? item.title : item.no_title}</h3>
														<p className="sub_text">{lang == 'en' ? item.text : item.no_text}</p>
														{lang == 'en' && <React.Fragment>
															{Object.keys(item.sub).map((key, i) => {
																return (
																	(index < 3) && !key.includes("no") &&
																	(<div className="sub_descriptions" key={i}>
																		<div className="round_number">{i + 1}</div>
																		<p>{item.sub[key]}</p>
																	</div>)
																)
															})}
															</React.Fragment>}
														{lang == 'nb' && <React.Fragment>
															{Object.keys(item.sub).map((key, i) => {
																return (
																	(0 < index < 4) && key.includes("no") &&
																	(<div className="sub_descriptions" key={i}>
																		<div className="round_number">{i - 2}</div>
																		<p>{item.sub[key]}</p>
																	</div>)
																)
															})}
															</React.Fragment>}
													</Grid.Column>
												</React.Fragment>
											))}
										</Grid>
									</Container>
								</section>}
								<section className="portfolio-section">
									<Container className='custom-col-6'>
										{data.sub_images.map((item, index) => (
											<div className="subImage" key={index}>
												<img src={`${item.url}`} />
												<p>{lang == 'en' ? item.text : item.no_text}</p>
											</div>
										))}
									</Container>
								</section>
								{data.reviews[0] && <section className='portfolio-section review' style={{ backgroundImage: `url(${data.reviews[0].back_url})` }}>
									<Container className="custom-col-6">
										<div className="review-item">
											<div className="review-text-section">
												<img src={`${data.reviews[0].logo_url}`} />
												<div className='description'>{lang == 'en' ? data.reviews[0].description : data.reviews[0].no_description}</div>
												<hr />
											</div>
											<div className="review-avatar">
												<img src={data.reviews[0].avatar ? `${data.reviews[0].avatar}` : '/images/default-user.png'} />
												<div className='icon-quote-right'>
													<Icon name='quote right' />
												</div>
											</div>
											<div className="review-personal">
												<p className='name'>{data.reviews[0].name}</p>
												<p>{data.reviews[0].job}</p>
											</div>
										</div>
									</Container>
								</section>}
								<section className='portfolio-section scope'>
									<Container className='custom-col-6 service'>
										<h2>{translate('portfolio.scope-project')}</h2>
										<Grid columns={3}>
											{data.services.map((item, index) => (
												<React.Fragment key={index}>
													<Grid.Column mobile={16} tablet={8} only="mobile" as={Link} to={{ pathname: lang=='en'?`/${item.url}` : `/no/${item.no_url}` }}>
														<ServiceItem avatar={item.avatar} title={lang == 'en' ? item.title : item.no_title} color={item.color} description={lang == 'en' ? item.description : item.no_description} backimage={item.backimage} />
													</Grid.Column>
													<Grid.Column only="computer" as={Link} to={{ pathname: lang=='en'?`/${item.url}` : `/no/${item.no_url}` }}>
														<ServiceItem avatar={item.avatar} title={lang == 'en' ? item.title : item.no_title} color={item.color} description={lang == 'en' ? item.description : item.no_description} backimage={item.backimage} />
													</Grid.Column>
												</React.Fragment>
											))}
										</Grid>
									</Container>
								</section>
								{data.footer_url && (<PageFooter lang={lang} title={lang == 'en' ? data.footer_title : data.no_footer_title} description={lang == 'en' ? data.footer_description : data.no_footer_description} button={lang == 'en' ? data.footer_button : data.no_footer_button} link={lang == 'en' ? data.footer_link : data.no_footer_link} linkName={lang == 'en' ? data.footer_link_name : data.no_footer_link_name} url={data.footer_url} />)}
								<div className='divide'></div>
							</React.Fragment>
							:
							<React.Fragment>
								<h1 className="alert-notice">{translate('alert.page-not-ready')}</h1>
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