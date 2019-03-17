import React, {Component} from 'react';
import Tasks from './Tasks/Tasks.js';
import TaskInfo from './TaskInfo/TaskInfo.js';
import SignOut from '../SignOut/SignOut.js';
import MarkBtn from './MarkBtn/MarkBtn.js';
import FilterBox from './FilterBox/FilterBox.js';
import ProjectList from './ProjectList/ProjectList.js';
import AddProjectMember from './AddProjectMember/AddProjectMember.js';
import './TaskList.css';

class TaskList extends Component {

    constructor(props){
        super(props);

        this.state = {
            projectlist: [],
            onProject_identifier: '',
            onProject_name: '',
            onProject_isAdmin: '',
            Tasks: [],

            clickedTask: {
                id: '',
                name: '',
                description: '',
                complete: 0
            },

            filterText: '',
        }
    }

    componentDidMount(){
        var user = this.props.user;
        this.loadProjectList(user);
        console.log(this.state.projectlist);
        
        this.setState({
            clickedTask: {

            }
        })
    }

    loadProjectList = (user) => {
        console.log(user);
        fetch('http://localhost:3000/ProjectList', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user
            })
        })
        .then(response => response.json())
        .then(projectlist => {this.setState({ projectlist })
            console.log(this.state.projectlist)}
        )
        .catch(res=>res.json('err'))
    }

    validIsAdmin = (user_identifier, project_identifier) => {
        fetch('http://localhost:3000/validIsAdmin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_identifier,
                project_identifier
            })
        })
        .then(response => response.json())
        .then(data => {
            var onProject_isAdmin = data[0].isAdmin;
            this.setState({ onProject_isAdmin })
            console.log(this.state.onProject_isAdmin)
        })
    }

    loadTask = (project_identifier) => {
        var onProject_identifier = project_identifier;

        fetch('http://localhost:3000/getTask', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                project_identifier
            })
        })
        .then(response => response.json())
        .then(Tasks => {
            this.setState({ Tasks });
            this.setState({ onProject_identifier });

            var onProject = this.state.projectlist.find(
                (project) => {
                    if(project.project_identifier = onProject_identifier){
                        return project;
                    }
                }
            )

            var onProject_name = onProject.project_name;

            this.setState({ onProject_name })

            console.log(this.state.onProject_name);

            console.log(this.state.onProject_identifier)
            console.log(Tasks)});
    }

    AddNewProject = () => {
        var project_identifier = (+ new Date() + 'project' + Math.floor( Math.random() * 99999999999 ));
        var user = this.props.user;

        fetch('http://localhost:3000/Projects',{
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                user,
                project_name: 'new project',
                project_identifier,
            })
        })
        .then(response => response.json())
        .then(projectlist => {
            console.log(projectlist);
            this.setState({ projectlist });
        })
    }

    handleProject = (e) => {
        var project_identifier = e.target.id;
        var name = e.target.value;
        var user_identifier = this.props.user.user_identifier;

        fetch('http://localhost:3000/ProjectName', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_identifier,
                project_identifier,
                name
            })
        })
        .then(response => response.json())
        .then(projectlist => this.setState({ projectlist }))
    }

    //Event of adding new Task in the Tasktable
    handleAddEvent = () => {
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString();
        var onProject_identifier = this.state.onProject_identifier;
        
        fetch('http://localhost:3000/Tasks', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                onProject_identifier,
                id,
                name: '',
                description: '',
                complete: 0,
            }) 
        })
            .then(response => response.json())
            .then(data => {
                data.sort(function(a, b){
                    return a.index - b.index;
                })

                this.setState({ Tasks: data})
            })
    }

    //Event of adding new section in the Tasktable
    handleAddSection = () => {
        var id = ('section'+ Math.floor(Math.random() * 1000));
        var onProject_identifier = this.state.onProject_identifier;
        
        fetch('http://localhost:3000/Tasks', {
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                onProject_identifier,
                id: id,
                name: '---Section---',
                description: '',
                complete: 0,
            }) 
        })
            .then(response => response.json())
            .then(data => {
                data.sort(function(a, b){
                    return a.index - b.index;
                })
                this.setState({ Tasks: data})
            })
    }

    //Event of editing the selected task
    handleTask = (e) => {
        var id = e.target.id;
        var name = e.target.value;
        var onProject_identifier = this.state.onProject_identifier;
        console.log(id);

        fetch('http://localhost:3000/TaskName', {
           method: 'put',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
               onProject_identifier,
               id: id,
               name: name,
           })
        })
            .then(response => response.json())
            .then(Tasks => {
                var clickedTask = Tasks.find(
                    (Task) => {
                        if(Task.id === id){
                            return Task;
                        }
                        return false;
                    }
                )

                this.setState({Tasks});
                this.setState({clickedTask})

            })
    }

    //get the name of the selected task and show on the title bar in the task info
    getInfo = (e) => {
        var id = e.target.id;
        var onProject_identifier = this.state.onProject_identifier;
        

        fetch('http://localhost:3000/TaskInfo', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                onProject_identifier,
                id
            })
        })
            .then(response => response.json())
            .then(clickedTask => {
                console.log(clickedTask)
                this.setState({ clickedTask })
                console.log(this.state.clickedTask);
            })
    }

    //get the description of the selected Task
    onHandleDescription = (e) => {
        var id = e.target.id;
        var description = e.target.value;
        var onProject_identifier = this.state.onProject_identifier;

        fetch('http://localhost:3000/TaskDescription', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                onProject_identifier,
                id,
                description
            })
        })
            .then(response => response.json())
            .then(Tasks => {
                var clickedTask = Tasks.find(
                    (Task) => {
                        if(Task.id === id){
                            return Task;
                        }
                        return false;
                    }
                )

                this.setState({Tasks});
                this.setState({clickedTask})
            })
    }

    
    //function of toggling the selected Task to completed or incomplete
    toggleTaskComplete = (e) => {
        var complete = this.state.clickedTask.complete;
        var id =this.state.clickedTask.id;
        var onProject_identifier = this.state.onProject_identifier;
        var toggle = '';

        if (complete == 0){
            toggle = 1;
        } else if (complete == 1){
            toggle = 0;
        }

        if (complete){
            fetch('http://localhost:3000/TaskComplete', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    onProject_identifier,
                    id: id,
                    complete: toggle
                })
            })
                .then(response => response.json())
                .then(Tasks => {
                    var clickedTask = Tasks.find(
                        (Task) => {
                            if(Task.id === id){
                                return Task;
                            }
                            return false;
                        }
                    )
    
                    this.setState({Tasks});
                    this.setState({clickedTask})
                })
        } else {
            return false;
        }
    }

    //function of filtering tasks by input keyword
    filterText = (e) => {
        var filterInput = e.target.value;
        this.setState({ filterText: filterInput })
    }

    render(){
        return (
            <div className='Window'>
                <div className='Project-Panel'>
                    <div className='User'>Hi, {this.props.user.name}</div>
                    <div className='NewProject'>
                        <button onClick={this.AddNewProject} id='NewProjectBtn'>New Project</button>
                    </div>
                    <ProjectList 
                        user={this.props.user}
                        projectlist={this.state.projectlist}
                        validIsAdmin={this.validIsAdmin}
                        loadTask={this.loadTask} 
                        handleProject={this.handleProject}
                    />
                </div>
                <div className='AddMember'>
                    <AddProjectMember
                        user={this.props.user}
                        onProject_identifier={this.state.onProject_identifier}
                        onProject_isAdmin={this.state.onProject_isAdmin}
                        onProject_name={this.state.onProject_name}
                    />
                </div>
                <div className='SignOut'>
                    <SignOut onRouteChange={this.props.onRouteChange}/>
                </div>
                    <div className='TaskListDiv'>
                        <header className='Tasks-header-table'>                    
                            <button className='addBtn' onClick={this.handleAddEvent.bind(this)}>New Task</button>
                            <button className='sectionBtn' onClick={this.handleAddSection.bind(this)}>New Section</button>
                            <FilterBox filterText={this.filterText}/>
                        </header>
                        <div className='Tasks'>
                            <Tasks
                                Tasks={this.state.Tasks} 
                                onTaskUpdate={this.handleTask.bind(this)} 
                                onTaskInfo={this.getInfo.bind(this)}
                                filterText={this.state.filterText}
                            />
                        </div>
                    </div>  
                    <div className='TaskInfo'>
                        <header className='TaskInfo-header-table'>
                            <MarkBtn 
                                clickedTask={this.state.clickedTask} 
                                toggleTaskComplete={this.toggleTaskComplete.bind(this)}
                                />
                        </header>
                        <TaskInfo 
                            clickedTask={this.state.clickedTask}
                            onTaskUpdate={this.handleTask.bind(this)}
                            onHandleDescription={this.onHandleDescription.bind(this)}
                        />
                    </div>
            </div>
        )
    }
}

export default TaskList;