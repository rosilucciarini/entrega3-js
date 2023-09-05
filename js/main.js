inicio();

function inicio() {
  let productosInicial = [
    {
      id: 1,
      nombre: "buzo",
      categoria: "indumentaria",
      stock: 2,
      precio: 20000,
      imagen: "buzo.jpg",
    },
    {
      id: 2,
      nombre: "campera",
      categoria: "indumentaria",
      stock: 4,
      precio: 18000,
      imagen: "campera.jpg",
    },
    {
      id: 3,
      nombre: "gorra",
      categoria: "accesorios",
      stock: 4,
      precio: 5000,
      imagen: "gorra.jpg",
    },
    {
      id: 4,
      nombre: "guantes",
      categoria: "accesorios",
      stock: 3,
      precio: 4500,
      imagen: "guantes.jpg",
    },
    {
      id: 5,
      nombre: "jogging",
      categoria: "indumentaria",
      stock: 3,
      precio: 10500,
      imagen: "jogging.jpg",
    },
    {
      id: 6,
      nombre: "medias",
      categoria: "accesorios",
      stock: 5,
      precio: 500,
      imagen: "medias.jpg",
    },
    {
      id: 7,
      nombre: "mochila",
      categoria: "accesorios",
      stock: 3,
      precio: 15000,
      imagen: "mochila.jpg",
    },
    {
      id: 8,
      nombre: "remera azul",
      categoria: "indumentaria",
      stock: 4,
      precio: 9000,
      imagen: "remera-azul.jpg",
    },
    {
      id: 9,
      nombre: "remera",
      categoria: "indumentaria",
      stock: 3,
      precio: 9500,
      imagen: "remera.jpg",
    },
    {
      id: 10,
      nombre: "short",
      categoria: "indumentaria",
      stock: 2,
      precio: 10000,
      imagen: "short.jpg",
    },
    {
      id: 11,
      nombre: "zapatillas adidas",
      categoria: "calzado",
      stock: 3,
      precio: 40000,
      imagen: "zapatillas-adidas.jpg",
    },
    {
      id: 12,
      nombre: "zapatillas nike",
      categoria: "calzado",
      stock: 3,
      precio: 55000,
      imagen: "zapatillas-nike.jpg",
    },
  ];

  let input = document.getElementById("buscar");
  input.addEventListener("input", () => filtrar(productosInicial, input));

  let boton = document.getElementById("boton");
  boton.addEventListener("click", () => filtrar(productosInicial, input));

  let filtrarPorCategoria = document.getElementsByClassName("botonParaFiltrar");
  for (const boton of filtrarPorCategoria) {
    boton.addEventListener("click", () => filtrar(productosInicial, boton));
  }

  let ocultarCarrito = document.getElementById("verCarrito");
  ocultarCarrito.addEventListener("click", verOcultar);

  let botonCompra = document.getElementById("botonParaComprar");
  botonCompra.addEventListener("click", () => finalizarCompra(productos));

  convertirCarrito();
  representarTarjetas(productosInicial);
}
//------------------------------------------------------------------//

//Funcion para filtrar por categoria y por nombre
function filtrar(productos, nodo, carrito, e) {
  let productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.includes(nodo.value.toLowerCase()) ||
      producto.categoria.includes(nodo.value.toLowerCase())
  );
  representarTarjetas(productosFiltrados, carrito);
}

//Funcion para cambiar nombre de boton y ocular carrito/productos
function verOcultar(e) {
  e.target.innerText === "Ver carrito"
    ? (e.target.innerText = "Ver productos")
    : (e.target.innerText = "Ver carrito");

  document.getElementById("productos").classList.toggle("oculto");
  document.getElementById("carrito").classList.toggle("oculto");
}

//Funcion para representar las tarjetas de los productos
function representarTarjetas(productos) {
  let card = document.getElementById("productos");
  card.innerHTML = "";
  productos.forEach(({ nombre, precio, imagen, stock, id }) => {
    let cardProducto = document.createElement("div");
    cardProducto.className = "cardProducto";

    cardProducto.innerHTML = `
    <div class=imagen style="background-image: url(./assets/${imagen})"></div>
      <h3>${nombre}</h3>
      <p>Precio $${precio}</p>
      <p>Quedan ${stock} unidades</p>
      <button id=${id}>Agregar al carrito</button>
    `;
    card.appendChild(cardProducto);

    let boton = document.getElementById(id);
    boton.addEventListener("click", (e) => agregarAlCarrito(productos, e));
  });
}
//Funcion para agregar al carrito los productos
function agregarAlCarrito(productos, { target }) {
  let carrito = localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito"))
    : [];

  let productoInicial = productos.find(({ id }) => id === Number(target.id));
  let { id, nombre, precio } = productoInicial;
  console.log(carrito);
  let productoEnCarrito = carrito.find(({ id }) => id === productoInicial.id);

  if (productoEnCarrito) {
    productoEnCarrito.unidades++;
    productoEnCarrito.subtotal =
      productoEnCarrito.unidades * productoEnCarrito.precioUnitario;
  } else {
    carrito.push({
      id,
      nombre,
      precioUnitario: precio,
      unidades: 1,
      subtotal: precio,
    });
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  convertirCarrito(carrito);
}
//Funcion que muestra los productos en el carrito
function convertirCarrito() {
  let productos = localStorage.getItem("carrito")
    ? JSON.parse(localStorage.getItem("carrito"))
    : [];
  let card = document.getElementById("productosEnCarrito");

  card.innerHTML = "";
  productos.forEach(({ nombre, precioUnitario, unidades, subtotal }) => {
    let cardProducto = document.createElement("div");
    cardProducto.className = "cardCarrito";
    cardProducto.innerHTML = `
      <p>${nombre}</p>
      <p>$${precioUnitario}</p>
      <p>${unidades}</p>
      <p>$${subtotal}</p>
    `;
    card.appendChild(cardProducto);
  });
}
//Funcion que finaliza la compra del carrito
function finalizarCompra() {
  localStorage.removeItem("carrito");
  convertirCarrito([]);
  alert("Gracias por su compra");
}