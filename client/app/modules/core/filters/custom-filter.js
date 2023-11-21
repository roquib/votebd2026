var decodeEntities = (function() {
  // this prevents any overhead from creating the object each time
  var element = document.createElement('div');

  function decodeHTMLEntities (str) {
    if(str && typeof str === 'string') {
      // strip script/html tags
      str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
      str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
      element.innerHTML = str;
      str = element.textContent;
      element.textContent = '';
    }

    return str;
  }

  return decodeHTMLEntities;
})();


(function () {
  'use strict';
  /**
   * @ngdoc directive
   * @name com.module.core.directive:adminBox
   * @description
   * # adminBox
   */
  angular
    .module('com.module.core')
    .filter('translateNumber', function($rootScope) {
      return function(x) {
        if(x && $rootScope.locale.lang == 'bn_BD'){
          //if(x){
          //  if(typeof x =='number'){
          //    x = x.toString();
          //  }
          //  //console.log(typeof x);
          //  console.log('x',x);
          //
          //
          //  var numberArr = x.split('');
          //  var i = 0,banglaNumber='';
          //
          //  //console.log(numberArr);
          //  for(i=0;i<numberArr.length;i++){
          //    banglaNumber+= '&#'+ (parseInt(numberArr[i])+2534).toString()+';';
          //  }
          //
          //  return decodeEntities(banglaNumber);
          //}
          //
          //return '';

          var strArray= x.toString().split('');

          for(var i =0; i< strArray.length; i++){
            if(!isNaN(strArray[i])){
              if(strArray[i] === '0'){
                strArray[i] = '০';
              }
              if(strArray[i] === '1'){
                strArray[i] = '১';
              }
              if(strArray[i] === '2'){
                strArray[i] = '২';
              }
              if(strArray[i] === '3'){
                strArray[i] = '৩';
              }
              if(strArray[i] === '4'){
                strArray[i] = '৪';
              }
              if(strArray[i] === '5'){
                strArray[i] = '৫';
              }
              if(strArray[i] === '6'){
                strArray[i] = '৬';
              }
              if(strArray[i] === '7'){
                strArray[i] = '৭';
              }
              if(strArray[i] === '8'){
                strArray[i] = '৮';
              }
              if(strArray[i] === '9'){
                strArray[i] = '৯';
              }
            }
          }
          return strArray.join('');
        }else if(x === 0 && $rootScope.locale.lang == 'bn_BD'){
          return '০';
        }
        else return x;
      };
    })
    .filter('ratio', function () {
      return function (oldValue, newValue) { console.log(oldValue);
        if(isNaN(oldValue) || isNaN(newValue)){
          return Number(0).toFixed(2);
        }if(oldValue == 0 &&newValue == 0){
          return Number(0).toFixed(2);
        }if(oldValue == 0){
          return Number(100).toFixed(2);
        }else if(newValue == 0){
          return Number(-100).toFixed(2);
        }else{
          return Number((newValue - oldValue)*100/oldValue).toFixed(2);
        }
      };
    });

})();
