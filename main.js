


var Bot = require('./bot');
var serverBase = 'http://localhost:41117';

// request(serverBase, { json: true }, (err, res, body) => {
//     if (err) { return console.log(err); }
//     console.log(body);
//     //console.log(body.explanation);
// });

//request.post(serverBase + '/auth/password').form({username:'bot', password:'mypass'});

var bot1 = new Bot();
bot1.connect(serverBase, process.argv[2]);

