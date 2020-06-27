import React, {Component} from "react";
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
            </ul>
            <div className="card-body">
                <h5 className="card-title">Review</h5>
                <p className="card-text">{props.review.exercise_review}</p>
                <p className="card-text">Reps: {props.review.exercise_reps}/{props.exercise.exercise_reps}</p>
            </div>
        </div>
    </div>
);

export default class CompletedExerciseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exercises: [],
            reviews: [],
        };
    }

    componentDidMount = () => {
        if (localStorage.getItem("email")) {
            const data = {
                email: localStorage.getItem("email"),
            }
            axios.post("http://localhost:5000/exercises/", data)
                .then(res => {
                    this.setState({
                        exercises: res.data
                    })
                })
                .catch(err => console.log(err));

            axios.get("http://localhost:5000/exercises/completed")
                .then(res => {
                    this.setState({
                        reviews: res.data
                    })
                }).catch(err => console.log(err));
        } else {
            this.props.history.push("/");
        }
    }

    exerciseList() {
        let arr = [];
        for (let i = 0; i < this.state.exercises.length; i++) {
            for (let j = 0; j < this.state.reviews.length; j++) {
                if (this.state.exercises[i]._id === this.state.reviews[j].exercise_reviewed && this.state.exercises[i].exercise_completed) {
                    arr.push(<Exercise exercise={this.state.exercises[i]} review={this.state.reviews[j]} key={i}/>);
                }
            }
        }
        arr.reverse();
        return arr.map(currentItem => {
            return currentItem;
        });
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Completed Exercises</h3>
                <div className="row">
                    {this.exerciseList()}
                </div>
            </div>
        )
    }
}