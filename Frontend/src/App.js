import React, { Component } from 'react';
import TaskList from './components/TaskList/TaskList.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import './App.css';


class App extends Component {
    constructor(){
      super();
      this.state = {
        route: 'Login',
        user: {},
      }
    }

    onRouteChange = (route) => {
      this.setState({route: route})
    }

    loadUser = (user) => {
        this.setState({ user });
    }

    signOut = () => {
        
    }

    render() {
        const { route } = this.state;

        if (route === 'Login'){
            return (
                <div>
                    <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                </div>
            )
        } else if (route === 'home'){
            return (
                <div className='window'>
                    <TaskList user={this.state.user} onRouteChange={this.onRouteChange} />
                </div>
            )
        } else if (route == 'register'){
            return (
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
    }
}

export default App;
