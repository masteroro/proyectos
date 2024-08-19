// Variables
const carrito = document.getElementById("carrito"),
      listaproductos = document.getElementById("lista-productos"),
      contenedorCarrito = document.querySelector('.buy-card .lista_de_productos'),
      vaciarCarritoBtn = document.querySelector('#vaciar_carrito'),
      baseURL = "http://localhost/web2/";

let articulosCarrito = [];

// Registrar eventos
document.addEventListener('DOMContentLoaded', function() {
    registrarEventsListeners();
    cargarCarrito();
});

// Función para registrar eventos
function registrarEventsListeners() {
    if (listaproductos) {
        listaproductos.addEventListener('click', agregarproducto);
    } else {
        console.error('Element "lista-productos" not found');
    }

    if (carrito) {
        carrito.addEventListener('click', eliminarproducto);
    } else {
        console.error('Element "carrito" not found');
    }

    if (vaciarCarritoBtn) {
        vaciarCarritoBtn.addEventListener('click', e => {
            articulosCarrito = [];
            localStorage.removeItem('carrito'); // Limpiar carrito en localStorage
            limpiarHTML();
        });
    } else {
        console.error('Element "vaciar_carrito" not found');
    }
}

// Función para agregar producto al carrito
function agregarproducto(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(productoSeleccionado);
    }
}

// Función para eliminar producto del carrito
function eliminarproducto(e) {
    if (e.target.classList.contains("borrar-producto")) {
        const productoId = e.target.getAttribute('data-id');
        
        // Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        // Guardar los cambios en localStorage
        localStorage.setItem('carrito', JSON.stringify(articulosCarrito));

        carritoHTML();
    }
}

// Función para leer información del producto
function leerInfo(producto) {
    // Crear un objeto con el contenido del producto actual
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.descuento').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    };

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);

    if (existe) {
        // Actualizar la cantidad
        articulosCarrito = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        });
    } else {
        // Agregar elemento al carrito de compras
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));

    carritoHTML();
}
//precio
function formatNumber(number, decimals = 0) {
    // Redondear el número a la cantidad deseada de decimales
    const fixedNumber = number.toFixed(decimals);
    
    // Separar el número en parte entera y decimal
    const [integerPart, decimalPart] = fixedNumber.split('.');
    
    // Agregar separadores de miles con puntos
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    // Devolver el número formateado con puntos como separadores de miles y coma decimal
    return decimalPart ? `${formattedIntegerPart},${decimalPart}` : formattedIntegerPart;
}
// Función para mostrar el carrito en el HTML
function carritoHTML() {
    limpiarHTML();
    let totalPrecio = 0;

    // Recorre el carrito de compras y genera el HTML
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('div');
        fila.classList.add('carrito-item');
        fila.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <p>${producto.titulo}</p>
            <p>${producto.precio}</p>
            <p>${producto.cantidad}</p>
            <p><span class="borrar-producto" data-id="${producto.id}">X</span></p>
        `;

        contenedorCarrito.appendChild(fila);
        const precioNumero = parseFloat(producto.precio.replace('$', '').replace('.', ''));
        totalPrecio += precioNumero * producto.cantidad;
    });

    // Actualizar el total del carrito en el HTML
    const totalPrecioElement = document.getElementById('total-precio');
    if (totalPrecioElement) {
        totalPrecioElement.innerText = `$${formatNumber(totalPrecio)}`;
    } else {
        console.error('Elemento "total-precio" no encontrado');
    }

    // Copiar el contenido de lista_de_productos a vista-productos
    const vistaProductos = document.getElementById('vista-productos');
    vistaProductos.innerHTML = contenedorCarrito.innerHTML;

}

// Función para limpiar el HTML del carrito
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        articulosCarrito = JSON.parse(carritoGuardado);
        carritoHTML();
    }
}

// Menu
$(document).ready(function() {
    $('#catalogoDropdown').on('click', function() {
        $('.dropdown-menu').toggle(); // Muestra/oculta el menú
    });

    $(document).on('click', function(event) {
        if (!$(event.target).closest('#catalogoDropdown, .dropdown-menu').length) {
            $('.dropdown-menu').hide(); // Oculta el menú si se hace clic fuera de él
        }
    });
});
