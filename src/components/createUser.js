import React from "react";
import axios from "axios";

class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    /* bind event */
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    /* intial state */
    this.state = {
      username: "",
    };
  }

  /* event username */
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  /* event submit */
  onSubmit(e) {
    e.preventDefault();
    /* var  user initial state */
    const user = {
      username: this.state.username,
    };

    //console.log(user);

    axios
      /* post ke db */
      .post("http://localhost:5000/users/add", user)
      .then(() => alert("Berhasil menambahkan User"))
      .catch((err) => alert("Gagal menambah user \n" + err));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            {/* event onchange dan get value username*/}
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
