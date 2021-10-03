//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var comentarios = [];
var productos = {};
var listaProductosRel = [];
var productosRelacionados = [];

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100" id="flip">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }

}

/*Carrusel
*/
function carrusel(){

    let tarjetas = "";
    let imagCarrusel = productos.images;

    for(let a = 0; a < imagCarrusel.length; a++){
        
         tarjetas+= ` 
         
         <div class="slide"><p class="author-info">
      <img class="img-thumbnail" id="imag-0" src="` + imagCarrusel[a] +`" alt="">
      </p>  </div>
    
        `
    }
    document.getElementById("carruselImg").innerHTML+= tarjetas;
};


function mostrarComentarios(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comentaries = array[i];


        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
        <div class="list-gruop-item list-group-item-info">
            
            <div class="far fa-user-circle">` + "  " + comentaries.user + `</div>
            </div>
            <div> ` + comentaries.dateTime + `</div>
            
            <div class="d-flex w-100 justify-content-between">
            <div>
                ` + calificarProducto(comentaries.score) + `
            </div>
            </div>
            <p class="mb-1"> ` + comentaries.description + `</p>

        
        </div>`

    }
    
    document.getElementById("comentariosAutos").innerHTML = htmlContentToAppend;
};

//función comentarios json
function calificarProducto(num){
    
    let autos = "";

    for(let i=1; i<= 5; i++){

        if (i<=num) {
            autos += '<i class="fas fa-car-alt"></i>';
        }/* else {
            estrellas += '<i class="far fa-car-alt"></i>';
        }*/
        
    }

return autos;


};

//Productos relacionados
function mostrarProductosRelacionados() {

    let htmlContentToAppend = "";

    productosRelacionados.forEach(i => {
        let prodRelacionados = listaProductosRel[i];

                htmlContentToAppend+= `
                
                <div class="row">
                
                <div class="card">
                    <div class="col-5">
                        <img src="` + prodRelacionados.imgSrc + `" alt="` + prodRelacionados.description + `" class="img-thumbnail">
                    </div>
                        <div class="stats-container">
                    <div class="text-info">` + prodRelacionados.cost + ` US$</div>
                    
                    <div class="col">
                        
                            <h4 class="mb-1">`+ prodRelacionados.name +`</h4>
                            
                            <small class="text-muted">` + prodRelacionados.soldCount + ` artículos</small>
                            
                        </div>
            
                        </div>
                </div>
            </div>
            `
                document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
            })
        };




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(resultProduct => {
        if (resultProduct.status === "ok") {
            productos = resultProduct.data;
        
          //console.log(infoProductos);

            let categoryProductHTML = document.getElementById("categoryProduct");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productNameHTML = document.getElementById("productName");
            
            let productSoldCountHTML = document.getElementById("productSoldCount");
            
            categoryProductHTML.innerHTML = productos.category;
            productCostHTML.innerHTML = productos.cost;
            productCurrencyHTML.innerHTML = productos.currency;
            productDescriptionHTML.innerHTML = productos.description;
            productNameHTML.innerHTML = productos.name;
            
            productSoldCountHTML.innerHTML = productos.soldCount;
            
            showImagesGallery(productos.images);
            carrusel();
      }      
    });
    
    getJSONData(PRODUCTS_URL).then(resultado =>{
        if (resultado.status === 'ok') {
             listaProductosRel = resultado.data;
            productosRelacionados = productos.relatedProducts;
            console.log(listaProductosRel);
            mostrarProductosRelacionados(productosRelacionados);

        }
    })
});

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(result =>{
      if (result.status === "ok") {
        comentarios = result.data;
        //console.log(comentarios); 
        mostrarComentarios(comentarios);
      }
    });
    




document.getElementById("enviar").addEventListener("click", () => {

    let comentarioCalificacion = {}; 

    comentarioCalificacion.usuario = localStorage.getItem("usuario");
    comentarioCalificacion.description = document.getElementById("comment").value;
   //comentarioCalificacion.score = document.getElementById("icon").value;

     if (comentarioCalificacion.description.trim() == "") {
        swal("Comentario vacío", "Favor ingresar comentario", "error");
    } else {
      comentarios.push(comentarioCalificacion);
    }
    mostrarComentarios(comentarios); 
  }); 
});

