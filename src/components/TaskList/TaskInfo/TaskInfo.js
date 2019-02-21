import React, {Component} from 'react';
import TaskName from './TaskName/TaskName.js';
import TaskDescription from './TaskDescription/TaskDescription.js';
import './TaskInfo.css';

class TaskInfo extends Component {
    
    render(){
        var clickedTask = this.props.clickedTask;
        var onTaskUpdate = this.props.onTaskUpdate;
        var getDescription = this.props.getDescription;
        var toggleComplete = this.props.toggleComplete;
        var name = clickedTask.name;
        var description = String(clickedTask.description);

        return (
            <div className='Info-Table'>
                <TaskName 
                    clickedTask={clickedTask} 
                    onTaskUpdate={onTaskUpdate} 
                />
                <TaskDescription 
                    className='TaskDescription-table'
                    clickedTask={clickedTask} 
                    getDescription={getDescription} />
            </div>
        )
    }
}

export default TaskInfo;