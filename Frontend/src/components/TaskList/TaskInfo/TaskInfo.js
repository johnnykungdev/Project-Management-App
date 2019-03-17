    import React, {Component} from 'react';
import TaskName from './TaskName/TaskName.js';
import TaskDescription from './TaskDescription/TaskDescription.js';
import './TaskInfo.css';

class TaskInfo extends Component {
    
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var clickedTask = this.props.clickedTask;
        var onHandleDescription = this.props.onHandleDescription;

        return (
            <div className='Info-Table'>
                <TaskName 
                    onTaskUpdate={onTaskUpdate}
                    clickedTask={clickedTask}
                />
                <TaskDescription 
                    className='TaskDescription-table'
                    clickedTask={clickedTask}
                    onHandleDescription={onHandleDescription}
                />
                    
            </div>
        )
    }
}

export default TaskInfo;