import React from 'react'
import { Grid, Dimmer, Segment, Loader, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { Translate, withLocalize } from "react-localize-redux"
import Http from '../../../Http'
class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			isLoaded: false
		}
	}

	componentDidMount() {
		this.props.setActiveLanguage(this.props.lang);
		Http.get('/api/admin/pages').then(
			res => {
				this.setState({ isLoaded: true, list: res.data });
			}
		).catch(err => {
			console.error(err);
		});
	}

	render() {
		const { isLoaded, list } = this.state;
		const { lang } = this.props;
		return (
			<Translate>
				{({ translate }) => (
					<div className='admin-pages'>
						{isLoaded ?
							<Segment vertical textAlign='center'>
								<Grid padded='horizontally'>
									<Grid.Column width={8}>
										<List selection divided relaxed>
											{list.map((item, i) => (
												!item.page_name.includes('privacy') && <List.Item key={i} as={Link} to={`/admin/single-page/${item.page_name}`}>
													<List.Icon name='tag' size='large' verticalAlign='middle' />
													<List.Content>
														<List.Header><p>{lang=='en'?item.admin_page_name:item.no_admin_page_name}</p></List.Header>
														<List.Description>{translate('card.updated-at')} {item.updated_at}</List.Description>
													</List.Content>
												</List.Item>
											))}
										</List>
									</Grid.Column>
								</Grid>
							</Segment>
							:
							<Segment className='page-loader'>
								<Dimmer active inverted>
									<Loader size='large'>{translate('alert.loading')}</Loader>
								</Dimmer>
							</Segment>}
					</div>
				)}
			</Translate>
		);
	}
}

export default withLocalize(Page);