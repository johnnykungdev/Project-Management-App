import React, {Component} from 'react';
import './List.css';

class TasksList extends Component {
    constructor(props){
        super(props);

        this.state = {
            Tasks: [
                {
                    id: 'qweqrasr',
                    name: 'clean the refrig',
                    description: 'Mom wants you to clean the refrig before she comes back tonight.'
                },
                {
                    id: 'qwrqrwr',
                    name: 'cook the dinner',
                    description: 'prepare the dinner before 6pm.'
                }
            ],

            clickedTask: {
                id: '',
                name: '',
                description: '',
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
        }
    
        this.state.Tasks.push(Task);
        this.setState(this.state.Tasks);
    }

    handleTask = (e) => {
        var item = {
            id: e.target.id,
            name: e.target.value,
        }
        
        var currentTasks = this.state.Tasks.slice();
        var newTasks = currentTasks.map(
            function (Task){
                if (item.id == Task.id){
                    Task.name = item.name;
                }
                return Task;
            }
        );
        this.setState({ Tasks: newTasks });
    }

    getInfo = (e) => {
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
    
    render(){
        return (
            <div>
                <div className='TaskListDiv'>
                    <button className='addBtn' onClick={this.handleAddEvent.bind(this)}>New Task</button>
                    <Tasks 
                        Tasks={this.state.Tasks} 
                        onTaskUpdate={this.handleTask.bind(this)} 
                        onTaskInfo={this.getInfo.bind(this)}/>
                </div>  
                <div className='TaskInfo'>
                    <TaskInfo clickedTask={this.state.clickedTask} onTaskUpdate={this.handleTask.bind(this)}/>
                </div>
            </div>
        )
    }
}

class Tasks extends Component {
    
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;

        var generateTasks = this.props.Tasks.map(
            function (Task){
                return (
                    <TaskRow
                        Task={Task}
                        onTaskUpdate={onTaskUpdate}
                        onTaskInfo={onTaskInfo}
                        key={Task.id}
                    />
                )
            }
        )

        return (
            <div>
                {generateTasks}
            </div>
        )
    }
}

class TaskRow extends Component {
    
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;

        return (
            <EditableCell
            onTaskUpdate={onTaskUpdate}
            onTaskInfo={onTaskInfo}
            CellData={{
                id: this.props.Task.id,
                name: this.props.Task.name,
            }}
            />
        )
    }
}

class EditableCell extends Component {
    
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;

        return (
            <input 
                type='text'
                className='Task'
                id={this.props.CellData.id}
                value={this.props.CellData.name}
                onChange={onTaskUpdate}
                onClick={onTaskInfo}
            />
        )
    }
}

class TaskInfo extends Component {
    
    render(){
        var clickedTask = this.props.clickedTask;
        var onTaskUpdate = this.props.onTaskUpdate;
        var name = clickedTask.name;
        var description = String(clickedTask.description);

        return (
            <div>
                <div>
                    <label>Name</label>
                </div>
                <div>
                    <form>
                        <textarea
                            className='Name'
                            value={name}
                            placeholder='Enter a new Task'
                            onChange={onTaskUpdate}
                            id={this.props.clickedTask.id}
                        ></textarea>
                    </form>
                </div>
                <div>
                    <label>Detail</label>
                </div>
                <div>
                    <form>
                        <textarea
                            className='Detail'
                            value={description}
                            onChange={onTaskUpdate}
                        ></textarea>
                    </form>
                </div>
            </div>
        )
    }
}



export default TasksList;