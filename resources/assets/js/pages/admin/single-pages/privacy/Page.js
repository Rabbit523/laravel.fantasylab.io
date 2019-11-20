import React from 'react'
import { Container, Grid, Dimmer, Segment, Loader, Card, Form } from 'semantic-ui-react'
import { Translate, withLocalize } from "react-localize-redux"
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-nb-NO';
import { Manager, Reference, Popper } from 'react-popper';
import Http from '../../../../Http'

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			privacy: "",
			security: "",
			terms: "",
			confident: "",
			no_privacy: "",
			no_security: "",
			no_terms: "",
			no_confident: "",
			isLoaded: false,
			accordion: false
		}
		this.onPrivacyChange = this.onPrivacyChange.bind(this);
		this.onSecurityChange = this.onSecurityChange.bind(this);
		this.onTermsChange = this.onTermsChange.bind(this);
		this.onConfidentChange = this.onConfidentChange.bind(this);
		this.onNbPrivacyChange = this.onNbPrivacyChange.bind(this);
		this.onNbSecurityChange = this.onNbSecurityChange.bind(this);
		this.onNbTermsChange = this.onNbTermsChange.bind(this);
		this.onNbConfidentChange = this.onNbConfidentChange.bind(this);
	}

	componentDidMount() {
		this.props.setActiveLanguage(this.props.lang);
		Http.post('/api/front/get-page', { name: 'privacy' })
			.then(
				res => {
					var list = JSON.parse(res.data.data);
					this.setState({
						isLoaded: true,
						list,
						privacy: list.privacy,
						security: list.security,
						terms: list.terms,
						confident: list.confident,
						no_privacy: list.no_privacy,
						no_security: list.no_security,
						no_terms: list.no_terms,
						no_confident: list.no_confident
					});
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Get change event for the meta title and description
	handleChange(event, type) {
		var { list } = this.state;
		switch (type) {
			case 'meta_title':
				list.meta_title = event.target.value;
				return this.setState({ list });
			case 'meta_description':
				list.meta_description = event.target.value;
				return this.setState({ list });
			case 'no_meta_title':
				list.no_meta_title = event.target.value;
				return this.setState({ list });
			case 'no_meta_description':
				list.no_meta_description = event.target.value;
				return this.setState({ list });
		}
	}
	// Get summernote change event for update the state
	onPrivacyChange(content) {
		this.setState({ privacy: content });
	}
	onNbPrivacyChange(content) {
		this.setState({ no_privacy: content });
	}
	onSecurityChange(content) {
		this.setState({ security: content });
	}
	onNbSecurityChange(content) {
		this.setState({ no_security: content });
	}
	onTermsChange(content) {
		this.setState({ terms: content });
	}
	onNbTermsChange(content) {
		this.setState({ no_terms: content });
	}
	onConfidentChange(content) {
		this.setState({ confident: content });
	}
	onNbConfidentChange(content) {
		this.setState({ no_confident: content });
	}
	// Update header section
	updateHeader() {
		var { list } = this.state;
		var meta_info = {
			meta_title: list.meta_title,
			meta_description: list.meta_description,
			no_meta_title: list.no_meta_title,
			no_meta_description: list.no_meta_description
		};
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'privacy', data: meta_info, type: 'header' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update privacy section
	updatePrivacy() {
		var { privacy, no_privacy } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'privacy', data: {"en":privacy, "no":no_privacy}, type: 'privacy' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update security section
	updateSecurity() {
		var { security, no_security } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'privacy', data: {"en":security, "no":no_security}, type: 'security' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update terms section
	updateTerms() {
		var { terms, no_terms } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'privacy', data: {"en":terms, "no":no_terms}, type: 'terms' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	// Update confident section
	updateConfident() {
		var { confident, no_confident } = this.state;
		this.setState({ isLoaded: false });
		Http.post('/api/admin/update-page', { name: 'privacy', data: {"en":confident, "no":no_confident}, type: 'confident' })
			.then(
				res => {
					this.setState({ isLoaded: true });
				}
			).catch(err => {
				console.error(err);
			});
	}
	render() {
		const { isLoaded, list, privacy, security, terms, confident, no_privacy, no_security, no_terms, no_confident } = this.state;
		const { lang } = this.props;
		return (
			<Translate>
				{({ translate }) => (
					<div className="admin-page">
						{isLoaded ?
							<Segment vertical textAlign='center'>
								<Container>
									<Grid padded="vertically">
										<Grid.Column className="custom-column" width={16}>
											<Card className="header-section">
												<Card.Content>
													<Card.Header>{translate('card.header-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
												{lang == 'en' && 
													<Card.Description>
														<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={list.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
														<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={list.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
														<label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
													</Card.Description>
												}
												{lang == 'no' && 
													<Card.Description>
														<Form.Input fluid label={translate('card.meta-title')} name='meta_title' placeholder={translate('card.meta-title')} className='input-form' value={list.no_meta_title} onChange={(val) => this.handleChange(val, 'no_meta_title')} />
														<Form.Input fluid label={translate('card.meta-description')} name='meta_description' placeholder={translate('card.meta-description')} className='input-form' value={list.no_meta_description} onChange={(val) => this.handleChange(val, 'no_meta_description')} />
														<label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> {translate('card.save')} </label>
													</Card.Description>
												}
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column className="custom-column" width={16}>
											<Card className="header-section">
												<Card.Content>
													<Card.Header>{translate('card.privacy-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													{lang == 'en' && 
													<Card.Description>
														<ReactSummernote
															value={privacy}
															options={{
																lang: 'en-EN',
																height: 350,
																dialogsInBody: true,
																insertTableMaxSize: {
																	col: 20,
																	row: 20
																},
																table: [
																	['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																	['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																],
																link: [
																	['link', ['linkDialogShow', 'unlink']]
																],
																toolbar: [
																	['style', ['style']],
																	['font', ['bold', 'underline', 'clear']],
																	['fontname', ['fontname']],
																	['color', ['color']],
																	['para', ['ul', 'ol', 'paragraph']],
																	['table', ['table']],
																	['insert', ['link', 'picture', 'video']],
																	['view', ['fullscreen', 'codeview']]
																]
															}}
															onChange={this.onPrivacyChange}
														/>
														<label className="ui floated button save-btn" onClick={this.updatePrivacy.bind(this)}> {translate('card.save')} </label>
													</Card.Description>}
													{lang == 'no' && 
													<Card.Description>
														<ReactSummernote
															value={no_privacy}
															options={{
																lang: 'nb-NO',
																height: 350,
																dialogsInBody: true,
																insertTableMaxSize: {
																	col: 20,
																	row: 20
																},
																table: [
																	['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																	['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																],
																link: [
																	['link', ['linkDialogShow', 'unlink']]
																],
																toolbar: [
																	['style', ['style']],
																	['font', ['bold', 'underline', 'clear']],
																	['fontname', ['fontname']],
																	['color', ['color']],
																	['para', ['ul', 'ol', 'paragraph']],
																	['table', ['table']],
																	['insert', ['link', 'picture', 'video']],
																	['view', ['fullscreen', 'codeview']]
																]
															}}
															onChange={this.onNbPrivacyChange}
														/>
														<label className="ui floated button save-btn" onClick={this.updatePrivacy.bind(this)}> {translate('card.save')} </label>
													</Card.Description>}
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column className="custom-column" width={16}>
											<Card className="header-section">
												<Card.Content>
													<Card.Header>{translate('card.security-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													{lang == 'en' &&
													<Card.Description>
														<ReactSummernote
															value={security}
															options={{
																lang: 'en-EN',
																height: 350,
																dialogsInBody: true,
																insertTableMaxSize: {
																	col: 20,
																	row: 20
																},
																table: [
																	['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																	['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																],
																link: [
																	['link', ['linkDialogShow', 'unlink']]
																],
																toolbar: [
																	['style', ['style']],
																	['font', ['bold', 'underline', 'clear']],
																	['fontname', ['fontname']],
																	['color', ['color']],
																	['para', ['ul', 'ol', 'paragraph']],
																	['table', ['table']],
																	['insert', ['link', 'picture', 'video']],
																	['view', ['fullscreen', 'codeview']]
																]
															}}
															onChange={this.onSecurityChange}
														/>
														<label className="ui floated button save-btn" onClick={this.updateSecurity.bind(this)}> {translate('card.save')} </label>
													</Card.Description>}
													{lang == 'no' &&
													<Card.Description>
														<ReactSummernote
															value={no_security}
															options={{
																lang: 'nb-NO',
																height: 350,
																dialogsInBody: true,
																insertTableMaxSize: {
																	col: 20,
																	row: 20
																},
																table: [
																	['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																	['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																],
																link: [
																	['link', ['linkDialogShow', 'unlink']]
																],
																toolbar: [
																	['style', ['style']],
																	['font', ['bold', 'underline', 'clear']],
																	['fontname', ['fontname']],
																	['color', ['color']],
																	['para', ['ul', 'ol', 'paragraph']],
																	['table', ['table']],
																	['insert', ['link', 'picture', 'video']],
																	['view', ['fullscreen', 'codeview']]
																]
															}}
															onChange={this.onNbSecurityChange}
														/>
														<label className="ui floated button save-btn" onClick={this.updateSecurity.bind(this)}> {translate('card.save')} </label>
													</Card.Description>}
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column className="custom-column" width={16}>
											<Card className="header-section">
												<Card.Content>
													<Card.Header>{translate('card.terms-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													{lang == 'en' &&
													<Card.Description>
														<ReactSummernote
															value={terms}
															options={{
																lang: 'en-EN',
																height: 350,
																dialogsInBody: true,
																insertTableMaxSize: {
																	col: 20,
																	row: 20
																},
																table: [
																	['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																	['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																],
																link: [
																	['link', ['linkDialogShow', 'unlink']]
																],
																toolbar: [
																	['style', ['style']],
																	['font', ['bold', 'underline', 'clear']],
																	['fontname', ['fontname']],
																	['color', ['color']],
																	['para', ['ul', 'ol', 'paragraph']],
																	['table', ['table']],
																	['insert', ['link', 'picture', 'video']],
																	['view', ['fullscreen', 'codeview']]
																]
															}}
															onChange={this.onTermsChange}
														/>
														<label className="ui floated button save-btn" onClick={this.updateTerms.bind(this)}> {translate('card.save')} </label>
													</Card.Description>}
													{lang == 'no' &&
													<Card.Description>
														<ReactSummernote
															value={no_terms}
															options={{
																lang: 'nb-NO',
																height: 350,
																dialogsInBody: true,
																insertTableMaxSize: {
																	col: 20,
																	row: 20
																},
																table: [
																	['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																	['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																],
																link: [
																	['link', ['linkDialogShow', 'unlink']]
																],
																toolbar: [
																	['style', ['style']],
																	['font', ['bold', 'underline', 'clear']],
																	['fontname', ['fontname']],
																	['color', ['color']],
																	['para', ['ul', 'ol', 'paragraph']],
																	['table', ['table']],
																	['insert', ['link', 'picture', 'video']],
																	['view', ['fullscreen', 'codeview']]
																]
															}}
															onChange={this.onNbTermsChange}
														/>
														<label className="ui floated button save-btn" onClick={this.updateTerms.bind(this)}> {translate('card.save')} </label>
													</Card.Description>}
												</Card.Content>
											</Card>
										</Grid.Column>
										<Grid.Column className="custom-column" width={16}>
											<Card className="header-section">
												<Card.Content>
													<Card.Header>{translate('card.confident-section')}</Card.Header>
												</Card.Content>
												<Card.Content>
													{lang == 'en' &&
													<Card.Description>
														<ReactSummernote
															value={confident}
															options={{
																lang: 'en-EN',
																height: 350,
																dialogsInBody: true,
																insertTableMaxSize: {
																	col: 20,
																	row: 20
																},
																table: [
																	['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																	['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																],
																link: [
																	['link', ['linkDialogShow', 'unlink']]
																],
																toolbar: [
																	['style', ['style']],
																	['font', ['bold', 'underline', 'clear']],
																	['fontname', ['fontname']],
																	['color', ['color']],
																	['para', ['ul', 'ol', 'paragraph']],
																	['table', ['table']],
																	['insert', ['link', 'picture', 'video']],
																	['view', ['fullscreen', 'codeview']]
																]
															}}
															onChange={this.onConfidentChange}
														/>
														<label className="ui floated button save-btn" onClick={this.updateConfident.bind(this)}> {translate('card.save')} </label>
													</Card.Description>}
													{lang == 'no' &&
													<Card.Description>
														<ReactSummernote
															value={no_confident}
															options={{
																lang: 'nb-NO',
																height: 350,
																dialogsInBody: true,
																insertTableMaxSize: {
																	col: 20,
																	row: 20
																},
																table: [
																	['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
																	['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
																],
																link: [
																	['link', ['linkDialogShow', 'unlink']]
																],
																toolbar: [
																	['style', ['style']],
																	['font', ['bold', 'underline', 'clear']],
																	['fontname', ['fontname']],
																	['color', ['color']],
																	['para', ['ul', 'ol', 'paragraph']],
																	['table', ['table']],
																	['insert', ['link', 'picture', 'video']],
																	['view', ['fullscreen', 'codeview']]
																]
															}}
															onChange={this.onNbConfidentChange}
														/>
														<label className="ui floated button save-btn" onClick={this.updateConfident.bind(this)}> {translate('card.save')} </label>
													</Card.Description>}
												</Card.Content>
											</Card>
										</Grid.Column>
									</Grid>
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