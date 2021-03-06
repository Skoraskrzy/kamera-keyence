var imgarea = document.querySelector('.imgarea');
var prevbtn = document.querySelector('.prevbtn');
var nextbtn = document.querySelector('.nextbtn');
var delbtn = document.querySelector('.delbtn');
var baner = document.querySelector('.baner');
var boczny = document.querySelector('.boczny');

var ngValue = 0;

var scriptinterval = setInterval(changeHmi, 5000); 

function showFotos(){
   fetch('/checkresult', {
      method: 'GET',      
   })
   .then(r => r.json())
   .then(data =>{
      getvalue(data);
   });
};

function getvalue(data){          
   ngValue = data.ngvalue;  
  
};

function changeHmi(){            //pętla do odśw strony
   showFotos();
   if (ngValue === 0) {          //brak uszkodzeń
      imgarea.innerHTML = '<img src="img1/jti1.png">\
            <h1 mt-3>BUFOR MP09</h1>';
      boczny.innerHTML = '<p>Kontrola uszkodzeń ogniw pasa bufora papierosów.</p>\
      <img class="mt-3" src="img1/red_tigers.jpg">';
      console.log('zero zdjęć');
   } else
   {
      baner.style.backgroundColor = 'red';
         baner.innerHTML = "Wykryto uszkodzenie pasa bufora";
         boczny.innerHTML = '<button type="button" class="btn btn-success btn prevbtn">Poprzednie zdjęcie</button>\
                              <button type="button" class="btn btn-success btn nextbtn">Następne zdjęcie</button>\
                              <hr class = "mt-3 mb-3">\
                              <div class="card">\
                              <h5 class="card-header">Kasowanie zdjęcia</h5>\
                              <div class="card-body">\
                              <h5 class="card-title">Sprawdź uszkodzenie</h5>\
                              <p class="card-text">Jeśli zdjęcie jest błędne, pas nieuszkodzony - naciśnij przycisk</p>\
                              <a href="#" class="btn btn-danger delbtn">Kasuj zdjęcie</a>\
                              </div>\
                           </div>';
          clearInterval(scriptinterval);
          obslImgng();
   };
            
};

//dalszy ciąg po stop interval

function obslImgng(){
     imgarea.innerHTML = '<img src = "/fotka">';
 }
    





