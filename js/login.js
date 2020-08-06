//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){

});


function redirect(){
	var user = document.forms["form"]["usuario"].value;
	 var x = document.forms["form"]["contraseña"].value;
	console.log(x);
	 console.log(user);
	if(x!="" && user!="" ){
		window.location.href="index.html";
		alert("Sesion iniciada");
	}
	
}


	
