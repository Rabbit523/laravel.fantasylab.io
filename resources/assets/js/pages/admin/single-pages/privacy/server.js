import React from 'react'
import { Container, Grid, Segment, Card, Form } from 'semantic-ui-react'
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';

class Page extends React.Component {    
    render() {
        let { page } = this.props;
        return (
            <div className="admin-page">
                <Segment vertical textAlign='center'>
                    <Container>
                        <Grid padded="vertically">
                            <Grid.Column className="custom-column" width={16}>
                                <Card className="header-section">
                                    <Card.Content>
                                        <Card.Header>Header Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
                                        <Card.Description>
                                            <Form.Input fluid label='Meta Title' name='meta_title' placeholder='Meta title' className='input-form' value={list.meta_title} onChange={(val) => this.handleChange(val, 'meta_title')} />
                                            <Form.Input fluid label='Meta Description' name='meta_description' placeholder='Meta description' className='input-form' value={list.meta_description} onChange={(val) => this.handleChange(val, 'meta_description')} />
                                            <label className="ui floated button save-btn" onClick={this.updateHeader.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column className="custom-column" width={16}>
                                <Card className="header-section">
                                    <Card.Content>
                                        <Card.Header>Privacy Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
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
                                            <label className="ui floated button save-btn" onClick={this.updatePrivacy.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column className="custom-column" width={16}>
                                <Card className="header-section">
                                    <Card.Content>
                                        <Card.Header>Security Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
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
                                            <label className="ui floated button save-btn" onClick={this.updateSecurity.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column className="custom-column" width={16}>
                                <Card className="header-section">
                                    <Card.Content>
                                        <Card.Header>Terms Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
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
                                            <label className="ui floated button save-btn" onClick={this.updateTerms.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                            <Grid.Column className="custom-column" width={16}>
                                <Card className="header-section">
                                    <Card.Content>
                                        <Card.Header>Confident Section</Card.Header>
                                    </Card.Content>
                                    <Card.Content>
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
                                            <label className="ui floated button save-btn" onClick={this.updateConfident.bind(this)}> Save </label>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        </Grid>
                    </Container>
                </Segment>           
            </div>
        );
    }
}

export default Page;