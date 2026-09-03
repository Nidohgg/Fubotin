const apiProd = "https://6a99804853c0481726b960d2.mockapi.io/productos/producto"

const contenedorProductos = document.querySelector(".card-container")

let productos = [];// Array para almacenar los productos obtenidos de la API

// Función para obtener los productos desde la API
async function getProductos() { 
    try{
        const respuesta = await fetch(apiProd)//
        productos = await respuesta.json()
        mostrarProductos(productos);
        
    } catch (error) {
        console.error("Error al obtener los productos:", error)
    }
}

//FUNCIONES
//función para mostrar los productos en el HTML
function mostrarProductos(productos){
    contenedorProductos.innerHTML = "";//

    productos.forEach(p => {
        contenedorProductos.innerHTML += `
        <div class="card-producto">
            <img src= "${p.imagen}" alt="${p.nombre}">
            <h2>${p.nombre}</h2>
            <p>${p.marca}</p>
            <h3>$${p.precio.toLocaleString('es-AR')}</h3>
        </div>
        `;
    });
}


getProductos();