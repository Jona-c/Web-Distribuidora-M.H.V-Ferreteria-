import '../style/Seccion1Carrito.css'
import { useCarrito } from '../context/CarritoContext'

const Seccion1Carrito = () => {
    const { items, quitarDelCarrito, cambiarCantidad } = useCarrito()

    const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    return (
        <section className="seccion1-carrito">
            <h2 className="carrito-titulo">🛒 Mi Carrito</h2>

            {items.length === 0 ? (
                <div className="carrito-box carrito-vacio">
                    <span>No hay productos en el carrito</span>
                </div>
            ) : (
                <>
                    <ul className="carrito-lista">
                        {items.map(item => (
                            <li className="carrito-item" key={item._id}>
                                <img
                                    src={item.imagen || 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop'}
                                    alt={item.nombre}
                                    className="carrito-item-imagen"
                                />
                                <div className="carrito-item-info">
                                    <h3 className="carrito-item-nombre">{item.nombre}</h3>
                                    <p className="carrito-item-codigo">Código: {item.codigo}</p>
                                    <p className="carrito-item-precio-unit">${item.precio} c/u</p>
                                </div>
                                <div className="carrito-item-controles">
                                    <button className="carrito-btn-cantidad" onClick={() => cambiarCantidad(item._id, item.cantidad - 1)}>−</button>
                                    <span className="carrito-item-cantidad">{item.cantidad}</span>
                                    <button className="carrito-btn-cantidad" onClick={() => cambiarCantidad(item._id, item.cantidad + 1)}>+</button>
                                </div>
                                <div className="carrito-item-subtotal">
                                    ${item.precio * item.cantidad}
                                </div>
                                <button className="carrito-btn-eliminar" onClick={() => quitarDelCarrito(item._id)} aria-label="Eliminar">✕</button>
                            </li>
                        ))}
                    </ul>

                    <div className="carrito-footer">
                        <span className="carrito-total-label">Total:</span>
                        <span className="carrito-total-precio">${total.toLocaleString('es-AR')}</span>
                        <button className="carrito-btn-comprar">Confirmar pedido</button>
                    </div>
                </>
            )}
        </section>
    )
}

export default Seccion1Carrito