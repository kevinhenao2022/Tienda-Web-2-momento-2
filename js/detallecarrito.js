
let productos = JSON.parse(localStorage.getItem("productos"));


let productosDetalle = [];

for (var i = 0; i < productos.length; i++) {
  productosDetalle.push(productos[i]);
}

console.log(productosDetalle);



let tabla = document.querySelector(".detalle-producto");
let tbody = document.getElementById("detalle-producto");

function detalleCarrito(){

  for (var i = 0; i < productosDetalle.length; i++) {
    var producto = productosDetalle[i];
  
    let fila = document.createElement("tr");
    
    let idFila = fila.getAttribute("id");
  
    fila.innerHTML = `
    <td>
      <span class="eliminar" data-index="${i}"  class="text-danger">X</span>
    </td>
    <td><img src="${producto.imagen}" width="20%"></td>
    <td>${producto.nombre}</td>
    <td>${producto.precio}</td>
    <td>
    <span class="menos" onclick="restarCantidad(${i})">-</span>
        <p class="cantidad">1</p>

        <span class="mas" onclick="sumarCantidad(${i})">+</span>
  
    <td><p class="subtotal">${producto.precio}</p></td>
  
    `;
  
    tabla.appendChild(fila);
    
  }

 let botonesEliminar = document.querySelectorAll(".eliminar");
  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].addEventListener("click", function() {
      var index = this.getAttribute("data-index");
      eliminarProducto(index);
      this.parentNode.parentNode.remove();
      actualizarAllSubtotal();
    });
  }
  actualizarAllSubtotal();
}



detalleCarrito();

function eliminarProducto(index) {
  var productos = JSON.parse(localStorage.getItem("productos"));
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
}


function restarCantidad(index) {
  let cantidad = document.querySelectorAll(".cantidad")[index];
  let valor = parseInt(cantidad.textContent);
  if (valor > 1) {
    cantidad.textContent = valor - 1;
  } else {
    var confirmacion = confirm("¿Desea eliminar este producto?");
    if (confirmacion) {
      eliminarProducto(index);
    }
  }
 
  actualizarSubtotal(index);
  actualizarAllSubtotal();
}

function sumarCantidad(index) {
  var cantidad = document.querySelectorAll(".cantidad")[index];
  var valor = parseInt(cantidad.textContent);
  cantidad.textContent = valor + 1;
  actualizarSubtotal(index);
  actualizarAllSubtotal();
}


function actualizarSubtotal(index) {
  let cantidad = document.querySelectorAll(".cantidad")[index];
  let valorCantidad = parseInt(cantidad.textContent);
  let precio = document.querySelectorAll("td:nth-child(4)")[index];
  let valorPrecio = parseInt(precio.textContent.replace("$", ""));
  let subtotal = document.querySelectorAll(".subtotal")[index];
  let valorSubtotal = valorCantidad * valorPrecio;
  subtotal.textContent = "$" + valorSubtotal.toLocaleString() + ".000";
  actualizarAllSubtotal();
  actualizarTotalPago();
}


function actualizarAllSubtotal() {
  let subtotales = document.querySelectorAll(".subtotal");
  let total = 0;
  for (let i = 0; i < subtotales.length; i++) {
    let subtotal = parseInt(subtotales[i].textContent.replace("$", ""));
    total += subtotal;
  }
  let allSubtotal = document.querySelector(".allSubtotal");
  allSubtotal.textContent = "$" + total.toLocaleString() + ".000";
}

let selectEnvio = document.querySelector(".select-envio");
let envios = document.querySelector(".envios");
let allSubtotal = document.querySelector(".allSubtotal");
let totalPago = document.querySelector(".totalPago");

selectEnvio.addEventListener("change", function() {
  if (selectEnvio.value === "Nacional") {
    envios.textContent = "$15.000";
  } else if (selectEnvio.value === "Local") {
    envios.textContent = "$10.000";
  }
  actualizarTotalPago();
});

actualizarTotalPago();
actualizarAllSubtotal();

function actualizarTotalPago() {
  let subtotales = document.querySelectorAll(".subtotal");
  let total = 0;
  for (let i = 0; i < subtotales.length; i++) {
    let subtotal = parseInt(subtotales[i].textContent.replace("$", ""));
    total += subtotal;
  }
  let enviosValor = parseInt(envios.textContent.replace("$", "").replace(".000", ""));
  let totalPagoValor = total + enviosValor;
  totalPago.textContent = "$" + totalPagoValor.toLocaleString() + ".000";
}





