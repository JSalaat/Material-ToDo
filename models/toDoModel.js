/**
 * Created by M.JUNAID on 2015-04-03.
 */

var mongoose = require("mongoose");
var q = require("q");


var ToDoSchema = mongoose.Schema({
    UiD:String,
    Task:String,
    Desc:String,
    Priority:String,
    DueDate:Date,
    IsDone:Boolean,
    CreatedOn:{type : Date, default: Date.now()}
});

var ToDoModel = mongoose.model('todo',ToDoSchema);


exports.saveToDoToDb = function(toDoObj){
    var defered = q.defer();
    var todo = new ToDoModel(toDoObj);
    todo.save(function(err,data){
        if(err){
            console.log("Error in insertion of new user");
            console.log(err);
            defered.reject(err);
        }else{
            console.log("Successfully Inserted User");
            defered.resolve();
        }
    });
    return defered.promise;
};

exports.ToDoFromDbByUid = function(Uid){
    var defered = q.defer();

    ToDoModel.find({Uid:Uid},function(err,data){
        if(err){
            console.log("Error in Finding ToDo's");
            console.log(err);
            defered.reject(err);
        }else if(data){
            console.log("Successfully retrieved ToDo's ");
            defered.resolve(data);
        }else{
            console.log("No Todo's Found of user id :"+Uid);
            defered.resolve(data);
        }
    });
    return defered.promise;
};

exports.deleteToDo = function(uid){
    var defered = q.defer();

    ToDoModel.remove({_id:uid},function(err,data){
        if(err){
            console.log("Error in deleting ToDo's");
            console.log(err);
            defered.reject(err);
        }else if(data){
            console.log("Successfully deleted ToDo ");
            defered.resolve(data);
        }else{
            console.log("No Todo Found of user id :"+uid);
            defered.resolve(data);
        }
    });
    return defered.promise;
};
