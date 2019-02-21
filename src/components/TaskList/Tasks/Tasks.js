import React, {Component} from 'react';

import TaskRow from './TaskRow/TaskRow.js';

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

export default Tasks;
