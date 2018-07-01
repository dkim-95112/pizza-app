import React from 'react'
import ReactDOM from 'react-dom'
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
    <div className={`franchise`}>
      <h2>{props.name}</h2>
      <h3>{props.city}</h3>
    </div>
  )
}

function Pizza(props) {
  return (
    <div className="pizza-specialty">
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
      <h3>{props.topping}</h3>
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
      <h3>{props.topping}</h3>
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
        <fieldset className="select-city">
          <legend>select city</legend>
          <ul className="franchises">{
            cities.map(city => {
              return <li
                key={city}
                className={selectedCity === city ? 'selected' : ''}
                onClick={e => this.cbSelectCity(e, city)}
              >
                <Franchise
                  name={franchisesByCity[city].name}
                  city={city}
                />
              </li>
            })
          }</ul>
        </fieldset>
        <div className="hiding-container">
          <fieldset className={`select-specialty-pizza
            ${selectedCity ? '' : 'hidden'}`}
          >
            <legend>select specialty pizza</legend>
            <ul className="pizza-specialties">{
              selectedCity &&
              ['cheese', 'meat', 'veggie'].map(specialty => {
                return <li
                  key={specialty}
                  className={selectedSpecialty === specialty ? 'selected' : ''}
                  onClick={e => this.cbSelectSpecialty(e, specialty)}
                >
                  <Pizza
                    specialty={specialty}
                    name={franchisesByCity[selectedCity][specialty].name}
                  />
                </li>
              })
            }</ul>
          </fieldset>
        </div>
        <div className="button-container">
          <div className="hiding-container">
            <fieldset
              className={`select-toppings
            ${isPizzaSelected ? '' : 'hidden'}`}
            >
              <legend>select toppings</legend>
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
          </div>
          {
            isPizzaSelected ? (
              <button
                className={`order-button`}
                onClick={e => alert(JSON.stringify(this.state, null, '\t'))}
              >
                Order Now
              </button>
            ) : ''
          }
        </div>
      </div>
    )
  }
}

function FixedHead(){
  return (
    <div className="fixed-head">
      01 July 2018 - Robin code challenge by David
    </div>
  )
}

ReactDOM.render(
  [
    <FixedHead key="my-head"/>,
    <PizzaApp key="my-app"/>
  ],
  document.getElementById('root')
)