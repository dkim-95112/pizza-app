import React from 'react'
import ReactDOM from 'react-dom'
import JumboTron from './src/jumbotron/index.jsx'
import './index.css'

const franchisesByCity = {
  'new york': {
    name: 'ny place',
    cheese: {
      name: 'ny cheese',
      toppings: ['sausage', 'olives']
    },
    meat: {
      name: 'ny meat',
      toppings: ['sausage', 'olives']
    },
    veggie: {
      name: 'ny veggie',
      toppings: ['olives']
    }
  },
  'chicago': {
    name: 'chicago place',
    cheese: {
      name: 'chicago cheese',
      toppings: ['sausage', 'peppers']
    },
    meat: {
      name: 'chicago meat',
      toppings: ['sausage', 'peppers']
    },
    veggie: {
      name: 'chicago veggie',
      toppings: ['peppers']
    }
  },
  'san francisco': {
    name: 'sf place',
    cheese: {
      name: 'sf cheese',
      toppings: ['sausage', 'onions']
    },
    meat: {
      name: 'sf meat',
      toppings: ['sausage', 'onions']
    },
    veggie: {
      name: 'sf veggie',
      toppings: ['onions']
    }
  }
}

const requiredToppingsBySpecialty = {
  meat: ['pepperoni'],
  veggie: ['mushrooms']
}

function Franchise(props) {
  return (
    <div className={`franchise ${props.selected ? 'selected' : ''}`}>
      <span>{props.name}</span>
      <a href="#" onClick={e => props.cbSelectCity(e, props.city)}>
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

function RequiredTopping(props) {
  return (
    <div className="required-topping">
      <span>{props.topping}</span>
    </div>
  )
}

function OptionalTopping(props) {
  return (
    <div className="optional-topping">
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
      selectedCity: '',
      selectedSpecialty: '',
    }
    this.cbSelectCity = this.cbSelectCity.bind(this)
    this.cbSelectSpecialty = this.cbSelectSpecialty.bind(this)
    this.cbToggleTopping = this.cbToggleTopping.bind(this)
  }

  cbSelectCity(e, city) {
    e.preventDefault()
    this.setState({
      selectedCity: city
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
    const cities = Object.keys(franchisesByCity),
      selectedCity = this.state.selectedCity,
      selectedSpecialty = this.state.selectedSpecialty,
      isPizzaSelected = selectedCity && selectedSpecialty,
      requiredToppings = isPizzaSelected ?
        requiredToppingsBySpecialty[selectedSpecialty] : [],
      toppings = isPizzaSelected ?
        franchisesByCity[selectedCity][selectedSpecialty].toppings : []
    return (
      <div className="pizza-app">
        <JumboTron/>
        <ul className="franchise-menu">{
          cities.map(city => {
            return <li key={city}>
              <Franchise
                name={franchisesByCity[city].name}
                city={city}
                selected={selectedCity === city}
                cbSelectCity={this.cbSelectCity}
              />
            </li>
          })
        }</ul>
        <ul className="pizza-menu">{
          selectedCity &&
          ['cheese', 'meat', 'veggie'].map(specialty => {
            return <li key={specialty}>
              <Pizza
                specialty={specialty}
                name={franchisesByCity[selectedCity][specialty].name}
                selected={selectedSpecialty === specialty}
                cbSelectSpecialty={this.cbSelectSpecialty}
              />
            </li>
          })
        }</ul>
        <ul className="required-toppings">{
          requiredToppings &&
          requiredToppings.map(topping => {
            return <li key={topping}>
              <RequiredTopping topping={topping}/>
            </li>
          })
        }</ul>
        <ul className="optional-toppings">{
          toppings.map(topping => {
            return <li key={topping}>
              <OptionalTopping
                topping={topping}
                selected={this.state[topping]}
                cbToggleTopping={this.cbToggleTopping}
              />
            </li>
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