import React from 'react'
import ReactDOM from 'react-dom'
import JumboTron from './src/jumbotron/index.jsx'

class PizzaApp extends React.Component {
    render() {
        debugger
        switch (location.hash){
            default:
            return (
                <div>
                    <JumboTron/>
                    <div>foo</div>
                </div>
            )
        }
    }
}

ReactDOM.render(
    <PizzaApp />,
    document.getElementById('root')
);