const express = require('express');
const app = express();
const User = require("./../models/user");
const { propfind } = require('./computer_controller');

app.get('/', function (req, res){
    res.json({
        'success': true,
        'message': 'Created by: Gabriel Manco, Saray Lopez, Santiago Ochoa.',
        'data' : []
    })
});

//Mostrar todos los usuarios
app.get('/users', function(req,res){
    User.find({})
                .exec( (err,userList) => {
                    if(err){
                        return res.json({
                            'success': false,
                            'message': err.message,
                            'data': []
                        });
                    }
                    if(userList == ''){
                        return res.json({
                            'success': false,
                            'message': 'List Empty',
                            'data': []
                        });
                    }
                    return res.json({
                        'success': true,
                        'message': 'Users avaliable',
                        'data' : [userList]
                    })
                });

});


//Agregar Usuario
app.post('/users', function (req, res) {
    let data = req.body;
    let user = new User({
        username: data.username,
        password: data.password
    });

    user.save((err, userDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Data saved',
            'data' : [userDB]
        })
    });
});

//Validar Usuario
app.get('/users/:username/:password', function (req, res) {
    let username = req.params.username;
    let password = req.params.password;

    User.find({username, password}, (err,validacion) => {
        if(err){
            return res.json({
                'success': false,
                'message': err.message,
                'data': []
            });
        }
        if(validacion == ''){
            return res.json({
                'success': false,
                'message': 'Username or Password incorrect',
                'data': []
            });
        }
        return res.json({
            'success': true,
            'message': 'Login complete!',
            'data' : [validacion]
        })
    });
});
module.exports = app;