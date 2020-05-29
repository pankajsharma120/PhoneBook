const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/Phonebook', { useNewUrlParser: true, useFindAndModify: false }, (err) => {
//     if (!err) { console.log('MongoDB Connection Succeeded.') }
//     else { console.log('Error in DB connection : ' + err) }
// });

mongoose.connect("mongodb+srv://master:master123@cluster0-8kidn.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

// const uri = "mongodb+srv://mongouser:<password>@cluster0-8kidn.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



require('./person.model');
