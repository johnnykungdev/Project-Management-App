import React from 'react';
import './Project.css';

const Project = ({ project_name, project_identifier, getProject, handleProject }) => {
    return(
        <textarea 
            className='project'
            value={ project_name } 
            onClick={getProject} 
            id={ project_identifier } 
            onChange={handleProject}></textarea>
    )
}

export default Project;