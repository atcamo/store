import { validarProductoRepetido } from "./src/accionesCarrito.js";

const mostrarProductos = (productos) => {
  const contenedorProductos = document.getElementById("producto-contenedor");

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML += `<div class="card-image">
                        <img src=${producto.img}>
                        <span class="card-title">${producto.nombre}</span>
                        <a class="btn-floating halfway-fab wabes-effect waves-light green" id=boton${producto.id}><i class="material-icons">add_shopping_cart</i></a>
                      </div>
                      <div class="card-content">
                          <p>Tipo: ${producto.tipo}</p>
                          <p>${producto.precio} BTC</p>
                      </div>
                     `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener('click', () => {
      validarProductoRepetido(producto.id);
      Swal.fire({
        position: 'mid-end',
        icon: 'success',
        title: 'Se agrego un produto a su carro',
        showConfirmButton: false,
        timer: 1500
      })

    })
  });
};

export { mostrarProductos };