var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
//var ds = app.datasources.mongovotebdtest;
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;

function IsNumeric(input) {
  return (input - 0) == input && ('' + input).trim().length > 0;
}

//importing national election 2016 - alie
oldds.connector.query("SELECT * FROM `form202014` limit 1000", '', function (err, rows, fields) {
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

  var i=0;
  var exceptHousePropertyALIE_amount=[];
  var exceptHousePropertyALIE_location=[];
  var exceptHousePropertyALIE_price=[];
  var exceptHousePropertyALIE_relation=[];
  var exceptHousePropertyALIE_source=[];
  var distr_exceptHousePropertyALIE=[];
  var exceptHousePropertyTotalPriceALIE=0;
  var exceptHousePropertyTotalPriceALIE=0;
  var each_exceptHousePropertyALIE={};
  var _1total_abcdefgFSEE=0;

  if (rows.length) {
    rows.forEach(function (eachRow) {
      _1total_abcdefgFSEE=0;
      console.log("updating ",eachRow['COL 19']);

      if (eachRow['COL 19'] != "oldCandidateId") {
        var distr = {};
        distr.statusFSEE = true;

        if (eachRow['COL 22'])
          distr.candiateNameFSEE = eachRow['COL 22'];
        if (eachRow['COL 23'])
          distr.candidateAddressFSEE = eachRow['COL 23'];


        if (eachRow['COL 24']){
          exceptHousePropertyALIE_location =eachRow['COL 25'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 24'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.source=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.amount=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr._1a_personalIncomeFSEE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE){
            distr._1a_personalIncomeTotalFSEE=exceptHousePropertyTotalPriceALIE;
            _1total_abcdefgFSEE+=exceptHousePropertyTotalPriceALIE;
          }

        }

        if (eachRow['COL 27']){
          exceptHousePropertyALIE_amount =eachRow['COL 28'].split("//");
          exceptHousePropertyALIE_location =eachRow['COL 29'].split("//");
          exceptHousePropertyALIE_relation =eachRow['COL 30'].split("//");
          exceptHousePropertyALIE_source =eachRow['COL 31'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 27'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_amount[i])
              each_exceptHousePropertyALIE.name=exceptHousePropertyALIE_amount[i];
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.address=exceptHousePropertyALIE_location[i];
            if(exceptHousePropertyALIE_relation[i])
              each_exceptHousePropertyALIE.relation=exceptHousePropertyALIE_relation[i];
            if(exceptHousePropertyALIE_source[i])
              each_exceptHousePropertyALIE.source=exceptHousePropertyALIE_source[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.amount=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr._1b_loanRelativeFSEE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE){
            distr._1b_loanRelativeTotalFSEE=exceptHousePropertyTotalPriceALIE;
            _1total_abcdefgFSEE+=exceptHousePropertyTotalPriceALIE;
          }

        }


        if (eachRow['COL 33']){
          exceptHousePropertyALIE_amount =eachRow['COL 34'].split("//");
          exceptHousePropertyALIE_location =eachRow['COL 35'].split("//");
          exceptHousePropertyALIE_relation =eachRow['COL 36'].split("//");
          exceptHousePropertyALIE_source =eachRow['COL 37'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 33'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_amount[i])
              each_exceptHousePropertyALIE.name=exceptHousePropertyALIE_amount[i];
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.address=exceptHousePropertyALIE_location[i];
            if(exceptHousePropertyALIE_relation[i])
              each_exceptHousePropertyALIE.relation=exceptHousePropertyALIE_relation[i];
            if(exceptHousePropertyALIE_source[i])
              each_exceptHousePropertyALIE.source=exceptHousePropertyALIE_source[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.amount=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr._1c_freeRelativeFSEE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE){
            distr._1c_freeRelativeTotalFSEE=exceptHousePropertyTotalPriceALIE;
            _1total_abcdefgFSEE+=exceptHousePropertyTotalPriceALIE;
          }

        }


        if (eachRow['COL 39']){
          exceptHousePropertyALIE_amount =eachRow['COL 40'].split("//");
          exceptHousePropertyALIE_location =eachRow['COL 41'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 39'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_amount[i])
              each_exceptHousePropertyALIE.name=exceptHousePropertyALIE_amount[i];
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.address=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.amount=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr._1d_loanManFSEE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE){
            distr._1d_loanManTotalFSEE=exceptHousePropertyTotalPriceALIE;
            _1total_abcdefgFSEE+=exceptHousePropertyTotalPriceALIE;
          }

        }


        if (eachRow['COL 43']){
          exceptHousePropertyALIE_amount =eachRow['COL 44'].split("//");
          exceptHousePropertyALIE_location =eachRow['COL 45'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 43'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_amount[i])
              each_exceptHousePropertyALIE.name=exceptHousePropertyALIE_amount[i];
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.address=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.amount=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr._1e_freeManFSEE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE){
            distr._1e_freeManTotalFSEE=exceptHousePropertyTotalPriceALIE;
            _1total_abcdefgFSEE+=exceptHousePropertyTotalPriceALIE;
          }

        }


        if (eachRow['COL 47']){
          exceptHousePropertyALIE_amount =eachRow['COL 48'].split("//");
          exceptHousePropertyALIE_location =eachRow['COL 49'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 47'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_amount[i])
              each_exceptHousePropertyALIE.name=exceptHousePropertyALIE_amount[i];
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.office=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.amount=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr._1f_freePartyFSEE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE){
            distr._1f_freePartyTotalFSEE=exceptHousePropertyTotalPriceALIE;
            _1total_abcdefgFSEE+=exceptHousePropertyTotalPriceALIE;
          }

        }


        if (eachRow['COL 51']){
          exceptHousePropertyALIE_amount =eachRow['COL 52'].split("//");
          exceptHousePropertyALIE_location =eachRow['COL 53'].split("//");
          exceptHousePropertyALIE_price=eachRow['COL 51'].split("//");
          distr_exceptHousePropertyALIE=[];
          exceptHousePropertyTotalPriceALIE=0;
          for(i=0;i<exceptHousePropertyALIE_price.length;i++){
            each_exceptHousePropertyALIE={};
            if(exceptHousePropertyALIE_amount[i])
              each_exceptHousePropertyALIE.name=exceptHousePropertyALIE_amount[i];
            if(exceptHousePropertyALIE_location[i])
              each_exceptHousePropertyALIE.source=exceptHousePropertyALIE_location[i];
            if(IsNumeric(exceptHousePropertyALIE_price[i]) && Number(exceptHousePropertyALIE_price[i])){
              exceptHousePropertyTotalPriceALIE+=Number(exceptHousePropertyALIE_price[i]);
              each_exceptHousePropertyALIE.amount=Number(exceptHousePropertyALIE_price[i]);
            }

            distr_exceptHousePropertyALIE.push(each_exceptHousePropertyALIE);
          }

          if(distr_exceptHousePropertyALIE.length)
            distr._1g_freeOtherFSEE=distr_exceptHousePropertyALIE;

          if(exceptHousePropertyTotalPriceALIE){
            distr._1g_freeOtherTotalFSEE=exceptHousePropertyTotalPriceALIE;
            _1total_abcdefgFSEE+=exceptHousePropertyTotalPriceALIE;
          }

        }
      if(_1total_abcdefgFSEE)
        distr._1total_abcdefgFSEE=_1total_abcdefgFSEE;


      distr.pdfFilePath = eachRow['COL 57'];

        if(eachRow['COL 56']){
          st = eachRow['COL 56'];
          dt = new Date(st.replace(pattern, '$3-$2-$1'));
          if(dt!="Invalid Date")
            distr.submissionDateFSEE = dt;

        }
        distr.createdFSEE = distr.modifiedFSEE=new Date();

        distr.isPublishedFSEE = true;

        //console.log(distr);

        if(distr.candiateNameFSEE ){
          app.models.candidate.updateAll({oldId: eachRow['COL 19']}, distr, function (errr, info) {
            if (errr)
              throw errr;

            console.log(info, iter++);
          });
        }
      } else {
        iter++;
      }


    });
  }


  //oldds.disconnect();
});

