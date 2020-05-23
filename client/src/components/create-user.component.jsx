import React, { Component } from 'react';
import axios from 'axios';
//import { render } from '@testing-library/react';

export default class CreateUser extends Component{

    constructor(props){
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { username : "" };
    }

    onChange(event){

        this.setState({ username : event.target.value });

    }

    onSubmit(event){
        debugger;
        event.preventDefault();
        const user = {
            username : this.state.username
        }
        axios.post("/users/add/",user)
        .then( res => console.log(res.data, "user added to MongoDB"))
        .catch(err => console.log(err));
        this.setState({ username : "" })
        console.log("User name is ",user);
    }

    render(){
        return(
            <div>
                <h3>Create New User</h3>
                <form onSubmit={ this.onSubmit}>
                    <div className="form-group">
                    <label>User Name :</label>
                    <input onChange={ this.onChange } value={ this.state.username }
                    className="form-control" required type="text" />
                    </div>
                    <div className="form-group">
                      <input type="submit" className="btn btn-primary" required  value="Create User"/>
                    </div>

                </form>
            </div>
        )
    }

}