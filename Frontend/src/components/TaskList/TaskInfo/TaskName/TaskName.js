import React, {Component} from 'react';
import './TaskName.css';

class TaskName extends Component {

    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var clickedTask = this.props.clickedTask;

        return (
            <div className='Task-name-table'>
                <form>
                    <textarea
                        className='TaskName'
                        value={clickedTask.name}
                        placeholder='Write a task name'
                        onChange={onTaskUpdate}
                        id={clickedTask.id}
                    ></textarea>
                </form>
            </div>
        )
    }
}

export default TaskName;