import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeEmail = (e) => {
        this.setState({email: e.target.value});
    }

    onChangePassword = (e) => {
        this.setState({password: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email.toLowerCase(),
            password: this.state.password,
        };
        axios.post("http://localhost:5000/users/signup", user)
            .then(res => {
                const data = JSON.parse(res.config.data)
                localStorage.setItem("email", data.email);
                this.props.history.push({
                    pathname: "/exercises",
                });
            })
            .catch(err => console.log("error" + err));
    }

    componentDidMount() {
        if (localStorage.getItem("email")) {
            this.props.history.push("/exercises")
        }
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Signup</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label style={{marginTop: 5}}>Email: </label>
                        <input type="email" className="form-control" value={this.state.email} onChange={this.onChangeEmail} placeholder="Enter Email" required/>

                        <label style={{marginTop: 5}}>Password: </label>
                        <input type="password" className="form-control" value={this.state.password} onChange={this.onChangePassword} placeholder="Create Password" required/>

                        <input type="submit" value="Signup" className="btn btn-primary mt-3"/>
                    </div>
                </form>
                {/* <h5>Already have an account? Login Here</h5> */}
                <Link to={{
                    pathname: "/login",
                }}>Already have an account? Login Here</Link>
                <h4 className="text-success">{this.state.status}</h4>
            </div>
        )
    }
}