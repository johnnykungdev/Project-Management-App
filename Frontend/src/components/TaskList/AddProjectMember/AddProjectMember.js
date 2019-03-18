import React, {Component} from 'react';

class AddProjectMember extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            onProject_identifier: '',
        }
    }

    addNewemail = (e) => {
        var email = e.target.value;
        console.log(email);
        this.setState({ email })
    }

    addNewMember = () => {
        var email = this.state.email;
        var onProject_identifier = this.props.onProject_identifier;


        console.log(onProject_identifier);

        fetch('http://localhost:3000/addNewMember', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                onProject_identifier,
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    render(){
        var isAdmin = this.props.onProject_isAdmin;

        if(isAdmin == 1){
            return(
                <div>
                    <input onChange={this.addNewemail}/>
                    <button onClick={this.addNewMember}>Add Member</button>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

export default AddProjectMember;