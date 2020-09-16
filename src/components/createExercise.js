import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

class CreateExercise extends React.Component {
  constructor(props) {
    super(props);
    /* bind event */
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    /* initial state */
    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    /* axios get data json dari db */
    axios
      .get("http://localhost:5000/users")
      .then((res) => {
        /* logic if, jika respone data panjang datanya sama dengan data lebih besar dari nol setState ke state user dan username  */
        if (res.data.length > 0) {
          this.setState({
            users: res.data.map((user) => user.username),
            username: res.data[0].username,
          });
        }
      })
      .catch((err) => {
        alert("Gagal memuat data silakan beberapa saat lagi " + err);
      });
  }
  /* event username get value */
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  /* event description get value */
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  /* event description get value */
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }
  /* event date get date() */
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    /* preventDefault submit memberikan nilai false ke form biar ga relod */
    e.preventDefault();

    /* variable exercise  initialisi dengan state*/
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    //console.log(exercise);
    /* post data exercise */
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then(() => alert("Exercise Berhasil di tambahkan "))
      .catch((err) =>
        alert("Gagal menambakan exercise, Coba beberapa saat lagi \n" + err)
      );
    /* direc ke halaman utama */
    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        {/* form submit */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            {/* get value user dari state & add event onchange username */}
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {/*  maps user display ke UI */}
              {this.state.users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            {/* get value Description dan add event onChange */}
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            {/* get value duration dan add event onChange */}
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            {/* get value Date dan add event onChange */}
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateExercise;
