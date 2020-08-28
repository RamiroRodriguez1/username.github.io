//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function redirect(event){
		event.preventDefault();
		var user = document.getElementById("usuario").value;
		var password = document.getElementById("contraseña").value;
		if(password!="" && user!="" ){
			if(document.getElementById("recuerdo").checked){
				localStorage.setItem("logged","true");
				localStorage.setItem("usuario",user);
								
			}else{
				sessionStorage.setItem('usuario', user);
				sessionStorage.setItem('logged',"true");
				
			}
			window.location.href="index.html";
	}}

document.getElementById("formulario").addEventListener("submit",redirect);


document.addEventListener("DOMContentLoaded", function(e){
	
});




	
