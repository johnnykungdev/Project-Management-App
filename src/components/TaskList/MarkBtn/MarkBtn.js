import React from 'react';
import './MarkBtn.css';

const MarkBtn = ({ clickedTask, toggleComplete }) => {
    if (clickedTask.complete == false){
        return (
            <button className='MarkBtn' onClick={toggleComplete}>Mark Complete ✓</button>
        )
    } else if (clickedTask.complete == true){
        return (
            <button className='CompletedBtn' onClick={toggleComplete}>Completed ✓</button>
        )
    }
}

export default MarkBtn;