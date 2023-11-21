var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;


////Step 1: Showing table structure
//oldds.discoverSchema('district_list', {schema: 'votebd_reorganize_2016'}, function(err,schema) {
//  if (err) throw err;
//
//  var json = JSON.stringify(schema, null, '  ');
//  console.log(json);
//
//  oldds.disconnect();
//});

////Step 2: Showing data
//oldds.discoverAndBuildModels('district_list', {schema: 'votebd_reorganize_2016'},
//  function(err, models) {
//    if (err) throw err;
//
//    models.DistrictList.find(function(err, districts) {
//      if (err) throw err;
//
//      console.log('Found:', districts);
//
//      oldds.disconnect();
//    });
//  });


////Step 3: Retreiving data from mysql and push to mongo
//oldds.discoverAndBuildModels('district_list', {schema: 'votebd_reorganize_2016'},
//  function(err, models) {
//    if (err) throw err;
//
//    models.DistrictList.find(function(err, districts) {
//      if (err) throw err;
//
//      //console.log('Found:', districts);
//
//
//      //importing to mongo
//      var count = districts.length;
//      districts.forEach(function(district) {
//
//        var distr = {};
//        distr.oldId = district.slNo;
//        distr.nameEn = district.districtName;
//        distr.nameBn = district.districtNameBng;
//        distr.infoBn = district.districtInfo;
//        distr.oldDivisionId = district.divisionId;
//        distr.districtCode = district.districtCode;
//
//
//        app.models.district.create(distr, function(err, model) {
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


//now put division objectId to district(districtId)
  app.models.division.find(function(err, divisions) {
      if (err) throw err;

      console.log('Found:', divisions.length);


      //importing to mongo
    divisions.forEach(function(division) {

      //console.log(division);
      var distr = {};
      distr.divisionId = division.id;

      app.models.district.updateAll({oldDivisionId: division.oldId}, distr, function(errr, info) {
        if(err)
          throw errr;

        console.log(info);
      });

    });

      //ds.disconnect();
    });




