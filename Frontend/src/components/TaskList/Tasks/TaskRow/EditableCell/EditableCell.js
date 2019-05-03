import React, {Component} from 'react';
import './Task.css';

class EditableCell extends Component {
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;
        var toggleCheckbox = this.props.toggleCheckbox;
        var Task = this.props.Task;
        var complete = Task.complete;

        if(complete ==1){
            return (
                <div>
                    <label className="checkbox">
                        <input type="checkbox" defaultChecked id={Task.id} onClick={toggleCheckbox} />
                    </label>
                    <input 
                        type='text'
                        className='Task'
                        id={this.props.id}
                        value={this.props.name}
                        onChange={onTaskUpdate}
                        onClick={onTaskInfo}
                        placeholder='Enter the Task Name'
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <label>
                        <input type="checkbox" id={Task.id} onClick={toggleCheckbox} />
                    </label>
                    <input 
                        type='text'
                        className='Task'
                        id={this.props.id}
                        value={this.props.name}
                        onChange={onTaskUpdate}
                        onClick={onTaskInfo}
                        placeholder='Enter the Task Name'
                    />
                </div>
            )
        }

    }
}

/*
class EditableCell extends Component {
        
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;

        return (
            <div>
                <input 
                    type='text'
                    className='Task'
                    id={this.props.id}
                    value={this.props.name}
                    onChange={onTaskUpdate}
                    onClick={onTaskInfo}
                    placeholder='Enter the Task Name'
                />
            </div>
        )
    }
} 
*/

export default EditableCell;