var path = require('path');
var PHPUnserialize = require('php-unserialize');
var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;


function IsNumeric(input) {
  return (input - 0) == input && ('' + input).trim().length > 0;
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////MERGE AFFIDEVIT COURT SECTIION //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////

//oldds.connector.query("SELECT profile_id, COUNT(id) as cnt FROM effidevit_court_section where publish='publish' group by profile_id limit 1000, 5000",'',function(err,rows,fields) {
//  if(err){
//    console.log(err);
//    throw err;
//  }
//
//  console.log(rows.length);
//  //console.log(rows);
//
//  var iter=1;
//  if(rows.length){
//    rows.forEach(function(eachRow){
//      console.log("working with profile_id: ",eachRow.profile_id," length: ",eachRow.cnt);
//      oldds.connector.query("SELECT * FROM effidevit_court_section where profile_id="+eachRow.profile_id,'',function(err22,rows2,fields) {
//
//        if(err22){
//          console.log("-------------------",err22);
//          throw err22;
//        }
//
//        var profilesLen = rows2.length;
//
//
//        if(profilesLen){
//          var present = [];
//          var past = [];
//          for(var i=0;i<profilesLen;i++){
//            var lawCourt = {whichLaw:rows2[i].which_law, whichCourt:rows2[i].which_court, courtFileNo:rows2[i].court_file_no, currentStatusResult:rows2[i].current_status_result};
//            if(rows2[i].status == "present"){
//              present.push(lawCourt);
//            }
//            if(rows2[i].status == "past"){
//              past.push(lawCourt);
//            }
//          }
//
//          var candidateAffidevit={};
//          candidateAffidevit.lawPresentCountAF = present.length;
//          if(candidateAffidevit.lawPresentCountAF) {
//            candidateAffidevit.lawPresentAF = present;
//          }
//          candidateAffidevit.lawPastCountAF = past.length;
//          if(candidateAffidevit.lawPastCountAF )
//            candidateAffidevit.lawPastAF = past;
//          //console.log(candidateAffidevit);
//
//
//          app.models.candidate.updateAll({oldAffidevitId: eachRow.profile_id}, candidateAffidevit, function(errr, info) {
//            if(errr)
//              throw errr;
//
//            console.log(info, iter++);
//          });
//        }
//      });
//    })
//  }
//
//
//  //oldds.disconnect();
//});

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////MERGE AFFIDEVIT Loan section //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////MERGE AFFIDEVIT income section //////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////MERGE AFFIDEVIT assets section //////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
