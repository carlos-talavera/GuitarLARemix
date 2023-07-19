import { useOutletContext } from '@remix-run/react'
import { ClientOnly } from 'remix-utils'
import carritoStyles from '~/styles/carrito.css'

export function links() {

    return [
        {
            rel: 'stylesheet',
            href: carritoStyles
        }
    ]

}

export function meta() {

    return [
        { title: 'GuitarLA - Carrito de Compras' },
        { description: 'Venta de guitarras, música, blog, carrito de compras, tienda' }
    ]

}

function Carrito() {

  const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext();

  const calcularTotal = () => {

    return carrito?.reduce((total, producto) => total + producto.cantidad * producto.precio, 0);

  }

  return (
    <ClientOnly fallback={<h1>Cargando...</h1>}>
        {() => (
            <main className="contenedor">
                <h1 className="heading">Carrito de Compras</h1>

                <div className="contenido">
                    <div className="carrito">
                        <h2>Artículos</h2>

                        {carrito?.length === 0 ? 'Carrito Vacío' : (
                            carrito?.map(producto => (
                                <div
                                    key={producto.id}
                                    className="producto"
                                >
                                    <div>
                                        <img
                                            src={producto.imagen}
                                            alt={`Imagen Producto ${producto.nombre}`}
                                        />
                                    </div>

                                    <div>
                                        <p className="nombre">{producto.nombre}</p>
                                        <p>Cantidad:</p>
                                        <select
                                            value={producto.cantidad}
                                            className="select"
                                            onChange={e => actualizarCantidad({
                                                cantidad: Number(e.target.value),
                                                id: producto.id
                                            })}
                                        >
                                            <option value="">-- Seleccione --</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                        <p className="precio">$<span>{producto.precio}</span></p>
                                        <p className="subtotal">Subtotal: $<span>{producto.precio * producto.cantidad}</span></p>
                                    </div>

                                    <button
                                        type="button"
                                        className="btn-eliminar"
                                        onClick={() => eliminarGuitarra(producto.id)}
                                    >X</button>
                                </div>
                            ))
                        )}
                    </div>

                    <aside className="resumen">
                        <h3>Resumen del Pedido</h3>
                        <p>Total a pagar: ${calcularTotal()}</p>
                    </aside>
                </div>
            </main>
        )}
    </ClientOnly>
  )
}

export default Carrito