const mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required.'
    },
    email: [{
      type: String,
    }],
    phonenumber: [{
      type: String,
      required: "Atleast one Phonenumber is required."
    }],
    dob: {
        type: Date
    }
});

personSchema.path('phonenumber').validate((val) => {
  if(val.length==0){
    return false
  }
    return true;
}, 'At least one phone number is required.');


personSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for(const email of val){
      if(email!='' && !emailRegex.test(email)){
        return false;
      }
    }
    return true;
}, 'Invalid e-mail.');

mongoose.model('Person', personSchema);
