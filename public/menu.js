var savedimg;

function deldel(){

    fetch('/checkresult', {
        method: 'GET',      
     })
     .then(r => r.json())
     .then(data =>{
        savedimg = data.saved;
     });

     if(savedimg === 0){
        document.location.href="/";

     }else{
        fetch('/delsaved', {
        method: 'GET',      
    })
    .then(r => r.json())
    .then(data =>{
       console.log("usunieto");
    });
    document.location.href="/";

     }

}