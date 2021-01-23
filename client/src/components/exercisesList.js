import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/*
 ! Variable  Exercise
 !  berisi props dan action edit dan delete
*/
const Exercise = (props) => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.exercise._id}>Edit</Link> |
      <Link
        to="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        Delete
      </Link>
    </td>
  </tr>
);

//?Class components
class Exercise_List extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {
      exercises: [],
    };
  }

  //?axios get data exercise
  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        this.setState({ exercises: res.data });
      })
      .catch((err) => {
        alert("Failed Get data " + err);
      });
  }

  //?delete data exercise
  deleteExercise(id) {
    axios.delete("http://localhost:5000/exercises/" + id).then((res) => {
      console.log(res.data);
    });
    //*setState exercises
    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }
  //!exerciseList function untuk render komponent
  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
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
          {/* //!render function ecerciseList */}
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}

export default Exercise_List;
