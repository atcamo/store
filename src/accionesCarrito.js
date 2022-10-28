import { actualizarTotalesCarrito } from './actualizarCarrito.js';
import { obtenerCarritoStorage } from './storage.js';
import { productos } from './stock.js';

let carrito = [];

const validarProductoRepetido = (productoId) => {

    localStorage.getItem('carrito') ? carrito = obtenerCarritoStorage()  : alert ("intentelo otra vez");  /*operador ternario*/
    

    const productoRepetido = carrito.find(producto => producto.id === productoId);

    if (productoRepetido) {
        productoRepetido.cantidad++  /*operador avanzado*/
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidadProducto.innerText = `cantidad: ${productoRepetido.cantidad}`;
        actualizarTotalesCarrito(carrito);

    } else {
        agregarAlCarrito(productoId);
    }
};

const agregarAlCarrito = (productoId) => {
    const contenedor = document.getElementById('carrito-contenedor');
    const producto = productos.find(producto => producto.id === productoId);
    carrito.push(producto);

    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');
    div.innerHTML = `<p>${producto.nombre}</p>
                    <p>Precio: ${producto.precio}</p>
                    <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                    <button id=eliminar${producto.id} value='${producto.id}' class='btn waves-effect waves-ligth boton-eliminar' >X</button>
                    `;
    contenedor.appendChild(div);
    actualizarTotalesCarrito(carrito);
};

// pintarCarrito recibe por parámetro un array de objetos
const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p>${producto.nombre}</p>
                        <p>Precio: ${producto.precio}</p>
                        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
                        <button id=eliminar${producto.id} value='${producto.id}' class='btn waves-effect waves-ligth boton-eliminar'>X</button>
                        `;
        contenedor.appendChild(div);
    });
};

const eliminarProductoCarrito = (productoId) => {
    const carritoStorage = obtenerCarritoStorage();
    
    Swal.fire({
                text: 'Va a eliminar el producto!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Eliminar',
                cancelButtonText: 'Cancelar',
                title: 'Esta seguro?'
// confirmar eliminacion

            }).then((result) => {
                if (result.isConfirmed) {
                            
                Swal.fire(
                'Eliminado!',
                'El producto ha sido eliminado.',
                'success');

                    actualizarTotalesCarrito(carritoActualizado);
                    pintarCarrito(carritoActualizado) ;   }      
                 });
        const carritoActualizado = carritoStorage.filter(producto => producto.id != productoId);

};

export { agregarAlCarrito, validarProductoRepetido, pintarCarrito, eliminarProductoCarrito };