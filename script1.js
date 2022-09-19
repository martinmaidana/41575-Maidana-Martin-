//EDITANDO DOM DESDE EL NAVEGADOR
//HEADER

//Accediendo al nodo a traves de get element by ID
let titulo = document.getElementById("titulo");
// console.log(titulo);
//defini un atributo de clase en el h1. que tiene un background color para poner el fondo celeste
titulo.className = "fondoceleste";


//innerText de un nodo nos permite modificar su nodo de texto "pisando el html" En este caso cambie el texto del H1.
// console.log(titulo.innerText);
titulo.innerText = "VENTA DE PRODUCTOS CONGELADOS";

//innerHTML permite definir el código html interno a traves de JS. En este caso agregue UN H3 debajo del h1 y h2.
let subth3 = document.getElementById("h3coninnerHtml");
subth3.innerHTML = "<h3 class='colorazul'>Listado de vegetales</h3>";

let subtitulo = document.getElementById("subtitulo");
// console.log(subtitulo);
//mouseover/mouseout en el subtitulo vegetales. cambiando el color rojo al pasar el maouse y retorna a negro al sacar el maouse
subtitulo.addEventListener("mouseover", function () {
    this.style.color = '#ff0000';
});
subtitulo.addEventListener("mouseout", function () {
    this.style.color = '#000000';
});

//MAIN

//defini una variable con un valor vacio. para usarlo en una funcion
let valor = ("");
/*en la funcion interactuo con el html. si en el input ingresan su nombre, recibiran un saludo con el nombre ingresado al final. que tb se muestra en la consola. De lo contrario recibiran un mensaje que indica que tienen que ingresar su nombre.  ademas use Value para conectar el valor ingresado y volcarlo en el html. Añado evento con Enter al input*/
let nombre = document.getElementById("nombre_usuario");
nombre.addEventListener("keypress", function (e) {
    //optimizacion
    e.keyCode === 13 && saludando()
})





// Crear array de usuarios
let usuarios = [];
//capturo un dato al storage local. accedo a los datos a traves de getitem
if (localStorage.getItem("usuarios")) {
    // transformo el objeto a Json
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
    botones = document.querySelector('.botones')
    //despues de acceder al dato. la accedo al boton cerrar sesion
    botones.innerHTML = `
<label for="">Bienvenido ${usuarios[0]}</label>
            <hr> <button onclick="logoff()" type="submit">Cerrar sesión</button>`
}
// con esta funcion remuevo y elimino la inforamcion previamente guardada en el storage. y reincia la  posibilidad de cargar un dato nuevamente en el input
function logoff() {
    localStorage.clear();
    location.reload();
}
// con dom me traigo el id de un input
function saludando() {
    let ingreso_al_sistma = document.getElementById("ingresar_al_sistema");
    if (nombre.value != valor) {

        usuarios.push(nombre.value);
        //JSON.stringify transforme un objeto  a un string en formato JSON.  asi puedo recuperarlo
        let encUsuarios = JSON.stringify(usuarios);
        localStorage.setItem('usuarios', encUsuarios);
        location.reload();
    }
    else {
        
        //al apretar enter o aceptar se dispara un mensaje de alerta pidiendo ingresar un nombre para operar
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
    
        Toast.fire({
            icon: 'info',
            title: 'Para poder operar, tenes que ingresar un nombre'
        })
    
        // console.log("tenes que ingresar un valor")
    }
}



//cree un array de objetos. la clase Producto tiene las variables que voy a utilizar. nombre es reconocido como string y precio y stock son reconocidos como numeros. 

class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.stock = parseInt(stock);
    }
}
// //Declaramos un array de productos para almacenar objetos. 
const productosTotales = [
    { id: 1, nombre: "Brocoli", precio: 800, stock: 8, carro: 0, img: 'brocoli.jpg' },
    { id: 2, nombre: "Espinacas", precio: 900, stock: 2, carro: 0, img: 'espinaca.webp' },
    { id: 3, nombre: "Zanahorias", precio: 1000, stock: 1, carro: 0, img: 'zanahoria.jpg' },
    { id: 4, nombre: "Zapallo", precio: 1200, stock: 6, carro: 0, img: 'zapallo.jpg' },
    { id: 5, nombre: "Repollo", precio: 1100, stock: 0, carro: 0, img: 'repollo.webp' },
    { id: 6, nombre: "Esparragos", precio: 700, stock: 0, carro: 0, img: 'esparragos.jpg' },
];





const productos = productosTotales.filter((producto) => producto.stock >= 0);

let i = 1;
// usando query selector .  ingrese las etiquetas div al html y con for of, recorri el array de objetos. con if . else if y else en funcion del stock y usando clases de css diferencie si el stock esta por agotarse o esta agotado.
let data = '';
let vstock = '';
const cards = document.querySelector('.listadovegetales');
// console.log("Lista de productos");
for (let listado of productos) {
    // DESESTRUCTURAR
    const { id, nombre, precio, stock, img } = listado

    if (stock == '1' || stock == '2' || stock == '3') {
        vstock = `<span class="alerta">Stock ${stock} - Quedan Pocas Unidades</span>`;
    } else if (stock == 0) {
        vstock = `<span class="agotado">Stock ${stock} - AGOTADO!</span>`;
    } else {
        vstock = 'Stock ' + stock;
    }
    data += `<div class="card">
    <img class="imagen" src="./assets/${img}" alt="${nombre}">
    <p>$ ${precio}</p>
    <p>${vstock}</p>
    <label for="number">${nombre}</label>
    <br>
    <button class="addButton" type="submit" itemID="${id}"">Añadir</button>
</div>`
    cards.innerHTML = data;
    i++
}

