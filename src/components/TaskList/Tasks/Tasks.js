import React, {Component} from 'react';

import TaskRow from './TaskRow/TaskRow.js';

class Tasks extends Component {

    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;
        var filterText = this.props.filterText;

        var generateTasks = this.props.Tasks.map(
            function (Task){
                if (filterText == ''){
                    return (
                        <TaskRow
                            Task={Task}
                            onTaskUpdate={onTaskUpdate}
                            onTaskInfo={onTaskInfo}
                            key={Task.id}
                        />
                    )
                } else if (filterText !== ''){
                    if ( Task.name.includes(filterText) == true){
                        return (
                            <TaskRow
                                Task={Task}
                                onTaskUpdate={onTaskUpdate}
                                onTaskInfo={onTaskInfo}
                                key={Task.id}
                            />
                        )
                    }
                }
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
