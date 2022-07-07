import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
        <div style={{display:'flex', background:"linear-gradient(#e66466, #9198e5)" , padding:'1rem', justifyContent:"center", alignItems:"center"}}>
            <h1>Home</h1>
            <h2 style={{marginLeft:"2rem",}}>Favourites</h2>
      </div>
    )
  }
}