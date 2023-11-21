var path = require('path');
var app = require(path.resolve(__dirname, '../server/server'));
//var ds = app.datasources.mongovotebdtest;
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;


// now put person objectId to candidate(personId)
app.models.person.find({},function(err, persons) {
  if (err){
    console.log("error to find:", err);
    throw err;
  }

  console.log('Found:', persons.length);
  //console.log( persons);
  var count = persons.length;

  //importing to mongo
  persons.forEach(function(person) {

    console.log("updating personId",person.oldId);
    var distr = {};
    distr.genderBn = person.genderBn;

    if(person.genderBn=="পুরুষ")
      distr.genderEn = "male";
    else
      distr.genderEn = "female";

    app.models.candidate.updateAll({personId: person.id}, distr, function(errr, info) {
      if(errr){
        console.log("error to update:",err);
        throw errr;
      }

      console.log("updated done oldpersonId",person.oldId);
    });

    //count--;
    //if (count === 0){
    //  console.log("disconnect korte aise;");
    //  ds.disconnect();
    //}

  });


});
