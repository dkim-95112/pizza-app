import React from 'react'
import ReactDOM from 'react-dom'
import JumboTron from './src/jumbotron/index.jsx'
import './index.css'

function Franchise(props){
  return (
    <div className="franchise">{props.name}</div>
  )
}

class PizzaApp extends React.Component {
  render() {
    debugger
    switch (location.hash) {
      default:
        return (
          <div>
            <JumboTron/>
            <Franchise name="new york"/>
            <Franchise name="chicago"/>
            <Franchise name="san francisco"/>
          </div>
        )
    }
  }
}


ReactDOM.render(
  <PizzaApp/>,
  document.getElementById('root')
);