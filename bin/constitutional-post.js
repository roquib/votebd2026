var path = require('path');

var app = require(path.resolve(__dirname, '../server/server'));
var ds = app.datasources.votebdmongo;
var oldds = app.datasources.votebdold;


//Step 1: Showing table structure
//oldds.discoverSchema('constitutional_posts', {schema: 'votebd_reorganize_2016'}, function(err,schema) {
//  if (err) throw err;
//
//  var json = JSON.stringify(schema, null, '  ');
//  console.log(json);
//
//  oldds.disconnect();
//});

////Step 2: Showing data
//oldds.discoverAndBuildModels('constitutional_posts', {schema: 'votebd_reorganize_2016'},
//  function(err, models) {
//    if (err) throw err;
//
//    models.ConstitutionalPosts.find(function(err, constitutionalPosts) {
//      if (err) throw err;
//
//      console.log('Found:', constitutionalPosts);
//
//      oldds.disconnect();
//    });
//  });


//Step 3: Retreiving data from mysql and push to mongo
oldds.discoverAndBuildModels('constitutional_posts', {schema: 'votebd_reorganize_2016'},
  function(err, models) {
    if (err) throw err;

    models.ConstitutionalPosts.find(function(err, constitutionalPosts) {
      if (err) throw err;

      //console.log('Found:', constitutionalPosts);


      //importing to mongo
      var count = constitutionalPosts.length;
      constitutionalPosts.forEach(function(constitutionalPost) {

        console.log(constitutionalPost);
        var divisn = {};
        divisn.oldId = constitutionalPost.id;
        if(constitutionalPost.namebn)
          divisn.constitutionalPostNameBn = constitutionalPost.namebn;
        if(constitutionalPost.nameen)
          divisn.constitutionalPostNameEn = constitutionalPost.nameen;
        divisn.isPublished=true;

        //console.log(divisn);

        app.models.constitutionalPost.create(divisn, function(err, model) {
          if (err) throw err;

          console.log('Created:', model);

          count--;
          if (count === 0)
            ds.disconnect();
        });
      });



      oldds.disconnect();
    });
  });


