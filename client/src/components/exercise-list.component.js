import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
    <div className="col-md-13" style={{margin: 10}}>
        <div className="card" style={{width: "16rem"}}>
            <img className="card-img-top" src={props.exercise.exercise_image_url} alt="Exercise Demonstration Example"/>
            <div className="card-body">
                <h5 className="card-title">{props.exercise.exercise_title}</h5>
                <p className="card-text">{props.exercise.exercise_description}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Reps: {props.exercise.exercise_reps}</li>
                <li className="list-group-item" style={{textTransform: "capitalize"}}>Completed: {String(props.exercise.exercise_completed)}</li>
            </ul>
            <div className="card-body">
                <Link to={{
                    pathname: "/delete/" + props.exercise._id,
                    state: {
                        exercise: props.exercise,
                    }
                }}>Click Me to Complete</Link>
            </div>
        </div>
    </div>
);

export default class ExerciseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
        };
    }

    componentDidMount() {
        if (localStorage.getItem("email")) {
            const data = {
                email: localStorage.getItem("email")
            };
            axios.post("http://localhost:5000/exercises/", data)
                .then(res => {
                    this.setState({
                        exercises: res.data
                    })
                })
                .catch(err => console.log(err));
        } else {
            this.props.history.push("/");
        }
    }

    exerciseList() {
        return this.state.exercises.map((currentExercise, i) => {
            if (!currentExercise.exercise_completed)
                return <Exercise exercise={currentExercise} key={i}/>;
            return undefined;
        });
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Current Exercises</h3>
                <div className="row">
                    {this.exerciseList()}
                </div>
            </div>
        )
    }
}