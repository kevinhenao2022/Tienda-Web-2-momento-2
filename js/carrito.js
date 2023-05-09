//seleccionar todos los botones añadir
//al carrito
const d = document;
let btnCarrito = d.querySelectorAll(".boton-carrito");
//selecionar la tabla de los productos del carrito
let tablaCarrito = d.querySelector(".listado-carrito tbody");
//seleccionar la bolsa del menu
let bolsa = d.querySelector(".bolsa");
let contadorPro = 0;

for( let x=0; x < btnCarrito.length; x++ ){
    btnCarrito[x].setAttribute("id", x);
    let btnId = btnCarrito[x].getAttribute("id");
    btnCarrito[x].addEventListener("click", function(){
        //alert("di click "+btnId);
        alertaPro();
        //ejecutar la funcion para obtener la informacion
        infoPro( btnId );

    });
}
//console.log(btnCarrito);
//funcion para contar cuantos productos añado a la bolsa
function alertaPro() {
    contadorPro++;
    bolsa.textContent = contadorPro;
}

//obtener la informaion del producto
function infoPro( idBoton ) {
    let producto;
    if( btnCarrito[idBoton].classList.contains("boton-carrito") ){
        producto = btnCarrito[idBoton].parentElement.parentElement.parentElement;
        console.log(producto);
    }
    let informacionPro = {
        "id": idBoton,
        "nombre": producto.querySelector(".titulo-pro").textContent,
        "precio": producto.querySelector(".precio-normal").textContent,
        "imagen": producto.querySelector(".con-imagen img").src
    }
    console.log( informacionPro );
    //ejecutar funcion de agregar productos al carrito
    agregarAlCarrito( informacionPro ); 
    productosEnLocal( informacionPro );
}
let contadorFila = -0;
//funciones para agregar la informacion del producto al carrito
function agregarAlCarrito( infoProducto ) {
    let fila = document.createElement("tr");
    fila.setAttribute("id",contadorFila);
    let idFila = fila.getAttribute("id");
    console.log(idFila);
    fila.innerHTML = `
        <td> ${ infoProducto.id } </td>
        <td>  
            <img src="${ infoProducto.imagen }" width="70%">
        </td>
        <td> ${ infoProducto.nombre } </td>
        <td> ${ infoProducto.precio } </td>
        <td> 
            <span onclick="eliminarPro(${idFila});" class="btn-eliminar text-danger">X</span>
        </td>
    `;
    tablaCarrito.appendChild(fila);
    contadorFila++;
}
//guardar produtos del carrito en el localStorage
let productoEnLS = "produtos";
function productosEnLocal( objetoPro ) {
    //guardar los productos que ya estan en el
    //localStorage
    let productos = [];
    //recoger los datos de localStorage
    let proLocal =  JSON.parse(localStorage.getItem(productoEnLS));
    //comprobar que no haya valores nulos en localStorage
    if ( proLocal !== null ) {
        productos = proLocal;
    }
    //guardar datos en el arreglo
    productos.push(objetoPro);
    //console.log(productos);
    localStorage.setItem(productoEnLS, JSON.stringify(productos));
}






//funcion para eliminar un producto del carrito
function eliminarPro(idBoton) {
    console.log("elemento "+this.parentElement);
    let btnEliminar = d.querySelectorAll(".btn-eliminar");
    btnEliminar[idBoton].parentElement.parentElement.remove();
}
