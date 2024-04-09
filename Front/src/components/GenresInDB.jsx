import React, { Component } from 'react'
import { Genre } from './Genre'

export class GenresInDb extends Component {
  constructor() {
    super()
    this.state = {
      genresList: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/api/categories')
      .then(res => res.json())
      .then(genres => this.setState({ genresList: genres.data }))
      .catch(error => console.log(error.message))
  }

  render() {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Categorias en la Base de Datos</h5>
          </div>
          <div className="card-body">
            <div className="row">

              {this.state.genresList.map((genre) => {
                return <Genre
                  key={genre.id}
                  name={genre.categoria}
                />

              })}

            </div>
          </div>
        </div>
      </div>
    )
  }
}
