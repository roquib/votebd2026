var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
//var ds = app.datasources.mongovotebdtest;
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;


////Step 1: Showing table structure
//oldds.discoverSchema('election_candidates', {schema: 'votebd_reorganize_2016'}, function(err,schema) {
//  if (err) throw err;
//
//  var json = JSON.stringify(schema, null, '  ');
//  console.log(json);
//
//  oldds.disconnect();
//});


////Step 2: Showing data
//oldds.discoverAndBuildModels('election_candidates', {schema: 'votebd_reorganize_2016'},
//  function(err, models) {
//    if (err) throw err;
//
//    models.ElectionCandidates.find({limit:4},function(err, districts) {
//      if (err) throw err;
//
//      console.log('Found:', districts);
//
//      oldds.disconnect();
//    });
//  });


////Step 3: Retreiving data from mysql and push to mongo
//oldds.discoverAndBuildModels('election_candidates', {schema: 'votebd_reorganize_2016'},
//  function(err, models) {
//    if (err) throw err;
//
//    models.ElectionCandidates.find(function(err, candidates) {
//      if (err) throw err;
//
//      //console.log('Found:', candidates);
//
//
//      //importing to mongo
//      var count = candidates.length;
//      candidates.forEach(function(candidate) {
//
//        var distr = {};
//        distr.oldId = candidate.id;
//        distr.oldCurrentElectionId = candidate.currentElectionId;
//        distr.oldDivisionId = candidate.divisionId;
//        distr.districtCode = candidate.districtCode;
//        distr.oldElectionSeatId = candidate.seatId;
//        distr.oldPersonId = candidate.personId;
//        distr.oldPoliticalPartyId = candidate.politicalPartyId;
//        distr.oldElectionCandidatePostId = candidate.candidatePost;
//        distr.oldConstitutionalPostId = candidate.constitutionalPostId;
//        distr.constitutionalPostBn = candidate.constitutionalPost;
//        distr.wardNameBn = candidate.wardName;
//        distr.resultType = candidate.resultType;
//        distr.candidateType = candidate.candidateType;
//        distr.candidatePhoto = candidate.photo;
//
//
//        app.models.candidate.create(distr, function(err, model) {
//          if (err) throw err;
//
//          console.log('Created:', model);
//
//          count--;
//          if (count === 0)
//            ds.disconnect();
//        });
//      });
//
//
//
//      oldds.disconnect();
//    });
//  });

//
////now put currentElection objectId to candidate(currentElectionId)
//  app.models.currentElection.find({},function(err, currentElections) {
//      if (err) throw err;
//
//      console.log('Found:', currentElections.length);
//      //console.log( currentElections);
//
//      //importing to mongo
//    currentElections.forEach(function(currentElection) {
//
//      console.log(currentElection);
//      var distr = {};
//      distr.currentElectionId = currentElection.id;
//
//      app.models.candidate.updateAll({oldCurrentElectionId: currentElection.oldId}, distr, function(errr, info) {
//        if(err)
//          throw errr;
//
//        console.log(info);
//      });
//
//    });
//
//      //ds.disconnect();
//    });


//// now put electionSeat objectId to candidate(electionSeatId)
//  app.models.electionSeat.find({},function(err, electionSeats) {
//      if (err) throw err;
//
//      console.log('Found:', electionSeats.length);
//      //console.log( electionSeats);
//    var count = electionSeats.length;
//
//      //importing to mongo
//    var spreadData = [];
//    electionSeats.forEach(function(electionSeat) {
//
//      console.log("oldElectionSeatId",electionSeat.oldId);
//      var distr = {};
//      distr.electionSeatId = electionSeat.id;
//      distr.districtId = electionSeat.districtId;
//      distr.divisionId = electionSeat.divisionId;
//      distr.divisionId = electionSeat.divisionId;
//
//      app.models.candidate.updateAll({oldElectionSeatId: electionSeat.oldId}, distr, function(errr, info) {
//        if(err){
//          console.log("error:",err);
//          throw errr;
//        }
//
//        console.log("hello",electionSeat.oldId);
//      });
//
//      //count--;
//      //if (count === 0){
//      //  console.log("disconnect korte aise;");
//      //  ds.disconnect();
//      //}
//
//    });
//
//
//    });

///////////////////////////////////////////////////////

//// now put person objectId to candidate(personId)
//  app.models.person.find({},function(err, persons) {
//      if (err){
//        console.log("error to find:", err);
//        throw err;
//      }
//
//      console.log('Found:', persons.length);
//      //console.log( persons);
//    var count = persons.length;
//
//      //importing to mongo
//    var spreadData = [];
//    persons.forEach(function(person) {
//
//      console.log("oldPersonId",person.oldId);
//      var distr = {};
//      distr.personId = person.id;
//
//      app.models.candidate.updateAll({oldPersonId: person.oldId}, distr, function(errr, info) {
//        if(errr){
//          console.log("error to update:",err);
//          throw errr;
//        }
//
//        console.log("updated done oldPersonId",person.oldId);
//      });
//
//      //count--;
//      //if (count === 0){
//      //  console.log("disconnect korte aise;");
//      //  ds.disconnect();
//      //}
//
//    });
//
//
//    });


