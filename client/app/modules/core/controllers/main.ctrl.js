(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:MainCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $state

   * @requires CoreService
   * @requires User
   * @requires gettextCatalog
   **/
  angular
    .module('com.module.core')
    .controller('MainCtrl', function ($scope, $rootScope, $state, AppAuth, CoreService, User, gettextCatalog) {

      AppAuth.ensureHasCurrentUser(function (curUsr) {
        //This call also serves to redirect a user to the login screen, via the interceptor in users.auth.js, if they are not authenticated.
        $scope.currentUser = User.getCurrent();
      });

      $scope.menuoptions = $rootScope.menu;

      $scope.logout = function () {
        AppAuth.logout(function () {
          CoreService.toastSuccess(gettextCatalog.getString('Logged out'),
            gettextCatalog.getString('You are logged out!'));
          $state.go('login');
        });
      };

      angular.element(document).ready(function () {

        $('.header').bind( "click", function() {
          //console.log($(this).data("mgtgrp"));
          if($(this).data("mgtgrp")=="candidate"){
            var dataGrp = 'candidate';
            if($(this).data("visib")=='show'){
              $(".sidebar-menu").find("[data-grpitem='" + dataGrp + "']").each(function(){
                $(this).css({"display": "none", "opacity":0});
              });
              $(this).data("visib","hide");
            }else{
              $(".sidebar-menu").find("[data-grpitem='" + dataGrp + "']").each(function(){
                $(this).css({"display": "block", "opacity":1});
              });
              $(this).data("visib","show");
            }
          }
          else if($(this).data("mgtgrp")=="election"){
            var dataGrp = 'election';
            if($(this).data("visib")=='show'){
              $(".sidebar-menu").find("[data-grpitem='" + dataGrp + "']").each(function(){
                $(this).css({"display": "none", "opacity":0});
              });
              $(this).data("visib","hide");
            }else{
              $(".sidebar-menu").find("[data-grpitem='" + dataGrp + "']").each(function(){
                $(this).css({"display": "block", "opacity":1});
              });
              $(this).data("visib","show");
            }
          }
          else if($(this).data("mgtgrp")=="site"){
            var dataGrp = 'site';
            if($(this).data("visib")=='show'){
              $(".sidebar-menu").find("[data-grpitem='" + dataGrp + "']").each(function(){
                $(this).css({"display": "none", "opacity":0});
              });
              $(this).data("visib","hide");
            }else{
              $(".sidebar-menu").find("[data-grpitem='" + dataGrp + "']").each(function(){
                $(this).css({"display": "block", "opacity":1});
              });
              $(this).data("visib","show");
            }
          }
        });

        $('.treeview>a').bind( "click", function() {
          if($(this).parent().find(".treeview-menu").css("display")=='block'){
            $(this).parent().find(".treeview-menu").css({"display": "none", "opacity":0})
          }
          else{
            $('.treeview>a').each(function(){
              //console.log(this);
              $(this).parent().find(".treeview-menu").css({"display": "none", "opacity":0});
            });$(this).data("visib","hide");
            $(this).parent().find(".treeview-menu").css({"display": "block", "opacity":1});
          }
        });
      });

    });

})();
