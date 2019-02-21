import React, {Component} from 'react';
import './Task.css';

class EditableCell extends Component {
        
    render(){
        var onTaskUpdate = this.props.onTaskUpdate;
        var onTaskInfo = this.props.onTaskInfo;

        return (
            <div>
                <input 
                    type='text'
                    className='Task'
                    id={this.props.CellData.id}
                    value={this.props.CellData.name}
                    onChange={onTaskUpdate}
                    onClick={onTaskInfo}
                />
            </div>
        )
    }
}

export default EditableCell;