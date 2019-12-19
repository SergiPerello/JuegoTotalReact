import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
class Player extends Component {
	edit = () => {
		this.props.edit(this.props.id);
	}
	delete = () => {
		this.props.delete(this.props.id);
	}
	render() {
		return (
			<tr>
				<td>{this.props.name}</td>
				<td>{this.props.mail}</td>
				<td>{this.props.alias}</td>
				<td>
					<Button variant="secondary" href={"/edit/" + this.props.id}>Edit</Button>
					<Button variant="danger" onClick={this.delete}>Delete</Button>
				</td>
			</tr>
		)
	}
}
class Players extends Component {
	constructor(props) {
		super(props);
		this.state = {
			players: []
		}
	}

	componentDidMount() {
		fetch("https://localhost:44314/api/players")
			.then(response => response.json())
			.then(data => {
				this.setState({ players: data });
				console.log(data);
			})
			.catch(error => console.log(error))
	}

	delete = (id) => {
        let params = {
            method: 'DELETE',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        };
        fetch('https://localhost:44314/api/Players/' + id, params)
            .then(response => response.json())
            .then(data => {
                this.componentDidMount();
            })
    }

	render() {
		const rows = this.state.players.map((row, index) => {
			return (<Player
				key={row.id} id={row.id} name={row.name}
				mail={row.mail} alias={row.alias} edit={this.edit}
				delete={this.delete} />);
		});
		return (
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>Name</th>
						<th>Mail</th>
						<th>Alias</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</Table>)
	}
}

export default Players;