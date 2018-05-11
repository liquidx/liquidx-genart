var express = require('express');
var sassMiddleware = require("node-sass-middleware");

var app = express();

// Compile sass.
app.use(sassMiddleware({
  src: __dirname + '/public',
  dest: '/dist'
}));

// Setup Handlebars.
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
  layoutsDir: __dirname + "/views",
  extname: '.hbs.html'
});

app.engine('.hbs.html', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs.html');

app.use(express.static('public'));
app.use(express.static('genart'));
app.use(express.static('node_modules/p5/lib'));
app.use(express.static('node_modules/p5/lib/addons'));

app.get("/run/:seq", (request, response) => {
  response.render('run', {seq: request.params.seq});
});


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log('http://localhost:' + listener.address().port);
});
