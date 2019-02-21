import React, { Component } from 'react';
import TaskList from './components/TaskList/TaskList.js';
import SignIn from './components/SignIn/SignIn.js';
import './App.css';


class App extends Component {
    constructor(){
      super();
      this.state = {
        route: 'home',
      }
    }

    onRouteChange = (route) => {
      this.setState({route: route})
    }

    render() {
        const { route } = this.state;
        const divStyle = {
            height: '100%',
            width: '100%',
            position: 'absolute'
        }

        if (route === 'Login'){
            return (
                <div>
                    <SignIn onRouteChange={this.onRouteChange}/>
                </div>
            )
        } else if (route === 'home'){
            return (
                <div style={divStyle}>
                    <TaskList onRouteChange={this.onRouteChange}/>
                </div>
            )
        }
    }
}

export default App;
