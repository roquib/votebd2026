(function () {
  'use strict';
  /**
   * @ngdoc function
   * @name com.module.core.controller:FrontCtrl
   * @description Login Controller
   * @requires $scope
   * @requires $state

   * @requires CoreService
   * @requires User
   * @requires gettextCatalog
   **/
  angular
    .module('com.module.core')
    .controller('FrontCtrl', function ($scope,$location,$anchorScroll,Search) {
      
      // $scope.global = Global;
      // $scope.package = {
      //     name: 'search'
      // };
      $scope.customSearchResults = {};
      $scope.search_term = '';
      $scope.result_count = 10;
      $scope.submit = function () {
          $scope.search_term = $scope.search_term.trim();
          console.log($scope.search_term);
          if ($scope.search_term) { // if input is not blank...
              Search.getCustomSearchResults($scope.search_term, $scope.result_count)
                  .then(function (results) {
                      $scope.customSearchResults = results.data.items;
                  });
          }
      };

      angular.element(document).ready(function () {
        $('[data-toggle="offcanvas"]').click(function () {
          // console.log("click hoitese");
          $('.row-offcanvas').toggleClass('active')
        });
      });


      $scope.goToTop12 = function(){
        // console.log("ekhane click hoise for scroll to top");
        $location.hash('scroll_top12');
        $anchorScroll();
        // console.log($(window).scrollTop());
      };

      $scope.goToTop13 = function(){
        // console.log($("#scroll_top12").offset());
        //$("#button").click(function() {
        //  $('html, body').animate({
        //    scrollTop: $("#scroll_top12").offset().top
        //  }, 2000);
        //});

        //$("html, body").animate({ scrollTop: 0 }, "slow");

        $location.hash('scroll_top12');
        $anchorScroll();
      };

      $scope.exportTable = function (id,name) {
        var blob = new Blob([document.getElementById(id).innerHTML], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, (name || "export")+'.xls');
      };

      $scope.ConvertToTextArea=function(id, bijoy){
        var str = document.getElementById(id).innerHTML;
        str = ConvertToASCII(bijoy, str);
        console.log(str);
        var blob = new Blob([str], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        });
        saveAs(blob, (name || "export")+'.doc');
      }



        $scope.footerGallery=[
          {thumb:'images/image-gallery/Face to Cace_Councilor/DSC_1401_1.JPG',
            img:'images/image-gallery/Face to Cace_Councilor/DSC_1401.JPG'},

          {thumb:'images/image-gallery/Face to Face_Mayor/North/DSC_0764_1.JPG',
            img:'images/image-gallery/Face to Face_Mayor/North/DSC_0764.JPG'},

          {thumb:'images/image-gallery/Face to Face_Mayor/South/DSC_0495_1.JPG',
            img:'images/image-gallery/Face to Face_Mayor/South/DSC_0495.JPG'},

          {thumb:'images/image-gallery/Press Conference/13th April_1.JPG',
            img:'images/image-gallery/Press Conference/13th April.JPG'},

          {thumb:'images/image-gallery/Press Conference/21st march_1.JPG',
            img:'images/image-gallery/Press Conference/21st march.JPG'},

          {thumb:'images/image-gallery/Press Conference/Press Conference_21st march_1.JPG',
            img:'images/image-gallery/Press Conference/Press Conference_21st march.JPG'}
        ];

    });

  angular.element(document).ready(function () {


  });

})();
