/**
 * Created by M.JUNAID on 2015-03-29.
 */

materialToDo.factory('actionService',function(){
    var _clickedAction = '';
    var _task = null;

    var _setAction = function(action){
        _clickedAction = action

    };

    var _getAction = function(){
        return _clickedAction
    };

    var _setTaskForAction = function(index){
        _task = index

    };

    var _getTaskForAction = function(){
        return _task
    };

    return{
        clickedAction:{
            set:_setAction,
            get:_getAction
        },
        clickedTask:{
            set:_setTaskForAction,
            get:_getTaskForAction
        }
    }

});