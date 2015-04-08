/**
 * Created by M.JUNAID on 2015-04-03.
 */

var mongoose = require("mongoose");
var q = require("q");
var db = mongoose.connect("mongodb://localhost/MaterialToDoDb", function(err){
    if(err){
        console.log("Error in connecting");
        console.log(err);
    } else {
        console.log("Connected to database successfully");
    }
});

var UserSchema = mongoose.Schema({
    UserName:String,
    FirstName:String,
    LastName:String,
    Email:String,
    Password:String,
    CreatedOn:{type : Date, default: Date.now()}
});

var UserModel = mongoose.model('user',UserSchema);


exports.saveUserToDb = function(userObj){
    var defered = q.defer();
    var user = new UserModel(userObj);
    user.save(function(err,data){
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

exports.signInUserFromDb = function(userData){
    var defered = q.defer();
    //var user = new UserModel(userObj);

    UserModel.findOne({UserName:userData.userName,Password:userData.password},function(err,data){
        if(err){
            console.log("Error in Finding user data");
            console.log(err);
            defered.reject(err);
        }else if(data){
            console.log("Successfully Signed In User");
            defered.resolve(data);
        }else{
            console.log("No User Found of username :"+userData.userName);
            defered.resolve(data);
        }
    });
    return defered.promise;
};
