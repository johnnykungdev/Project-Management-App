import React , { Component }from 'react';
import './FilterBox.css';

class FilterBox extends Component {
    
    render(){
        return (
            <input 
                placeholder='Filter'
                className='FilterBox'
                onChange={this.props.filterText}
            />
        )
    }
}

export default FilterBox;

