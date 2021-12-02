const model = require('../models/rsvp');
const connectionModel = require('../models/connection');
const userModel = require('../models/user');

exports.create = (req, res, next)=>{
    let connectionId = req.params.id;
    let userId = req.session.user;

    if(!connectionId.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    if(!userId.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }

    // if () {
    //     req.flash('error', 'You have already RSVP&#x27;d to this connection');
    //     res.redirect('back');
    // }

    let rsvp = new model(req.body);

    rsvp.user = userId;
    rsvp.connection = connectionId;

    rsvp.save()
    .then(rsvp=> {
        req.flash('success', 'RSVP has been saved successfully');
        return res.redirect('../../user/profile');
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
        req.flash('error', err.message);
        return res.redirect('back');
        }
        next(err);
    });
};