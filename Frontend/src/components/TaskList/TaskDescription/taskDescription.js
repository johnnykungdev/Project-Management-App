import React , {Component} from 'react';
import './TaskDescription.css';

class TaskDescription extends Component {
    render(){
        var clickedTask = this.props.clickedTask;
        var onHandleDescription = this.props.onHandleDescription;

        return (
            <div className='container'>
                <textarea
                    className='task-description'
                    placeholder='Write a task description'
                    id={clickedTask.id}
                    value={clickedTask.description}
                    onChange={onHandleDescription}
                ></textarea>
            </div>
        )
    }
}

export default TaskDescription;