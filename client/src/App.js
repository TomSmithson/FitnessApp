import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import ExerciseList from "./components/exercise-list.component";
import ReviewExercise from "./components/review-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CompletedExerciseList from "./components/completed-exercise-list.component";
import Login from "./components/login.component";
import Signup from "./components/signup.component";
import Logout from "./components/logout.component";

import logo from './logo.png';



class App extends Component {
    
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="https://google.com" target="_blank" rel="noopener noreferrer">
                            <img src={logo} width="80" height="80" alt="Logo for Web App"/>
                        </a>
                        <Link to="/" className="navbar-brand">Fitness App</Link>
                        <div className="nav-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">Exercises</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">Create New Exercise</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/completed" className="nav-link">Completed Exercises</Link>
                                </li>
                                <li id="loggedOut" className="navbar-item">
                                    <Link to="/logout" className="nav-link">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                        <Route path="/" exact component={Signup}/>
                        <Route path="/exercises" component={ExerciseList}/>
                        <Route path="/delete/:id" component={ReviewExercise}/>
                        <Route path="/create" component={CreateExercise}/>
                        <Route path="/completed" component={CompletedExerciseList}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/signup" component={Signup}/>
                        <Route path="/logout" component={Logout}/>
                </div>
            </Router>
        )
    }
}

export default App;
