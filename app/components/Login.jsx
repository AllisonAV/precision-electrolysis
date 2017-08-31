import React from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'

const auth = firebase.auth()

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.emailSubmit = this.emailSubmit.bind(this)
  }
  componentDidMount() {
    window.loggedIn=false
    auth && this.setState({ user: auth.currentUser })
  }

  setEmailPassword = (evt) => {
    evt.preventDefault()
    this.setState({ [evt.target.id]: evt.target.value })
  }

  emailSubmit = (evt) => {
    evt.preventDefault()
    if (this.state.email.length && this.state.password.length) {
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
          window.loggedIn=true
          browserHistory.push('/barbaraedit')
        })
        .catch(error => {
          window.alert(error)
        })
    } else {
      window.alert('Please fill in both your email and password')
    }
  }

  render() {
    const auth = firebase.auth()
    const email = new firebase.auth.EmailAuthProvider()

    return (
      <div id="background-div">
        <div className="jumbotron login-container" >
          <form onSubmit={this.emailSubmit}
                className="form-horizontal">
            <div className="form-group">
              <input type="text"
                     className="login form-control"
                     id="email"
                     placeholder="Email"
                     onChange={this.setEmailPassword} />
            </div>
            <div className="form-group">
              <input type="password"
                     className="form-control"
                     id="password"
                     placeholder="Password"
                     onChange={this.setEmailPassword} />
            </div>
            <div className="form-group">
              <button type="submit"
                      className="login btn btn-primary btn-login"
                      onClick={this.emailSubmit}>
                <span className='glyphicon glyphicon-envelope'/>
                {'       Login with Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
