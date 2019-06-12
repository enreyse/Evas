var db = firebase.firestore();


//INICIO INSERTAR________________________________________________________________
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

// Fin INSERTAR _________________________________________________________________________

//INICIO LEER _______________________________________________________________________________
var tabla = document.getElementById('tabla');

db.collection("Comentario").orderBy("n", "desc").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
       
        console.log(`${doc.id} => ${doc.data().com}`);
        tabla.innerHTML += `
    
     <div class="media">
  <img class="align-self-start mr-3" onerror="this.src='test1.jpg'" style="width:150px;max-height:150px;" src="${doc.data().img}" alt="user">
  <div class="media-body">
    <h5 class="mt-0">${doc.data().nom}</h5>
    <p>${doc.data().com}</p>
    <button type="button" class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().nom}','${doc.data().com}','${doc.data().img}')">Modificar</button>
    <button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>    
  </div>
</div>
     <hr>
    `;
    
   
    <div class="media">
    <img class="align-self-start mr-3" onerror="this.src='../user.jpg'" style="width:150px;max-height:150px;" src="${doc.data().img}" alt="user">
    <div class="media-body">
      <h5 class="mt-0">${doc.data().nom}</h5>
      <p>${doc.data().com}</p>
      <button type="button" class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button>
      <button type="button" class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().img}','${doc.data().nom}','${doc.data().com}')" >Editar</button>
    </div>
  </div>
       <hr>
       
    });
});
//FIN LEER _______________________________________________________________________________

//INICIO BORRAR _______________________________________________________________________________

function eliminar(id){
db.collection("Comentario").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}
//FIN BORRAR _______________________________________________________________________________

//INICIO UPDATE _______________________________________________________________________________



function editar(id,nom,img,com){
 
    document.getElementById("com").value=com;
    document.getElementById("nom").value=nom;
    document.getElementById("img").value=img;
    
    var boton = document.getElementById("boton");
    boton.innerHTML = 'editar';
    
    boton.onclick = function(){
        
    var washingtonRef = db.collection("Comentario").doc(id);
    
    var com = document.getElementById("com").value;
    var nom = document.getElementById("nom").value;
    var img = document.getElementById("img").value;
    var d = new Date();
    var n = d.getTime();
    
    
        return washingtonRef.update({
             nom: nom,
            com: com,
            img: img,
             n:  n
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'guardar';
            document.getElementById("com").value='';
            document.getElementById("nom").value='';
            document.getElementById("img").value='';
            boton.onclick = coment;
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    
}

//FIN UPDATE  _______________________________________________________________________________