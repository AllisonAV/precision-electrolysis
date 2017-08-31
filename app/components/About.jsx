import React from 'react'
import firebase from 'APP/fire'
const db = firebase.database()

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paragraph1: '',
      paragraph2: '',
      paragraph3: ''
    }
  }
  componentWillMount() {
    let ref = db.ref('paragraph1')
    ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        this.setState({paragraph1: snapshot.val()})
      }
    })
    ref = db.ref('paragraph2')
    ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        this.setState({paragraph2: snapshot.val()})
      }
    })
    ref = db.ref('paragraph3')
    ref.on('value', (snapshot) => {
      if (snapshot.val()) {
        this.setState({paragraph3: snapshot.val()})
      }
    })
  }

  render() {
    return (
      <div className="well">
        <div className="flex-container">
          <div className="well">
            <img src="barbara.jpg"/>
            <h3>Call to make an appointment</h3>
            <h3>(201) 507-1886</h3>
          </div>
          <div className="well">
            <h3>{this.state.paragraph1}</h3>
            <h3>{this.state.paragraph2}</h3>
            <h3>{this.state.paragraph3}</h3>
          </div>
        </div>
      </div>

    )
  }
}
