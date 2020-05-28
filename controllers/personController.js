const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Person = mongoose.model('Person');

router.get('/validate-phone', async (req, res) => {
    isOk = await isPhnOk(req.query.phn_no)
    if(isOk){
      res.json({"status":"202"});
    }else{
      res.json({"status":"208"});
    }
});

router.get('/', (req, res) => {
    var query = req.query.q;
    var queryset = [];
    if(!query){
      Person.find({},null,{sort: {name: 1}}).lean().exec(function(err,docs){
        res.render('persons/list',{object_list:docs})
      })
    }
    else{
      Person.find({$or:[
        {name: { "$regex": query, "$options": "i" }},
        {phonenumber : { $in : [query] }},
        {email : { $in : [query] }}
      ]}).lean().exec(function(err,docs){
        res.render('persons/list',{object_list:docs})
      })
    }
});

router.get('/add', (req, res) => {
    res.render("persons/add", {
        viewTitle: "Add New Record"
    });
});

router.post('/add', async (req, res) => {
    var keys = Object.keys(req.body);
    var phns = [];
    var emails = [];
    for(const item of keys){
      if(item.match(/^email/))
        emails.push(req.body[item])
      if(item.match(/^mobile/))
          phns.push(req.body[item]);
    }
    if(!isPhnOk(phns)){
      res.render("persons/add", {
          error: "Phone Number already exist",
          viewTitle: "Add New Record",
          person: req.body
      });
    }
    var person = new Person();
    person.name = req.body.name;
    person.email = emails;
    person.phonenumber = phns;
    person.dob = req.body.dob;
    person.save((err, doc) => {
        if (!err)
            res.redirect('/');
        else {
            if (err.name == 'ValidationError') {
              console.log("ValidationError");
                handleValidationError(err, req.body);
                console.log(req.body);
                res.render("persons/add", {
                    viewTitle: "Add New Record",
                    person: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
});


function handleValidationError(err, body) {
  body['errors'] = []
  for (field in err.errors) {
      body['errors'].push(err.errors[field].message);
  }
}

async function isPhnOk(phn_nos){
    for(const phn_no of phn_nos){
      if(!phn_no.match(/^\d{10}$/)){
        return false;
      }
    }
    var res = await Person.find({ phonenumber : { $in : phn_nos }});
  return res.length<=0;
}

module.exports = router;
