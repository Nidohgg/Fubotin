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
                <div class="botones-cantidad">
                    <button class="btn-quitar">-</button>
                    <p>${p.cantidad}</p>
                    <button class="btn-agregar">+</button>
                    <button class="btn-eliminar">eliminar</button>
                </div>
                <h2>Total: $</h2>
            </div>
        </div>`;
    });
}

//Actualiza la cantidad de productos que fueron agregados al carrito 
function actualizarContador(){
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contadorProd.textContent = cantidadTotal;
}

//agrega el producto al carrito si no hay otro igual
function agregarAlCarrito(producto){
    const prodExistente = carrito.find(p => p.id === producto.id);//Se pregunta si el producto que se va a agregar ya esta en el carrito

    if(prodExistente){
        prodExistente.cantidad++;
    }else{
        carrito.push({
            ...producto,
            cantidad: 1
        });
        
    }

    avisoCarrito('success', `${producto.nombre} agregado al carrito`);
    guardarCarritoLocalStorage();
    mostrarCarrito();
    actualizarContador();
}

//no pierde el carrito si el usuario recarga o sale de la pagina 
function guardarCarritoLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function avisoCarrito(icono, mensaje){
    Swal.fire({
        position: "top-end",
        icon: icono,
        text: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}

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

mostrarCarrito();
actualizarContador();