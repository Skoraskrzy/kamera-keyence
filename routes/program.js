const fs = require('fs');
const nodemailer = require('nodemailer');
const path = require('path');
var glob = require("glob");


function keyence(app){         
    let imgcounter;
    var imgpatharray = [];   
    var filesarray = [];
    var emailcounter = 0; 
    var savecounter;
    var emaildelcounter;
    var savedpatharray = [];
    
    //funkcja sprawdzająca czy są fotki z błędami
    function checkfolder(){ 
        glob("../../../../srv/ftp/**/*.bmp", function (er, files) {
            imgpatharray = files;
            console.log(imgpatharray);
      })            //glob daje tablicę ze ścieżkami wszystkich plików

      glob("../../../../srv/saved/**/*.bmp", function (er, files) {
        savedpatharray = files;
     })            
       
    fs.readdir('/srv/ftp', function(err, files) {     //sprawdzić co jest w files
        if (err) {
           // some sort of error
        } else {
           if (!files.length) {         //brak fotek
               imgcounter = 0;
               console.log(imgcounter);
               emailcounter = 0;
                            
           } else {
                emailcounter = emailcounter + 1;
                imgcounter = files.length;
                filesarray = files; 

                if(emailcounter ===1){
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                        user: 'krzysiek.skoras@gmail.com',
                        pass: 'skoras1029'
                        }
                    });
                    
                    var mailOptions = {
                        from: 'krzysiek.skoras@gmail.com',
                        to: 'krzysztof.skorek@jti.com',
                        subject: 'Bufor B21 MP09',
                        text: 'Wiadomość z MP09 - kontola uszkodzenia pasa na buforze. Wykryto uszkodzenie pasa transportowego papierosów, sprawdź zdjęcia uszkodzenia.',
                        attachments: [{
                                path: savedpatharray[0]
                        }]
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                        console.log(error);
                        } else {
                        console.log('Email sent: ' + info.response);
                        }
                    
                });                    
                };    
            }           // koniec else obsługa błędu
        }
    });              //koniec fs

       fs.readdir('/srv/saved', function(err, files) {     //sprawdzić co jest w files
                if (err) {
                // some sort of error
                } else {
                if (!files.length) {         //brak fotek
                    savecounter = 0;
                    emaildelcounter = 0;
                                    
                } else {
                        savecounter = savecounter + 1;
                        savecounter = files.length;

                        if(emaildelcounter ===1){
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                user: 'krzysiek.skoras@gmail.com',
                                pass: 'skoras1029'
                                }
                            });
                            
                            var mailOptions = {
                                from: 'krzysiek.skoras@gmail.com',
                                to: 'krzysztof.skorek@jti.com',
                                subject: 'Bufor B21 MP09',
                                text: 'Wiadomość z MP09 - kontola uszkodzenia pasa na buforze. Operator potwierdził uszkodzenie pasa bufora. zdjęcie zostało zapisane. Konieczna naprawa na przeglądzie.'
                            };
                            
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                } else {
                                console.log('Email sent: ' + info.response);
                                }
                            
                        });                    
                        };    
                    } 
             };        
         });
   };               //koniec pętli

         // koniec else obsługa błędu
    

   var myinterval = setInterval(checkfolder, 1500);  
   
   app.get('/', (req, res) => {
       if(imgcounter === 0){
           const filename = path.join(__dirname, '../public/index.html');
           res.sendFile(filename);
                  
       }else{
           const filename = path.join(__dirname, '../public/ng.html');
           res.sendFile(filename);
       };  
          
    });
    
    app.get('/checkresult', (req, res) => {
        res.json({
            ngvalue: imgcounter,
            saved: savecounter,           //ilosc zdjec        
            });        
    });

     app.get('/fotka/:id', (req, res) => {
        const filename = path.join(__dirname,  imgpatharray[req.params.id]);      //pierwsza fotka
        res.sendFile(filename);
    });

    app.get('/fotkasaved/:id', (req, res) => {
        const filename = path.join(__dirname,  savedpatharray[req.params.id]);      //pierwsza fotka
        res.sendFile(filename);
    });

    app.get('/edycja', (req, res) => {

        const filedit = path.join(__dirname, '../public/savedel.html');
           res.sendFile(filedit);

    });

    app.get('/menu', (req, res) => {

        const filedit = path.join(__dirname, '../public/menu.html');
           res.sendFile(filedit);

    });

    app.get('/przeglad', (req, res) => {

        const filedit = path.join(__dirname, '../public/przeglad.html');
           res.sendFile(filedit);

    });

    app.get('/kasowanie', (req, res) => {

        const filedit = path.join(__dirname, '../public/delete.html');
           res.sendFile(filedit);

    });

    app.get('/delsaved', (req, res) => {
        const path = savedpatharray[0];

            fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            };
         });
    });
  
    app.get('/saveimg', (req, res) => {
        var file = filesarray[0];
        fs.rename(imgpatharray[0], '/srv/saved/' + file, (err) => {
            if (err) throw err;
            res.json({
                ngvalue: imgcounter,           //ilosc zdjec            
                });   
          });  
    });

    app.get('/deleteimg', (req, res) => {
        var file = filesarray[0];
        fs.rename(imgpatharray[0], '/srv/deleted/' + file, (err) => {
            if (err) throw err;
            console.log('delete complete!');
          });  
    });
    
}

module.exports = keyence;
