import React from 'react'
import ReactDOM from 'react-dom'
import JumboTron from './src/jumbotron/index.jsx'
import './index.css'

function Franchise(props) {
  return (
    <div className="franchise" selected={props.selected}>
      <span>{props.location}</span>
      <a href="#" onClick={e => props.cbSelectLocation(e, props.location)}>
        Order Pizza Online
      </a>
    </div>
  )
}

function Pizza(props) {
  return (
    <div
      className="pizza"
      selected={props.selected}
      onClick={e => props.cbSelectSpecialty(e, props.specialty)}
    >
      <span>{props.specialty}</span>
    </div>
  )
}

function Topping(props) {
  return (
    <div className="topping">
      <label>
        <input
          type="checkbox"
          selected={props.selected}
          onChange={e => props.cbToggleTopping(e, props.topping)}
        />
        <span>{props.topping}</span>
      </label>
    </div>
  )
}

class PizzaApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLocation: '',
      selectedSpecialty: '',
      mushrooms: false,
      pepperoni: false
    }
    this.cbSelectLocation = this.cbSelectLocation.bind(this)
    this.cbSelectSpecialty = this.cbSelectSpecialty.bind(this)
    this.cbToggleTopping = this.cbToggleTopping.bind(this)
  }

  cbSelectLocation(e, location) {
    e.preventDefault()
    this.setState({
      selectedLocation: location
    })
  }

  cbSelectSpecialty(e, specialty) {
    this.setState({
      selectedSpecialty: specialty
    })
  }

  cbToggleTopping(e, topping) {
    this.setState({
      [topping]: !this.state[topping]
    })
  }

  render() {
    return (
      <div>
        <JumboTron/>
        <ul className="franchise-menu">{
          ['new york', 'chicago', 'san francisco'].map(location => {
            return <Franchise
              key={location}
              location={location}
              selected={this.state.selectedLocation === location}
              cbSelectLocation={this.cbSelectLocation}
            />
          })
        }</ul>
        <ul className="pizza-menu">{
          ['cheese', 'meat', 'veggie'].map(specialty => {
            return <Pizza
              key={specialty}
              specialty={specialty}
              selected={this.state.selectedSpecialty === specialty}
              cbSelectSpecialty={this.cbSelectSpecialty}
            />
          })
        }</ul>
        <ul className="topping-menu">{
          ['mushrooms', 'pepperoni'].map(topping => {
            return <Topping
              key={topping}
              topping={topping}
              selected={this.state[topping]}
              cbToggleTopping={this.cbToggleTopping}
            />
          })
        }</ul>
      </div>
    )
  }
}


ReactDOM.render(
  <PizzaApp/>,
  document.getElementById('root')
)