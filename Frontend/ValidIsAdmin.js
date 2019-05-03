validIsAdmin = (user_identifier, project_identifier) => {
    fetch('http://localhost:3000/validIsAdmin', {
        method: 'get',
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


