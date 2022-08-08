import React, { Component } from "react";

import axios from "axios";
import API_KEY from '../secrets'
export default class List extends Component {
  constructor(){
    super();
    this.state={
      hover:"",
      page_arr:[1],
      currPage:1,
      movies:[],
      favMov:[]
    };
  }

  handleMouseEntering(id){
     this.setState({
       hover:id
     })
  };

  handleMouseLeaving=()=>{
    this.setState({
      hover:""
    })
  };
  
changeMovies= async ()=>{
  let db_result=await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
  )
  this.setState({
    movies:[...db_result.data.results]
  })
}

handleNext=()=>{
  let temp=[];
  for(let i=0;i<this.state.page_arr.length ;i++){
     temp.push(i+1);//[1,2]
  }
  this.setState({
    page_arr:[...temp],
    currPage:this.state.currPage + 1,
  },this.changeMovies)
}


handlePrevious=()=>{
  if(this.state.currPage!=1){
  this.setState({
    currPage:this.state.currPage-1
  },this.changeMovies)
}
}
 
handlePageNum=(pageNum)=>{
  this.setState({
    currPage : pageNum
  },this.changeMovies)
}


handleFavourites = (movieObj) => { //jurassic park
  let localStorageMovies = JSON.parse(localStorage.getItem("movies")) || [];

  if (this.state.favMov.includes(movieObj.id)) {
    localStorageMovies = localStorageMovies.filter(
      (movie) => movie.id != movieObj.id
    );
  }
  else localStorageMovies.push(movieObj);
   console.log(localStorageMovies);

   //Now we finally update our local storage after all the deletion and addition
  localStorage.setItem("movies", JSON.stringify(localStorageMovies));
  let tempData = localStorageMovies.map(movieObj => movieObj.id);
  this.setState({
    favMov: [...tempData]
  });
}
 async componentDidMount(){
  
  let db_result=await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currPage}`
  );
  
  this.setState({
    movies:[...db_result.data.results]//.data to convert it into readable form and .result because result brings an object and we just need the key called results of it
  })
 }


render(){

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
        <a  className="btn btn-danger"  onClick={()=>this.handleFavourites(movieObj)}>
         {this.state.favMov.includes(movieObj.id)?"Remove from watchlist":"Add to watchlist"}
          </a>)}
     
       </div>
   </div>
    )
    )}
    <div className="pagination">
    <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" onClick={this.handlePrevious}>
                      Previous
                    </a>
                  </li>
                  {this.state.page_arr.map((pageNum) => (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => {
                          this.handlePageNum(pageNum);
                        }}
                      >
                        {pageNum}
                      </a>
                    </li>
                  ))}
                  <li class="page-item">
                    <a class="page-link" onClick={this.handleNext}>
                      Next
                    </a>
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


   
 