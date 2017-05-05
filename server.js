/*
 * @author Antonio Gatta <a.gatta@xeader.com>
 * @url http://www.xeader.com
 * @copyright Copyright (c) 2017
 * @license All right reserved
 */

var express = require('express');
var opener = require('opener');
var app = express();
var port = 9050;
var URL = 'http://0.0.0.0:' + port + '/';

app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.sendfile('.index.html');
});

app.get('/inc/:file', function (req, res) {
    // Note: should use a stream here, instead of fs.readFile
    fs.readFile(req.params.file, function (err, data) {
        if (err) {
            res.send("Oops! Couldn't find that file.");
        } else {
            // set the content type based on the file
            res.contentType('application/json');
            res.send(data);
        }
        res.end();
    });
});

// <form> POST
// app.post('/post.html', function(req, res) {
//     res.sendfile('./post.html');
// });

app.listen(port);
console.log('Open browser on ' + URL);
opener(URL);
