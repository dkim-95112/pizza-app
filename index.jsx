import React from 'react'
import ReactDOM from 'react-dom'
import JumboTron from './src/jumbotron/index.jsx'
import './index.css'

class Franchise extends React.Component {
  render() {
    return (
      <div className="franchise">
        {this.props.locationKey}
        <a href="#" onClick={e => this.props.cbSelect(e, this.props.locationKey)}>
          Order Pizza Online
        </a>
      </div>
    )
  }
}

class PizzaApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedLocationKey: null
    }
    this.cbSelect = this.cbSelect.bind(this)
  }

  cbSelect(e, locationKey) {
    e.preventDefault();
    this.setState({
      selectedLocationKey: locationKey
    })
  }

  render() {
    return (
      <div>
        <JumboTron/>
        <Franchise cbSelect={this.cbSelect} locationKey="new york"/>
        <Franchise cbSelect={this.cbSelect} locationKey="chicago"/>
        <Franchise cbSelect={this.cbSelect} locationKey="san francisco"/>
      </div>
    )
  }
}


ReactDOM.render(
  <PizzaApp/>,
  document.getElementById('root')
);