var express = require('express'),
    app = express(),
    port = 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res){
    res.sendFile('index.html');
})

var todoRoutes = require('./routes/todos');

app.use('/api/todos', todoRoutes);


app.listen(port, function(){
    console.log('listening to port:' + port)
})