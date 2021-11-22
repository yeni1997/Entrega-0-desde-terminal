//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var productoCarrito = {};

var subtotal = 0;



function mostrarProductoCarrito() {
    let htmlContentToAppend = "";

        productoCarrito.articles.forEach((producto) => 

            htmlContentToAppend+= `
               
                <td id="nombreArticulo"><img src="` + producto.src + `" alt="" class="img-thumbnail"><br>`+ producto.name +`</td>
                  <td id="precio">` + producto.unitCost + ` ` + producto.currency + `</td>
                  <td><input class="form-control" type="number" required id="cantidad" value=`+ producto.count +` onchange="mostrarSubtotal();"></td>
                  <td id="subtotal" class="subtotal">`+ producto.unitCost * producto.count + producto.currency +`</td>
                  
     
    `
)
    document.getElementById("cuerpoTabla").innerHTML = htmlContentToAppend;

};

/*borrar producto
const eliminar = (i) => {
    splice(i, 1);
    mostrarProductoCarrito();
}*/

/*validación*/

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();



/*const nameInput = document.getElementById('referencia');

nameInput.addEventListener('input', function (Event) {
 if (nameInput.validity.typeMismatch) {
     nameInput.setCustomValidity("¡Se esperaba una dirección de correo electrónico!");
    } else {
      email.setCustomValidity("");
    }
  });*/
 
 /*   nameInput.setCustomValidity('');
  nameInput.checkValidity();
});

nameInput.addEventListener('invalid', () => {
  if(nameInput.value === '') {
    nameInput.setCustomValidity('Enter your username!');
  } else {
    nameInput.setCustomValidity('Usernames can only contain upper and lowercase letters. Try again!');
  }
});*/



function mostrarSubtotal() {
    
        let cantidadIngresada = document.getElementById("cantidad").value;
        let precio = parseInt(document.getElementById("precio").innerHTML); 
        subtotal = cantidadIngresada * precio;
        document.getElementById("subtotal").innerHTML = subtotal; 
        document.getElementById("subtotalCostos").innerHTML = subtotal;
    
    };

    
/*function mostrarTotal() {
    let envioCosto = parseFloat(document.getElementById('costoEnvio').value);
    let total = parseFloat(subtotal) + envioCosto;
    document.getElementById('totalCostos').innerHTML = total;
    console.log(total);
};*/

/*modal*/
var modalM = document.getElementById('modal');
var boton = document.getElementById('botonModal');
var span = document.getElementsByClassName('close')[0];
boton.onclick = function(){
    modalM.style.display = "block";
}

span.onclick = function(){
    modalM.style.display = "none";
}

window.onclick = function(){
    if (Event.target == modalM) {
        modalM.style.display = "none";
    }
}

document.getElementById('premium').addEventListener("click", () => {

        let costoPremium = parseFloat(document.getElementById('premium').value);
        let costoEnvioPremium = parseFloat(subtotal) * costoPremium / 100; 
        document.getElementById('costoEnvio').innerHTML = costoEnvioPremium;
        console.log(costoEnvioPremium);

        function mostrarTotal() {
            let total = parseFloat(subtotal) + costoEnvioPremium;
            document.getElementById('totalCostos').innerHTML = total;
            console.log(total);
        }
    mostrarTotal();
        
});

document.getElementById('express').addEventListener("click", ()=> {
    let costoExpress = parseFloat(document.getElementById('express').value) ;
    let costoEnvioExpress = parseFloat(subtotal) * costoExpress / 100;
    document.getElementById('costoEnvio').innerHTML = costoEnvioExpress;

    function mostrarTotalEpress() {
        let total = parseFloat(subtotal) + costoEnvioExpress;
        document.getElementById('totalCostos').innerHTML = total;
        
    }

    mostrarTotalEpress();

});

document.getElementById('standard').addEventListener("click", ()=> {
    let costoStandard = parseFloat(document.getElementById('standard').value) ;
    let costoEnvioStandard = parseFloat(subtotal) * costoStandard / 100;
    document.getElementById('costoEnvio').innerHTML = costoEnvioStandard;

    function mostrarTotalStandard() {
        let total = parseFloat(subtotal) + costoEnvioStandard;
        document.getElementById('totalCostos').innerHTML = total;
    }

    mostrarTotalStandard();
});

/*document.getElementById('guardarEnvio').addEventListener("click", () => {
    let envioCosto = parseFloat(document.getElementById('costoEnvio').value);
    let total = parseFloat(subtotal) + envioCosto;
    document.getElementById('totalCostos').innerHTML = total;
    console.log(envioCosto);
});*/


document.addEventListener("DOMContentLoaded", function(e){

getJSONData(CART_INFO_URL).then(resultado => {
if (resultado.status === "ok") {
    productoCarrito = resultado.data;
     console.log(productoCarrito);
   mostrarProductoCarrito(productoCarrito.articles);
    mostrarSubtotal();
    
}

})

document.getElementById("cuerpoTabla").addEventListener("change", () =>{
mostrarSubtotal();


});


});

