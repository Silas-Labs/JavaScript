import React, { Component } from "react";
import "../../bootstrap/dist/css/bootstrap.css";

class Login extends Component {
  state = {};
  render() {
    return (
      <>
        <form className="card border-primary align-middle">
          <div className="form-group">
            <input
              type="text"
              id="username"
              className="form-control m-2"
              placeholder="Username"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              className="form-control m-2"
              placeholder="Password"
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="LOGIN"
              className="btn btn-primary btn-sm btn-block m-2"
            />
          </div>
        </form>
      </>
    );
  }
}

export default Login;
