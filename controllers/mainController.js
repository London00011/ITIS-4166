const model = require('../models/connection');

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(connection=>{
        if(connection) {
            res.render('./edit', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.about = (req, res, next)=>{
        res.render('./about');
};

exports.connections = (req, res, next)=>{
        res.render('./connections', {connection});
};

exports.contact = (req, res, next)=>{
    res.render('./contact');
};

exports.error = (req, res, next)=>{
    res.render('./error');
};

exports.index = (req, res, next)=>{
    res.render('./index');
};