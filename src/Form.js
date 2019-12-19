import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export class Data extends Component {
    constructor(props) {
        super(props);
        this.state = { name: "", mail: "", alias: "" }
        console.log(props.history)
    }
    cambio = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    add = () => {
        let params = {
            method: 'POST',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(this.state)
        };
        console.log(params.body);
        fetch('https://localhost:44314/api/Players', params)
            .then(response => response.json())
            .then(data => {
                this.setState({ name: "", mail: "", alias: "" });
                this.props.history.push('/');
            })
    }
    edit = (id) => {
        let params = {
            method: 'PUT',
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(this.state)
        };
        console.log(params.body);

        fetch('https://localhost:44314/api/Players/' + id, params)
            .then(response => response.text())
            .then(data => this.props.history.goBack())
    }
    componentDidMount() {
        fetch('https://localhost:44314/api/Players/' + this.props.id)
            .then(response => response.json())
            .then(data => {
                this.setState({ ...data })
            })
    }

    render() {
        return (
            <Form>
                <Form.Row>
                    <Col><Form.Control name="name" placeholder="name" onChange={this.cambio} value={this.state.name} /></Col>
                    <Col><Form.Control name="mail" placeholder="mail" onChange={this.cambio} value={this.state.mail} /></Col>
                    <Col><Form.Control name="alias" placeholder="alias" onChange={this.cambio} value={this.state.alias} /></Col>
                    <Col><Button onClick={this.props.id ? this.edit : this.add} variant="secondary">Enviar</Button></Col>
                </Form.Row>
            </Form>
        );
    }
}
export class Edit extends Component {
    id = this.props.match.params.id;
    history = this.props.history;
    render(){
        return (
            <div>
                <Data id={this.id} history={this.history}/>
            </div>
        );
    }
    
}