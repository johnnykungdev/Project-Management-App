import React, {Component} from 'react';
import 'tachyons';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            SignInEmail: '',
            SignInPassword: ''
        }
    }

    onSignInEmail = (e) => {
        var SignInEmail = e.target.value;
        this.setState({ SignInEmail });
    }

    onSignInPassword = (e) => {
        var SignInPassword = e.target.value;
        this.setState({ SignInPassword })
    }

    onSubmitSignIn = (e) => {
        e.preventDefault();
        var SignInEmail = this.state.SignInEmail;
        var SignInPassword = this.state.SignInPassword;
        
        fetch('http://localhost:3000/SignIn', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                SignInEmail,
                SignInPassword
            })
        })
            .then(response => response.json())
            .then(access => {
                this.props.loadUser(access);
                this.props.onRouteChange('home');
            })
    }

    render(){
        const onRouteChange = this.props.onRouteChange;

        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input onChange={this.onSignInEmail} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" />
                            </div>
                            <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input onChange={this.onSignInPassword} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer" onClick={() => onRouteChange('register')} >Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;