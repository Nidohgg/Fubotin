const btnCarrito = document.querySelector("#btnCarrito");
const carritoPrevio = document.querySelector("#carrito-previo");
const cerrarCarrito = document.querySelector("#cerrar-carrito");

const listaCarrito = document.querySelector("#lista-carrito");
const btnVaciarCarrito = document.querySelector("#btn-vaciar-carrito");

const contadorProd = document.querySelector("#contadorProd");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

//FUNCIONES
function mostrarCarrito(){
    listaCarrito.innerHTML = "";
    if(carrito.length === 0){
        listaCarrito.innerHTML = `
        <p>
            El carrito se encuentra vacío.
        </p>`;
        return;
    }

    carrito.forEach(p => {
        listaCarrito.innerHTML += `
        <div class="producto-carrito">
            <img src="${p.imagen}" alt="${p.nombre}">

            <div>
                <h3>${p.nombre}</h3>
                <p>${p.precio.toLocaleString("es-AR")}</p>
                <p>Cantidad: ${p.cantidad}</p>
            </div>
        </div>`;
    });
}

function actualizarContador(){
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorProd.textContent = cantidadTotal;
}

mostrarCarrito();


//EVENTOS
//EVENTO PARA ABRIR LA VISTA PREVIA DEL CARRITO
btnCarrito.addEventListener("click", () => {
    carritoPrevio.classList.add("abrir");
});

//EVENTO PARA CERRAR LA VISTA PREVIA DEL CARRITO
cerrarCarrito.addEventListener("click", () => {
    carritoPrevio.classList.remove("abrir");
});

//EVENTO PARA VACIAR EL CARRITO
btnVaciarCarrito.addEventListener("click", () =>{
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
    actualizarContador();
})

