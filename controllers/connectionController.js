const { ESRCH } = require('constants');
const model = require('../models/connection');
exports.index = (req, res, next)=>{
    let connections = model.find();
    let types = model.findTypes();
    res.render('connection/connections', {connections: connections, types: types});
};

exports.newConnection = (req, res)=>{
    res.render('connection/newConnection');
};

exports.connections = (req, res, next)=>{
    res.render('connection/connections');
};

exports.create = (req, res, next)=>{
    let connection = req.body;
    model.save(connection);
    res.redirect('/connections');
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let connection = model.findById(id);
    if(connection){
        res.render('./connection/connection', {connection: connection});
    } else {
        let err = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let ids = model.findIds();
    let connection = model.findById(id);
    if(ids.includes(id)) {
        res.render('./connection/edit', {connection});
    } else {
        res.status(404).send('Cannot find story with id '+ id);
    }
};

exports.update = (req, res, next)=>{
    let id = req.params.id;
    let connection = req.body;

    if(model.updateById(id, connection)) {
        res.redirect('/connections/'+ id);
    } else {
        res.status(404).send('Cannot find story with id '+ id);
    }
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id))
        res.redirect('/connections');
    else {
        let error = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        next(err);
    }
};