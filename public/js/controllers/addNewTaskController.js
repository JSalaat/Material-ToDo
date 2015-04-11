/**
 * Created by M.JUNAID on 2015-03-12.
 */

materialToDo.controller('addNewTaskController', function(userService,basePath,$scope,$mdDialog ,$http) {

    $scope.newTask={
        isDone:false,
        Uid:userService.UserUid.get()._id
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.done = function () {
        console.log($scope.newTask);
        $http.post((basePath+'/saveNewTodo'),$scope.newTask)
            .success(function(data){
                $mdDialog.hide();
            })
            .error(function(err){
                console.log(err)

            });

    };

});


