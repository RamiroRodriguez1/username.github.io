let currentreview = "";
let edit = "";
var star = 1;


let n = new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();
let datetime = y + "-" + m + "-" + d + `<br>` + n.toLocaleTimeString();
document.getElementById("date").innerHTML = datetime;

if (sessionStorage.getItem('logged') == "true") {
    var user = sessionStorage.getItem('usuario');
} else {
    var user = localStorage.getItem("usuario");
}
document.getElementById("reviewer").innerHTML += `<span class="user">` + user + `</span>`;

let params = new URLSearchParams(document.location.search);
let carname = params.get("name");

function showproductinfo(data) {
    let htmlContentToAppend = "";
    htmlContentToAppend +=
        `<div class="text-center p-4">`
    if (carname != null) {
        htmlContentToAppend += `<h2>` + carname + `</h2>`
    } else {
        htmlContentToAppend += `<h2>` + data.name + `</h2>`;
    }
    htmlContentToAppend += `<p class="lead">` + data.soldCount + ` vendidos</p>
        </div>
	<div class="container">
  	<div class="row">
    	<div class="col-sm">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" >
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner" id="slideshow"> </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev"> <span class="carousel-control-prev-icon" aria-hidden="true"></span> <span class="sr-only">Previous</span> </a> <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next"> <span class="carousel-control-next-icon" aria-hidden="true"></span> <span class="sr-only">Next</span> </a> </div>
    </div>
    <div class="col-sm">
      <p>` + data.description + `</p>
		<br>
		<div class="col-sm text-center">
		<p class="price">` + data.currency + data.cost + `</p>
		
	  <a class="btn btn-primary" href="#" role="button"><i class="fas fa-shopping-cart"></i>Añadir al carrito</a>
		</div>
    	</div>
  	</div>
	</div>`
    document.getElementById("info").innerHTML += htmlContentToAppend;
    let slides = "";
    for (let i = 0; i < data.images.length; i++) {
        let photo = data.images[i];
        if (i == 0) {
            slides += `<div class="carousel-item active" >
      		<img class="d-block w-100" src="` + photo + `" class="img-thumbnail">
    		</div>`
        } else {
            slides += `<div class="carousel-item">
     		<img class="d-block w-100" src="` + photo + `" class="img-thumbnail">
    		</div>`
        }
    }
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            let products = resultObj;
            for (let i = 0; i < data.relatedProducts.length; i++) {
                document.getElementById("relatedprod").innerHTML += `
				<div class="col-md-4 ">
                    <a href="product-info.html?name=` + products.data[data.relatedProducts[i]].name + `" class="card mb-4 shadow-sm custom-card">
                        <img src="` + products.data[data.relatedProducts[i]].imgSrc + `" alt="` + products.data[data.relatedProducts[i]].description + `" class="img-thumbnail">
                        <h2 class="m-3">` + products.data[data.relatedProducts[i]].name + `</h2>
                        <p>` + products.data[data.relatedProducts[i]].currency + products.data[data.relatedProducts[i]].cost + `</p>
    
                    </a>
                </div>
				`
            }
        }
    })
    document.getElementById("slideshow").innerHTML += slides;
}

function showreviews(reviews) {
    let opinions = "";
    for (let i = 0; i < reviews.length; i++) {
        let opinion = reviews[i];
        opinions += `<div class="container">
		<div class="card">
	    	<div class="card-body">
	        	<div class="row">
        	    <div class="col-md-2">
        	        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
        	        <p class="text-secondary text-center">` + opinion.dateTime + `</p>
        	    </div>
        	    <div class="col-md-10">
        	        <p>
        	            <p class="float-left"  ><span class="user">` + opinion.user + `</span></p>`

        for (var y = 5; y > 0; y--) {
            if (y > opinion.score) {
                opinions += `<span class="fa fa-star  float-right"></span>`;
            } else {
                opinions += `<span class="fa fa-star checked float-right"></span>`;
            }
        }
        opinions += `
	        	       </p>
        	       <div class="clearfix"></div>
        	        <p>` + opinion.description + `</p>
        	    </div>
	   	     </div>
	        	
	    		</div>
			</div>
			</div>`;
    }
    document.getElementById("reseñas").innerHTML += opinions;
}

