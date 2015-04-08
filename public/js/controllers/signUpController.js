/**
 * Created by M.JUNAID on 2015-03-09.
 */

materialToDo.controller('signUpController', function($scope,$http,basePath,$location,$mdToast){

    $scope.user={
        userName:"",
        firstName:"",
        lastName:"",
        email:"",
        password:""
    };

    $scope.cPassword="";
    $scope.isSignUpClicked=false;

    $scope.signUp = function(){
        if($scope.user.password==$scope.cPassword&&$scope.user.userName!==''&&$scope.user.firstName!==''&&$scope.user.email!==''){
            $scope.isSignUpClicked=true;
            console.log($scope.user,$scope.cPassword);
            $http.post((basePath+'/signUp'),$scope.user)
                .success(function(data){
                    console.log(data);
                    $scope.toastMessage = 'User Created Successfully';
                    $scope.showSimpleToast();
                    $location.path( "/signIn" );
                })
                .error(function (err) {
                    console.log(err);
                    $scope.toastMessage = 'Error in User Creation'+err;
                    $scope.showSimpleToast()
                })
        }else{
            $scope.toastMessage = 'Please Fill the required fields';
            $scope.showSimpleToast()
        }

    }


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