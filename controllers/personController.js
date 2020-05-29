const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Person = mongoose.model('Person');
const utils = require('./../helpers/utils.js');

router.get('/validate-phone', async (req, res) => {
    isOk = await isPhnOk(req.query.phn_no,req.query.pid)
    if(isOk){
      res.json({"status":"202"});
    }else{
      res.json({"status":"208"});
    }
});

router.post('/delete', async (req, res) => {
  Person.findByIdAndRemove(req.body.id, (err, doc) => {
      if (!err) {
          res.json({'status':"202"});
      }
      else {
        console.log('Error in employee delete :' + err);
        res.json({'status':"400"});
       }
  });
});

router.get('/', async (req, res) => {
    var query = req.query.q;
    const { page = 1, limit = 4 } = req.query;
    try {
      if(!query){
        search_query ={}
      }
      else{
        search_query = {$or:[
                  {name: { "$regex": query, "$options": "i" }},
                  {phonenumber : { $in : [query] }},
                  {email : { $in : [query] }}
                ]}
      }
      const count = await Person.countDocuments(search_query);
      queryset = await Person.find(search_query).limit(limit * 1)
              .skip((page - 1) * limit)
              .collation({locale:'en',strength: 2})
              .sort({name:'asc'}).lean()
              .exec()
     res.render("persons/list",{
       object_list: queryset,
       totalPages: Math.ceil(count / limit),
       currentPage: page,
       previous_page_number: parseInt(page)-1,
       next_page_number: parseInt(page)+1,
       url_with_q : utils.page_url_replace(req.query)
       });
     } catch (err) {
       console.error(err.message);
   }
});

router.get('/add', (req, res) => {
    res.render("persons/add", {
        viewTitle: "Add New Record"
    });
});


router.get('/edit/:id', (req, res) => {
    Person.findById(req.params.id).lean().exec((err, doc) => {
        if (!err) {
            res.render("persons/edit", {
                viewTitle: "Update Record",
                person: doc
            });
        }
    });
});

router.post('/edit', async (req, res) => {
    await Person.findById(req.body._id, async (err, doc) => {
        if (!err) {
            var keys = Object.keys(req.body);
            var phns = [];
            var emails = [];
            getPhnEmailArray(keys,phns,emails,req);
            var isOk = await isPhnOk(phns,req.body._id);
            if(!isOk){
              req.body['errors'] = ["Phone Number is not valid or already exist"]
              res.render("persons/edit", {
                  viewTitle: "Update Record",
                  person: req.body,
              });
            }else{
              doc.name = req.body.name;
              doc.dob = req.body.dob;
              doc.phonenumber = phns;
              doc.email = emails;
              doc.save((err, doc) => {
                if(!err)
                  res.redirect('/person');
                else{
                  if (err.name == 'ValidationError') {
                      console.log("ValidationError");
                      handleValidationError(err, req.body);
                      console.log(req.body);
                      res.render("persons/edit", {
                          viewTitle: "Update Record",
                          person: req.body
                      });
                  }
                  else
                      console.log('Error during record insertion : ' + err);
                }
              })
            }
        }else{
          res.render("400")
        }
    });
});

function getPhnEmailArray(keys,phns,emails,req) {
  for(const item of keys){
    if(item.match(/^email/))
      {emails.push(req.body[item])}
    if(item.match(/^mobile/))
        {phns.push(req.body[item]);}
  }
}

router.post('/add', async (req, res) => {
    var keys = Object.keys(req.body);
    var phns = [];
    var emails = [];
    getPhnEmailArray(keys,phns,emails,req);
    var isOk = await isPhnOk(phns);
    if(!isOk){
      req.body['errors'] = ["Phone Number is not valid or already exist"]
      res.render("persons/add", {
          viewTitle: "Edit Record",
          person: req.body,
      });
    }else{
      var person = new Person();
      person.name = req.body.name;
      person.email = emails;
      person.phonenumber = phns;
      person.dob = req.body.dob;
      person.save((err, doc) => {
          if (!err)
              res.redirect('/person');
          else {
              if (err.name == 'ValidationError') {
                  handleValidationError(err, req.body);
                  res.render("persons/add", {
                      viewTitle: "Add New Record",
                      person: req.body
                  });
              }
              else
                  console.log('Error during record insertion : ' + err);
          }
      });
    }

});


function handleValidationError(err, body) {
  body['errors'] = []
  for (field in err.errors) {
      body['errors'].push(err.errors[field].message);
  }
}

async function isPhnOk(phn_nos,pid=null){
    for(const phn_no of phn_nos){
      if(!phn_no.match(/^\d{10}$/)){
        return false;
      }
    }
    var res;
    if(pid)
      res = await Person.find({$and:[{ phonenumber : { $in : phn_nos }},{ _id: {$ne: pid}}]});
    else
      res = await Person.find({ phonenumber : { $in : phn_nos }});
  return res.length<=0;
}

module.exports = router;
