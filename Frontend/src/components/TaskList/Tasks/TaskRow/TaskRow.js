import React, {Component} from 'react';

import EditableCell from './EditableCell/EditableCell.js';

class TaskRow extends Component {
    
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;

        return (
            <EditableCell
                onTaskUpdate={onTaskUpdate}
                onTaskInfo={onTaskInfo}
                id={this.props.Task.id}
                name={this.props.Task.name}
            />
        )
    }
}

export default TaskRow;