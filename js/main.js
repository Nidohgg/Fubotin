const apiProd = "https://6a99804853c0481726b960d2.mockapi.io/productos/producto"

const contenedorProductos = document.querySelector(".card-container")
const categorias = ['Todos', 'Pasto Natural', 'Pasto Sintetico', 'Terreno Cubierto'] // Array de categorías para filtrar los productos
const contenedorCategorias = document.querySelector(".categorias") // Contenedor para los botones de categorias
const inputBusqueda = document.querySelector("#inputBusqueda")


let productos = [];// Array para almacenar los productos obtenidos de la API

// Función para obtener los productos desde la API
async function getProductos() { 
    try{
        const respuesta = await fetch(apiProd)//
        productos = await respuesta.json()
        mostrarProductos(productos);

    } catch (error) {
        mostrarCardError();
    }
}

//FUNCIONES
//función para mostrar los productos en el HTML
function mostrarProductos(array){
    contenedorProductos.innerHTML = "";//

    if(array.length === 0){
        contenedorProductos.innerHTML = `
            <div class= "sin-resultados">
                <h2>No se encontraron productos</h2>
                <p>Intente con otra búsqueda o categoría.</p>
            </div>`;
        return;
    }

    array.forEach(p => {
        contenedorProductos.innerHTML += `
        <div class="card-producto">
            <div class="producto-img">
                <img src="${p.imagen}" alt="${p.nombre}">
            </div>
            <h2>${p.nombre}</h2>
            <p>${p.marca}</p>
            <h3>$${p.precio.toLocaleString('es-AR')}</h3>
        </div>`;
    });
}

function mostrarCardError(){
    contenedorProductos.innerHTML = `
        <div class="card-error">
            <h2>Error al cargar los productos</h2>
            <p>Por favor, inténtelo de nuevo más tarde.</p>
        </div>
    `;
}
// Función para crear los botones de categorías
function crearBotonesCategorias(cat) {
    return `<button class= "btn-categoria"> ${cat}</button>`;
}
// Función para mostrar los botones de categorías en el HTML
function mostrarBotonesCategorias() {
    categorias.forEach(categoria => {
        contenedorCategorias.innerHTML += crearBotonesCategorias(categoria);
    });
    activarClickBotonesCategorias(); // Activar el evento click en los botones
}

// Función para activar el evento click en los botones de categorías
function activarClickBotonesCategorias() {
    const botonesCategorias = document.querySelectorAll(".btn-categoria");
    botonesCategorias.forEach(cat => {
        cat.addEventListener("click", () => {
            if (cat.textContent.trim() === 'Todos'){
                mostrarProductos(productos);
            } else {
                const productosFiltrados = productos.filter(p => p.categoria === cat.textContent.trim());
                mostrarProductos(productosFiltrados);
            }
        })
    })
}

//EVENTOS

//Evento para filtrar con el input de búsqueda
inputBusqueda.addEventListener("input", () => {
    const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

    if(textoBusqueda !== ""){
        const productosFiltrados = productos.filter(p => p.nombre.toLowerCase().includes(textoBusqueda));
        mostrarProductos(productosFiltrados);
    } else {
        mostrarProductos(productos);
    }
})

mostrarBotonesCategorias();
getProductos();