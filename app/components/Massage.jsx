import React from 'react'
import firebase from 'APP/fire'
const db = firebase.database()

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      about: '',
      rates: {}
    }
  }

  componentWillMount() {
    // read rates from database
    let massageRef = db.ref('massage')
    massageRef.once('value')
    .then((snapshot) => {
      this.setState({rates: snapshot.val()})
    })
    .catch(error => console.log(error))

    // read about from database
    massageRef = db.ref('massageParagraph')
    console.log('befroe get about')
    massageRef.once('value')
    .then((snapshot) => {
      this.setState({about: snapshot.val()})
      console.log('state should be set', snapshot.val())
    })
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div>
        <h1 className="center-h1">{this.state.about}</h1>
        <hr />
        <div className="well">
      {
        this.state.rates && Object.keys(this.state.rates).map(key => {
          return (
          <div key={key}
               className="flex-container">
            <div className="rates">{key} Minutes
            </div>
            <div className="rates">${this.state.rates[key]}
            </div>
          </div>
          )
        })
      }
        </div>
      </div>
    )
  }
}
