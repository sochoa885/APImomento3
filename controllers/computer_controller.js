const express = require('express');
const app = express();
const Computer = require("./../models/computer");
const computer = require('./../models/computer');

app.get('/', function (req, res){
    res.json({
        'success': true,
        'message': 'Created by: Gabriel Manco, Saray Lopez, Santiago Ochoa.',
        'data' : []
    })
});

//Listar Computadores
app.get('/computers', function(req,res){
    Computer.find({})
                .exec( (err,computerList) => {
                    if(err){
                        return res.json({
                            'success': false,
                            'message': err.message,
                            'data': []
                        });
                    }
                    if(computerList == ''){
                        return res.json({
                            'success': false,
                            'message': 'List Empty',
                            'data': []
                        });
                    }
                    return res.json({
                        'success': true,
                        'message': 'Computers avaliable',
                        'data' : [computerList]
                    })
                });

});


//Agregar Computador
app.post('/computers', function (req, res) {
    let data = req.body;
    let computer = new Computer({
        board: data.board,
        processor: data.processor,
        ram: data.ram,
        powersupply: data.powersupply,
        diskhard: data.diskhard,
        monitor: data.monitor
    });

    computer.save((err, computerDB) => {
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
            'data' : [computerDB]
        })
    });
});


//Buscar destalles de un computador
app.get('/computers/:id', function (req, res) {
    let id = req.params.id;

    Computer.findById(id)
            .exec( (err, computerDetails) => {
                if(err){
                    return res.status(400).json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                }
                if(!computerDetails){
                    return res.json({
                        'success': false,
                        'message' : 'Computer doesnt found',
                        'data' : []
                    });
                }
                return res.json({
                    'success': true,
                    'message' : 'Computer Details',
                    'data' : [computerDetails]
                })
            });
});


//Actualizar detalles de un computador
app.put('/computers/:id', function (req, res) {
    let id = req.params.id;
    let data = {board: req.body.board,
        processor: req.body.processor,
        ram: req.body.ram,
        powersupply: req.body.powersupply,
        diskhard: req.body.diskhard,
        monitor: req.body.monitor}
    Computer.findByIdAndUpdate(id, data, {new : true,  runValidators: true}, (err, computerDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        if(!computerDB){
            return res.json({
                'success': false,
                'message' : 'Computer doesnt found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Computer Details updated',
            'data' : [computerDB]
        })
    });
});


//Cambiar estado de un computador
app.patch('/computers/:id', function (req, res) {
    let id = req.params.id;
    let data = { active : req.body.active };
    Computer.findByIdAndUpdate(id, data, {new : true,  runValidators: true}, (err, computerDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        if(!computerDB){
            return res.json({
                'success': false,
                'message' : 'Computer doesnt found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Computer Status update',
            'data' : [computerDB]
        })
    });
});

//Eliminar un computador
app.delete('/computers/:id', function (req, res) {
    let id = req.params.id;
    Computer.findByIdAndDelete(id, (err, computerDB) => {
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        if(!computerDB){
            return res.json({
                'success': false,
                'message' : 'Computer doesnt found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Computer deleted',
            'data' : [computerDB]
        })
    });
});




module.exports = app;