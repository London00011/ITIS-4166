const { DateTime } = require('luxon');
const{ObjectId} = require('mongodb');
const{ObjectType} = require('mongodb');
const {v4: uuidv4} = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const connectionSchema = new Schema({
    name: {type: String, required: [true, 'name is required']},
    type: {type: String, required: [true, 'type is required']},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
    details: {type: String, required: [true, 'content is required'], 
              minLength: [10, 'the content should have at least 10 characters']},
    date: {type: String, require: [true, 'Date is required']},
    start: {type: String, require: [true, 'Start time is required']},
    end: {type: String, require: [true, 'End time is required']},
    host: {type: String, require: [true, 'Host is required']},
    price: {type: String, require: [true, 'Price is required']},
    location: {type: String, required: [true, 'Location is required']},
    image: {type: String, require: [true, 'Image URL is required']},
},
    {timestamps: true}
);

connectionSchema.statics.findTypes = function(connections) {
    const types = [];
    for (let i = 0; i < connections.length; i++) {
        if(!types.includes(connections[i].type)) {
            types.push(connections[i].type);
        }
    }
    return types;
};

module.exports = mongoose.model('connections', connectionSchema);