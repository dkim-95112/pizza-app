import React from 'react'
import ReactDOM from 'react-dom'
import JumboTron from './src/jumbotron/index.jsx'
import 'reset-css'
import './index.less'

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
    <div
      className={`franchise
        ${props.selected ? 'selected' : ''}`}
      onClick={e => props.cbSelectCity(e, props.city)}
    >
      <h2>{props.name}</h2>
      <h3>{props.city}</h3>
    </div>
  )
}

function Pizza(props) {
  return (
    <div
      className={`pizza-specialty
        ${props.selected ? 'selected' : ''}`}
      onClick={e => props.cbSelectSpecialty(e, props.specialty)}
    >
      <h3>{props.name}</h3>
    </div>
  )
}

function RequiredTopping(props) {
  return (
    <label className="topping required">
      <input
        type="checkbox"
        checked disabled
      />
      <h4>{props.topping}</h4>
    </label>
  )
}

function OptionalTopping(props) {
  return (
    <label className="topping optional">
      <input
        type="checkbox"
        checked={props.checked}
        onChange={e => props.cbToggleTopping(e, props.topping)}
      />
      <h4>{props.topping}</h4>
    </label>
  )
}

OptionalTopping.defaultProps = {
  checked: false
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
        <fieldset className="select-city">
          <legend>SELECT CITY</legend>
          <ul className="franchises">{
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
        </fieldset>
        <fieldset className={`select-specialty-pizza
          ${selectedCity ? '' : 'hidden'}`}
        >
          <legend>Select Specialty Pizza</legend>
          <ul className="pizza-specialties">{
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
        </fieldset>
        <fieldset
          className={`select-toppings
            ${isPizzaSelected ? '' : 'hidden'}`}
        >
          <legend>Select Toppings</legend>
          <ul className="toppings required">{
            requiredToppings &&
            requiredToppings.map(topping => {
              return <li key={topping}>
                <RequiredTopping topping={topping}/>
              </li>
            })
          }</ul>
          <ul className="toppings optional">{
            toppings.map(topping => {
              return <li key={topping}>
                <OptionalTopping
                  topping={topping}
                  checked={this.state[topping]}
                  cbToggleTopping={this.cbToggleTopping}
                />
              </li>
            })
          }</ul>
        </fieldset>
        <button
          className={`order-button
            ${isPizzaSelected ? '' : 'hidden'}`}
          onClick={e => alert(JSON.stringify(this.state))}
        >
          Order
        </button>
      </div>
    )
  }
}


ReactDOM.render(
  <PizzaApp/>,
  document.getElementById('root')
)