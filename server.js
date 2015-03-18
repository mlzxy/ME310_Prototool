var express = require('express'),
    app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var url = require("url");
app.use(express.static(__dirname + '/public'));
server.listen(8080);


var userDict = {};


app.get('/user', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");
    console.log('index.html');
});



app.get('/admin', function(req, res) {
    res.sendFile(__dirname + '/public/admin.html'); // only a interface to an api
    var pathname = url.parse(req.url).pathname;
    console.log(userDict);
    console.log("Request for " + pathname + " received.");
    console.log('admin.html');
});


var formidable = require('formidable');




app.post('/api/send', function(req, res) { //api 1
    console.log("Reach the form sending");
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        // test_times++;
        console.log("process form:" + JSON.stringify(fields));
        // res.writeHead(200, {
        //     'content-type': 'application/json'
        // });
        res.end();
        if (fields.type == "Broadcast") {
            console.log('\nthis is a broadcast\n');
            for (var v in userDict)
                io.emit(v, fields.textarea); //for loop could provide a workaround, but..why it won't work?
        } else {
            io.emit(fields.username, fields.textarea);
        }

    });
    return;
});




app.get('/api/getusers', function(req, res) { //api 2
    //get users, still use ng in the admin.html
    res.end(JSON.stringify(userDict));
});

/////////////////////////////////////////////////////////////////////////////////////////////////

io.on('connection', function(socket) {
    var username;
    socket.on('adduser', function(data) {
        username = data.name; //add user to Dict, and save this user name into this connection locally
        userDict[username] = username;
        // console.log(this);
        // console.log(socket);
        console.log('add an user');
        console.log(socket === this);
    });
    socket.on('disconnect', function() {
        delete userDict[username]; //delete the user from dict, if we could save data locally, then it's fine
    });
});