const{ObjectId} = require('mongodb');

let connection = [
    {
        "id": "1",
        "name": "HeroesCon",
        "type": "convention",
        "details": "2022 marks the 40th anniversary of HeroesCon. Heroes Aren't Hard to Find have been open for nearly 42 years and have hosted HeroesCon every year since 1982. In past years many legendary guests have attended such as Herb Trimpe, Jim Starlin, George Perez, and of course, Stan Lee.",
        "date": new Date('6/24/22'),
        "start": "9:00am",
        "end": "7:00pm",
        "host": "Heroes Aren't Hard to Find",
        "image": "/images/heroes.jpg"
    },
    {
        "id": "2",
        "name": "Giant-Size Charlotte Mini-Con",
        "type": "convention",
        "details": "This is a GIANT size of the annual mini-con and will feature many of the countries bests comic book vendors.",
        "date": new Date('11/7/21'),
        "start": "10:00am",
        "end": "6:00pm",
        "host": "Heroes Aren't Hard to Find",
        "image": "/images/mini.PNG"
    },
    {
        "id": "2",
        "name": "Giant-Size Charlotte Mini-Con",
        "type": "convention",
        "details": "This is a GIANT size of the annual mini-con and will feature many of the countries bests comic book vendors.",
        "date": new Date('11/7/21'),
        "start": "10:00am",
        "end": "6:00pm",
        "host": "Heroes Aren't Hard to Find",
        "image": "/images/mini.PNG"
    }
]

exports.initCollection = (db) =>{
    connection = db.collection('connections');
}
exports.find = () => connections.find().toArray();

exports.findById = id => connections.findOne({_id: ObjectId(id)});

exports.save = (story) => connections.insertOne(connection);

exports.updateById = (id, newConnection) => connections.findOneAndUpdate({_id: ObjectId(id)}, 
{$set: {title: newConnection.title, content: newConnection.content}});

exports.deleteById = (id) => connections.deleteOne({_id: ObjectId(id)});