function starplus() {
    if (star < 5) {
        star++;
    }
}

function starless() {
    if (star > 1) {
        star--;
    }
}

function modifystar(cant) {
    let stars = "";
    for (let y = 5; y > 0; y--) {
        if (y > cant) {
            stars += `<span class="fa fa-star  float-right"></span>`;
        } else {
            stars += `<span class="fa fa-star checked float-right"></span>`;
        }
    }
    document.getElementById("stars").innerHTML = stars;

}
document.getElementById("newreview").addEventListener("submit", addreview);

function addreview(event) {
    event.preventDefault()
    currentreview = `<div class="container">
	<div class="card">
	    <div class="card-body">
	        <div class="row">
        	    <div class="col-md-2">
        	        <img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
        	        <p class="text-secondary text-center">` + datetime + `</p>
        	    </div>
        	    <div class="col-md-10">
        	        <p>
        	            <p class="float-left" ><span class="user">` + user + edit + `</span></p>`

    for (let i = 5; i > 0; i--) {
        if (i > star) {
            currentreview += `<span class="fa fa-star  float-right"></span>`;
        } else {
            currentreview += `<span class="fa fa-star checked float-right"></span>`;
        }
    }
    currentreview += `
        	       </p>
        	       <div class="clearfix"></div>
        	        <p>` + document.getElementById("review").value + `</p>
        	    </div>
	        </div>
	        	
	    </div>
	</div>
</div>`
    document.getElementById("newreview").innerHTML += currentreview;

    document.getElementById("reviewader").innerHTML = `<p class="text-center" id="thanks">¡Gracias por su opinion!</p>`
    if (edit == "") {
        document.getElementById("reviewader").innerHTML += `
		<div class="col-sm text-center">
		<button type="button" class="btn btn-light" onclick="modifyreview()">Modificar reseña*</button>
		<p>*Maximo una vez por reseña</p>
		</div>`
    }
}

function modifyreview() {
    edit = "(Editado)"
    currentreview = "";
    star = 1;
    document.getElementById("newreview").innerHTML = currentreview;
    document.getElementById("reviewader").innerHTML = `  <div class="card">
	<div class="card-body">
		<div class="row">
			<div class="col-md-2">
				<img src="https://image.ibb.co/jw55Ex/def_face.jpg" class="img img-rounded img-fluid"/>
				<p class="text-secondary text-center" id="date">` + datetime + `</p>
			</div>
			<div class="col-md-10">
				<div>
				<p class="float-left"  class="user" id="reviewer"><span class="user">` + user + edit + `</span></p>
				<div class="float-right">
				  <div class="row">
					<button type="button" class="btn btn-light btn-sm float-right"  onclick="starless(star);modifystar(star)">-</button>
					<div>
					  <div id="stars">
					  <span class="fa fa-star  float-right"></span>
					  <span class="fa fa-star  float-right"></span>
					  <span class="fa fa-star  float-right"></span>
					  <span class="fa fa-star  float-right"></span>
					  <span class="fa fa-star checked float-right"></span>
					  </div>
					</div>
					<button type="button" class="btn btn-light btn-sm float-right" onclick="starplus(star);modifystar(star)">+</button>
				  </div>
				</div>  
				</div>
			   <div class="clearfix"></div>
				<form onSubmit="addreview(event)">
				<fieldset>
				<textarea id="review" placeholder="Ingrese su opinion"></textarea>
				<fieldset>
				  <input type="submit" class="btn btn-light float-right" >
				</fieldset>                    
			  </form>
			</div>
		</div>    	
	</div>
</div>`
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showproductinfo(resultObj.data);
        }
    })
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            showreviews(resultObj.data);
            modifystar(star);
        }
    })

});


