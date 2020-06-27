import React, {Component} from "react";

export default class Logout extends Component {

    componentDidMount() {
        if (localStorage.getItem("email")) {
            localStorage.removeItem("email");
            this.props.history.push("/");
        } else {
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <h3>Logging Out</h3>
            </div>
        )
    }
}