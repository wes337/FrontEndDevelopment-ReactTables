import React, { Component } from 'react';
import './App.css';
import ReactTable from "react-table";
import 'react-table/react-table.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {date: '', description: '', todos: []}
  }

  inputChanged = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  addTodo = (event) => {
    event.preventDefault();
    const newTodo = {};
    newTodo.date = this.state.date;
    newTodo.description = this.state.description;
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  }

  deleteTodo = (row) => {
    const array = [...this.state.todos];
    array.splice(row.index, 1);
    this.setState({todos: array});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Todo List</h1>
        </header>
        <div className="App-body">
          <form className="App-form" onSubmit={this.addTodo}>
            <fieldset>
              <legend>Add Something To Do</legend>
                <label htmlFor="date">Date: </label>
                <input name="date" id="date" type="text" onChange={this.inputChanged} value={this.state.date}/>
                <label htmlFor="description">Description: </label>
                <input name="description" id="description" type="text" onChange={this.inputChanged} value={this.state.description}/>
                <input className="App-btn" type="submit" value="Add" />
            </fieldset>
          </form>
        </div>
        <div id="reactTableDiv">
          <ReactTable
            defaultPageSize={10}
            data={this.state.todos}
            columns={[
              {
                Header:'Date',
                accessor:'date',
                maxWidth:200,
                resizable: false
              },
              { 
                Header:'Description',
                accessor:'description',
                resizable: false
              },
              {
                Cell: row => (
                    <button className="App-delete-btn" id={row} onClick={() =>this.deleteTodo(row)}>Delete</button>
                ),
                maxWidth: 200,
                resizable: false
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

export default App;
