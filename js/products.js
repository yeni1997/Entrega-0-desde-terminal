//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productos = [];
var precioMin = undefined;
var precioMax = undefined;

//var arregloProductos = [];



function ordenarProductosAsc() {
    let arregloAsc = [];

   arregloAsc = productos.sort((a, b) => {
      return a.cost - b.cost;
    })
showProductsList(arregloAsc);
};


function ordenarProductosDesc() {
    let arregloDesc = [];

    arregloDesc = productos.sort((a, b) => {
        return b.cost - a.cost;
    })
    showProductsList(arregloDesc);
};

function ordenarRelevancia() {
    let arregloRelevancia = [];

    arregloRelevancia = productos.sort((a, b) => {
        return b.soldCount - a.soldCount;
    })
    showProductsList(arregloRelevancia);
};


function showProductsList(array) {

    
    for (let i=0; i < array.length; i++ ){
        let product = array[i];

        
        if (((precioMin == undefined) || (precioMin != undefined && parseInt(product.cost) >= precioMin)) &&
            ((precioMax == undefined) || (precioMax != undefined && parseInt(product.cost) <= precioMax))){
    
                document.getElementById("contenedorProductos").innerHTML += `
    
                
                
                
                
                <div class="row">
          <div class="col-md-5">
          <div class="card text-center" id="card">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="card-img-top" >
                    
                        <div class="card-body">
                            <h4 class="class="card-title mb-1">`+ product.name +`</h4>
                            
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                            <div class="text-info">` + product.cost + ` US$</div>
                        
                        
                        
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                    
            </div>
                           
        
        
        </div>

        
      
            
            `
        
        }
        
    
        
    }
    };

    


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (result) {
        if(result.status === 'ok') {
            productos = result.data;
            showProductsList(productos);
            
        }
    });

});



document.getElementById("ordenDesc").addEventListener("click", function(){
    ordenarProductosAsc();
});

document.getElementById("ordenAsc").addEventListener("click", function(){
    ordenarProductosDesc();
});

document.getElementById("ordenRelevancia").addEventListener("click", function(){
    ordenarRelevancia();
});


//FILTRO
document.getElementById("filterCost").addEventListener("click", function() {
    precioMin = document.getElementById("filterMinCost").value;
    precioMax = document.getElementById("filterMaxCost").value;

    if((precioMin != undefined) && (precioMin != "") &&(parseInt(precioMin)) >= 0) {
        precioMin = parseInt(precioMin);
    }else {
        precioMin = undefined;
    }
    if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0) {
        precioMax = parseInt(precioMax);
    } else{
        precioMax = undefined;
    }

    showProductsList(productos);
}
);

//LIMPIAR FILTRO
document.getElementById("borrarFiltro").addEventListener("click", function(){

    document.getElementById("filterMinCost").value = "";
    document.getElementById("filterMaxCost").value = "";

    precioMin = undefined;
    precioMax = undefined;

    showProductsList(productos);
});



