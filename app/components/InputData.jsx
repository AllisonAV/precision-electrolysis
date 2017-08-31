import React from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()
const auth = firebase.auth()

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      paragraph1: '',
      paragraph2: '',
      paragraph3: '',
      time: '',
      rate: '',
      Initial: '',
      Fillin: '',
      eyelash: {},
      electrolysis: {},
      massage: {},
      eyelashParagraph: '',
      electrolysisParagraph: '',
      massasgeParagraph: ''
    }
  }

  componentWillMount() {
  //   // load eyelash data if it exists
    this.readEyelashData()
    this.readElectrolysisData()
    this.readMassageData()
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  readEyelashData = () => {
    const eyelashRef = db.ref('eyelash')
    eyelashRef.once('value')
    .then((snapshot) => {
      this.setState({eyelash: snapshot.val()})
    })
    .catch(error => console.log(error))
  }

  readElectrolysisData = () => {
    const electrolysisRef = db.ref('electrolysis')
    electrolysisRef.once('value')
    .then((snapshot) => {
      this.setState({electrolysis: snapshot.val()})
    })
    .catch(error => console.log(error))
  }

  readMassageData = () => {
    const massageRef = db.ref('massage')
    massageRef.once('value')
    .then((snapshot) => {
      this.setState({massage: snapshot.val()})
    })
    .catch(error => console.log(error))
  }

  deleteItem = (e) => {
    // delete item
    const deleteItem = e.target.getAttribute('data-item')
    db.ref(deleteItem).remove()
    // reread data in database and refresh screen
    const item = deleteItem.slice(0, deleteItem.indexOf('/'))
    switch (item) {
    case 'eyelash' : this.readEyelashData()
      break
    case 'electrolysis' : this.readElectrolysisData()
      break
    case 'massage' : this.readMassageData()
      break
    }

    this.closeModal2(item)
  }

  saveAboutData = () => {
    if (auth && auth.currentUser) {
      if (this.state.paragraph1) {
        const aboutRef = db.ref('paragraph1/')
        aboutRef.set(this.state.paragraph1)
          .catch(error => console.log(error))
      }
      if (this.state.paragraph2) {
        const aboutRef = db.ref('paragraph2/')
        aboutRef.set(this.state.paragraph2)
          .catch(error => console.log(error))
      }
      if (this.state.paragraph3) {
        const aboutRef = db.ref('paragraph3/')
        aboutRef.set(this.state.paragraph3)
          .catch(error => console.log(error))
      }
    } else {
      window.alert('Nice Try! Only Barbara can update data!')
    }
  }

  saveDescData = () => {
    if (auth && auth.currentUser) {
      if (this.state.eyelashParagraph) {
        const descRef = db.ref('eyelashParagraph/')
        descRef.set(this.state.eyelashParagraph)
        .catch(error => console.log(error))
      }
      if (this.state.electrolysisParagraph) {
        const descRef = db.ref('electrolysisParagraph/')
        descRef.set(this.state.electrolysisParagraph)
        .catch(error => console.log(error))
      }
      if (this.state.massageParagraph) {
        const descRef = db.ref('massageParagraph/')
        descRef.set(this.state.massageParagraph)
        .catch(error => console.log(error))
      }
    }
  }

  saveElectrolysisRates = (e) => {
    if (auth && auth.currentUser) {
      const electrolysisRef = db.ref('electrolysis/' + this.state.time)
      electrolysisRef.set(this.state.rate)
      .catch(error => console.log('ERROR',error))
      this.readElectrolysisData()
    } else {
      window.alert('Nice Try!  Only Barbara can update data!')
    }
    this.closeModal(e)
  }

  saveEyelashRates = (e) => {
    if (auth && auth.currentUser) {
      if (this.state.Initial) {
        const eyelashRef = db.ref('eyelash/Initial')
        eyelashRef.set(this.state.Initial)
        .catch(error => console.log(error))
      }
      if (this.state.Fillin) {
        const eyelashRef = db.ref('eyelash/Fill-in')
        eyelashRef.set(this.state.Fillin)
        .catch(error => console.log(error))
      }
      this.readEyelashData()
    } else {
      window.alert('Nice Try!  Only Barbara can update data!')
    }
    this.closeModal(e)
  }

  saveMassageRates = (e) => {
    if (auth && auth.currentUser) {
      const massageRef = db.ref('massage/' + this.state.time)
      massageRef.set(this.state.rate)
      .catch(error => console.log(error))
      this.readMassageData()
    } else {
      window.alert('Nice Try!  Only Barbara can update data!')
    }
    this.closeModal(e)
  }

  showModal = (e) => {
    e.preventDefault()
    const modalId = e.target.getAttribute('data-item')
    document.getElementById(modalId).style.display = 'block'
  }

  closeModal = (e) => {
    // reset input modal to empty
    const modalId = e.target.getAttribute('data-item')
    this.refs.input.value = ''
    document.getElementById(modalId).style.display = 'none'
  }

  closeModal2 = (item) => {
    // reset input modal to empty
    this.refs.input.value = ''
    document.getElementById(item).style.display = 'none'
  }

  logout = () => {
    firebase.auth().signOut()
    .then(() => {
      browserHistory.push('/about/')
    })
    .catch((error) => console.log(error))
  }

  render() {
    return (
    <div>
      <h1 className="center-text">Hello Barbara!</h1>
{
// Eyelash Modal
}
       <div className="modal modal-sm"
               id="eyelash">
        <div className="modal-content ">
              <div className="modal-header turquoise">
                <button type="button"
                        className="close"
                        data-item="eyelash"
                        onClick={this.closeModal}
                        >&times;
                </button>
                <h4 className="modal-title">Eyelashes</h4>
              </div>
              <div className="modal-body">
                <label>Initial Cost</label>
                <input
                  ref="input"
                  type="text"
                  placeholder="rate"
                  className="form-control"
                  onChange={ this.handleInput }
                  name="Initial"/>
                <label>Fill In Cost</label>
                <input
                  ref="input"
                  type="text"
                  placeholder="rate"
                  className="form-control"
                  onChange={ this.handleInput }
                  name="Fillin"/>
              </div>
              {
                // list current data in database
              }
              <div>
                <div className="turquoise">Current Rates
                </div>
                {
      this.state.eyelash && Object.keys(this.state.eyelash).map(key => {
        return (
        <div key={key}
             className="flex-container">
          <button
            type="submit"
            className="close"
            data-item={`eyelash/${key}`}
            onClick={this.deleteItem}
            >&times;
          </button>
          <div className="rates">{key}:
          </div>
          <div className="rates">${this.state.eyelash[key]}
          </div>
        </div>
        )
      })

              }
              </div>
              <div className="modal-footer">
                <button type="button"
                        className="btn btn-default"
                        data-item="eyelash"
                        onClick={this.closeModal}>Close
                </button>
                <button type="button"
                        className="btn btn-primary"
                        data-item="eyelash"
                        onClick={this.saveEyelashRates}>Save
                </button>
              </div>
          </div>
        </div>
{
// Electrolysis Modal
}
       <div className="modal modal-sm"
               id="electrolysis">
        <div className="modal-content ">
              <div className="modal-header">
                <button type="button"
                        className="close"
                        data-item="electrolysis"
                        onClick={this.closeModal}
                        >&times;
                </button>
                <h4 className="modal-title">Electrolysis</h4>
              </div>
              <div className="modal-body">
                <label>Enter Time in Minutes</label>
                <input
                  ref="input"
                  type="text"
                  placeholder="time"
                  className="form-control"
                  onChange={ this.handleInput }
                  name="time"/>
                <label>Enter $$ amount</label>
                <input
                  ref="input"
                  type="text"
                  placeholder="rate"
                  className="form-control"
                  onChange={ this.handleInput }
                  name="rate"/>
              </div>
               {
                // list current data in database
              }
              <div>
                <div className="turquoise">Current Rates
                </div>
                {
      this.state.electrolysis && Object.keys(this.state.electrolysis).map(key => {
        return (
        <div key={key}
             className="flex-container">
          <button
            type="submit"
            className="close"
            data-item={`electrolysis/${key}`}
            onClick={this.deleteItem}
            >&times;
          </button>
          <div className="rates">{key}:
          </div>
          <div className="rates">${this.state.electrolysis[key]}
          </div>
        </div>
        )
      })

              }
              </div>
              <div className="modal-footer">
                <button type="button"
                        className="btn btn-default"
                        data-item="electrolysis"
                        onClick={this.closeModal}>Close
                </button>
                <button type="button"
                        className="btn btn-primary"
                        data-item="electrolysis"
                        onClick={this.saveElectrolysisRates}>Save
                </button>
              </div>
          </div>
        </div>
{
// Massage Modal
}
       <div className="modal modal-sm"
               id="massage">
        <div className="modal-content ">
              <div className="modal-header">
                <button type="button"
                        className="close"
                        data-item="massage"
                        onClick={this.closeModal}
                        >&times;
                </button>
                <h4 className="modal-title">Massage</h4>
              </div>
              <div className="modal-body">
                <label>Enter Time in Minutes</label>
                <input
                  ref="input"
                  type="text"
                  placeholder="time"
                  className="form-control"
                  onChange={ this.handleInput }
                  name="time"/>
                <label>Enter $$ amount</label>
                <input
                  ref="input"
                  type="text"
                  placeholder="rate"
                  className="form-control"
                  onChange={ this.handleInput }
                  name="rate"/>
              </div>
                  {
                // list current data in database
              }
              <div>
                <div className="turquoise">Current Rates
                </div>
                {
      this.state.massage && Object.keys(this.state.massage).map(key => {
        return (
        <div key={key}
             className="flex-container">
          <button
            type="submit"
            className="close"
            data-item={`massage/${key}`}
            onClick={this.deleteItem}
            >&times;
          </button>
          <div className="rates">{key}:
          </div>
          <div className="rates">${this.state.massage[key]}
          </div>
        </div>
        )
      })
              }
              </div>
              <div className="modal-footer">
                <button type="button"
                        className="btn btn-default"
                        data-item="massage"
                        onClick={this.closeModal}>Close
                </button>
                <button type="button"
                        className="btn btn-primary"
                        data-item="massage"
                        onClick={this.saveMassageRates}>Save
                </button>
              </div>
          </div>
        </div>
{
  // Main form
}
      <form>
        <div className="flex-container">
          <div className="well">
            <h2>Please enter in some info about yourself</h2>
            <input
              type="text"
              className="form-control about"
              placeholder="Paragraph 1"
              name="paragraph1"
              onChange={this.handleInput}/>
            <input
              type="text"
              className="form-control about"
              placeholder="Paragraph 2"
              name="paragraph2"
              onChange={this.handleInput}/>
            <input
              type="text"
              className="form-control about"
              placeholder="Paragraph 3"
              name="paragraph3"
              onChange={this.handleInput}/>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.saveAboutData}>Save
            </button>
          </div>
          <hr />
          <div className="well">
            <h2>Click on buttons to enter in rates</h2>
            <button
              type="submit"
              className="btn btn-primary"
              data-item="electrolysis"
              onClick={this.showModal}>Input Electrolysis Rates
            </button>
            <hr />
            <button
              type="submit"
              className="btn btn-primary"
              data-item="eyelash"
              onClick={this.showModal}>Input Eyelash Rates
            </button>
            <hr />
            <button
              type="submit"
              className="btn btn-primary"
              data-item="massage"
              onClick={this.showModal}>Input Massage Rates
            </button>
          </div>
        </div>
        <hr />
        <div className="well">
          <h2>Please enter in something about Electrolysis</h2>
          <input
            type="text"
            className="form-control about"
            placeholder="Electrolysis Paragraph"
            name="electrolysisParagraph"
            onChange={this.handleInput}/>
          <h2>Please enter in something about Eyelashes</h2>
          <input
            type="text"
            className="form-control about"
            placeholder="Eyelashes Paragraph"
            name="eyelashParagraph"
            onChange={this.handleInput}/>
          <h2>Please enter in something about Massage</h2>
          <input
            type="text"
            className="form-control about"
            placeholder="Massage Paragraph"
            name="massageParagraph"
            onChange={this.handleInput}/>
          <button
            type="submit"
            className="btn btnPrimary"
            onClick={this.saveDescData}>Save
          </button>
        </div>
        <hr />
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.logout}>Logout
        </button>
      </form>
    </div>
    )
  }
}
