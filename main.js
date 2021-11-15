$(document).ready(() => {
  setTimeout(() => {
    $('.loader').css({
      opacity: 0,
      visibility: "hidden"
    })
  },2000)

})


class Datos {
  constructor(nombre, tel, nombreMascota, edad) {
    this.nombre = nombre;
    this.tel = tel;
    this.nombreMascota = nombreMascota;
    this.edad = edad;
  }
}

function guardar() {
  var nombreGuardar = document.getElementById("nombre").value;
  var telGuardar = document.getElementById("tel").value;
  var nombreMascotaGuardar = document.getElementById("nombreMascota").value;
  var edadGuardar = document.getElementById("edad").value;
  nuevoDato = new Datos(
    nombreGuardar,
    telGuardar,
    nombreMascotaGuardar,
    edadGuardar
  );
  console.log(nuevoDato);
  mostrarInfo(nuevoDato);
  abrirModal();
}

function mostrarInfo(Datos) {
  // agregar
  var nuevoContenido = document.getElementById("caja");
  nuevoContenido.innerHTML = " ";
  nuevoContenido.innerHTML = `
        <div id="miModal" class="modall-container">
        <div class="modall">
        <h2 id="inf"></h2>
        <div> ${nuevoDato.nombre} y ${nuevoDato.nombreMascota} ya estan registrados, pueden comenzar a llenar su carrito
        <div class="comprar">
        <button id="cerrar" class="btn btn-danger" onclick="cerrarModal()">cancelar</button>
        <button id="comprarr" class="btn btn-success" onclick="cargarProductos()">comprar</button>
        </div>
    </div>
  </div> `;
}

function abrirModal() {
  let modalContainer = document.getElementById("miModal");
  modalContainer.classList.add("modall-active");
}

function cerrarModal() {
  let modalContainer = document.getElementById("miModal");
  modalContainer.classList.remove("modall-active");
}

function cerrarModal() {
  // agregar
  var nuevoContenido = document.getElementById("caja");
  nuevoContenido.innerHTML = " ";
  nuevoContenido.innerHTML = `
      <div class="container py-2">
      <p class="lead"> Ingrese sus datos</p>
      <form>
      <input id="nombre" type="text" placeholder="Ingresar nombre completo" class="form-control my-2">
      <input id="tel" type="text" placeholder="Ingresar un telefono " class="form-control my-2">
      <input id="nombreMascota" type="text" placeholder="Ingresar nombre de mascota"
          class="form-control my-2">
      <input id="edad" type="text" placeholder="Ingresar año o mes de la mascota" class="form-control my-2">
      <button id="boton" class="btn btn-success" onclick="guardar()">enviar</button>
      </form>
      </div>
  `;
}

//  AJAX
var producto = [];

function cargarProductos() {
  $.get({
    url: "productos.json",
    dataType: "json",
    success: (response) => {
      cards(response, producto);
    },
  });
}

function cards(producto) {
  // eliminar
  var formulario = document.getElementById("caja");
  formulario.parentNode.removeChild(formulario);
  // agregar
  var nuevoContenido = document.getElementById("cajaII");
  nuevoContenido.innerHTML = " ";
  let htmlgenerado = " ";
  producto.forEach((producto) => {
    htmlgenerado += `
    <div id="contenedor-productos">
    <div class="item card border-success text-dark bg-light h-100">
    <img src=${producto.img} class="item card-img-top" alt="...">
    <div class="card-body">
        <h5 class="item-card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descri}</p>
        <div class="item text-center">
            Precio: $${producto.precio}
        </div>
    </div>
    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
        <div class="item fa-pull-right"><a class="btn btn-outline-success mt-auto"
                onclick="agregarAlCarrito(${producto.id})">comprar</a></div>
    </div>
  </div>
  </div>
  </div>
  </div>
  </div>
    `;
  });
  nuevoContenido.innerHTML = htmlgenerado;
}


// == selectores ==
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')

const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.getElementById('precioTotal')
const footer = document.getElementById('footer')

const carrito = []


//  AGREGAR AL CARRITO
const agregarAlCarrito = (itemId) => {
  const productoEnCarrito = carrito.find((prod) => prod.id === itemId);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find((prod) => prod.id === itemId);

    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  console.log(carrito);
  actualizarCarrito();
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");

    div.innerHTML = `
              <p>${prod.nombre}</p>
              <p>Precio: $${prod.precio}</p>
              <p>Cantidad: ${prod.cantidad}</p>
              <button onclick="eliminarProducto(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
            `;

    contenedorCarrito.appendChild(div);
  });

  contadorCarrito.innerText = carrito.reduce(
    (acc, prod) => (acc += prod.cantidad),
    0
  );
  precioTotal.innerText = carrito.reduce(
    (acc, prod) => (acc += prod.precio * prod.cantidad),
    0
  );

  
};
//  ELIMINAR PRODUCTO

const eliminarProducto = (itemId) => {
  const producto = carrito.find((prod) => prod.id === itemId)

  producto.cantidad--

  if (producto.cantidad === 0) {
    const index = carrito.indexOf(producto)
    carrito.splice(index, 1)
  }

  actualizarCarrito();
}

// FINALIZAR COMPRA
const finalizar = document.querySelector('.finalizarCompra');
finalizar.addEventListener('click', finalizarClicked);

function finalizarClicked () {
  contenedorCarrito.innerHTML = '';
  contenedorCarrito.innerHTML = `
  <div id="carrito-contenedor">
  <tfoot>
      <tr id="footer">
          <th scope="row" colspan="5">Gracias por su compra!</th>
      </tr>
  </tfoot>

</div>
  `
  contadorCarrito.innerText = '';
  precioTotal.innerText = '';
}