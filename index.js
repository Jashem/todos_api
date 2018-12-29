var express = require('express'),
    app = express(),
    port = 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var todoRoutes = require('./routes/todos');

app.use('/api/todos', todoRoutes);


app.listen(port, function(){
    console.log('listening to port:' + port)
})