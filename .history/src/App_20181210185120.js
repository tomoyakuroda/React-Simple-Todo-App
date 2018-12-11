import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from "./components/TodoList";
import SimpleStorage from "react-simple-storage";
import 'bootstrap/dist/css/bootstrap.min.css'
import uuid from 'uuid'
import "./components/style.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state={
    tasks:[],
    id:uuid(),
    task:"",
    date:"",
    editTask:false
  }
  }


  handleChangeTask=(e)=>{
    this.setState({
      task: e.target.value
    })
  }
    handleChangeDate=(e)=>{
    this.setState({
      date: e.target.value
    })
  }

handleSubmit=(e)=>{
e.preventDefault();
const newTask={
  id:this.state.id,
  title:this.state.task,
  date:this.state.date
}

const updatedTasks =[...this.state.tasks,newTask]
this.setState({
  tasks:updatedTasks,
  task:'',
  date:'',
  id:uuid(),
  editTask:false
})
}


handleDelete=(id)=>{
  const filteredTasks=this.state.tasks.filter(task=>task.id!==id)
this.setState({
  tasks:filteredTasks
})
}

handleEdit=id=>{
  const filteredTasks = this.state.tasks.filter(task => task.id !== id)
  const selectedTask=this.state.tasks.find(task=>task.id===id)
  this.setState({
    tasks:filteredTasks,
    task:selectedTask.title,
    date:selectedTask.date,
    editTask:true,
    id:id
  })
}

  render() {
    return (
<div className="wrapper">
      <SimpleStorage parent={this} />
      <h1 className="text-capitalize text-center">
      Todo List
      </h1>
      <TodoInput task={this.state.task} date={this.state.date} handleChangeTask={this.handleChangeTask}
      handleChangeDate={this.handleChangeDate}
      handleSubmit={this.handleSubmit}
      editTask={this.state.editTask}
      />
      <TodoList tasks={this.state.tasks} clearList={this.clearList} handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}/>
      </div>
      
    );
  }
}

export default App;
