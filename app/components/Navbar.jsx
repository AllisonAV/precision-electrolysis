import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (

  <nav className="navbar navbar-default navbar-fixed-top">
      <div >
        <span className="name">Precision Electrolysis</span>
        <ul className="nav navbar-right navbar-nav">
          <li>
            <Link to="/about"
              className="navbar-brand">About</Link>
          </li>
          <li>
            <Link to="/eyelash">Eyelashes</Link>
          </li>
          <li>
            <Link to="/electrolosys">Electrolysis</Link>
          </li>
          <li>
            <Link to="/massage">Massage</Link>
          </li>
        </ul>
      </div>
  </nav>
    )
  }
}
