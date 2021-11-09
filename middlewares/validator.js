exports.validateId = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        req.flash('error', 'Invalid Connection Id');
        return res.redirect('back');
    } else {
        return next();
    }
};