angular.module('RDash')
.controller('drinkCreationController', function($scope, $http){
  $scope.drink={
    "name":"",
    "description":""
  };
  $scope.recipe={
    "name": "",
    "rating": 0,
    "instructions": "",
    "description":"",
    "userId":0,
    "color":""
  };
  $scope.directionStep;
  $scope.directions=[];
  $scope.ingredients=[];
  $http.get("/api/ingredients")
    .success(function(response){
      $scope.dataIngredients=response;
    });


  $scope.submit = function(){
    /*$http.put("/api/Drinks", $scope.drink)*/
  };

  $scope.remove=function(item){
    var index=$scope.ingredients.indexOf(item);
    $scope.dataIngredients.push($scope.ingredients[index]);
    $scope.ingredients.splice(index,1);
  };

  $scope.addIng=function(item){
    var index=$scope.dataIngredients.indexOf(item);
    var ing=$scope.dataIngredients[index];
    ing.amount=0;
    $scope.ingredients.push(ing);
    $scope.dataIngredients.splice(index,1);
  };

  $scope.addStep=function(){
    if ($scope.directionStep && $scope.directionStep.length>2 && $scope.directions.length<10){
    var hold={
      "step":$scope.directions.length+1,
      "text": $scope.directionStep
    };
    $scope.directions.push(hold);
    $scope.directionStep="";
  }
  };

  $scope.removeStep=function(item){
    var index=$scope.directions.indexOf(item);
    $scope.directions.splice(index,1);
    for(i=index;i<$scope.directions.length;++i){
      $scope.directions[i].step--;
    }
  };
});