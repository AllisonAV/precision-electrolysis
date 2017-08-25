import React from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      about: '',
      electrolsys: {},
      eyelash: {},
      massage: {}
    }
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
    console.log('STATE', this.state)
  }

  saveAboutData = () => {
    const aboutRef = db.ref('about/')
    aboutRef.set(this.state.about)
      .then((snapshot) => {
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
    <div>
      <h1>Hello Barbara!</h1>
      <form>
        <h2>Please enter in some info about yourself</h2>
        <input
          type="text"
          className="form-control"
          name="about"
          onChange={this.handleInput}/>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.saveAboutData}/>

      </form>
    </div>
    )
  }
}
