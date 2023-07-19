import { useLoaderData } from "@remix-run/react";

import { obtenerPost } from "~/models/posts.server";
import { formatearFecha } from '~/utils/helpers';

import blogStyles from '~/styles/blog.css'

export function meta({ data }) { // Data contiene lo pasado por el loader

    return [
        { title: `GuitarLA - ${data.data[0].attributes.titulo}` },
        { description: `Guitarras, venta de guitarras, ${data.data[0].attributes.titulo}` }
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

export async function loader({ params }) {

    const { postUrl } = params;
    const post = await obtenerPost(postUrl);

    // Si no existe la guitarra, tirar error
    if (post.data.length === 0) {

        throw new Response('', {
            status: 404,
            statusText: 'Entrada no encontrada'
        });

    }

    return post;

}

function Post() {

    const post = useLoaderData();
    const { titulo, contenido, imagen, publishedAt } = post.data[0]?.attributes;

    return (
        <article className="contenedor post mt-3">
            <img
                className="imagen"
                src={imagen?.data.attributes.url}
                alt={`Imagen Post ${titulo}`}
            />
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="texto">{contenido}</p>
            </div>
        </article>
    )
}

export default Post