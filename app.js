const express = require('express');
const path = require('path');
const keyence = require('./routes/program');

const app = express();


app.listen(3000, () => {
    console.log('serwer działa');
});
app.use(express.static(
    path.join( 'public'),
));

keyence(app);