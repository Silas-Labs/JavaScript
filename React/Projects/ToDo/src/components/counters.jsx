import React, { Component } from "react";

import Counter from "./counter";

class Counters extends Component {
  render() {
    return (
      <>
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.props.handleReset}
        >
          Reset
        </button>
        {this.props.counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            handleDelete={() => this.props.handleDelete(counter.id)}
            handleIncrement={this.props.handleIncrement}
          />
        ))}
      </>
    );
  }
}

export default Counters;
