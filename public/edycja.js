var ngValue;
var ilosc;

window.onload = startf;

function startf(){
      fetch('/checkresult', {
        method: 'GET',      
     })
     .then(r => r.json())
     .then(data =>{
        ilosc = data.ngvalue;
     });
   };


function savefoto(){      
     if(ngValue === 0){
        document.location.href="/";
     }else{
        fetch('/saveimg', {
            method: 'GET',      
        })
        .then(r => r.json())
        .then(data =>{
            ngValue = data.ngvalue;
        });
        console.log(ngValue);
     }
};

function deletefoto(){

};

function nextfoto(){

};
