import React, {Component} from "react";
import axios from "axios";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";

const img1 = "https://images.unsplash.com/photo-1544216717-3bbf52512659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";
const img2 = "https://images.unsplash.com/photo-1571008745438-2c05b20d8ef2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";
const img3 = "https://images.unsplash.com/photo-1546442952-ad96ab99dbb9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";
const img4 = "https://images.unsplash.com/photo-1553969546-6f7388a7e07c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80";
const img5 = "https://images.unsplash.com/photo-1536922246289-88c42f957773?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1980&q=80";
const img6 = "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80";
const img7 = "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80";
const img8 = "https://images.unsplash.com/photo-1487956382158-bb926046304a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80";
const img9 = "https://images.unsplash.com/photo-1530138948699-6a75eebc9d9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80";
const img10 = "https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
const img11 = "https://images.unsplash.com/photo-1501554728187-ce583db33af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80";
const img12 = "https://images.unsplash.com/photo-1572771006151-33d4c6ed2353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80";

const imageList = [img1 , img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

export default class CreateExercise extends Component {

    constructor(props) {
        super(props);
        this.onChangeExerciseTitle = this.onChangeExerciseTitle.bind(this);
        this.onChangeExerciseDescription = this.onChangeExerciseDescription.bind(this);
        this.onChangeExerciseImageUrl = this.onChangeExerciseImageUrl.bind(this);
        this.onChangeExerciseReps = this.onChangeExerciseReps.bind(this);
        this.onPick = this.onPick.bind(this);
        this.state = {
            exercise_title: "",
            exercise_description: "",
            exercise_image_url: "",
            exercise_reps: "",
            exercise_completed: false,
            status: "",
            image: null,
        };
    }

    onPick(image) {
        this.setState({image: image});
    }

    onChangeExerciseTitle = (e) => {
        this.setState({exercise_title: e.target.value});
    }

    onChangeExerciseDescription = (e) => {
        this.setState({exercise_description: e.target.value});
    }

    onChangeExerciseImageUrl = (e) => {
        this.setState({exercise_image_url: e.target.value});
    }

    onChangeExerciseReps = (e) => {
        this.setState({exercise_reps: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newExercise = {
            exercise_title: this.state.exercise_title,
            exercise_description: this.state.exercise_description,
            exercise_image_url: this.state.image.src,
            exercise_reps: this.state.exercise_reps,
            exercise_completed: this.state.exercise_completed,
            exercise_creator: localStorage.getItem("email"),
        };
        console.log(newExercise.exercise_image_url);
        axios.post("http://localhost:5000/exercises/add", newExercise)
            .then(res => this.setState({status: res.data.exercise}))
            .catch(err => console.log(err.errMsg));
        this.setState({
            exercise_title: "",
            exercise_description: "",
            exercise_image_url: "",
            exercise_reps: "",
            exercise_completed: false,
            status: "",
            image: null,
        });
    }

    componentDidMount() {
        if (!(localStorage.getItem("email"))) {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Creating a manual Exercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{marginTop: 5}}>Title: </label>
                        <input type="text" className="form-control" value={this.state.exercise_title} onChange={this.onChangeExerciseTitle} placeholder="Exercise Title" required/>

                        <label style={{marginTop: 5}}>Description: </label>
                        <input type="text" className="form-control" value={this.state.exercise_description} onChange={this.onChangeExerciseDescription} placeholder="Exercise Description" required/>

                        <label style={{marginTop: 5}}>Image Url: </label>
						<ImagePicker images={imageList.map((image, i) => ({src: image, value: i}))} onPick={this.onPick}/>
                        <label style={{marginTop: 5}}>Reps:</label>
                        <input type="text" className="form-control" value={this.state.exercise_reps} onChange={this.onChangeExerciseReps} placeholder="10 Lifts, 4k, 10 Steps... etc"/>

                        <input type="submit" value="Create Exercise" className="btn btn-primary mt-3"/>
                    </div>
                </form>
                <h4 className="text-success">{this.state.status}</h4>
            </div>
        )
    }
}

