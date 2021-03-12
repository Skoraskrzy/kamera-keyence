
var ngValue;
function zapiszimg(){
    function savefoto(){ 

        fetch('/checkresult', {
            method: 'GET',      
         })
         .then(r => r.json())
         .then(data =>{
            ngValue = data.ngvalue;
         });

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
     savefoto();
     document.location.href="/";
}

function deleteimg(){
    function deletefoto(){ 

        fetch('/checkresult', {
            method: 'GET',      
         })
         .then(r => r.json())
         .then(data =>{
            ngValue = data.ngvalue;
         });

        if(ngValue === 0){
           document.location.href="/";
        }else{
           fetch('/deleteimg', {
               method: 'GET',      
           })
           .then(r => r.json())
           .then(data =>{
               ngValue = data.ngvalue;
           });
           console.log(ngValue);
        }
     };
     deletefoto();
     document.location.href="/";


}