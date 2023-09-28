import React, { Component } from "react";

class Counter extends Component {
  formatCount() {
    return this.props.counter.value === 0 ? "Zero" : this.props.counter.value;
  }

  formatBadge() {
    let classStyle = "badge text-bg-";
    this.props.counter.value === 0
      ? (classStyle += "warning")
      : (classStyle += "primary");
    return classStyle;
  }

  render() {
    return (
      <>
        <div>
          <span className={this.formatBadge()}>{this.formatCount()}</span>
          <button
            className="btn btn-secondary btn-sm m-2"
            onClick={() => this.props.handleIncrement(this.props.counter)}
          >
            Increment
          </button>
          <button
            className="btn btn-danger btn-sm m-2"
            onClick={this.props.handleDelete}
          >
            Delete
          </button>
        </div>
      </>
    );
  }
}

export default Counter;
