
    var datosPersonales = {};
    var nombre = document.getElementById('nombres');
    var apellido = document.getElementById('apellidos');
    var edadUser = document.getElementById('edad');
    var correo = document.getElementById('email');
    var numero = document.getElementById('contacto');
    

function guardarDatos() {
    

     datosPersonales.nombres = nombre.value;
        datosPersonales.apellidos = apellido.value;
        datosPersonales.edadUser = edad.value;
        datosPersonales.email = correo.value;
        datosPersonales.contacto = numero.value;

        localStorage.setItem("nombres", JSON.stringify(datosPersonales.nombres));
        localStorage.setItem("apellidos", JSON.stringify(datosPersonales.apellidos));
        localStorage.setItem("edadUser", JSON.stringify(datosPersonales.edadUser));
        localStorage.setItem("email", JSON.stringify(datosPersonales.email));
        localStorage.setItem("contacto", JSON.stringify(datosPersonales.contacto));
        
 if (nombres.value.trim() === "" || apellidos.value.trim() === "" || edadUser.value.trim() === "" || email.value.trim() === "" || contacto.value.trim() === "") {
        swal({
            text:"Ingresar datos solicitados",
            icon:"error",
            button: "Ok",
    })

    
}

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    
        document.getElementById('nombreUsuario').innerHTML += JSON.parse(localStorage.getItem('nombres'));
        document.getElementById('apellidoUsuario').innerHTML += JSON.parse(localStorage.getItem('apellidos'));
        document.getElementById('edadUsuario').innerHTML += JSON.parse(localStorage.getItem('edadUser'));
        document.getElementById('emailUsuario').innerHTML += JSON.parse(localStorage.getItem('email'));
        document.getElementById('contactoUsuario').innerHTML += JSON.parse(localStorage.getItem('contacto'));
    
});