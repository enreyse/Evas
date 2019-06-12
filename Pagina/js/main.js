/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.addEventListener('load', function(){
    document.getElementById('btniniciar').addEventListener('click', function(){
       var usuario = document.getElementById('usuario').value;
       var contraseña = document.getElementById('contra').value;
       
       var aut = false;
       
       if(usuario.length > 0 && contraseña.length > 0){
           
           aut = true;
           
           
       }
       if(aut){
           document.getElementById('forminicio').submit();
           
       }else{
           alert('Complete todos los datos');
       }
    });
});
    
