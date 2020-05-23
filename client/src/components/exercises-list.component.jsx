import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import { render } from '@testing-library/react';

const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/" + props.exercise._id}>edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component{

    constructor(props){
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);
        this.listExercise = this.listExercise.bind(this);
        this.state = { exercise : [] };

    }

    componentDidMount(){
        
        axios.get("/exercises")
        .then( res => {
            if( res.data.length > 0){
                this.setState({ exercise : res.data})
            }
        })
        .catch(err => console.log(err));

    }

    deleteExercise(id) {
        axios.delete('/exercises/'+id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          exercise: this.state.exercise.filter(el => el._id !== id)
        })
      }

    listExercise(){

     return   this.state.exercise.map(currentExercise =>{
         return <Exercise exercise={currentExercise} key={currentExercise._id}
             deleteExercise={this.deleteExercise} />
     })
    }

    render(){
        return(
            <div>
                <h3>Logged Exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.listExercise()}
                    </tbody>
                </table>
            </div>
        )
    }

}