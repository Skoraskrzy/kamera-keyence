const express = require('express');
const path = require('path');
const keyence = require('./routes/program');

const app = express();


app.listen(3000, () => {
    console.log('serwer działa');
});
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use(express.static(
    path.join( 'public'),
));

keyence(app);