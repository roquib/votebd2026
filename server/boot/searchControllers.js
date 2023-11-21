'use strict';

var request = require('request');
const GOOGLE_CSE_ID="004652564975967601665:uevwjvdjkkz";
const GOOGLE_API_KEY="AIzaSyBya7CB7ik__OuzykU5vuuI1Yy9azwT-hs";
//require('request').debug = true;

exports.getSearchResults = function (req, res) {
    function constructUrl() {
        var host = 'https://www.googleapis.com/customsearch/v1/siterestrict',
            args = {
                'cx' : GOOGLE_CSE_ID,
                'key': GOOGLE_API_KEY,
                'q'  : req.params.search_term,
                'num': req.params.result_count
            },
            params = ('?cx=' + args.cx + '&q=' + args.q + '&num=' + args.num + '&key=' + args.key);
        return host + params;
    }

    request.get(constructUrl(), function (error, response, body) {
        console.log(body);
        if (!error && response.statusCode === 200) {
            res.type('application/javascript');
            res.jsonp({
                'statusCode': 200,
                'items'     : JSON.parse(body).items
            });
        } else {
            console.error(error);
        }
    });
};