const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get('id');
const contenedorDetalle = document.querySelector("#detalle-container")

console.log(idProducto);

const apiProd = "https://6a99804853c0481726b960d2.mockapi.io/productos/producto";

// Funcion para obtener el detalle del producto
async function ObtenerDetalleProducto() {
    try {
        const respuesta = await fetch(`${apiProd}/${idProducto}`);

        if (!respuesta.ok) {
            throw new Error("Error al obtener el detalle del producto");
        }

        const producto = await respuesta.json();

        mostrarDetalleProducto(producto);

    } catch (error) {
        console.error(error);
    }

}

//Mostrar los datos del producto (imagen, descripcion, agregar al carrito)
//Ver de agregar Seleccion de talles...
function mostrarDetalleProducto(producto){
    contenedorDetalle.innerHTML = `
        <div class= "detalle-imagen">
            <img src="${producto.imagen}" alt = "${producto.nombre}">
        </div>
        <div class="detalle-info">
            <h1>${producto.nombre}</h1>
            <p>${producto.marca}</p>
            <h2>$${producto.precio.toLocaleString('es-AR')}</h2>
            <p>${producto.descripcion}</p>
            <div>
                <p>Selecciona tu talle</p>
            </div>
            <button id="btnAgregarCarrito">
                Agregar al carrito
            </button>
        </div>
    `;
}

ObtenerDetalleProducto();

