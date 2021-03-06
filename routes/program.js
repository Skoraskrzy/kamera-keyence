const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');
var glob = require("glob");

function keyence(app){              //główny moduł
    let imgcounter;
    var imgpatharray = [];    
       
    //funkcja sprawdzająca czy są fotki z błędami
    function checkfolder(){   

        glob("../../../../srv/ftp/**/*.bmp", function (er, files) {
            imgpatharray = files;
      })            //glob daje tablicę ze ścieżkami wszystkich plików
       
    fs.readdir('/srv/ftp', function(err, files) {     //sprawdzić co jest w files
        if (err) {
           // some sort of error
        } else {
           if (!files.length) {         //brak fotek
               imgcounter = 0;
               console.log(imgcounter);
                            
           } else { 

                imgcounter = files.length;      //ile zdjęć                    
                //sending email
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'krzysiek.skoras@gmail.com',
                        pass: 'skoras1029'
                        }
                    });
                    
                    var mailOptions = {
                        from: 'krzysiek.skoras@gmail.com',
                        to: 'jaroslaw.krol@jti.com',
                        subject: 'Wiadomość z bufora MP09',
                        text: 'Wykryto uszkodzenia  na pasie bufora.'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    
                });                         
            }           // koniec else obsługa błędu
        }
    });              //koniec fs

   };               //koniec pętli
   var myinterval = setInterval(checkfolder, 5000);  
    
    app.get('/checkresult', (req, res) => {
        res.json({
            ngvalue: imgcounter,           //ilosc zdjec
            
            });        
    });

     app.get('/fotka', (req, res) => {
        const filename = path.join(__dirname,  imgpatharray[0]);        //pierwsza fotka
        res.sendFile(filename);
    }); 
    
}

module.exports = keyence;