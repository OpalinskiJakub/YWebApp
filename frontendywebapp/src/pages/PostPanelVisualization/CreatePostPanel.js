import React, {Component} from "react";
import RegisterAutorization from "../Authorisation/UserAuthorisation/RegisterService";
import {Button, Card, Col, Form, Row} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import Post from "../StorageSystem/PostPanel/Model/Post";
import PostService from "../Authorisation/PostAuthorisation/PostService";

class CreatePostPanel extends Component{
    constructor() {
        super();
        this.state = {
            createdAlert: false,
            errorAlert:false,
            formData: {
                title: '',
                content: ''
            }
        };
        this.postService = PostService.getInstance();
    }


    handleInputChange = (event) => {
        const {name,value} = event.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            }
        }));
    };

    createPost = async () => {
        let data = {
            content:this.state.content,
            title:this.state.title
        }
        let response = await this.postService.validateAndSendPost(data);
        if(response===true){
            this.setState({
                createdAlert: true,
                errorAlert:false,
            })
        }else{
            this.setState({
                createdAlert: false,
                errorAlert:true,
            })
        }
    }



    render() {
        return (
            <Card className="mx-auto" style={{ width: "80%", margin: "10px" }}>
                <Card.Header>
            <Col md={{ span: 8, offset: 2 } } style={{ padding: '5%' }}>
                <Card style={{ padding: '4%' }}>
                    {this.state.errorAlert ? (
                        <Alert
                            variant="danger"
                            onClose={() => this.setState({ validateAlert: false })}
                            dismissible
                            style={{ fontSize: 'smaller' }}
                        >
                            Niepoprawne dane lub konto z podanymi danymi juz istnieje
                        </Alert>
                    ) : null}

                    {this.state.createdAlert ? (

                        <Alert
                            variant="success"
                            onClose={() => this.setState({ validateAlert: false })}
                            dismissible
                            style={{ fontSize: 'smaller' }}
                        >
                            <Container>
                                <Row>
                                    Pomyślnie zarejestrowano
                                </Row>
                                <Row>
                                    <Button variant="outline-success" style={{marginTop:"3%"}} as={Link} to="/access/LoginPanel">
                                        Przejdz do logowania
                                    </Button>
                                </Row>
                            </Container>
                        </Alert>

                    ) : null}



                    <Form>
                        <Form.Group controlId="formEmail" style={{ padding: '4%' }}>
                            <Form.Label>Temat</Form.Label>
                            < Form.Control
                                required
                                type="text"
                                placeholder="Enter your email"
                                name="title"
                                value={this.state.formData.title}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formUsername" style={{ padding: '4%' }}>
                            <Form.Label>Tresc</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                required
                                placeholder="Enter your description"
                                name="content"
                                value={this.state.formData.content}
                                onChange={this.handleInputChange}
                            />
                        </Form.Group>

                        <Button variant="outline-primary"
                        onClick={this.createPost}
                        >Stworz post</Button>
                    </Form>
                </Card>
            </Col>
                </Card.Header>
            </Card>

                    );
    }

}
export default CreatePostPanel;