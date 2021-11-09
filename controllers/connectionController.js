const { ESRCH } = require('constants');
const model = require('../models/connection');

exports.index = (req, res, next)=>{
    model.find()
    .then(connections=>{
        let types = model.findTypes(connections);
        res.render('./connection/connections', {connections, types: types})
    })
    .catch(err=>next(err));
};

exports.newConnection = (req, res)=>{
    res.render('connection/newConnection');
};

exports.connections = (req, res, next)=>{
    res.render('connection/connections');
};


exports.create = (req, res, next)=>{
    let connection = new model(req.body);//create a new connection document
    connection.creator = req.session.user;
    connection.save()//insert the document to the database
    .then(connection=> {
        req.flash('success', 'Connection has been created successfully');
        res.redirect('/connections');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('/back');
        }
        next(err);
    });
};

exports.show = (req, res, next)=>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        req.flash('error', err.message);
        return next(err);
    }

    model.findById(id).populate('creator', 'firstName lastName')
    .then(connection=>{
        if(connection) {       
            return res.render('./connection/connection', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
    .then(connection=>{
        return res.render('./connection/edit', {connection});
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let id = req.params.id;
    let connection = req.body;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection=>{
        return res.redirect('/connections/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection =>{
        if(connection) {
        res.redirect('/connections');
    } else {
        let err = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        return next(err);
        }
    })
    .catch(err=>next(err));
};