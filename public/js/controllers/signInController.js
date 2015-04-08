/**
 * Created by M.JUNAID on 2015-03-09.
 */

materialToDo.controller('signInController', function(userService,$scope,$mdToast,$http,basePath,$state){


    $scope.user={
        userName:"",
        password:""
    };
    $scope.toastMessage = '';
    $scope.isSignInClicked=false;

    $scope.changeState = function(state){
        $state.go(state)
    };

    $scope.signInCheck = function(){
        if($scope.user.userName==''){
            $scope.toastMessage = "UserName Cannot be Empty";
            $scope.showSimpleToast()
        } else if($scope.user.password==''){
            $scope.toastMessage = "Password Cannot be Empty";
            $scope.showSimpleToast()
        }
        else{
            $scope.signIn();
        }
    };

    $scope.signIn = function(){
        $scope.isSignInClicked=true;
        console.log($scope.user);
        $http.post((basePath+'/signIn'),$scope.user)
            .success(function(data){
                if(data.status==true){
                    console.log(data);
                    userService.UserUid.set(data.resObj);
                    localStorage.setItem('toDoUser',JSON.stringify(data.resObj));
                    $scope.toastMessage = 'User Sign In Successfully';
                    $scope.showSimpleToast();
                    $scope.changeState('home')
                }else{
                    if(data.err=="Username not found"){
                        $scope.toastMessage = data.err;
                        $scope.showSimpleToast();
                        console.log(data);
                    }
                    else{
                        console.log(data);
                        $scope.toastMessage = 'There may be an error in the connection';
                        $scope.showSimpleToast()
                    }
                }
            })
            .error(function (err) {
                console.log(err);
                $scope.toastMessage = 'Error in Signing In';
                $scope.showSimpleToast()
            });
    };

    $scope.toastPosition = {
        bottom: true,
        top: false ,
        left: false,
        right: true
    };

    $scope.getToastPosition = function() {
        return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
    };

    $scope.showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
                .content($scope.toastMessage)
                .position($scope.getToastPosition())
                .hideDelay(3000)
        );
    };
});