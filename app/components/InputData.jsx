import React from 'react'
import { Link, browserHistory } from 'react-router'
import firebase from 'APP/fire'
const db = firebase.database()

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      about: '',
      time: '',
      rate: '',
      initial: '',
      fillin: ''
    }
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  saveAboutData = () => {
    const aboutRef = db.ref('about/')
    aboutRef.set(this.state.about)
      .catch(error => console.log(error))
  }

  saveElectrolosysRates = (e) => {
    const electrolosysRef = db.ref('electrolosys/' + this.state.time)
    electrolosysRef.set(this.state.rate)
    .catch(error => console.log(error))
    this.closeModal(e)
  }

  saveEyelashRates = (e) => {
    if (this.state.initial) {
      const eyelashRef = db.ref('eyelash/initial')
      eyelashRef.set(this.state.initial)
      .catch(error => console.log(error))
    }
    if (this.state.fillin) {
      const eyelashRef = db.ref('eyelash/fillin')
      eyelashRef.set(this.state.fillin)
      .catch(error => console.log(error))
    }
    this.closeModal(e)
  }

  saveMassageRates = (e) => {
    const massageRef = db.ref('massage/' + this.state.time)
    massageRef.set(this.state.rate)
    .catch(error => console.log(error))
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

  render() {
    return (
    <div>
      <h1>Hello Barbara!</h1>
{
// Eyelash Modal
}
       <div className="modal modal-sm"
               id="eyelash">
        <div className="modal-content ">
              <div className="modal-header">
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
                  name="initial"/>
                <label>Fill In Cost</label>
                <input
                  ref="input"
                  type="text"
                  placeholder="rate"
                  className="form-control"
                  onChange={ this.handleInput }
                  name="fillin"/>
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
// Electrolosys Modal
}
       <div className="modal modal-sm"
               id="electrolosys">
        <div className="modal-content ">
              <div className="modal-header">
                <button type="button"
                        className="close"
                        data-item="electrolosys"
                        onClick={this.closeModal}
                        >&times;
                </button>
                <h4 className="modal-title">Electrolosys</h4>
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
              <div className="modal-footer">
                <button type="button"
                        className="btn btn-default"
                        data-item="electrolosys"
                        onClick={this.closeModal}>Close
                </button>
                <button type="button"
                        className="btn btn-primary"
                        data-item="electrolosys"
                        onClick={this.saveElectrolosysRates}>Save
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
          onClick={this.saveAboutData}>Save
        </button>
        <hr />
        <button
          type="submit"
          className="btn btn-primary"
          data-item="electrolosys"
          onClick={this.showModal}>Input Electrolsys Rates
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
      </form>
    </div>
    )
  }
}
