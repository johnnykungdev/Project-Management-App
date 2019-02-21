import React, {Component} from 'react';
import Tasks from './Tasks/Tasks.js';
import TaskInfo from './TaskInfo/TaskInfo.js';
import SignOut from '../SignOut/SignOut.js';
import MarkBtn from './MarkBtn/MarkBtn.js';
import FilterBox from './FilterBox/FilterBox.js';
import './TaskList.css';

class TaskList extends Component {
    constructor(props){
        super(props);

        this.state = {
            Tasks: [
                {
                    id: 'qweqrasr',
                    name: 'clean the refrig',
                    description: 'Mom wants you to clean the refrig before she comes back tonight.',
                    complete: true,
                },
                {
                    id: 'qwrqrwr',
                    name: 'cook the dinner',
                    description: 'prepare the dinner before 6pm.',
                    complete: true,
                }
            ],

            clickedTask: {
                id: '',
                name: '',
                description: '',
                complete: '',
            },
        }
    }

    //Event of adding new Task in the TaskTable
    handleAddEvent = (e) => {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var Task = {
        id: id,
        name: '',
        description: '',
        complete: '',
        }
    
        this.state.Tasks.push(Task);
        this.setState(this.state.Tasks);
    }

    //Event of editing the selected task
    handleTask = (e) => {
        var item = {
            id: e.target.id,
            name: e.target.value,
        }
        
        var currentTasks = this.state.Tasks.slice();
        var newTasks = currentTasks.map(
            function (Task){
                if (String(item.id) === String(Task.id)){
                    Task.name = item.name;
                }
                return Task;
            }
        );
        this.setState({ Tasks: newTasks });
    }

    getName = (e) => {
       var id = e.target.id;
       var Tasks = this.state.Tasks;
       var id_array = Tasks.map(
           function (Task){
               return Task.id
           }
       )

       var order = id_array.indexOf(id);

       var clickedTask = this.state.Tasks[order];
       console.log(this.state.clickedTask.name); 
       this.setState({clickedTask: clickedTask});
    }

    getDescription = (e) => {
        var id = e.target.id;
        var newTask = this.state.clickedTask;
        
        newTask.description = e.target.value;
        
        this.setState({ clickedTask: newTask });   
    }
    
    toggleComplete = (e) => {
        var Class = e.target.className;
        var newTask = this.state.clickedTask;
        
        if (newTask.complete == true){
            newTask.complete = false;
            this.setState({ clickedTask: newTask });
            console.log(this.state.Tasks);
        } else if (newTask.complete == false){
            newTask.complete = true;
            this.setState({ clickedTask: newTask });
            console.log(this.state.Tasks);
        }
    }

    render(){
        return (
            <div className='Task-Panel'>
                <div className='SignOut'>
                    <SignOut onRouteChange={this.props.onRouteChange}/>
                </div>
                <div className='TaskListDiv'>
                    <header className='Tasks-header-table'>                    
                        <button className='addBtn' onClick={this.handleAddEvent.bind(this)}>New Task</button>
                        <FilterBox />
                    </header>
                    <div className='Tasks'>
                        <Tasks
                            Tasks={this.state.Tasks} 
                            onTaskUpdate={this.handleTask.bind(this)} 
                            onTaskInfo={this.getName.bind(this)}
                        />
                    </div>
                </div>  
                <div className='TaskInfo'>
                    <header className='TaskInfo-header-table'>
                        <MarkBtn clickedTask={this.state.clickedTask} toggleComplete={this.toggleComplete.bind(this)} />
                    </header>
                    <TaskInfo 
                        clickedTask={this.state.clickedTask} 
                        onTaskUpdate={this.handleTask.bind(this)} 
                        getDescription={this.getDescription.bind(this)}
                    />
                </div>
            </div>
        )
    }
}

export default TaskList;