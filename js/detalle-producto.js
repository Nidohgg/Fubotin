const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get('id');
const contenedorDetalle = document.querySelector("#detalle-container")

console.log(idProducto);

const apiProd = "https://6a99804853c0481726b960d2.mockapi.io/productos/producto";

let producto = {};

// Funcion para obtener el detalle del producto
async function ObtenerDetalleProducto() {
    try {
        const respuesta = await fetch(`${apiProd}/${idProducto}`);

        if (!respuesta.ok) {
            throw new Error("Error al obtener el detalle del producto");
        }

        producto = await respuesta.json();

        mostrarDetalleProducto(producto);

    } catch (error) {
        console.error(error);
    }
}

//Mostrar los datos del producto (imagen, descripcion, agregar al carrito)
//Ver de agregar Seleccion de talles...
function mostrarDetalleProducto(producto){
    contenedorDetalle.innerHTML = `
    <div class="row g-5 align-items-start">
        <div class="detalle-img col-12 col-lg-7">
            <img src="${producto.imagen}" class= "img-fluid rounded" alt = "${producto.nombre}">
        </div>
        <div class="col-12 col-lg-5">
            <h1 class="mb-3">${producto.nombre}</h1>
            <p class="mb-2">${producto.marca}</p>
            <h2 class="mb-4">$${producto.precio.toLocaleString('es-AR')}</h2>
            <p class="descr-prod">${producto.descripcion}</p>
            <div>
                <p>Selecciona tu talle</p>
            </div>
            <button class="btn btn-color-compra btn-lg w-100 mt-4" id="btnAgregarCarrito">
                Agregar al carrito
            </button>
        </div>
    </div>
        
    `;

    const btnAgregarCarrito = document.querySelector("#btnAgregarCarrito")
    btnAgregarCarrito.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });
}

//EVENTOS 



ObtenerDetalleProducto();

