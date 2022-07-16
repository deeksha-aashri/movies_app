import React, { Component } from "react";
// import { movies } from "./getMovies";
import axios from "axios";
import API_KEY from '../secrets'
export default class List extends Component {
  constructor(){
    super();
    this.state={
      hover:"",
      page_arr:[1],
      currPage:1,
      movies:[]
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
  
 async componentDidMount(){
  // console.log("checking");
  // console.log(API_KEY);
  let db_result=await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
  );
  // let data=db_result.data;
  // console.log(data);
  this.setState({
    movies:[...db_result.data.results]//.data to convert it into readable form and .result because result brings an object and we just need the key called results of it
  })
 }


render(){
  console.log("render working");
//  let movie=movies.results;
 return(
  <>
  <h2 className="text-center">Trending</h2>
  {this.state.movies.length ==0 ? (
  <div class="spinner-border text-info" role="status" >
  <span class="visually-hidden" style={{display:"flex" , justifyContent:"center"}}>Loading...</span>
   </div>
   ) :  

    (
    <div className="movies-list">
    {this.state.movies.map((movieObj)=> (
     <div 
     className="movie-card"
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
        {this.state.hover==movieObj.id &&  ( 
        <a href="#"  className="btn btn-info" >
          Add to favorite
          </a>)}
     
       </div>
   </div>
    )
    )}
    <div className="pagination">
   <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    <li className="page-item disabled">
      <a className="page-link">Previous</a>
    </li>
    <li className="page-item"><a className="page-link" href="#">1</a></li>
    {/* <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li> */}

{
                      this.state.page_arr.map(pageNum => (
                        <li class="page-item">
                          <a class="page-link" href="#">
                            {pageNum}
                          </a>
                        </li>
                      ))
                    }
    <li className="page-item">
      <a className="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>
</div>
  </div>
)}
   
  </>
 );
}
}


   
 