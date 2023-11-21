var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
//var ds = app.datasources.mongovotebdtest;
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;


oldds.connector.query("SELECT * FROM `form222014` limit 1000", '', function (err, rows, fields) {
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

  if (rows.length) {
    rows.forEach(function (eachRow) {

      console.log("updating ",eachRow['COL 19']);
      aSum = 0;
      bSum = 0;

      if (iter != 1) {
        var distr = {};
        distr.statusEER = true;
        if (eachRow['COL 22'])
          distr.candidateNameEER = eachRow['COL 22'];
        if (eachRow['COL 23'])
          distr.candidateAddressEER = eachRow['COL 23'];
        if (eachRow['COL 24'])
          distr.agentNameEER = eachRow['COL 24'];
        if (eachRow['COL 25'])
          distr.agentAddressEER = eachRow['COL 25'];

        if (eachRow['COL 26']){
          distr._1a_22_PaidAmountEER =parseInt( eachRow['COL 26']);
          aSum +=parseInt( eachRow['COL 26']);
        }
        if (eachRow['COL 27']){
          distr._1a_22_ClaimedAmountEER = parseInt(eachRow['COL 27']);
          aSum +=parseInt( eachRow['COL 27']);
        }
        if (eachRow['COL 28']){
          distr._1a_22_ControversialAmountEER = parseInt(eachRow['COL 28']);
          aSum +=parseInt( eachRow['COL 28']);
        }


        if(aSum)
        distr._1a_22_TotalElectionAmountEER = aSum;

        if (eachRow['COL 30']) {
          distr._1b_22_CampaignCostAmountEER = parseInt(eachRow['COL 30']);
          bSum +=parseInt( eachRow['COL 30']);
        }
        if (eachRow['COL 31']) {
          distr._1b_22_ConveyanceCostAmountEER = parseInt(eachRow['COL 31']);
          bSum +=parseInt( eachRow['COL 31']);
        }
        if (eachRow['COL 32']) {
          distr._1b_22_PublicMeetingCostAmountEER = parseInt(eachRow['COL 32']);
          bSum +=parseInt( eachRow['COL 32']);
        }
        if (eachRow['COL 33']) {
          distr._1b_22_CampCostAmountEER = parseInt(eachRow['COL 33']);
          bSum +=parseInt( eachRow['COL 33']);
        }
        if (eachRow['COL 34']) {
          distr._1b_22_AgentCostAmountEER = parseInt(eachRow['COL 34']);
          bSum +=parseInt( eachRow['COL 34']);
        }
        if (eachRow['COL 35']) {
          distr._1b_22_AdministrationCostAmountEER = parseInt(eachRow['COL 35']);
          bSum +=parseInt( eachRow['COL 35']);
        }

        if(bSum)
          distr._1b_22_ElectionCostAmountEER = bSum;

        distr.pdfFilePathEER = eachRow['COL 70'];

        if(eachRow['COL 69']){
          st = eachRow['COL 69'];
          dt = new Date(st.replace(pattern, '$3-$2-$1'));
          if(dt!="Invalid Date")
            distr.submissionDateEER = dt;

        }
        distr.createdEER = distr.modifiedEER=new Date();

        distr.isPublishedEER = true;

        //console.log(distr.submissionDateEER);

        if(distr.candidateNameEER ){
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


  oldds.disconnect();
});
