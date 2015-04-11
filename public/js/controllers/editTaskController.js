/**
 * Created by M.JUNAID on 2015-03-12.
 */

materialToDo.controller('editTaskController', function($scope,$mdDialog,actionService,$http,basePath) {


    $scope.taskToEdit = actionService.clickedTask.get();
    $scope.taskToEdit.DueDate = new Date($scope.taskToEdit.DueDate);

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.done = function () {
        $http.post((basePath+'/editTodo'),$scope.taskToEdit)
            .success(function(data){
                console.log(data);
                $mdDialog.hide();
            })
            .error(function(err){
                console.log(err)
            });
    };

});


