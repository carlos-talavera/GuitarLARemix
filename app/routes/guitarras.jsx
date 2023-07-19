import { useLoaderData, Outlet } from '@remix-run/react'
import { obtenerGuitarras } from "~/models/guitarras.server"
import ListadoGuitarras from '~/components/listado-guitarras'
import listadoStyles from '~/styles/guitarras.css'

export function meta() {

  return [
    { title: 'GuitarLA - Tienda de Guitarras' },
    { description: 'Nuestra colección de guitarras' }
  ]

}

export function links() {

  return [
    {
      rel: 'stylesheet',
      href: listadoStyles
    }
  ]

}

export async function loader() { // Ejecutar al cargar el componente

  const guitarras = await obtenerGuitarras();
  return guitarras.data;

}

function Tienda() {

  const guitarras = useLoaderData();

  return (
    <main className="contenedor">
      <ListadoGuitarras
        guitarras={guitarras}
      />

      <Outlet />
    </main>
  )
}

export default Tienda