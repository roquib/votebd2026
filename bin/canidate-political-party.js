/**
 * Created by mahfuz on 1/24/16.
 */
var Promises = require("q");

var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
//var ds = app.datasources.mongovotebdtest;
var ds = app.datasources.votebdmongo;
//var oldds = app.datasources.votebdold;
//now put currentElection objectId to candidate(currentElectionId)
  app.models.PoliticalParty.find({},function(err, PoliticalPartyList) {

    console.log(PoliticalPartyList.length);

    var query = {where: {currentElectionId: "565efcdfffc1dfb27abad1f9", electionSeatId: "565fea7b8e743a3c43561b84"}}


    //db.getCollection('candidate').count({currentElectionId: ObjectId("565efcdfffc1dfb27abad1f9"), electionSeatId: ObjectId("565fea7b8e743a3c43561b84")})

    app.models.Candidate.find(query,function(err, candidateList) {



      console.log("candidate - ", candidateList.length);

var candidatePromisesList = [];
      for(var i = 0; i< candidateList.length; i++){
        var randomPartyIndex = Math.floor((Math.random() * 10));

        if(randomPartyIndex){
          //candidatePromisesList[i] =  app.models.Candidate.find({where: { id: candidateList[i].id } });
          candidatePromisesList[i] =  app.models.Candidate.updateAll({ id: candidateList[i].id } , {politicalPartyId: PoliticalPartyList[randomPartyIndex].id});
        }


      }
      console.log("before");

Promises.all(candidatePromisesList).then(function (pData) {

  //console.log("candidatePromisesList ", candidatePromisesList );
  console.log("************************************************************************");
  console.log("************************************************************************");
  console.log("************************************************************************");
  console.log("************************************************************************");
  console.log("************************************************************************");
  console.log("pData",pData);
  console.log("************************************************************************");
  console.log("************************************************************************");
  console.log("************************************************************************");
  console.log("************************************************************************");
  console.log("************************************************************************");
  ds.disconnect();
  console.log("end");

});


    });

    });