//// now put politicalParty objectId to candidate(politicalPartyId)
//  app.models.politicalParty.find({},function(err, politicalParties) {
//      if (err){
//        console.log("error to find:", err);
//        throw err;
//      }
//
//      console.log('Found:', politicalParties.length);
//      //console.log( politicalParties);
//    var count = politicalParties.length;
//
//      //importing to mongo
//    var spreadData = [];
//    politicalParties.forEach(function(politicalParty) {
//
//      console.log("oldPoliticalPartyId",politicalParty.oldId);
//      var distr = {};
//      distr.politicalPartyId = politicalParty.id;
//
//      app.models.candidate.updateAll({oldPoliticalPartyId: politicalParty.oldId}, distr, function(errr, info) {
//        if(errr){
//          console.log("error to update:",err);
//          throw errr;
//        }
//
//        console.log("updated done oldPoliticalPartyId",politicalParty.oldId);
//      });
//
//      //count--;
//      //if (count === 0){
//      //  console.log("disconnect korte aise;");
//      //  ds.disconnect();
//      //}
//
//    });
//
//
//    });


//// now put candidatePost objectId to candidate(candidatePostId)
//  app.models.electionCandidatePost.find({},function(err, candidatePosts) {
//      if (err){
//        console.log("error to find:", err);
//        throw err;
//      }
//
//      console.log('Found:', candidatePosts.length);
//      //console.log( candidatePosts);
//    var count = candidatePosts.length;
//
//      //importing to mongo
//    candidatePosts.forEach(function(candidatePost) {
//
//      console.log("oldCandidatePostId",candidatePost.oldId);
//      var distr = {};
//      distr.electionCandidatePostId = candidatePost.id;
//
//      app.models.candidate.updateAll({oldElectionCandidatePostId: candidatePost.oldId}, distr, function(errr, info) {
//        if(errr){
//          console.log("error to update:",err);
//          throw errr;
//        }
//
//        console.log("updated done oldCandidatePostId",candidatePost.oldId);
//      });
//
//      //count--;
//      //if (count === 0){
//      //  console.log("disconnect korte aise;");
//      //  ds.disconnect();
//      //}
//
//    });
//
//
//    });


//// now put constitutionalPost objectId to candidate(constitutionalPostId)
//app.models.constitutionalPost.find({},function(err, constitutionalPosts) {
//  if (err){
//    console.log("error to find:", err);
//    throw err;
//  }
//
//  console.log('Found:', constitutionalPosts.length);
//  //console.log( constitutionalPosts);
//  var count = constitutionalPosts.length;
//
//  //importing to mongo
//  constitutionalPosts.forEach(function(constitutionalPost) {
//
//    console.log("oldconstitutionalPostId",constitutionalPost.oldId);
//    var distr = {};
//    distr.constitutionalPostId = constitutionalPost.id;
//
//    app.models.candidate.updateAll({oldConstitutionalPostId: constitutionalPost.oldId}, distr, function(errr, info) {
//      if(errr){
//        console.log("error to update:",err);
//        throw errr;
//      }
//
//      console.log("updated done oldconstitutionalPostId",constitutionalPost.oldId);
//    });
//
//    //count--;
//    //if (count === 0){
//    //  console.log("disconnect korte aise;");
//    //  ds.disconnect();
//    //}
//
//  });
//
//
//});


//// Step 3: Retreiving data from mysql and push to mongo
//oldds.discoverAndBuildModels('election_candidates', {schema: 'votebd_reorganize_2016'},
//  function (err, models) {
//    if (err) throw err;
//
//    models.ElectionCandidates.find({limit:10},function (err, candidates) {
//      if (err) throw err;
//
//      //console.log('Found:', candidates);
//
//
//      //importing to mongo
//      var iter=0;
//      var count = candidates.length;
//      candidates.forEach(function (candidate) {
//
//        var distr = {};
//        distr.personNameBn = candidate.personNameBn;
//        distr.personNameEn = candidate.personNameEn;
//
//
//        if(distr.personNameBn || distr.personNameEn){
//          app.models.candidate.updateAll({oldId: candidate.id}, distr, function (errr, info) {
//            if (errr)
//              throw errr;
//
//            console.log(info, iter++);
//          });
//        }
//
//
//      });
//
//
//      //oldds.disconnect();
//    });
//  });


oldds.connector.query("SELECT * FROM `election_candidates` limit 20000, 5000",'',function(err,rows,fields) {
  if(err){
    console.log(err);
    throw err;
  }

  console.log("total candidate found:",rows.length);
  //console.log(rows);

  var iter=1;
  if(rows.length){
    rows.forEach(function(eachRow){


        var distr = {};
        distr.personNameBn = eachRow.personNameBn;
        distr.personNameEn = eachRow.personNameEn;


        if(distr.personNameBn || distr.personNameEn){
          app.models.candidate.updateAll({oldId: eachRow.id}, distr, function (errr, info) {
            if (errr)
              throw errr;

            console.log(info, iter++);
          });
        }

      });
  }


  //oldds.disconnect();
});
