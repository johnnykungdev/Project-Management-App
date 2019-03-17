import React, { Component }from 'react';
import 'tachyons';
import './Register.css';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    onNameChange = (e) => {
        var name = e.target.value;
        this.setState({ name });
    }

    onEmailChange = (e) => {
        var email = e.target.value;
        this.setState({ email });
    }

    onPasswordChange = (e) => {
        var password = e.target.value;
        this.setState({ password });
    }

    onSubmitRegister = (e) => {
        var name = this.state.name;
        var email = this.state.email;
        var password = this.state.password;
        var joined = new Date();
        var user_identifier = (+ new Date() + 'user' + Math.floor(Math.random() * 999999999999))

        e.preventDefault();

        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json',},
            body: JSON.stringify({
                name,
                email,
                password,
                joined,
                user_identifier
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if(response.user_identifier == user_identifier){
                    this.props.loadUser(response);
                    this.props.onRouteChange('home');
                } else if (response == 'Please enter the right form'){
                    console.log('err')
                }
            })
    }

    render(){

        return(
            <div className='register-page'>
                <button onClick={() => this.props.onRouteChange('Login') }>Sign In</button>
                <form  id='register'>
                    <fieldset className='register-format'>
                        <legend>Account</legend>
                        <div className='register-name'>
                            <label >Name</label><br />
                            <input className='regis-input' onChange={this.onNameChange} />
                        </div>
                        <div className='register-email'>
                            <label>Email</label><br />
                            <input className='regis-input' onChange={this.onEmailChange}/>
                        </div>
                        <div className='register-pass'>
                            <label>Password</label><br />
                            <input className='regis-input' onChange={this.onPasswordChange}/>
                        </div>
                        <button className='signUpBtn' onClick={this.onSubmitRegister}>Sign Up</button>
                    </fieldset>       
                </form>
            </div>
        )
    }
}

export default Register;