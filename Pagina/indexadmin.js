var db = firebase.firestore();

var cuser;
var cpass;

function login(){
   
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    console.log("Funcion activada!");
   
    var docRef = db.collection("login").doc("loginn");

docRef.get().then(function(doc) {
    if (doc.exists) {
    
        cuser = doc.data().user;
        cpass = doc.data().pass;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


   if(cuser == user && cpass == pass){
    console.log("si pero no");
 
    var boton = document.getElementById('boton');

    boton.innerHTML= `<a href="cap1-a.html">Ingresar</a>`
  

   }else{
    console.log("No  pasa!");
   }
    

}
