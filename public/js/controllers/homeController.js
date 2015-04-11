/**
 * Created by M.JUNAID on 2015-03-09.
 */

materialToDo.controller('homeController', function($scope,$state,$mdSidenav,$mdDialog,$mdBottomSheet,$timeout,actionService,$mdToast,$http,userService,basePath){

    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };
    $scope.getToastPosition = function () {
        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            })
            .join(' ');
    };

    $scope.showSimpleToast = function (message) {
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position($scope.getToastPosition())
                .hideDelay(2000)
        );
    };

    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    $scope.changeState = function(state){
        $state.go(state)
    };

    $scope.logOut=function(){
        userService.UserUid.set('');
        localStorage.removeItem('toDoUser');
        $scope.changeState('signIn')
    };

    if(window.localStorage['toDoUser']) {

        $scope.todos = [];
        $scope.currentUser = userService.UserUid.get();
        if($scope.currentUser==''){
            $scope.currentUser=JSON.parse(localStorage.getItem('toDoUser'));
            userService.UserUid.set($scope.currentUser);
        }

        $scope.getTasksBy_uId = function () {
            $http.post((basePath+'/getTasks'),$scope.currentUser)
                .success(function (data) {
                    console.log(data);
                    $scope.remaining=0;
                    $scope.todos = data.resObj;
                    $scope.todos.forEach(function(a){
                        a.DueDate = new Date(a.DueDate)
                    });
                    for(var i=0;i<$scope.todos.length;i++){
                        if($scope.todos[i].IsDone==false){
                            $scope.remaining++
                        }
                    }
                })
                .error(function (err) {
                    console.log(err)
                })
        };

        $scope.getTasksBy_uId();


        $scope.currentStateOfTasks = function(index){
            //actionService.clickedTask.set($scope.todos[index])
            $http.post((basePath+'/updateToDo'),$scope.todos[index])
                .success(function (data) {
                    console.log(data);
                    $scope.remaining=0;
                    for(var i=0;i<$scope.todos.length;i++){
                        if($scope.todos[i].IsDone==false){
                            $scope.remaining++
                        }
                    }
                    //$scope.todos = data.resObj;
                })
                .error(function (err) {
                    console.log(err)
                })
        };


        $scope.showAddNewTaskDialog = function (ev) {
            //$scope.currentStateOfTasks();
            $mdDialog.show({
                controller: 'addNewTaskController',
                templateUrl: 'partials/addNewTaskDialog.html',
                targetEvent: ev
            }).then(function () {
                $scope.getTasksBy_uId();
                $scope.showSimpleToast('Task Added Success');
            });
        };

        $scope.showEditTaskDialog = function (ev) {
            //$scope.currentStateOfTasks();
            $mdDialog.show({
                controller: 'editTaskController',
                templateUrl: 'partials/editTaskDialog.html',
                targetEvent: ev
            }).then(function () {
                $scope.getTasksBy_uId();
                $scope.showSimpleToast('Task Edited Success');
            });
        };

        $scope.showDeleteTaskDialog = function () {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this Task?')
                .ok('Yes, Delete It.')
                .cancel('No');

            $mdDialog.show(confirm)
                .then(function () {

                $scope.taskToDelete = actionService.clickedTask.get();

                $http.post((basePath+'/deleteTodo'),$scope.taskToDelete)
                    .success(function(data){
                        console.log(data);
                        $mdDialog.hide();
                        $scope.getTasksBy_uId();
                    })
                    .error(function(err){
                        console.log(err)
                    });

                $mdDialog.show(
                    $mdDialog.alert()
                        .title('The Task has been deleted')
                        .ok('Got it!')
                );

            }, function () {
                console.log("Canceled Deleting");
            });
        };

        $scope.showGridBottomSheet = function (index, ev) {
            $mdBottomSheet.show({
                templateUrl: 'partials/bottomGridSheet.html',
                controller: 'bottomGridSheetController'
            }).then(function () {
                var clickedAction = actionService.clickedAction.get();
                actionService.clickedTask.set($scope.todos[index]);

                if (clickedAction == 'edit') {
                    $scope.showEditTaskDialog(ev)
                }
                else if (clickedAction == 'delete') {
                    $scope.showDeleteTaskDialog()
                }
                else {
                    console.log(clickedAction);
                }
            });
        };
    }else{
        $scope.showSimpleToast("Please Sign In to Start");
        $scope.changeState('signIn')
    }


});
