const mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required.'
    },
    email: [{
      type: String,
      required: "Email is required."
    }],
    dob: {
        type: Date
    }
});

var phoneNumberSchema = new mongoose.Schema({
  phonenumber: {
    type: String,
    required: "Phone number is required.",
    unique: true,
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Person",
    required : "required"
  }
})


// Custom validation for email
personSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Person', personSchema);
mongoose.model('Phonenumber', phoneNumberSchema);
