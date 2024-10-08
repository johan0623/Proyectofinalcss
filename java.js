// Variables
const carrito = document.querySelector("#carrito");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const VaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCurso = document.querySelector("#lista-cursos");
let articuloCarrito = [];

// Cargar Event Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Agregar producto al hacer click en "Agregar al carrito"
    listaCurso.addEventListener("click", agregar_curso,);

    // Eliminar productos del carrito
    carrito.addEventListener('click', eliminarProducto);

    // Vaciar carrito
    VaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Cargar los producotos del Local Storage al iniciar
    document.addEventListener('DOMContentLoaded', () => {
        articuloCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        colocarEnCarrito();
    });
}

// Función para agregar un producto al carrito
function agregar_curso(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

// Función para eliminar un producto del carrito
function eliminarProducto(e) {
    if (e.target.classList.contains('eliminarProducto')) {
        const productoID = e.target.getAttribute('data-id');
        const productoIndex = articuloCarrito.findIndex(curso => curso.id === productoID);

        if (productoIndex !== -1) {
            if (articuloCarrito[productoIndex].cantidad > 1) {
                articuloCarrito[productoIndex].cantidad--;
            } else {
                articuloCarrito.splice(productoIndex, 1); //El método splice() cambia el contenido de un array eliminando elementos existentes y/o agregando nuevos elementos
            }
            colocarEnCarrito();
        }
    }
}

// Función para leer los datos del producto
function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector("img").src,
        titulo: producto.querySelector("figcaption").textContent,
        precio: producto.querySelector(".productoPrecio").textContent,
        id: producto.querySelector("button").getAttribute("data-id"),
        cantidad: 1
    }




    //some() ejecuta la función callback una vez por cada elemento presente en el array hasta que encuentre uno donde callback retorna un valor verdadero (true). Si se encuentra dicho elemento, some() retorna true inmediatamente. Si no, some() retorna false

    const existe = articuloCarrito.some(curso => curso.id === infoProducto.id);
    if (existe) {
        articuloCarrito = articuloCarrito.map(curso => {
            if (curso.id === infoProducto.id) {
                curso.cantidad++;
            }
            return curso;
        });
    } else {
        articuloCarrito.push(infoProducto);
    }

    colocarEnCarrito();
}

// Función para colocar los productos en el carrito
function colocarEnCarrito() {
    limpiarhtml();

    articuloCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="eliminarProducto" data-id="${id}">X</a>
            </td>
        `;
        listaCarrito.appendChild(fila);
    });

    // Calcular y mostrar el total de la venta
    const totalVenta = calcularTotalVenta(); //funcion de calcular el total pasada a la const totalventa
    const filaTotal = document.createElement('tr'); //creando el elemento tr
    //Enviando a html con inner
    filaTotal.innerHTML = ` 
        <td colspan="3"></td>
        <td>Total:</td>
        <td>${totalVenta.toFixed(2)}</td>
    `;
    listaCarrito.appendChild(filaTotal);

    sincronizarStorage();
}

// Función para calcular el total de la venta
function calcularTotalVenta() {
    let total = 0;
    articuloCarrito.forEach(curso => {                                   //parsefloat sirve para convertir a numero 
        const precioNumerico = parseFloat(curso.precio.replace('$', ''));//replace me elimina el simbolo de dolar
        total += precioNumerico * curso.cantidad;
    });
    return total;
}

// Función para vaciar el carrito
function vaciarCarrito() {
    articuloCarrito = [];
    limpiarhtml();
    sincronizarStorage();
}

// Función para limpiar el HTML del carrito
function limpiarhtml() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

// Función para sincronizar el carrito con el Local Storage
function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articuloCarrito));
}


// Función para volver al principio de la página cuando se hace clic en el botón
function goToTop() {
    document.body.scrollTop = 0; // Para Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE y Opera
}




//---------------------------------------------temas

function setTheme(theme) {
    const root = document.documentElement;

    if (theme === 'light') {
        root.style.setProperty('--header', 'rgba(255, 255, 255, 0.868)');
        root.style.setProperty('--inputborder', '#000000 1px solid');
        root.style.setProperty('--inputplaceholder', 'rgba(139, 139, 139, 0.868)');
        root.style.setProperty('--button-register-iniciarsesion', 'rgb(0, 0, 0)');
        root.style.setProperty('--button-register-iniciar-letras', 'white');
        root.style.setProperty('--hoverbuttonregister', 'rgb(27, 127, 214)');
        root.style.setProperty('--background-main', 'rgb(255, 255, 255)');
        root.style.setProperty('--body', 'rgb(255, 255, 255)');
    } else if (theme === 'dark') {
        root.style.setProperty('--header', '#333');
        root.style.setProperty('--inputborder', '#fff 1px solid');
        root.style.setProperty('--inputplaceholder', 'rgba(255, 255, 255, 0.868)');
        root.style.setProperty('--button-register-iniciarsesion', '#fff');
        root.style.setProperty('--button-register-iniciar-letras', 'black');
        root.style.setProperty('--hoverbuttonregister', 'rgb(27, 127, 214)');
        root.style.setProperty('--background-main', '#222');
        root.style.setProperty('--body', '#000');
    } else if (theme === 'pastel') {
        root.style.setProperty('--header', '#B3E5FC');
        root.style.setProperty('--inputborder', '#FFD54F 1px solid');
        root.style.setProperty('--inputplaceholder', 'rgba(0, 0, 0, 0.6)');
        root.style.setProperty('--button-register-iniciarsesion', '#4DB6AC');
        root.style.setProperty('--button-register-iniciar-letras', '#FFF');
        root.style.setProperty('--hoverbuttonregister', '#FF8A65');
        root.style.setProperty('--background-main', '#FFE0B2');
        root.style.setProperty('--body', '#FFF');
    }
}


