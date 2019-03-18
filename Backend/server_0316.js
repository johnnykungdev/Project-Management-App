const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');

var db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'TasksList'
    }
})

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('hello');
})

app.post('/Projects', (req, res) => {
    const { user, project_name, project_identifier } = req.body;
    const user_identifier = user.user_identifier;

    db.transaction(trx => {
        return trx
            .insert({
                project_name,
                project_identifier
            })
            .into('projectlist')
            .then(() => {
                return trx
                .insert({
                    project_identifier,
                    isAdmin: 1,
                })
                .into(`${user_identifier}`)
                .then(project => {
                    return db.schema.withSchema('public').createTable(`${project_identifier}`, (project) => {
                        project.increments('index'),
                        project.text('id'),
                        project.string('name', [100]),
                        project.text('description'),
                        project.string('complete', [10])
                    })
                    .then(() => {
                        return trx.select('project_identifier').from(`${user_identifier}`)
                            .then(data => {
                                var project_identifier_list = data.map((project) => {
                                    return project.project_identifier;
                                })

                                return trx.select('*').from('projectlist')
                                    .then((projectlist) => {
                                        var new_projectlist = [];
                                        console.log(project_identifier_list);
                                        
                                        for(let i = 0; i < project_identifier_list.length; i++){
                                            projectlist.find((project) => {
                                                if(project.project_identifier == project_identifier_list[i]){
                                                    new_projectlist.push(project);
                                                }
                                            })
                                        }
                                        console.log(new_projectlist);
                                        res.send(new_projectlist);
                                    })
                            })
                    })
                })
            })
    })
})

app.post('/ProjectName', (req, res) => {
    const { user_identifier, project_identifier, name } = req.body;
    console.log(req.body);

    db.transaction(trx => {
        return trx.select('project_name').from('projectlist').where('project_identifier', '=', project_identifier)
            .update({
                project_name: name
            })
            .then(() => {
                return trx.select('project_identifier').from(`${user_identifier}`)
                .then(data => {
                    var project_identifier_list = data.map((project) => {
                        return project.project_identifier;
                    })

                    return trx.select('*').from('projectlist')
                        .then((projectlist) => {
                            var new_projectlist = [];
                            console.log(project_identifier_list);
                            
                            for(let i = 0; i < project_identifier_list.length; i++){
                                projectlist.find((project) => {
                                    if(project.project_identifier == project_identifier_list[i]){
                                        new_projectlist.push(project);
                                    }
                                })
                            }

                            console.log(new_projectlist);
                            res.send(new_projectlist);
                        })
                })
            })
    })
})

app.post('/addNewMember', (req, res) => {
    const { email, onProject_identifier } = req.body;

    db.select('user_identifier').from('users').where('email', '=', email)
        .then(identifier => {
            var user_identifier = identifier[0].user_identifier;

            db.transaction(trx => {
                return trx.insert({
                    project_identifier: onProject_identifier,
                    isAdmin: 0
                })
                    .into(`${user_identifier}`)
                    .then(data => console.log(data))
                    .then(trx.commit)
                    .then(trx.rollback)
            })
        })

})

app.get('/Tasks', (req, res) => {
    db.select('*').from('taskslist').then(tasks => {
        res.send(tasks);
    })
})

app.post('/Tasks', (req, res) => {
    const { onProject_identifier, id, name, description, complete } = req.body;
    console.log(req.body);

    db(`${onProject_identifier}`)
        .insert({
            id,
            name,
            description,
            complete
        })
        .then(()=>{
            db.select('*').from(`${onProject_identifier}`)
                .then(
                    (tasklist) =>res.send(tasklist)
                )
        })
})

app.put('/TaskName', (req, res) => {
    const { onProject_identifier, id, name } = req.body;
    db(`${onProject_identifier}`).where('id', '=', id)
        .update({
            name: name
        })
        .then(() => {
                db.select('*').from(`${onProject_identifier}`)
                .then(
                    (oldlist) =>{
                        var newlist = oldlist.sort(
                            function(a, b){
                                return a.index - b.index;
                            }
                        )
                        res.send(newlist);
                })
            }
        )
})

app.post('/TaskInfo', (req, res) => {
    const { onProject_identifier, id } = req.body;
    console.log(req.body);

    db.select('*').from(`${onProject_identifier}`).where('id', '=', id)
        .then(clickedtask => {
            console.log(clickedtask[0]);
            res.send(clickedtask[0]);
        })
})

