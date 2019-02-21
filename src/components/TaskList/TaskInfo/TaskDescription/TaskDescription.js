import React , {Component} from 'react';
import './TaskDescription.css';

class TaskDescription extends Component {
    
    render(){
        var clickedTask = this.props.clickedTask;
        var getDescription = this.props.getDescription;

        return (
            <div>
                <EditableCell 
                    CellData={{
                        id: clickedTask.id,
                        type: 'description',
                    }}
                    clickedTask={clickedTask}
                    getDescription={getDescription}
                />
            </div>
        )
    }
}

class EditableCell extends Component {
    
    render(){
        var clickedTask = this.props.clickedTask;
        var getDescription = this.props.getDescription;

        return (
            <div>
                <div className='labelName'>
                    <label>Description</label>
                </div>
                <textarea
                    className='TaskDescription'
                    value={clickedTask.description}
                    placeholder='Write a task description'
                    id={this.props.CellData.id}
                    onChange={getDescription}
                ></textarea>
            </div>
        )
    }
}

export default TaskDescription;