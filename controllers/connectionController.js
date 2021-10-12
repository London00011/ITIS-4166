const model = require('../models/connection');
exports.index = (req, res, next)=>{
    //res.send('send all connections');
    model.find()
    .then(connections=>res.render('index', {connections}))
    .catch(err=>next(err));
};

exports.newConnection = (req, res)=>{
    res.render('./newConnection');
};

exports.create = (req, res, next)=>{
    //res.send('Created a new connection');
    let connection = req.body;
    connection.createdAt = new Date();
    model.save(connection)
    .then(result =>res.redirect('/connections'))
    .catch(err=>next(err));
};

exports.show = (req, res, next)=>{
    let type = req.params.type;
    model.findByType(type)
    .then(connection=>{
        if(connection) {
            res.render('./connections', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(connection=>{
        if(connection) {
            res.render('./connection/show', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(connection=>{
        if(connection) {
            res.render('./connection/edit', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.update = (req, res, next)=>{
    let connection = req.body;
    let id = req.params.id;

    model.updateById(id, connection)
    .then(result=>{
        if(result.lastErrorObject.updatedExisting)
        res.redirect('/connections/'+id);
        else {
        let error = new Error('Cannot find a connection with id ' + id);
        err.status = 404;
        next(err);
        }
    })
    .catch(err=>next(err));
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;

    model.deleteById(id)
    .then(result=>{
        if(model.deleteById(id))
            res.redirect('/connections');
        else {
            let error = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
    }
    })
};

exports.showType = (req, res, next)=>{
    let type = req.params.type;
    model.findByType(type)
    .then(connection=>{
        if(connection) {
            res.render('./connection/show', {connection});
        } else {
            let err = new Error('Cannot find a connection with type ' + type);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};