import React, {Component} from 'react';

import TaskRow from './TaskRow/TaskRow.js';

class Tasks extends Component {

    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;
        var filterText = this.props.filterText;
        var toggleCheckbox = this.props.toggleCheckbox;

        var generateTasks = this.props.Tasks.map(
            (Task) => {
                if (filterText === ''){
                    return (
                        <TaskRow
                            Task={Task}
                            onTaskUpdate={onTaskUpdate}
                            onTaskInfo={onTaskInfo}
                            toggleCheckbox={toggleCheckbox}
                            key={Task.id}
                        />
                    )
                } else {
                    if (Task.name.includes(filterText)){
                        return (
                            <TaskRow
                                Task={Task}
                                onTaskUpdate={onTaskUpdate}
                                onTaskInfo={onTaskInfo}
                                toggleCheckbox={toggleCheckbox}
                                key={Task.id}
                            />
                        )
                    }
                }

                return true;
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
