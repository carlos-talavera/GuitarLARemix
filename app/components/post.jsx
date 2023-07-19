import { Link } from "@remix-run/react";

import { formatearFecha } from "~/utils/helpers";

function Post({post}) {

  const { titulo, contenido, imagen, url, publishedAt } = post;

  return (
    <article className="post">
        <img 
            className="imagen"
            src={imagen.data.attributes.formats.small.url}
            alt={`Imagen Post ${titulo}`}
        />
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="resumen">{contenido}</p>
            <Link
                to={`/posts/${url}`}
                className="enlace"
            >Leer Entrada</Link>
        </div>
    </article>
  )
}

export default Post