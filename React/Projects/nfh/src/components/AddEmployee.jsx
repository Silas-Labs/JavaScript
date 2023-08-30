import React, { Component } from "react";
import "../../bootstrap/dist/css/bootstrap.css";

class AddEmployee extends Component {
  state = {};
  render() {
    return (
      <>
        <form role="form">
          <div className="container-fluid form-group">
            <label className="control-label">ID</label>
            <div className="form-group">
              <input className="form-control input-sm-2" />
            </div>
          </div>
        </form>
      </>
    );
  }
}

export default AddEmployee;
