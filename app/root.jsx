import { useEffect, useState } from 'react'
// Importar componentes de remix para las etiquetas <meta> y <link> en el head y demás
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useRouteError,
    isRouteErrorResponse,
    Link
} from '@remix-run/react'
import styles from '~/styles/index.css' // Usar paths del tsconfig.json

import Header from '~/components/header'
import Footer from '~/components/footer'

// Etiquetas meta en el head
export function meta() {

    return [
        { charset: 'utf8' },
        { title: 'GuitarLA - Remix' },
        { viewport: 'width=device-width, initial-scale=1' }
    ]

}

// Etiquetas link en el head
export function links() {

    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]

}

export default function App() {

    const carritoLS = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem('carrito')) ?? [] : [];
    const [carrito, setCarrito] = useState(carritoLS);

    useEffect(() => {

        localStorage.setItem('carrito', JSON.stringify(carrito));

    }, [carrito]);

    const agregarCarrito = guitarra => {

        // Revisar si el elemento está duplicado
        const posicionDuplicado = carrito.findIndex(guitarraState => guitarraState.id === guitarra.id);

        // Actualizar
        if (posicionDuplicado !== -1) {

            // Revisar que haya un cambio en la cantidad para evitar operaciones innecesarias
            if (guitarra.cantidad !== carrito[posicionDuplicado].cantidad) {

                const carritoActualizado = [...carrito];
                carritoActualizado[posicionDuplicado].cantidad = guitarra.cantidad;
                setCarrito(carritoActualizado);

            }

        } else { // Agregar

            setCarrito([...carrito, guitarra]);

        }

    }

    // Actualizar la cantidad para una guitarra en específico
    const actualizarCantidad = guitarra => {

        const carritoActualizado = carrito?.map(guitarraState => {

            if (guitarraState.id === guitarra.id) {

                guitarraState.cantidad = guitarra.cantidad;

            }

            return guitarraState;

        });

        setCarrito(carritoActualizado);

    }

    // Eliminar una guitarra del carrito
    const eliminarGuitarra = id => {

        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id);

        setCarrito(carritoActualizado);

    }

    return(
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )

}

function Document({children}) {

    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )

}

/** Manejo de errores */

export function ErrorBoundary() {

    const error = useRouteError();

    if (isRouteErrorResponse(error)) {

        return (
            <Document>
                <p className="error">
                    {error.status} {error.statusText}
                </p>
                <Link
                    to="/"
                    className="error-enlace"
                >Tal vez quieras volver a la página principal</Link>
            </Document>
        );

    }

}