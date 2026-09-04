const parametros = new URLSearchParams(window.location.search);
const idProducto = parametros.get('id');

console.log(idProducto);

const apiProd = "https://6a99804853c0481726b960d2.mockapi.io/productos/producto";

async function ObtenerDetalleProducto() {
    try {
        const respuesta = await fetch(`${apiProd}/${idProducto}`);
    }
}