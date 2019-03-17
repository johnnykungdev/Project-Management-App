import React , {Component} from 'react';
import './TaskDescription.css';

class TaskDescription extends Component {
    render(){
        var clickedTask = this.props.clickedTask;
        var onHandleDescription = this.props.onHandleDescription;

        return (
            <div>
                <EditableCell 
                    clickedTask={clickedTask}
                    onHandleDescription={onHandleDescription}
                />
            </div>
        )
    }
}

class EditableCell extends Component {
    
    render(){
        var clickedTask = this.props.clickedTask;
        var onHandleDescription = this.props.onHandleDescription;

        return (
            <div>
                <div className='labelName'>
                    <label>Description</label>
                </div>
                <textarea
                    className='TaskDescription'
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