// ** create-user.component.js ** //

import React, { Component } from 'react';
import axios from 'axios';

export default class EditUser extends Component {

    constructor(props) {
        super(props)
       
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
                         

        this.state = {
            id:'',
            name: '',
            email: ''
        }
        console.log(this.state);
        
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:4000/users/get-user/${id}`)
        .then(res => {
        
            this.setState({ 
                id:res.data._id,
                name: res.data.name,
                email: res.data.email 
            });
            this.state = {
                id:res.data._id,
                name: res.data.name,
                email: res.data.email
            }
            console.log(this.state);
       
        })
        .catch(function (error) {
            console.log(error);
        })
    }


    // obtenerUser= async() => {
        
    //     const id = this.props.match.params.id;
    //     //console.log(id);
    //     const respuesta = await axios.get(`http://localhost:4000/users/get-user/${id}`)
    //     this.user = {
    //         id:respuesta.data._id,
    //         name: respuesta.data.name,
    //         email: respuesta.data.email
    //     }
        
    //     console.log(this.state);
    //     return (this.state);

    // }


    onChangeUserName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
        const id = this.props.match.params.id;
        const userObject = {
            name: this.state.name,
            email: this.state.email
        };
        console.log(userObject);

        axios.put(`http://localhost:4000/users/update/${id}`, userObject)
            .then((res) => {
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });

        this.setState({ name: '', email: '' })
        window.location.href='/users';
    }


    render() {
        return (
            <div className="wrapper col-md-4 mt-5">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" value={this.state.name} onChange={this.onChangeUserName} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>User Email</label>
                        <input type="text" value={this.state.email} onChange={this.onChangeUserEmail} className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Edit User" className="btn btn-success btn-block" />
                    </div>
                </form>
            </div>
        )
    }
}