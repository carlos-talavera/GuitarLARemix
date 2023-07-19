// Obtener todas las guitarras
export async function obtenerGuitarras() {

    const respuesta = await fetch(`${process.env.API_URL}/guitarras/?populate=imagen`);
    const resultado = await respuesta.json();
    return resultado;

}

// Obtener solo una guitarra
export async function obtenerGuitarra(url) {

    const respuesta = await fetch(`${process.env.API_URL}/guitarras/?filters[url]=${url}&populate=imagen`);
    const resultado = await respuesta.json();
    return resultado;

}