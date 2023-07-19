// Obtener entradas de blog
export async function obtenerPosts() {

    const respuesta = await fetch(`${process.env.API_URL}/posts/?populate=imagen`);
    const resultado = await respuesta.json();
    return resultado;

}

// Obtener una entrada de blog
export async function obtenerPost(url) {

    const respuesta = await fetch(`${process.env.API_URL}/posts/?filters[url]=${url}&populate=imagen`);
    const resultado = await respuesta.json();
    return resultado;

}