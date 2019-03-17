import React from 'react';

const Project = ({ project_name, project_identifier, getProject, handleProject }) => {
    return(
        <input value={ project_name } onClick={getProject} id={ project_identifier } onChange={handleProject} />
    )
}

export default Project;