/**
 * Created by M.JUNAID on 2015-03-29.
 */

materialToDo.factory('actionService',function(){
    var _clickedAction = '';
    var _task = null;

    var _setAllTasks = function(action){
        _clickedAction = action

    };

    var _getAllTasks = function(){
        return _clickedAction
    };

    var _setTaskToEdit = function(index){
        _task = index

    };

    var _getTaskToEdit = function(){
        return _task
    };

    return{
        clickedAction:{
            set:_setAllTasks,
            get:_getAllTasks
        },
        clickedTask:{
            set:_setTaskToEdit,
            get:_getTaskToEdit
        }
    }

});