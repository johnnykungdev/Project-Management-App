import React, {Component} from 'react';
import './ProjectList.css';
import Project from './Project/Project.js';

class ProjectList extends Component {
    getProject = (e) => {
        var id = e.target.id;
        var user_identifier = this.props.user.user_identifier;

        console.log(id);
        
        this.props.loadTask(id);
        this.props.validIsAdmin(user_identifier, id);
    }

    render(){
        var projectlist = this.props.projectlist;

        var generateProjectList = projectlist.map((project, index) => {
            return (
                <Project 
                    project_name={project.project_name} 
                    project_identifier={project.project_identifier}
                    getProject={this.getProject}
                    handleProject={this.props.handleProject}
                    key={index}
                    />
            )
        })

        return(
            <div className='ProjectTable'>
                    {generateProjectList}
            </div>
        )
    }
}

export default ProjectList;