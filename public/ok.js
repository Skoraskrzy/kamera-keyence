//tu dalszy ciąg gdy będą zapisane jakieś zdjęcia
var baner = document.querySelector('.baner');
var ngValue;
var savedimg;

function check(){
    fetch('/checkresult', {
        method: 'GET',      
     })
     .then(r => r.json())
     .then(data =>{
        ngValue = data.ngvalue;
        savedimg = data.saved;
     });
     if(ngValue >= 1){
        document.location.href="/ng.html";
     }
     if(savedimg > 0){
      baner.style.backgroundColor = 'yellow';
      baner.innerHTML = "Awaria pasa bufora. Oczekiwanie na naprawę podczas przeglądu."

     }
};

setInterval(check, 1000);