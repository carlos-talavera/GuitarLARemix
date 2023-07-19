import { useLoaderData } from '@remix-run/react';
import { obtenerGuitarras } from '~/models/guitarras.server'
import { obtenerPosts } from '~/models/posts.server'
import { obtenerCurso } from '~/models/curso.server'
import ListadoGuitarras from '~/components/listado-guitarras'
import ListadoPosts from '~/components/listado-posts'
import Curso from '~/components/curso'

import guitarrasStyles from '~/styles/guitarras.css'
import blogStyles from '~/styles/blog.css'
import cursoStyles from '~/styles/curso.css'

export function meta() {

  return [
    { title: 'GuitarLA - Inicio' },
    { description: 'GuitarLA'}
  ]

}

export function links() {

  return [
    {
      rel: 'stylesheet',
      href: guitarrasStyles
    },
    {
      rel: 'stylesheet',
      href: blogStyles
    },
    {
      rel: 'stylesheet',
      href: cursoStyles
    }
  ]

}

export async function loader() {

  const [ guitarras, posts, curso ] = await Promise.all([obtenerGuitarras(), obtenerPosts(), obtenerCurso()]); // Ejecutar asíncronamente para que sea más eficiente

  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  }

}

function Index() {

  const { guitarras, posts, curso } = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras
          guitarras={guitarras}
        />
      </main>

      <Curso
        curso={curso.attributes}
      />

      <section className="contenedor">
        <ListadoPosts
          posts={posts}
        />
      </section>
    </>
  )
}

export default Index