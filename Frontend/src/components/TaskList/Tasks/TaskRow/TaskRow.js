import React, {Component} from 'react';

import EditableCell from './EditableCell/EditableCell.js';

class TaskRow extends Component {
    
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;
        var Task = this.props.Task;
        var toggleCheckbox = this.props.toggleCheckbox;

        return (
            <EditableCell
                onTaskUpdate={onTaskUpdate}
                onTaskInfo={onTaskInfo}
                toggleCheckbox={toggleCheckbox}
                Task={Task}
                id={this.props.Task.id}
                name={this.props.Task.name}
            />
        )
    }
}

export default TaskRow;