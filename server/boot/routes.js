/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var multer = require('multer');
var fs = require('fs');
var search=require('./searchControllers');

module.exports = function (app) {

    // Install a "/ping" route that returns "pong"
    app.get('/ping', function (req, res) {
        res.send('pong');
    });


    app.post('/upload', function (req, res, cb) {
        //console.log('server side upload method called');
        var candidatePhoto = '';
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                // checking and creating uploads folder where files will be uploaded
                var dirPath = 'client/app/assets/candidate_photos';
                if (!fs.existsSync(dirPath)) {
                    var dir = fs.mkdirSync(dirPath);
                }
                cb(null, dirPath + '/');
            },
            filename: function (req, file, cb) {
                // file will be accessible in `file` variable
                var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
                var fileName = Date.now()+"_"+file.originalname.replace(ext, "")+ ext;
                //var timestamp = new Date().getUTMilliseconds();
                //var fileName = timestamp + ext;
                candidatePhoto = fileName;
                cb(null, fileName);
            }
        });

        var upload = multer({
            storage: storage
        }).array('candidatePhoto', 12);
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                res.json(err);
            }
            res.json(candidatePhoto);
        });
    });


    app.post('/uploadsymbol', function (req, res, cb) {
        //console.log('server side upload method called');
        var politicalPartyMarka = '';
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                // checking and creating uploads folder where files will be uploaded
                var dirPath = 'client/app/assets/party_symbols';
                if (!fs.existsSync(dirPath)) {
                    var dir = fs.mkdirSync(dirPath);
                }
                cb(null, dirPath + '/');
            },
            filename: function (req, file, cb) {
                // file will be accessible in `file` variable
                var ext = file.originalname.substring(file.originalname.lastIndexOf("."));
                var fileName = Date.now()+"_"+file.originalname.replace(ext, "")+ ext;
                //var timestamp = new Date().getUTMilliseconds();
                //var fileName = timestamp + ext;
                politicalPartyMarka = fileName;
                cb(null, fileName);
            }
        });

        var upload = multer({
            storage: storage
        }).array('politicalPartyMarka', 12);
        upload(req, res, function (err) {
            if (err) {
                // An error occurred when uploading
                res.json(err);
            }
            res.json(politicalPartyMarka);
        });
    });


    app.route('/customsearch/:search_term/:result_count')
    .get(search.getSearchResults);

    app.route('/customsearch/:search_term')
        .get(search.getSearchResults);

    app.param('search_term', search.getSearchResults);
    app.param('result_count', search.getSearchResults);


}
