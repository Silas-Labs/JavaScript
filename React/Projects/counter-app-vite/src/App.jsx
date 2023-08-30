import React, { useState, Component } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "../bootstrap/dist/css/bootstrap.css";
import Counters from "./components/counters";
import Navbar from "./components/navbar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 3 },
      { id: 4, value: 4 },
    ],
  };

  onDelete = (id) => {
    this.setState({
      counters: this.state.counters.filter((counter) => counter.id != id),
    });
  };

  onReset = () => {
    const counters = [...this.state.counters].map((counter) => {
      counter.value = 0;
      return counter;
    });

    this.setState({ counters });
  };

  onIncrement = (counter) => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };
  render() {
    return (
      <>
        <Navbar
          totalCounters={
            this.state.counters.filter((count) => count.value != 0).length
          }
        />
        <main className="container">
          <Counters
            handleReset={this.onReset}
            handleIncrement={this.onIncrement}
            handleDelete={this.onDelete}
            counters={this.state.counters}
          />
        </main>
      </>
    );
  }
}

export default App;
