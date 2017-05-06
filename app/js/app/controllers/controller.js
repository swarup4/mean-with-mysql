app.controller('userController', ['$scope', 'userService', function(scope, userService){
    scope.pageName = "Home Page";
    scope.saveData = true;
    scope.success = false;
    scope.error = false;

    scope.getAllEmployeeData = function(){
        userService.getEmployee().then(function(data){
            scope.employee = data;
        }, function(err){
            scope.error = true;
            scope.errorMsg = "Something is wrong";
            console.log(err);
        });
    };
    scope.getAllEmployeeData();

    scope.editEmployee = function(id){
        scope.userId = id;
        userService.getEmployeeUsingId(id).then(function(data){
            scope.users = data[0];
            scope.saveData = false;
        }, function(err){
            scope.error = true;
            scope.errorMsg = "Something is wrong";
            console.log(err);
        });
    };

    scope.insertEmployeeData = function(data){
        data.phone = Number(data.phone);
        userService.createEmployee(data).then(function(data){
            if(data.affectedRows == 1){
                scope.success = true;
                scope.successMsg = "Data is successfully inserted";
                scope.getAllEmployeeData();
            }
        }, function(err){
            scope.error = true;
            scope.errorMsg = "Something is wrong";
            console.log(err);
        });
    };

    scope.updateEmployeeData = function(id, data){
        data.phone = Number(data.phone);
        data.status = 1;
        userService.editEmployeeData(id, data).then(function(data){
            if(data.affectedRows == 1){
                scope.success = true;
                scope.successMsg = "Data is successfully updated";
                scope.getAllEmployeeData();
            }
        }, function(err){
            scope.error = true;
            scope.errorMsg = "Something is wrong";
            console.log(err);
        });
    };

    scope.deleteEmployee = function(id){
        userService.deleteEmployeeData(id).then(function(data){
          if(data.affectedRows == 1){
              scope.success = true;
              scope.successMsg = "Your record is successfully deleted";
              scope.getAllEmployeeData();
          }
        }, function(err){
            scope.error = true;
            scope.errorMsg = "Something is wrong";
            console.log(err);
        });
    };

    scope.loginUser = function(users){
        userService.loginUsers(users).then(function(data){
            scope.users = data;
        }, function(err){
            console.log(err);
        });
    }
}]);