//Detectar la funcion Añadir al carrito.
let addButton = document.getElementsByClassName("addButton");
var myFunction = function () {
    var attribute = this.getAttribute("itemID");
    productoSeleccionado = productos.find(obj => obj.id == attribute);
    //mediante sweet alert añadi un mixin con una leyenda e icono al hacer click al boton añadir
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Se añadio al carrito'
    })
    //EJEMPLO DE OPERADOR TERNARIO CON EL STOCK
    //mediante sweet alert añadi un mensaje de alerta con una leyenda e icono al hacer click al boton añadir, cuando el stock es cero
    productoSeleccionado.stock > 0 ? productoSeleccionado.carro++ : Swal.fire({
        icon: "error",
        text: 'No se puede agregar al carrito, por el momento, no hay mas stock'
    });

    updateCarrito()
};

for (var j = 0; j < addButton.length; j++) {
    addButton[j].addEventListener('click', myFunction, false);
}



function updateCarrito() {
    let i = 1;
    // usando query selector .  ingrese las etiquetas div al html y con for of, recorri el array de objetos. con if . else if y else en funcion del stock y usando clases de css diferencie si el stock esta por agotarse o esta agotado.
    let data = '';
    const cards = document.querySelector('.carro');
    //si cada producto es distinto de 0 se agregara al carrito. con el boton borrar se podra eliminar.


    for (let productosTotales of productos) {
        if (productosTotales.stock !== 0) {
            data += `<article>
        <div class="imgContainer">
            <img src="./assets/${productosTotales.img}" alt="${productosTotales.name}" />
        </div>
        <p>Cantidad: ${productosTotales.carro}</p>
        <p>Precio: ${productosTotales.precio}</p>
        <button class="botonBorrar borrar_elemento" id="${productosTotales.id}">Borrar</button>
    </article>`

        }

        productosTotales.stock !== 0 && {}

        cards.innerHTML = data;
        i++
        let botones_borrar = document.querySelectorAll(".borrar_elemento");
        for (let boton of botones_borrar) {
            boton.addEventListener("click", borrar_producto);



        }

    }
    calcularPreciototal()
}
// con esta funcion puedo eliminar el elemento agregado a nuestro carrito
function borrar_producto(e) {
    // let padre = e.target.parentNode;
    // console.log(e.target.id);
    productosTotales[e.target.id - 1].carro = 0
    updateCarrito()

//mediante sweet alert añadi un mixin con una leyenda e icono al hacer click al boton borrar
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'error',
        title: 'Se elimino del carrito'
    })






}
//cree un boton para mostrar y ocultar el carrito
let btn_carrito = document.getElementById("mostrar_carrito");
btn_carrito.addEventListener("click", function () {
    let carrito = document.getElementById("carrito");

    if (carrito.style.display != "none") {
        carrito.style.display = "none";
        
    }
    else {
        carrito.style.display = "block";
        
    }
})



// sumo el total de productos añadidos al carrito
function calcularPreciototal() {
    const productosAdquiridos = productos.filter((producto) => producto.carro > 0);
    let costoTotal = 0;
    function operaciones() {
        costoTotal = productosAdquiridos.reduce((acumulador, elemento) => acumulador + (elemento.precio * elemento.carro), 0)
        document.getElementById("costoTotal").value = costoTotal;
        // console.log(costoTotal);
    }
    operaciones();
}



// evento click al apretar boton izq del mouse. tirando un mensaje de alerta, dentro de una funcion anonima
// let btn_continuar = document.getElementById("btn_continuarCompra");
// btn_continuar.addEventListener("click", function () {
//     alert("este boton , mas adelante, servira para volver a añadir cosas al carrito cuando estemos en un paso previo a finalizar la compra")
// })


//evento mousedown al presionar. mouseup al levantar el boton y ademas cambia al color amarillo el propio boton
let btn_finalizar = document.getElementById("btn_finalizarCompra");
btn_finalizar.addEventListener("mousedown", function presion1() {
    // console.log("pronto con este boton direccionaremos a un espacio donde puedas elegir los medios de pago");
    document.getElementById("btn_finalizarCompra").style.backgroundColor = '#ffff00';

  
    Swal.fire({
        title: 'Finalizar compra',
        text: "Estas a un paso de obtener tus productos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Terminar compra!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Facturacion de la compra!',
            'Procederemos a la facturacion de tu compra.',
            'success'
          )
        }
      })


});
//evento mouseup. al levantar la presion del btn izquierdo cambia a color rojo.
btn_finalizar.addEventListener("mouseup", function presion2() {
    document.getElementById("btn_finalizarCompra").style.backgroundColor = '#ff0000';
})


let form = document.getElementById("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let coment = document.getElementById("comentario");
    // console.log(" El comentario es :", comentario.value);

})

//FOOTER


//use createElement para insertar un h4 y le agregue una clase, que determinaba un color al h4
let redessociales = document.createElement("h3");
redessociales.innerText = "Seguinos en redes sociales";
redessociales.className = "colorazul";
redesfooter.append(redessociales);
/*El método getElementsByTagName() sirve para acceder a un conjunto de elementos de la estructura HTML, utilizando su nombre de etiqueta como identificación. Utilice la etiqueta li  */
let li = document.getElementsByTagName("li");
// console.log(li);

for (let elemento of li) {
    // console.log(elemento);
}
