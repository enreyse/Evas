var db = firebase.firestore();



function coment(){

var com = document.getElementById("com").value;
var nom = document.getElementById("nom").value;
var img = document.getElementById("img").value;
var d = new Date();
var n = d.getTime();



if (img === "" ){
    
    
    img = "user.jpg";
}

 if(nom && com !== ""){
   db.collection("Comentario").add({
    com: com,
    nom: nom,
    img: img,
    n:  n
 
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
    document.getElementById("com").value='';
    document.getElementById("nom").value='';
    document.getElementById("img").value='';
   
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

    

}else{
    
    alert("campos vacios");
    nom.innerHTML = '';
    com.innerHTML = '';
} 

}
//Este es el bueno!
var tabla = document.getElementById('tabla');

db.collection("Comentario").orderBy("n", "desc").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
       
        console.log(`${doc.id} => ${doc.data().com}`);
        tabla.innerHTML += `
    
  <ul class="collection" style="  border-style: solid; border-color: black; background-color: #0d74d6;">
  <li class="collection-item avatar" style="  border-style: solid; border-color: black; background-color: #0d74d6;">
  <img src="${doc.data().img}" onerror="this.src='images/user.jpg'" class="circle">
    <span  class="black-text text-darken-2"><strong>${doc.data().nom} dice:</strong></span>
    <hr>
    <p> 
     <span  class="black-text text-darken-2">${doc.data().com}</span>
    </p>
    <button  class="btn red lighten-1" id="boton" type="button" onclick="eliminar('${doc.id}')" >eliminar</button>
    <button  class="btn orange lighten-1" id="boton" type="button"  onclick="editar('${doc.id}','${doc.data().nom}','${doc.data().com}','${doc.data().img}')" >modificar</button>
    
  </li>
  </ul> 

    `  
    });
}); 

// Borrar Datos
function eliminar(id){
db.collection("Comentario").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}

// Actualizar


function editar (id,nom,com,img){

    document.getElementById("com").value = com;
    document.getElementById("nom").value = nom;
    document.getElementById("img").value = img;
   var boton = document.getElementById("boton");
   
   boton.innerHTML = 'Editar';
   
   boton.onclick = function(){
       
       var washingtonRef = db.collection("Comentario").doc(id);
   
       var com = document.getElementById("com").value;
       var img = document.getElementById("img").value;
       var nom = document.getElementById("nom").value;
   
   return washingtonRef.update({
       com: com,
       img: img,
       nom: nom
      
   })
   .then(function() {
       console.log("Document successfully updated!");
       boton.innerHTML = 'Guardar';
        document.getElementById("com").value='';
       document.getElementById("nom").value='';
       document.getElementById("img").value='';
      
   })
   .catch(function(error) {
       // The document probably doesn't exist.
       console.error("Error updating document: ", error);
   });
   }


}