var express = require('express');
var fortune = require('./lib/fortune.js');

var app = express();

var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
	next();
});

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
	next();
});


app.get('/', function(req, res) {
	res.render('home');
});
app.get('/about', function(req,res){
		res.render('about',{fortune:fortune.getFortune()});
});

app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
//
//
// var server;
// var http = require('http');
//
// function startServer() {
//     server = http.createServer(app).listen(app.get('port'), function(){
//       console.log( 'Express started in ' + app.get('env') +
//         ' mode on http://localhost:' + app.get('port') +
//         '; press Ctrl-C to terminate.' );
//     });
// }
//
// startServer();
