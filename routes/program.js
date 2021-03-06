const fs = require('fs');
const nodemailer = require('nodemailer');

function keyence(app){
    let imgcounter = 0;
    let imgNg = [];

    console.log('plik dodany');
    //funkcja sprawdzająca czy są fotki z błędami
    function checkfolder(){
    fs.readdir('/srv/ftp', function(err, files) {     //sprawdzić co jest w files
        if (err) {
           // some sort of error
        } else {
           if (!files.length) {         //brak fotek
                imgcounter = 0;
           } else {
                imgcounter = files.length;      //fotki są ilość i tablica
             
                imgNg = files;
                console.log(imgcounter);
                console.log(imgNg);
            }
        }
    });

   };
   setInterval(checkfolder, 10000);
   //obsługa emaila
   function sendmail(tytul, tresc, dokogo){
     var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'krzysiek.skoras@gmail.com',
            pass: 'skoras1029'
            }
        });
        
        var mailOptions = {
            from: 'krzysiek.skoras@gmail.com',
            to: dokogo,
            subject: tytul,
            text: tresc
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
            console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
        });
    };
    
    app.get('/checkresult', (req, res) => {
        res.json({
            ng: imgcounter,
            ngimg: imgNg,
        });
    });

}

module.exports = keyence;