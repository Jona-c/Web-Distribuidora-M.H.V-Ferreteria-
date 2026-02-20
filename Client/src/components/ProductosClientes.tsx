import { useEffect, useState } from 'react'
import '../style/ProductosClientes.css'
import { getProductos } from '../api/getProductos';
import { useCarrito } from '../context/CarritoContext';

const ProductosClientes = ({ vista = 'grilla', categoria = null, busqueda = '' }: { vista?: 'grilla' | 'lista', categoria?: string | null, busqueda?: string }) => {
    const [productos, setProductos] = useState([]);
    const [cantidades, setCantidades] = useState<{ [id: string]: number }>({});
    const [pagina, setPagina] = useState(1);
    const limite = 6;
    const { agregarAlCarrito } = useCarrito();

    const construirUrl = (pag: number, cat: string | null, bus: string) => {
        let url = `http://localhost:5000/api/ObtenerProductosPaginados?page=${pag}&limit=${limite}`
        if (cat) url += `&categoria=${encodeURIComponent(cat)}`
        if (bus) url += `&busqueda=${encodeURIComponent(bus)}`
        return url
    }

    useEffect(() => {
        setPagina(1)
    }, [categoria, busqueda])

    useEffect(() => {
        getProductos(construirUrl(pagina, categoria, busqueda))
            .then(({ results }) => {
                setProductos(results)
                const inicial: { [id: string]: number } = {}
                results.forEach((p: any) => { inicial[p._id] = 1 })
                setCantidades(inicial)
            })
            .catch(console.error)
    }, [pagina, categoria, busqueda])

    const formatearFecha = (fecha: string) =>
        fecha ? new Date(fecha).toLocaleDateString('es-AR') : '–'

    const aumentar = (id: string) =>
        setCantidades(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }))

    const disminuir = (id: string) =>
        setCantidades(prev => ({ ...prev, [id]: Math.max((prev[id] || 1) - 1, 1) }))

    return (
        <main className="seccion-productos">
            <h2 className="titulo-productos">
                {categoria ? `Categoría: ${categoria}` : 'Todos los Productos'}
            </h2>

            <div className={vista === 'grilla' ? 'grid-productos' : 'lista-productos'}>
                {productos.map((p: any, i: number) => (
                    <div className="tarjeta-producto" key={p._id || i}>
                        <div className="contenedor-imagen-producto">
                            <img
                                src={p.imagen || 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop'}
                                alt={p.nombre || 'Producto'}
                                className="imagen-producto"
                            />
                            <div className="fecha-actualizacion">{formatearFecha(p.fecha_actualizacion)}</div>
                            <div className={`insignia-stock ${p.en_stock ? 'en-stock' : 'sin-stock'}`}>{p.en_stock ? '✓' : '✕'}</div>
                        </div>
                        <div className="info-producto">
                            <h3 className="nombre-producto">{p.nombre || 'Sin nombre'}</h3>
                            <p className="codigo-producto">Código: {p.codigo || '–'}</p>
                            <div className="pie-producto">
                                <span className="precio-producto">${p.precio || '0.00'}</span>
                                <div className="controles-carrito">
                                    <div className="controles-cantidad">
                                        <button className="btn-cantidad btn-cantidad--decrease" onClick={() => disminuir(p._id)} aria-label="Disminuir">−</button>
                                        <span className="numero-cantidad">{cantidades[p._id] || 1}</span>
                                        <button className="btn-cantidad btn-cantidad--increase" onClick={() => aumentar(p._id)} aria-label="Aumentar">+</button>
                                    </div>
                                    <button
                                        className="btn-carrito"
                                        onClick={() => agregarAlCarrito(p, cantidades[p._id] || 1)}
                                        aria-label="Agregar al carrito"
                                    >🛒</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="paginacion-productos">
                <button className="btn-paginacion" onClick={() => setPagina(p => Math.max(p - 1, 1))} disabled={pagina === 1}>
                    Anterior
                </button>
                <span className="pagina-paginacion">{pagina}</span>
                <button className="btn-paginacion btn-paginacion--primario" onClick={() => setPagina(p => p + 1)} disabled={productos.length < limite}>
                    Siguiente
                </button>
            </div>
        </main>
    )
}

export default ProductosClientes