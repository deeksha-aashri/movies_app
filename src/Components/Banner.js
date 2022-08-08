import React, { Component } from 'react'
// import { movies } from './getMovies'
import axios from 'axios';
import API_KEY from '../secrets';
export default class Banner extends Component {
  constructor() {
    super();
    this.state = {
        movies:[]
    }
}

async componentDidMount(){
  
  let db_result=await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
  );
  
  this.setState({
    movies:[...db_result.data.results]//.data to convert it into readable form and .result because result brings an object and we just need the key called results of it
   
  })
 }
  
  render() {
        
        return (
          <>
            {this.state.movies == "" ? (              //while data is not fetched 
              <div className="spinner-border text-danger " role="status" >
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="card banner-card">
                <img
                  src={`https://image.tmdb.org/t/p/original${this.state.movies[1].backdrop_path}`}
                  className="card-img-top banner-img"
                  alt="..."
                />
                
                <h5 className="card-title banner-title">
                  {this.state.movies[1].original_title}
                </h5>
                <p className="card-text banner-text">{this.state.movies[1].overview}</p>
               
              </div>
            )}
          </>
        );
  }
}