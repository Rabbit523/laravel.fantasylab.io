import React from 'react'
import { Icon, Container, Grid, Dimmer, Segment, Loader, Card, Form, TextArea, Button } from 'semantic-ui-react'
import { Translate, withLocalize } from "react-localize-redux"
import 'rc-collapse/assets/index.css'
import Http from '../../../../Http'
import Modal from 'react-modal'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		height: 470
	}
};
class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			portfolios: {},
			_portfolios: [],
			rest_items: [],
			isLoaded: false,
			isOpen: false
		}
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount() {
		Http.post('/api/front/get-page', { name: 'portfolio' })
			.then(
				res => {
					var list = JSON.parse(res.data.page.data);
					var portfolios = {};
					Object.keys(list).map((key, index) => {
						if (key == 'portfolios') {
							portfolios = list[key];
						}
					});
					this.setState({
						isLoaded: true,
						list,
						portfolios,
						_portfolios: res.data.portfolio
					});
				}
			).catch(err => {
				console.error(err);
			});
	}

	handleChange(event, type) {
		var { list } = this.state;
		const ref = this;

		switch (type) {
			case 'meta_title':
				list.meta_title = event.target.value;
				return this.setState({ list });
			case 'meta_description':
				list.meta_description = event.target.value;
				return this.setState({ list });
			case 'title':
				list.title = event.target.value;
				return this.setState({ list });
			case 'description':
				list.description = event.target.value;
				return this.setState({ list });
			case 'footer_title':
				list.footer_title = event.target.value;
				return this.setState({ list });
			case 'footer_description':
				list.footer_description = event.target.value;
				return this.setState({ list });
			case 'footer_button':
				list.footer_button = event.target.value;
				return this.setState({ list });
			case 'footer_link':
				list.footer_link = event.target.value;
				return this.setState({ list });
			case 'footer_link_name':
				list.footer_link_name = event.target.value;
				return this.setState({ list });
			case 'no_meta_title':
				list.no_meta_title = event.target.value;
				return this.setState({ list });
			case 'no_meta_description':
				list.no_meta_description = event.target.value;
				return this.setState({ list });
			case 'no_title':
				list.no_title = event.target.value;
				return this.setState({ list });
			case 'no_description':
				list.no_description = event.target.value;
				return this.setState({ list });
			case 'no_footer_title':
				list.no_footer_title = event.target.value;
				return this.setState({ list });
			case 'no_footer_description':
				list.no_footer_description = event.target.value;
				return this.setState({ list });
			case 'no_footer_button':
				list.no_footer_button = event.target.value;
				return this.setState({ list });
			case 'no_footer_link':
				list.no_footer_link = event.target.value;
				return this.setState({ list });
			case 'no_footer_link_name':
				list.no_footer_link_name = event.target.value;
				return this.setState({ list });
		}

		Object.keys(list['icon_urls']).map((key, index) => {
			if (key == type) {
				if (this.props.lang == 'en') {
					list['icon_urls'][key].text = event.target.value;
				} else {
					list['icon_urls'][key].no_text = event.target.value;
				}
				ref.setState({ list });
			}
		});
	}

	onAvatarChange(type, e) {
		var infile = document.getElementById('input-file');
		var { list } = this.state;
		const ref = this;
		if (infile.files && infile.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				if (type == 'header') { list.header_url = e.target.result; ref.setState({ list }); }
			}
			reader.readAsDataURL(infile.files[0]);
		}

		var footer_file = document.getElementById('footer-file');
		if (footer_file.files && footer_file.files[0]) {
			var reader = new FileReader();
			reader.onload = new FileReader();
			reader.onload = function (e) {
				if (type == 'footer') { list.footer_url = e.target.result; ref.setState({ list }); }
			}
			reader.readAsDataURL(footer_file.files[0]);
		}

		var icon_file = document.getElementsByClassName('icon-file');
		Object.keys(icon_file).map((key, index) => {
			if (icon_file[index].files && icon_file[index].files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					Object.keys(list['icon_urls']).map((key, i) => {
						if (key == type) {
							list['icon_urls'][type].path = e.target.result;
							ref.setState({ list });
						}
					});
				}
				reader.readAsDataURL(icon_file[index].files[0]);
			}
		});
	}

	// Update header section
	updateHeader() {
		var { list } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'portfolio', data: JSON.stringify(list), type: 'header' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update footer section
	updateFooter() {
		var { list } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'portfolio', data: JSON.stringify(list), type: 'footer' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Close modal
	closeModal() {
		this.setState({ isOpen: false });
	}
	// Add a portfolio
	onAdd(e) {
		var { portfolios, _portfolios, rest_items } = this.state;
		var types = [], rest_items = [];
		Object.keys(portfolios).map((key, i) => {
			types.push(key);
		});
		_portfolios.map((item, i) => {
			if (!types.includes(item.type)) {
				rest_items.push(item);
			}
		});
		this.setState({ isOpen: true, rest_items });
	}
	onAddPortfolio(e, key) {
		var { rest_items } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/add-portfolio-page', { data: rest_items[key], from: 'portfolio' })
			.then(
				res => {
					this.setState({ isLoaded: true, isOpen: false, portfolios: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Delete a selected portfolio
	onDeletePortfolio(e, type) {
		this.setState({ isLoaded: false });
		Http.post('/api/admin/delete-portfolio-page', { type: type, from: 'portfolio' })
			.then(
				res => {
					this.setState({ isLoaded: true, portfolios: res.data });
				}
			).catch(err => {
				console.error(err);
			});
	}
	render() {
		const { isLoaded, list, portfolios, rest_items, isOpen } = this.state;
		const lang = this.props.activeLanguage ? this.props.activeLanguage.code : 'en';
		const ref = this;
		return (
			<Translate>
				{({ translate }) => (
					<div className='admin-page'>
						{isLoaded ?
							<Segment vertical textAlign='center'>
								<Modal
									isOpen={isOpen}
									onRequestClose={this.closeModal}
									style={customStyles}
								>
									<Button icon='close' onClick={this.closeModal} />
									{rest_items.length > 0 && rest_items.map((item, i) => (
										<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'transparent', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
											<p style={{ textTransform: 'uppercase', margin: 0 }}>{item.type}</p>
											<label onClick={(e) => ref.onAddPortfolio(e, i)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label>
										</div>
									))}
									{rest_items.length == 0 && (
										<div>
											<h2>Hi,<br />Admin.</h2>
											<p>There is no more portfolio item should be added.</p>
										</div>
									)}
								</Modal>
								<Container>
									{lang === 'en' && <Grid>
										<Grid.Column computer={6}>
											<Card className='header-section'>
												<Card.Content>
													<Card.Header>{translate('card.header-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={list.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
														<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={list.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={list.title} onChange={(val) => this.handleChange(val, 'title')} />
														<Form>
															<label>{translate('card.description')}</label>
															<TextArea
																placeholder={translate('card.description-place')}
																value={list.description}
																onChange={(val) => this.handleChange(val, 'description')}
															/>
														</Form>
														<Form>
															<label>Header Image</label>
															<Form.Field>
																<input accept='image/*' type='file' id='input-file' onChange={(e) => this.onAvatarChange('header', e)} />
															</Form.Field>
														</Form>
														<div style={{ display: 'flex', justifyContent: 'space-between' }}>
															{Object.keys(list.icon_urls).map((key, index) => (
																<Form key={index}>
																	<Form.Input fluid label='Text' name='text' placeholder='Icon text' className='input-form' value={list.icon_urls[key].text} onChange={(val) => ref.handleChange(val, key)} />
																	<Form.Field>
																		<input accept='image/*' type='file' id='input-file' className='icon-file' onChange={(e) => ref.onAvatarChange(key, e)} />
																	</Form.Field>
																</Form>
															))}
														</div>
														<label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column computer={5}>
											<Card className='header-section'>
												<Card.Content>
													<Card.Header>{translate('card.footer-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={list.footer_title} onChange={(val) => this.handleChange(val, 'footer_title')} />
														<Form.Input fluid label={translate('card.btn-name')} name='button' placeholder={translate('card.btn-name')} className='input-form' value={list.footer_button} onChange={(val) => this.handleChange(val, 'footer_button')} />
														<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={list.footer_description} onChange={(val) => this.handleChange(val, 'footer_description')} />
														<Form.Input fluid label={translate('card.link')} name='link' placeholder={translate('card.link')} className='input-form' value={list.footer_link} onChange={(val) => this.handleChange(val, 'footer_link')} />
														<Form.Input fluid label={translate('card.link-name')} name='link_name' placeholder={translate('card.link-name')} className='input-form' value={list.footer_link_name} onChange={(val) => this.handleChange(val, 'footer_link_name')} />
														<Form>
															<label>{translate('card.footer-img')}</label>
															<Form.Field>
																<input accept='image/*' type='file' id='footer-file' onChange={(e) => this.onAvatarChange('footer', e)} />
															</Form.Field>
														</Form>
														<label className='ui floated button save-btn' onClick={this.updateFooter.bind(this)}> {translate('card.save')} </label>
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column computer={5}>
											<Card className='header-section'>
												<Card.Content>
													<Card.Header>{translate('card.portfolio-section')}</Card.Header>
													<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														{Object.keys(portfolios).map((key, i) => (
															<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
																<p style={{ textTransform: 'uppercase', margin: 0 }}>{key}</p>
																<label onClick={(e) => ref.onDeletePortfolio(e, key)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
															</div>
														))}
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
									</Grid>}
									{lang === 'nb' && <Grid>
										<Grid.Column computer={6}>
											<Card className='header-section'>
												<Card.Content>
													<Card.Header>{translate('card.header-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={list.no_meta_title} onChange={(val) => this.handleChange(val, 'no_meta_title')} />
														<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={list.no_meta_description} onChange={(val) => this.handleChange(val, 'no_meta_description')} />
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={list.no_title} onChange={(val) => this.handleChange(val, 'no_title')} />
														<Form>
															<label>{translate('card.description')}</label>
															<TextArea
																placeholder={translate('card.description-place')}
																value={list.no_description}
																onChange={(val) => this.handleChange(val, 'no_description')}
															/>
														</Form>
														<Form>
															<label>{translate('card.header-img')}</label>
															<Form.Field>
																<input accept='image/*' type='file' id='input-file' onChange={(e) => this.onAvatarChange('header', e)} />
															</Form.Field>
														</Form>
														<div style={{ display: 'flex', justifyContent: 'space-between' }}>
															{Object.keys(list.icon_urls).map((key, index) => (
																<Form key={index}>
																	<Form.Input fluid label={translate('card.text')} name='text' placeholder={translate('card.text')} className='input-form' value={list.icon_urls[key].no_text} onChange={(val) => ref.handleChange(val, key)} />
																	<Form.Field>
																		<input accept='image/*' type='file' id='input-file' className='icon-file' onChange={(e) => ref.onAvatarChange(key, e)} />
																	</Form.Field>
																</Form>
															))}
														</div>
														<label className='ui floated button save-btn' onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column computer={5}>
											<Card className='header-section'>
												<Card.Content>
													<Card.Header>{translate('card.footer-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														<Form.Input fluid label={translate('card.title')} name='title' placeholder={translate('card.title')} className='input-form' value={list.no_footer_title} onChange={(val) => this.handleChange(val, 'no_footer_title')} />
														<Form.Input fluid label={translate('card.btn-name')} name='button' placeholder={translate('card.btn-name')} className='input-form' value={list.no_footer_button} onChange={(val) => this.handleChange(val, 'no_footer_button')} />
														<Form.Input fluid label={translate('card.description')} name='description' placeholder={translate('card.description')} className='input-form' value={list.no_footer_description} onChange={(val) => this.handleChange(val, 'no_footer_description')} />
														<Form.Input fluid label={translate('card.link')} name='link' placeholder={translate('card.link')} className='input-form' value={list.no_footer_link} onChange={(val) => this.handleChange(val, 'no_footer_link')} />
														<Form.Input fluid label={translate('card.link-name')} name='link_name' placeholder={translate('card.link-name')} className='input-form' value={list.no_footer_link_name} onChange={(val) => this.handleChange(val, 'no_footer_link_name')} />
														<Form>
															<label>{translate('card.footer-img')}</label>
															<Form.Field>
																<input accept='image/*' type='file' id='footer-file' onChange={(e) => this.onAvatarChange('footer', e)} />
															</Form.Field>
														</Form>
														<label className='ui floated button save-btn' onClick={this.updateFooter.bind(this)}> {translate('card.save')} </label>
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column computer={5}>
											<Card className='header-section'>
												<Card.Content>
													<Card.Header>{translate('card.portfolio-section')}</Card.Header>
													<Card.Description style={{ position: 'absolute', top: 4, right: 20 }}><label onClick={(e) => ref.onAdd(e)}><Icon name='add' style={{ cursor: 'pointer' }}></Icon></label></Card.Description>
												</Card.Content>
												<Card.Content>
													<Card.Description>
														{Object.keys(portfolios).map((key, i) => (
															<div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: '#f7f7f7', border: '1px solid #d9d9d9', padding: '10px 16px', color: '#666', cursor: 'pointer' }}>
																<p style={{ textTransform: 'uppercase', margin: 0 }}>{key}</p>
																<label onClick={(e) => ref.onDeletePortfolio(e, key)}><Icon name='trash outline' style={{ cursor: 'pointer' }}></Icon></label>
															</div>
														))}
													</Card.Description>
												</Card.Content>
											</Card>
										</Grid.Column>
									</Grid>}
								</Container>
							</Segment>
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