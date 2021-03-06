console.log('script działa');

var imgarea = document.querySelector('.imgarea');
var prevbtn = document.querySelector('.prevbtn');
var nextbtn = document.querySelector('.nextbtn');
var delbtn = document.querySelector('.delbtn');
var baner = document.querySelector('.baner');
var boczny = document.querySelector('.boczny');

function getvalue(data){            //tu mamy ilość i tablicę z plikami
   var ngimg = data.ngimg;
   var ileimg = data.ng;
   
         if (ngimg.length >1){                     //więcej niż jedno zdjęcie
         baner.style.backgroundColor = 'red';
         baner.innerHTML = "Wykryto uszkodzenie pasa bufora";
         //tutaj trzeba wysłać email o uszkodzeniu
         var i = 0;
         imgarea.innerHTML = '<img src=\"'+ngimg[i]+'\">';
         nextbtn.addEventListener('click', function(){
            i = i+1;
            imgarea.innerHTML = '<img src=\"'+ngimg[i]+'\">';   
         });
         
         prevbtn.addEventListener('click', function(){
            i = i-1;
            imgarea.innerHTML = '<img src=\"'+ngimg[i]+'\">';       
         });
         
      }
      else if(ngimg.length ===1) {                       //jedno zdjęcie
         baner.style.backgroundColor = 'red';
         baner.innerHTML = "Wykryto uszkodzenie pasa bufora";
         imgarea.innerHTML = '<img src=\"'+ngimg[0]+'\">';
         boczny.innerHTML = '<p>Liczba zdęć  :  1</p>';
         boczny.innerHTML = '<div class="card">\
                              <h5 class="card-header">Kasowanie zdjęcia</h5>\
                              <div class="card-body">\
                              <h5 class="card-title">Sprawdź uszkodzenie</h5>\
                              <p class="card-text">Jeśli zdjęcie jest błędne, pas nieuszkodzony - naciśnij przycisk</p>\
                              <a href="#" class="btn btn-danger delbtn">Kasuj zdjęcie</a>\
                              </div>\
                           </div>';
      }
      else {                                 //brak uszkodzenia
         imgarea.innerHTML = '<img src="img/jti1.png">\
               <h1 mt-3>BUFOR MP09</h1>';
         boczny.innerHTML = '<p>Brak zdjęć uszkodzeń pasa</p>\
         <div class="d-grid gap-2 col-8 mx-auto">\
         <button class="btn btn-success mt-3 pt-5 pb-5" type="button">Historia uszkodzeń łańcucha bufora</button>\
         <button class="btn btn-warning mt-2" type="button">inny button</button>\
         <button class="btn btn-primary mt-2" type="button">inny button</button>\
         </div>';
      }        

};

function showFotos(){
   fetch('/checkresult', {
      method: 'GET',      
   })
   .then(r => r.json())
   .then(data =>{
      getvalue(data);
   });
}

showFotos();



//przycisk kasowania zdjęcia
 delbtn.addEventListener('click', function(){
    

 });