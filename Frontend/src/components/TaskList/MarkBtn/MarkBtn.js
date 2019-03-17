import React from 'react';
import './MarkBtn.css';

const MarkBtn =  ({ clickedTask, toggleTaskComplete }) => {
    var complete = clickedTask.complete;

    if (complete == 0 ){
        return(
            <div>
                <button className='MarkBtn' onClick={toggleTaskComplete} >Mark complete ✔</button>
            </div>
        )
    } else if (complete == 1){
        return (
            <div>
                <button className='CompletedBtn' onClick={toggleTaskComplete} >Mark incomplete ✖</button>
            </div>
        )
    } else {
        return (
            <div>
            </div>
        )
    }
}

export default MarkBtn;