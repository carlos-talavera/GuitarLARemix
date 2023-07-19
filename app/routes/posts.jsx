import { useLoaderData, Outlet } from '@remix-run/react'
import ListadoPosts from '~/components/listado-posts';
import { obtenerPosts } from '~/models/posts.server';
import blogStyles from '~/styles/blog.css'

export function meta() { // Data contiene lo pasado por el loader

  return [
    { title: 'GuitarLA - Nuestro Blog' },
    { description: 'GuitarLA, Blog de música y venta de guitarras' }
  ]

}

export function links() {

  return [
    {
      rel: 'stylesheet',
      href: blogStyles
    }
  ]

}
 
export async function loader() {

  const posts = await obtenerPosts();
  return posts.data;

}

function Blog() {

  const posts = useLoaderData();

  return (
    <div className="contenedor">
      <ListadoPosts
        posts={posts}
      />

      <Outlet />
    </div>
  )
}

export default Blog