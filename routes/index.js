var express = require('express');
var router = express.Router();

var userModel = require("../models/userModel.js");
var toDoModel = require("../models/toDoModel.js");

/* GET home page. */

router.get('*', function(req, res, next) {
  res.render('index', {});
});


/* POST home listings. */

router.post('/signUp',function(req,res){
  console.log(req.body);

  var userData = {
    UserName : req.body.userName,
    FirstName:req.body.firstName,
    LastName:req.body.lastName,
    Email:req.body.email,
    Password:req.body.password
  };

  userModel.saveUserToDb(userData)
      .then(function (){
        res.send({status:true});
      }, function (err){
        res.send({status: false, err : err});
      })
});

router.post('/signIn',function(req,res){
  console.log(req.body);

  var userData = {
    userName : req.body.userName,
    password : req.body.password
  };

  userModel.signInUserFromDb(userData)
      .then(function (data){
        if(data!==null){
          res.send({status:true, resObj : data._doc});
        }
        else{
          res.send({status:false, resObj : "Username not found"});
        }
      }, function (err){
        res.send({status: false, resObj : err});
      })
});

router.post('/getTasks', function(req,res){
  //console.log(req.body);
  var UiD = req.body._id;

  toDoModel.ToDoFromDbByUid(UiD)
      .then(function (data){
        if(data!==null){
          res.send({status:true, resObj : data});
        }
        else{
          res.send({status:false, resObj : "ToDo's not found"});
        }
      }, function (err){
        res.send({status: false, resObj : err});
      })

});

router.post('/saveNewTodo', function(req,res){
  var newTodo = {
    UiD: req.body.Uid,
    Task: req.body.task,
    Desc: req.body.desc,
    IsDone: req.body.isDone,
    Priority: req.body.priority,
    DueDate: req.body.dueDate
  };
  toDoModel.saveToDoToDb(newTodo)
      .then(function (){
        res.send({status:true});
      }, function (err){
        res.send({status: false, err : err});
      })
});

router.post('/editTodo', function(req,res){
  //console.log(req.body);
  var todoToEdit = {
    Task: req.body.Task,
    Desc: req.body.Desc,
    IsDone: req.body.IsDone,
    Priority: req.body.Priority,
    DueDate: req.body.DueDate
  };
  var idToEdit = req.body._id;

  toDoModel.editToDo(idToEdit,todoToEdit)
      .then(function (data){
        res.send({status:true , resObj: data});
      }, function (err){
        res.send({status: false, err : err});
      })
});

router.post('/updateToDo', function(req,res){
  console.log(req.body);
  var todoToUpdate = {
    IsDone: req.body.IsDone
  };
  var idToEdit = req.body._id;

  toDoModel.editToDo(idToEdit,todoToUpdate)
      .then(function (data){
        res.send({status:true , resObj: data});
      }, function (err){
        res.send({status: false, err : err});
      })
});

router.post('/deleteTodo', function(req,res){
  var idToEdit = req.body._id;

  toDoModel.deleteToDo(idToEdit)
      .then(function (data){
        res.send({status:true , resObj: data});
      }, function (err){
        res.send({status: false, err : err});
      })
});

module.exports = router;
