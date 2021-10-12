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
        "location": "Charlotte Convention Center",
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
        "location": "Charlotte Convention Center",
        "image": "/images/mini.PNG"
    },
    {
        "id": "3",
        "name": "Oak City Comicon Raleigh",
        "type": "convention",
        "details": "This is the 12th annual Oak City Comicon located in Raleigh! Vendors from all over NC will be attending.",
        "date": new Date('11/13/21'),
        "start": "10:00am",
        "end": "5:00pm",
        "host": "Ultimate Comics",
        "location": "The Park Expo & Conference Center",
        "image": "/images/oak.PNG"
    },
    {
        "id": "4",
        "name": "Heroes Aren't Hard to Find",
        "type": "store",
        "details": "Heroes Aren't Hard to Find are a local location that have been a mainstay of the Charlotte Comic scene for 41 years and continue to be a prominent figure in the area.",
        "date": "Year Round",
        "start": "10:00am",
        "end": "9:00pm",
        "host": "Heroes Aren't Hard to Find",
        "location": "417 Pecan Ave. Charlotte, NC 28204",
        "image": "/images/heroesStore.jpg"
    },
    {
        "id": "5",
        "name": "Rebel Base Comics and Toys",
        "type": "store",
        "details": "Rebel Base Comics and Toys is a local comic shop that also has an expansive collection of antique toys if you're nostalgic for your 80s childhood.",
        "date": "Year Round",
        "start": "12:00pm",
        "end": "6:00pm",
        "host": "Rebel Base Comics and Toys",
        "location": "701-c South Sharon Amity Charlotte, NC 28211",
        "image": "/images/rebel.PNG"
    },
    {
        "id": "6",
        "name": "A. Pennyworth's",
        "type": "store",
        "details": "A. Pennyworth's is a must see for any collector in Charlotte. Their associates ensure premier service and a memorable experience for every customer.",
        "date": "Year Round",
        "start": "11:00am",
        "end": "7:00pm",
        "host": "A. Pennyworth's",
        "location": "11025 Monroe Rd D, Matthews, NC 28105",
        "image": "/images/pennyworth.jpg"
    }
]

exports.initCollection = (db) =>{
    connection = db.collection('connections');
}
exports.find = () => connections.find().toArray();

exports.findById = id => connections.findOne({_id: ObjectId(id)});

exports.findByType = id => connections.findOne({type: ObjectId(type)});

exports.save = (story) => connections.insertOne(connection);

exports.updateById = (id, newConnection) => connections.findOneAndUpdate({_id: ObjectId(id)}, 
{$set: {title: newConnection.title, content: newConnection.content}});

exports.deleteById = (id) => connections.deleteOne({_id: ObjectId(id)});