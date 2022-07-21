import React, { Component } from 'react'
import { Link } from "react-router-dom";
export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:'flex', background:"linear-gradient(#c50404, white)" , padding:'1rem', justifyContent:"center", alignItems:"center"}}>
           <Link to="/" style={{textDecoration:"none", color:"black"}}><h1>Home</h1></Link> 
            <Link to="/fav" style={{textDecoration:"none", color:"black"}}><h2 style={{marginLeft:"2rem",}}>Favourites</h2></Link>
      </div>
    )
  }
}