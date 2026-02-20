import { useContext} from "react";
import { Routes, Route} from "react-router-dom";
import PaginaPrincipal from "../pages/PaginaPrincipal.tsx";
import InicioSesion from "../pages/InicioSesion.tsx";
import Registrarse from "../pages/Registrarse.tsx";
import NotFound from "../pages/NotFound.tsx";
import PaginaCliente from "../pages/PaginaCliente.tsx";
import Carrito from "../pages/Carrito.tsx";
import InformacionCliente from "../pages/InformacionCliente.tsx";
import{ AuthContext } from "../context/AuthContext.tsx";

//configurar las rutas de la aplicacion para mostrar diferentes componentes segun la ruta actual

const AppRouter = () => {
    const {user} = useContext(AuthContext);

    return (
        <Routes>
            <Route path="/" element={<PaginaPrincipal />} errorElement={<NotFound />} />
            <Route path="/Registrarse" element={<Registrarse />} errorElement={<NotFound />} />
            <Route path="/InicioSesion" element={<InicioSesion />} errorElement={<NotFound />} />
            {user ? (
                <>
                    <Route path="/PaginaCliente" element={<PaginaCliente />} errorElement={<NotFound />} />
                    <Route path="/Carrito" element={<Carrito />} errorElement={<NotFound />} />
                    <Route path="/InformacionCliente" element={<InformacionCliente />} errorElement={<NotFound />} />
                </>
            ) : null}
        </Routes>
    );
};

export default AppRouter;
        