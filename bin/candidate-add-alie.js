var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
//var ds = app.datasources.mongovotebdtest;
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;

function IsNumeric(input) {
  return (input - 0) == input && ('' + input).trim().length > 0;
}

//importing national election 2016 - alie
oldds.connector.query("SELECT * FROM `form212014` where `COL 19`=12532 limit 1000", '', function (err, rows, fields) {
  if (err) {
    console.log(err);
    throw err;
  }

  console.log("total form found:", rows.length);
  //console.log(rows);

  var iter = 1;

  var st;
  var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
  var dt;
  var aSum = 0, bSum = 0;

  var i=0;
  var exceptHousePropertyALIE_amount=[];
  var exceptHousePropertyALIE_location=[];
  var exceptHousePropertyALIE_price=[];
  var distr_exceptHousePropertyALIE=[];
  var exceptHousePropertyTotalPriceALIE=0;
  var exceptHousePropertyTotalPriceALIE=0;
  var each_exceptHousePropertyALIE={};

  if (rows.length) {
    rows.forEach(function (eachRow) {

      console.log("updating ",eachRow['COL 19']);
      aSum = 0;
      bSum = 0;

      //if (iter != 1) {
        var distr = {};
        distr.statusALIE = true;

        if (eachRow['COL 22'])
          distr.candiateNameFSEE = eachRow['COL 22'];
        if (eachRow['COL 23'])
          distr.candidateAddressFSEE = eachRow['COL 23'];


        if (eachRow['COL 26']){
          exceptHousePropertyALIE_amount =eachRow['COL 24'].split("//");
          exceptHousePropertyALIE_location =eachRow['COL 25'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 26'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_amount[i])
              each_exceptHousePropertyALIE.amount=exceptHousePropertyALIE_amount[i];
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.location=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr.exceptHousePropertyALIE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE)
            distr.exceptHousePropertyTotalPriceALIE=exceptHousePropertyTotalPriceALIE;

        }

        if (eachRow['COL 30']){
          exceptHousePropertyALIE_amount =eachRow['COL 28'].split("//");
          exceptHousePropertyALIE_location =eachRow['COL 29'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 30'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_amount[i])
              each_exceptHousePropertyALIE.size=exceptHousePropertyALIE_amount[i];
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.location=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr.housePropertyALIE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE)
            distr.housePropertyTotalPriceALIE=exceptHousePropertyTotalPriceALIE;

        }

        if (eachRow['COL 33']){
          exceptHousePropertyALIE_location =eachRow['COL 32'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 33'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.description=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr.otherPropertyALIE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE)
            distr.otherPropertyTotalPriceALIE=exceptHousePropertyTotalPriceALIE;

        }

        if (eachRow['COL 36']){
          exceptHousePropertyALIE_location =eachRow['COL 35'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 36'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.description=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr.liabilityALIE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE)
            distr.liabilityTotalAmountALIE=exceptHousePropertyTotalPriceALIE;

        }

        if (eachRow['COL 39']){
          exceptHousePropertyALIE_location =eachRow['COL 38'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 39'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.description=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr.annualIncomeALIE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE)
            distr.annualIncomeTotalAmountALIE=exceptHousePropertyTotalPriceALIE;

        }

        if (eachRow['COL 42']){
          exceptHousePropertyALIE_location =eachRow['COL 41'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 42'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.description=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr.annualExpenseALIE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE)
            distr.annualExpenseTotalAmountALIE=exceptHousePropertyTotalPriceALIE;

        }


        distr.pdfFilePath = eachRow['COL 45'];

        if(eachRow['COL 44']){
          st = eachRow['COL 44'];
          dt = new Date(st.replace(pattern, '$3-$2-$1'));
          if(dt!="Invalid Date")
            distr.submissionDateEER = dt;

        }
        distr.createdEER = distr.modifiedEER=new Date();

        distr.isPublishedEER = true;

        //console.log(distr);

        if(distr.candiateNameFSEE ){
          app.models.candidate.updateAll({oldId: eachRow['COL 19']}, distr, function (errr, info) {
            if (errr)
              throw errr;

            console.log(info, iter++);
          });
        }
      //} else {
      //  iter++;
      //}


    });
  }


  //oldds.disconnect();
});

////importing national election 2008 - alie
//oldds.connector.query("SELECT * FROM `form212008` where `COL 19`=2660  limit 1000", '', function (err, rows, fields) {
//  if (err) {
//    console.log(err);
//    throw err;
//  }
//
//  console.log("total form found:", rows.length);
//  //console.log(rows);
//
//  var iter = 1;
//
//  var st;
//  var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
//  var dt;
//  var aSum = 0, bSum = 0;
//
//  var i=0;
//  var exceptHousePropertyALIE_amount=[];
//  var exceptHousePropertyALIE_location=[];
//  var exceptHousePropertyALIE_price=[];
//  var distr_exceptHousePropertyALIE=[];
//  var exceptHousePropertyTotalPriceALIE=0;
//  var exceptHousePropertyTotalPriceALIE=0;
//  var each_exceptHousePropertyALIE={};
//
//  if (rows.length) {
//    rows.forEach(function (eachRow) {
//
//      console.log("updating ",eachRow['COL 19']);
//      aSum = 0;
//      bSum = 0;
//
//      //if (iter != 1) {
//        var distr = {};
//        distr.statusALIE = true;
//
//        if (eachRow['COL 22'])
//          distr.candiateNameFSEE = eachRow['COL 22'];
//        if (eachRow['COL 23'])
//          distr.candidateAddressFSEE = eachRow['COL 23'];
//
//
//        if (eachRow['COL 26']){
//          exceptHousePropertyALIE_amount =eachRow['COL 24'].split("//");
//          exceptHousePropertyALIE_location =eachRow['COL 25'].split("//");
//          exceptHousePropertyALIE_price=eachRow['COL 26'].split("//");
//          distr_exceptHousePropertyALIE=[];
//          exceptHousePropertyTotalPriceALIE=0;
//          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
//            each_exceptHousePropertyALIE={};
//            if(exceptHousePropertyALIE_amount[i])
//              each_exceptHousePropertyALIE.amount=exceptHousePropertyALIE_amount[i];
//            if(exceptHousePropertyALIE_location[i])
//              each_exceptHousePropertyALIE.location=exceptHousePropertyALIE_location[i];
//            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
//              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
//              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
//            }
//
//            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
//          }
//
//          if(distr_exceptHousePropertyALIE.length)
//            distr.exceptHousePropertyALIE=distr_exceptHousePropertyALIE;
//
//          if(exceptHousePropertyTotalPriceALIE)
//            distr.exceptHousePropertyTotalPriceALIE=exceptHousePropertyTotalPriceALIE;
//
//        }
//
//        if (eachRow['COL 30']){
//          exceptHousePropertyALIE_amount =eachRow['COL 28'].split("//");
//          exceptHousePropertyALIE_location =eachRow['COL 29'].split("//");
//          exceptHousePropertyALIE_price=eachRow['COL 30'].split("//");
//          distr_exceptHousePropertyALIE=[];
//          exceptHousePropertyTotalPriceALIE=0;
//          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
//            each_exceptHousePropertyALIE={};
//            if(exceptHousePropertyALIE_amount[i])
//              each_exceptHousePropertyALIE.size=exceptHousePropertyALIE_amount[i];
//            if(exceptHousePropertyALIE_location[i])
//              each_exceptHousePropertyALIE.location=exceptHousePropertyALIE_location[i];
//            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
//              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
//              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
//            }
//
//            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
//          }
//
//          if(distr_exceptHousePropertyALIE.length)
//            distr.housePropertyALIE=distr_exceptHousePropertyALIE;
//
//          if(exceptHousePropertyTotalPriceALIE)
//            distr.housePropertyTotalPriceALIE=exceptHousePropertyTotalPriceALIE;
//
//        }
//
//        if (eachRow['COL 33']){
//          exceptHousePropertyALIE_location =eachRow['COL 32'].split("//");
//          exceptHousePropertyALIE_price=eachRow['COL 33'].split("//");
//          distr_exceptHousePropertyALIE=[];
//          exceptHousePropertyTotalPriceALIE=0;
//          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
//            each_exceptHousePropertyALIE={};
//            if(exceptHousePropertyALIE_location[i])
//              each_exceptHousePropertyALIE.description=exceptHousePropertyALIE_location[i];
//            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
//              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
//              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
//            }
//
//            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
//          }
//
//          if(distr_exceptHousePropertyALIE.length)
//            distr.otherPropertyALIE=distr_exceptHousePropertyALIE;
//
//          if(exceptHousePropertyTotalPriceALIE)
//            distr.otherPropertyTotalPriceALIE=exceptHousePropertyTotalPriceALIE;
//
//        }
//
//        if (eachRow['COL 36']){
//          exceptHousePropertyALIE_location =eachRow['COL 35'].split("//");
//          exceptHousePropertyALIE_price=eachRow['COL 36'].split("//");
//          distr_exceptHousePropertyALIE=[];
//          exceptHousePropertyTotalPriceALIE=0;
//          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
//            each_exceptHousePropertyALIE={};
//            if(exceptHousePropertyALIE_location[i])
//              each_exceptHousePropertyALIE.description=exceptHousePropertyALIE_location[i];
//            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
//              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
//              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
//            }
//
//            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
//          }
//
//          if(distr_exceptHousePropertyALIE.length)
//            distr.liabilityALIE=distr_exceptHousePropertyALIE;
//
//          if(exceptHousePropertyTotalPriceALIE)
//            distr.liabilityTotalAmountALIE=exceptHousePropertyTotalPriceALIE;
//
//        }
//
//        if (eachRow['COL 39']){
//          exceptHousePropertyALIE_location =eachRow['COL 38'].split("//");
//          exceptHousePropertyALIE_price=eachRow['COL 39'].split("//");
//          distr_exceptHousePropertyALIE=[];
//          exceptHousePropertyTotalPriceALIE=0;
//          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
//            each_exceptHousePropertyALIE={};
//            if(exceptHousePropertyALIE_location[i])
//              each_exceptHousePropertyALIE.description=exceptHousePropertyALIE_location[i];
//            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
//              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
//              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
//            }
//
//            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
//          }
//
//          if(distr_exceptHousePropertyALIE.length)
//            distr.annualIncomeALIE=distr_exceptHousePropertyALIE;
//
//          if(exceptHousePropertyTotalPriceALIE)
//            distr.annualIncomeTotalAmountALIE=exceptHousePropertyTotalPriceALIE;
//
//        }
//
//        if (eachRow['COL 42']){
//          exceptHousePropertyALIE_location =eachRow['COL 41'].split("//");
//          exceptHousePropertyALIE_price=eachRow['COL 42'].split("//");
//          distr_exceptHousePropertyALIE=[];
//          exceptHousePropertyTotalPriceALIE=0;
//          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
//            each_exceptHousePropertyALIE={};
//            if(exceptHousePropertyALIE_location[i])
//              each_exceptHousePropertyALIE.description=exceptHousePropertyALIE_location[i];
//            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
//              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
//              each_exceptHousePropertyALIE.price=Number(exceptHousePropertyALIE_price[i]);
//            }
//
//            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
//          }
//
//          if(distr_exceptHousePropertyALIE.length)
//            distr.annualExpenseALIE=distr_exceptHousePropertyALIE;
//
//          if(exceptHousePropertyTotalPriceALIE)
//            distr.annualExpenseTotalAmountALIE=exceptHousePropertyTotalPriceALIE;
//
//        }
//
//
//        distr.pdfFilePath = eachRow['COL 45'];
//
//        if(eachRow['COL 44']){
//          st = eachRow['COL 44'];
//          dt = new Date(st.replace(pattern, '$3-$2-$1'));
//          if(dt!="Invalid Date")
//            distr.submissionDateEER = dt;
//
//        }
//        distr.createdEER = distr.modifiedEER=new Date();
//
//        distr.isPublishedEER = true;
//
//        //console.log(distr);
//
//        if(distr.candiateNameFSEE ){
//          app.models.candidate.updateAll({oldId: eachRow['COL 19']}, distr, function (errr, info) {
//            if (errr)
//              throw errr;
//
//            console.log(info, iter++);
//          });
//        }
//      //} else {
//      //  iter++;
//      //}
//
//
//    });
//  }
//
//
//  //oldds.disconnect();
//});
