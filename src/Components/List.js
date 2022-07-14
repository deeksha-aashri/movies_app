import React, { Component } from "react";
import { movies } from "./getMovies";
export default class List extends Component {
  constructor(){
    super();
    this.state={
      hover:"",
    };
  }

  handleMouseEntering(id){
     this.setState({
       hover:id
     })
  };

  handleMouseLeaving(){
    this.setState({
      hover:""
    })
  };
render(){
  
 let movie=movies.results;
 return(
  <>
  <h2 className="text-center">Trending</h2>
  {movie.length ===0 ? 
  <div class="spinner-border text-info" role="status">
  <span class="visually-hidden">Loading...</span>
   </div>
  :
  <div className="movies-list">
    {movie.map((movieObj)=>
     <div className="movie-card"
     onMouseEnter={()=>{this.handleMouseEntering(movieObj.id)}}
     onMouseLeave={this.handleMouseLeaving}
     >
     <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
     className="card-img-top banner-img"
     alt="movie poster here"
     style={{height:"40vh"}}
     ></img>
     <h5 className="movie-title card-title">{movieObj.original_title}</h5>
     <div className="button-wrapper">
        {this.state.hover==movieObj.id &&   <button type="button" className="btn btn-info">Add to favorite</button>
        }
     
       </div>
   </div>
    )}
   
    
  </div>
}
   
  </>
 )
}
}


   
 