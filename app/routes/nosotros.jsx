import imagen from '../../public/img/nosotros.jpg'
import nosotrosStyles from '../styles/nosotros.css'

export function meta() {

  return [
    { title: 'GuitarLA - Sobre Nosotros' },
    { description: 'Venta de guitarras, blog de música' }
  ]

}

export function links() {

  return [
    {
      rel: 'stylesheet',
      href: nosotrosStyles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]

}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img
          src={imagen}
          alt="Imagen Nosotros"
        />

        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, alias. Optio cum voluptatibus earum quo esse, pariatur perferendis quod reprehenderit libero nihil, dolorum aut deleniti nam natus illo illum inventore.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, alias. Optio cum voluptatibus earum quo esse, pariatur perferendis quod reprehenderit libero nihil, dolorum aut deleniti nam natus illo illum inventore.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros