import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import JumboTron from './src/jumbotron/index.jsx'
import './index.css'

const franchises = {
  'new york': {
    cheese: {
      name: 'ny cheese',
      toppings: ['sausage', 'mushrooms']
    },
    meat: {
      name: 'ny meat',
      toppings: ['pepperoni', 'sausage', 'mushrooms']
    },
    veggie: {
      name: 'ny veggie',
      toppings: ['mushrooms', 'olives']
    }
  },
  'chicago': {
    cheese: {
      name: 'chicago cheese',
      toppings: ['sausage', 'peppers']
    },
    meat: {
      name: 'chicago meat',
      toppings: ['pepperoni', 'sausage', 'peppers']
    },
    veggie: {
      name: 'chicago veggie',
      toppings: ['mushrooms', 'peppers']
    }
  },
  'san francisco': {
    cheese: {
      name: 'sf cheese',
      toppings: ['sausage', 'olives']
    },
    meat: {
      name: 'sf meat',
      toppings: ['pepperoni', 'sausage', 'olives']
    },
    veggie: {
      name: 'sf veggie',
      toppings: ['mushrooms', 'olives']
    }
  }
}

function Franchise(props) {
  return (
    <div className={`franchise ${props.selected ? 'selected' : ''}`}>
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
      className={`pizza ${props.selected ? 'selected' : ''}`}
      onClick={e => props.cbSelectSpecialty(e, props.specialty)}
    >
      <span>{props.name}</span>
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
    const selectedLocation = this.state.selectedLocation,
      selectedSpecialty = this.state.selectedSpecialty
    return (
      <div className="pizza-app">
        <JumboTron/>
        <ul className="franchise-menu">{
          Object.keys(franchises).map(location => {
            return <li key={location}><Franchise
              location={location}
              selected={selectedLocation === location}
              cbSelectLocation={this.cbSelectLocation}
            /></li>
          })
        }</ul>
        <ul className="pizza-menu">{
          _.isEmpty(selectedLocation) ||
          ['cheese', 'meat', 'veggie'].map(specialty => {
            return <li key={specialty}><Pizza
              specialty={specialty}
              name={franchises[selectedLocation][specialty].name}
              selected={selectedSpecialty === specialty}
              cbSelectSpecialty={this.cbSelectSpecialty}
            /></li>
          })
        }</ul>
        <ul className="topping-menu">{
          _.isEmpty(selectedLocation) || _.isEmpty(selectedSpecialty) ||
          franchises[selectedLocation][selectedSpecialty].toppings.map(topping => {
            return <li key={topping}><Topping
              topping={topping}
              selected={this.state[topping]}
              cbToggleTopping={this.cbToggleTopping}
            /></li>
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