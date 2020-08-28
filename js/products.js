
const ORDER_ASC_BY_COST = "Precio ascendente";
const ORDER_DESC_BY_COST = "Precio descendente";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentproductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
const cards = "Vista en cuadricula";
const list = "Vista en lista";
var currentViewCriteria = undefined;

function sortproducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showproductsList(currentViewCriteria) {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentproductsArray.length; i++) {
        let product = currentproductsArray[i];
        let input = document.getElementById("searchbar").value
        input = input.toLowerCase();
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) && product.name.toLowerCase().startsWith(input)) {
            if (currentViewCriteria == list) {
                htmlContentToAppend += `
                <a href="#" class="mb-4 shadow-sm custom-card">
                    <div class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-3">
                                <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1" class="productname">`+ product.name + `</h4>
                                    <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                                </div>
                                <div>` + product.description + ` </div> 
                                </div>
                                <p class="price">Precio:` + product.currency + product.cost + ` </p>
                            </div>
                    </div>
                </a>
        `
            } else {
                htmlContentToAppend += `
                <div class="col-md-4 ">
                    <a href="#" class="card mb-4 shadow-sm custom-card">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                        <h4 class="m-3">`+ product.name + `</h4>
                        <h6 class="m-3 text-muted">` + product.soldCount + ` articulos vendidos</h6>
                        <div class="card-body">
                            <p class="card-text">` + product.description + `</p>
                            <p class="price">Precio:` + product.currency + product.cost + `</p>
                        </div>
                    </a>
                </div>
                `
            	}
        	}
		}if(htmlContentToAppend==""){
			htmlContentToAppend += `
			<p>No se encontraron productos</p>
			`	
			}
        document.getElementById("products").innerHTML = htmlContentToAppend;
}


function sortAndShowproducts(sortCriteria, viewCriteria, productsArray) {
    currentSortCriteria = sortCriteria;
    currentViewCriteria = viewCriteria;
    if (productsArray != undefined) {
        currentproductsArray = productsArray;
    }
    currentproductsArray = sortproducts(currentSortCriteria, currentproductsArray);
    showproductsList(currentViewCriteria);
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowproducts(ORDER_ASC_BY_COST, list, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowproducts(ORDER_ASC_BY_COST, currentViewCriteria);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowproducts(ORDER_DESC_BY_COST, currentViewCriteria);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowproducts(ORDER_BY_PROD_COUNT, currentViewCriteria);
    });

    document.getElementById("lista").addEventListener("click", function () {
        sortAndShowproducts(currentSortCriteria, list);
    });

    document.getElementById("cuadricula").addEventListener("click", function () {
        sortAndShowproducts(currentSortCriteria, cards);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showproductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showproductsList();
    });
});
