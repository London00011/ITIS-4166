const { DateTime } = require('luxon');
const{ObjectId} = require('mongodb');
const{ObjectType} = require('mongodb');
const {v4: uuidv4} = require('uuid');


const connections = [
    {
        "id": "1",
        "name": "HeroesCon",
        "price": "$50.00",
        "type": "convention",
        "details": "2022 marks the 40th anniversary of HeroesCon. Heroes Aren't Hard to Find have been open for nearly 42 years and have hosted HeroesCon every year since 1982. In past years many legendary guests have attended such as Herb Trimpe, Jim Starlin, George Perez, and of course, Stan Lee.",
        "date": '6/24/22',
        "start": "9:00am",
        "end": "7:00pm",
        "host": "Heroes Aren't Hard to Find",
        "location": "Charlotte Convention Center",
        "image": "/images/heroes.jpg",
        "createdAt": DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        "id": "2",
        "name": "Giant-Size Charlotte Mini-Con",
        "price": "$30.00",
        "type": "convention",
        "details": "This is a GIANT size of the annual mini-con and will feature many of the countries bests comic book vendors.",
        "date": '11/7/21',
        "start": "10:00am",
        "end": "6:00pm",
        "host": "Heroes Aren't Hard to Find",
        "location": "Charlotte Convention Center",
        "image": "/images/mini.PNG",
        "createdAt": DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        "id": "3",
        "name": "Oak City Comicon Raleigh",
        "price": "$20.00",
        "type": "convention",
        "details": "This is the 12th annual Oak City Comicon located in Raleigh! Vendors from all over NC will be attending.",
        "date": '11/13/21',
        "start": "10:00am",
        "end": "5:00pm",
        "host": "Ultimate Comics",
        "location": "The Park Expo & Conference Center",
        "image": "/images/oak.PNG",
        "createdAt": DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        "id": "4",
        "name": "Heroes Aren't Hard to Find",
        "price": "Free",
        "type": "store",
        "details": "Heroes Aren't Hard to Find are a local location that have been a mainstay of the Charlotte Comic scene for 41 years and continue to be a prominent figure in the area.",
        "date": "Year Round",
        "start": "10:00am",
        "end": "9:00pm",
        "host": "Heroes Aren't Hard to Find",
        "location": "417 Pecan Ave. Charlotte, NC 28204",
        "image": "/images/heroesStore.jpg",
        "createdAt": DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        "id": "5",
        "name": "Rebel Base Comics and Toys",
        "price": "Free",
        "type": "store",
        "details": "Rebel Base Comics and Toys is a local comic shop that also has an expansive collection of antique toys if you're nostalgic for your 80s childhood.",
        "date": "Year Round",
        "start": "12:00pm",
        "end": "6:00pm",
        "host": "Rebel Base Comics and Toys",
        "location": "701-c South Sharon Amity Charlotte, NC 28211",
        "image": "/images/rebel.jpg",
        "createdAt": DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        "id": "6",
        "name": "A. Pennyworth's",
        "price": "Free",
        "type": "store",
        "details": "A. Pennyworth's is a must see for any collector in Charlotte. Their associates ensure premier service and a memorable experience for every customer.",
        "date": "Year Round",
        "start": "11:00am",
        "end": "7:00pm",
        "host": "A. Pennyworth's",
        "location": "11025 Monroe Rd D, Matthews, NC 28105",
        "image": "/images/pennyworth.jpg",
        "createdAt": DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
]

exports.findTypes = function() {
    const types = [];
    for (let i = 0; i < connections.length; i++) {
        if(!types.includes(connections[i].type)) {
            types.push(connections[i].type);
        }
    }
    return types
}

exports.findIds = function() {
    const types = [];
    for (let i = 0; i < connections.length; i++) {
        if(!types.includes(connections[i].id)) {
            types.push(connections[i].id);
        }
    }
    return types
}

exports.initCollection = (db) =>{
    connection = db.collection('connections');
}
exports.find = () => connections

// exports.findById = function(id) {
//     const connectionById = [];
//     for (i = 0; i < connections.length; i++) {
//         if (connections[i].id == id) {
//             connectionById.push(connections[i]);
//         }
//     }
//     return connectionById;
// }

exports.findById = id => connections.find(connection=>connection.id === id);

exports.save = function(connection){
    connection.id = uuidv4();
    connection.createdAt = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    connections.push(connection);
}

exports.updateById = function(id, newConnection) {
    let connection = connections.find(connection=>connection.id === id);
    if(connection) {
        connection.type = newConnection.type;
        connection.name = newConnection.name;
        connection.details = newConnection.details;
        connection.date = newConnection.date;
        connection.price = newConnection.price;
        connection.location = newConnection.location;
        connection.image = newConnection.image;
        return true;
    } else {
        return false;
    }
}

exports.deleteById = function(id) {
    let index = connections.findIndex(connection=>connection.id === id);
    if(index !== -1) {
        connections.splice(index, 1);
        return true;
    } else {
        return false;
    }
}