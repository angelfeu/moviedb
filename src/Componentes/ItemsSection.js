import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import GridItem from './GridItem'
import ListItem from './ListItem'
import Detalle from './Detalle'

const ItemsSection = ({ Items, Vista, Tipo, Agregar, Quitar, Visto }) => { // Agregar, Quitar, Visto
    const buildAgregar = (Item) => {
      if (!Agregar) {
        return false
      }
      return () => Agregar(Item.id, Tipo === 'peliculas' ? Item.title : Item.name, Tipo === 'peliculas' ? Item.release_date : Item.first_air_date, Item.overview, Item.backdrop_path, false)
    }
    const buildQuitar = (Item) => {
      if (!Quitar) {
        return false
      }
      return () => Quitar(Item.id)
    }
    const buildVisto = (Item) => {
      if (!Visto) {
        return false
      }
      return () => Visto(Item.id)
    }

    return (
      <section className="items-section">
        <div className="items-section-body">
          <div className="row">
            {Items.map(item =>
              Vista === 'list'
                    ? <GridItem
                        key={item.id}
                        Id={item.id}
                        Type={ Tipo === 'peliculas' ? 'movie' : 'tv' }
                        Name={ Tipo === 'peliculas' ? item.title : item.name }
                        Date={ Tipo === 'peliculas' ? item.release_date : item.first_air_date }
                        Img={item.backdrop_path}
                      />
                    : <ListItem
                        key={item.id}
                        Id={item.id}
                        Type={ Tipo === 'peliculas' ? 'movie' : 'tv' }
                        Name={ Tipo === 'peliculas' ? item.title : item.name }
                        Overview={item.overview}
                        Img={item.backdrop_path}
                      //  click={() => Agregar(item.id, Tipo === 'peliculas' ? item.title : item.name, Tipo === 'peliculas' ? item.release_date : item.first_air_date, item.overview, item.backdrop_path, false)}
                        Agregar={buildAgregar(item)}
                        Quitar={buildQuitar(item)}
                        Visto={buildVisto(item)}
                      />
            )}
          </div>
          <Route path={`/detalle/:tipo/:id/:name`} component={Detalle} />
        </div>
      </section>
    );
}

ItemsSection.propTypes = {
  Items : PropTypes.array.isRequired,
  // Items : PropTypes.arrayOf(
  //   PropTypes.shape(
  //     name: PropTypes.string.isRequired,
  //     image: PropTypes.string.isRequired,
  //   )
  // ).isRequired,
  Vista : PropTypes.oneOf(['grid', 'list']),
  Tipo : PropTypes.oneOf(['peliculas', 'series', 'milista']),
}

ItemsSection.defaultProps = {
  Items : [],
  Vista : "grid",
}

export default ItemsSection;