app.put('/TaskDescription', (req, res) => {
    const { onProject_identifier, id, description } = req.body;

    db(`${onProject_identifier}`).where('id', '=', id)
        .update({
            description
        })
        .then(() => {
            db.select('*').from(`${onProject_identifier}`)
                .then(
                    (oldlist) =>{
                        var newlist = oldlist.sort(
                            function(a, b){
                                return a.index - b.index;
                            }
                        )
                    res.send(newlist);
                    }
                )
        })
})


app.put('/TaskComplete', (req, res) => {
    const { onProject_identifier, id, complete } = req.body;

    db(`${onProject_identifier}`).where('id', '=', id)
        .update({
            complete
        })
        .then(() => {
            db.select('*').from(`${onProject_identifier}`)
                .then((oldlist) => {
                    var newlist = oldlist.sort(
                        function(a, b){
                            return a.index - b.index;
                    })
                
                    res.send(newlist);
                    console.log(newlist);
                })
        })

}) 

app.post('/register', (req, res) => {

    const { name, email, password, joined, user_identifier} = req.body;

    db.select('*').from('users')
        .then(users => {
            var emails = users.map((user) => {
                return user.email;
            })

            var isExist = emails.find(
                (userEmail) => {
                    if(userEmail == email){
                        return true;
                    }
                }
            )

            if (isExist == undefined){
                if(email !== '' && name !== '' && password !== ''){
                    db.schema.withSchema('public').createTable(`${user_identifier}`, (table) => {
                        table.increments('id'),
                        table.text('project_identifier')
                        table.text('isAdmin')
                    })
                    .then(() => {
                        db.transaction( trx => {
                            return trx.insert({
                                email: email,
                                password: password
                            })
                            .into('login')
                            .then(() => {
                                return trx.insert({
                                    email: email,
                                    name: name,
                                    joined: joined,
                                    user_identifier: user_identifier
                                }).into('users')
                                .then(trx.commit)
                                .catch(trx.rollback) 
                                .then(res.send(req.body))
                            })
                        })
                    })
                } else {
                    res.json('Please fill in the right format')
                }
            } else if (isExist == true){
                res.json('The users has already been signed up')
            }
        })


    }
)

app.post('/SignIn', (req, res) => {
    const { SignInEmail, SignInPassword } = req.body;

    db.select('*').from('login').where('email', '=', SignInEmail)
        .then(user => {
            if(user[0].password == SignInPassword){
                db.transaction(trx => {
                    trx.select('*').from('users').where('email', '=', SignInEmail)
                        .then( data => {
                            res.json(data[0])
                        })
                })
            }
        })
})

app.post('/ProjectList', (req, res) => {
    const user_identifier = req.body.user.user_identifier;
    console.log(user_identifier);

    db.transaction(trx => {
        return trx.select('project_identifier').from(`${user_identifier}`)
            .then(data => {
                var project_identifier_list = data.map((project => {
                    return project.project_identifier;
                }))

                console.log(project_identifier_list);

                return trx.select('*').from('projectlist')
                    .then(projectlist => {
                        console.log(projectlist);
                        var new_projectlist = [];

                        for(let i = 0; i < project_identifier_list.length; i++){
                            projectlist.find((project) => {
                                if(project.project_identifier == project_identifier_list[i]){
                                    new_projectlist.push(project)
                                }
                            })
                        }

                        var res_list = new_projectlist.sort((a, b) => {
                            return a.index - b.index;
                        })

                        console.log(res_list);
                        res.send(res_list);
                    })
            })
    })
})

app.post('/loadTask', (req, res) => {
    const { project_identifier } = req.body;
    console.log(project_identifier);
    
    db.select('*').from(`${project_identifier}`)
        .then(tasklist => {
            console.log(tasklist);
            res.send(tasklist)})
})

app.post('/validIsAdmin', (req, res) => {
    const { user_identifier, project_identifier } = req.body;
    console.log(req.body);

    db.select('isAdmin').from(`${user_identifier}`).where('project_identifier', '=', project_identifier)
        .then(isAdmin => {
            console.log(isAdmin);
            res.send(isAdmin)})
})

app.listen(3000, () => {
    console.log('it is running');
});
