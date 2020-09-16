import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Exercise_List from "./components/exercisesList";
import Edit_Exercise_List from "./components/editExercises";
import Create_Exercise from "./components/createExercise";
import Create_User from "./components/createUser";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="container">
        <Route path="/" exact component={Exercise_List} />
        <Route path="/edit/:id" component={Edit_Exercise_List} />
        <Route path="/create" component={Create_Exercise} />
        <Route path="/user" component={Create_User} />
      </div>
    </Router>
  );
}

export default App;
