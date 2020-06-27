import React, {Component} from "react";
import axios from "axios";

export default class ReviewExercise extends Component {

    // TODO - Have to do
    // * Done
    // ! - More important todo

    // TODO To Do's
    // TODO Maybe check the users input on reps and let them know different things
        // TODO If there is a big difference then inform them to lower the reps to keep their motivation up...etc
        // TODO if there is a little  different  them tell them to keep it the hard work
        // TODO If they are exact, award them something

    // TODO Look at the reps section, on the review only take the Integer portion of the input, don't take the secondary input... this would clean up the section.
    // TODO - OR take the whole input and then parse it in the completed exercises page.

    constructor(props) {
        super(props);
        this.state = {
            exercise_review: "",
            exercise_reps: "",
            status: "",
        }
        this.onChangeExerciseReview = this.onChangeExerciseReview.bind(this);
        this.onChangeExerciseReps = this.onChangeExerciseReps.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeExerciseReview = (e) => {
        this.setState({exercise_review: e.target.value});
    }

    onChangeExerciseReps = (e) => {
        this.setState({exercise_reps: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newExerciseReview = {
            exercise_review: this.state.exercise_review,
            exercise_reps: parseInt(this.state.exercise_reps),
            exercise_reviewed: this.props.location.state.exercise._id,
        };
        axios.post("http://localhost:5000/exercises/addReview", {exercise: newExerciseReview, id: this.props.match.params.id})
            .then(res => this.setState({status: res.data.review}))
            .catch(err => this.setState({status: err.errMsg}));
        this.setState({
            exercise_review: "",
            exercise_reps: "",
        });
    }

    render() {
        return (

            <div className="" style={{margin: 10, display: "flex"}}>
                <div className="card" style={{width: "16rem"}}>
                    <img className="card-img-top" src={this.props.location.state.exercise.exercise_image_url} alt="Exercise Demonstration Example"/>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.location.state.exercise.exercise_title}</h5>
                        <p className="card-text">{this.props.location.state.exercise.exercise_description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Reps: {this.props.location.state.exercise.exercise_reps}</li>
                        <li className="list-group-item" style={{textTransform: "capitalize"}}>Completed: {String(this.props.location.state.exercise.exercise_completed)}</li>
                    </ul>
                </div>

                <div className="container">
                    <h3>Exercise Review</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label style={{marginTop: 10}}>How did you find the Exercise?</label>
                            <input type="text" className="form-control" value={this.state.exercise_review} onChange={this.onChangeExerciseReview} placeholder="Exercise Review"  required/>
                            <label style={{marginTop: 10}}>How many reps did you do?</label>
                            <input type="text" className="form-control" style={{width:"20%"}} value={this.state.exercise_reps} onChange={this.onChangeExerciseReps} placeholder="Exercise Reps" required/>
                            <input type="submit" value="Complete Exercise" className="btn btn-primary mt-3"/>
                        </div>
                    </form>
                    <h4 className="text-success">{this.state.status}</h4>
                </div>
            </div>
        )
    }

    // componentDidMount = () => {
    //     axios.get("http://localhost:4000/exercises/get/" + this.props.match.params.id)
    //         .then(() => this.setState({
    //             exercise_title: this.props.exercise_title,
    //         }))
    // }


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         status: "",
    //     }
    // }

    // componentDidMount = () => {
    //     axios.post("http://localhost:4000/exercises/delete/" + this.props.match.params.id)
    //         .then(() => this.setState({status: "Successfully Deleted Exercise"}))
    //         .catch((err) => this.setState({status: "Error Deleting Exercise"}));
    // }

}