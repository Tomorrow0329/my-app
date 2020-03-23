import React, { Component } from 'react';
import ReactDom from 'react-dom';
import './index.scss'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="app">
                <p>Hello World!!!!</p>
            </div>
        );
    }
}

export default App;

ReactDom.render(<App />,document.getElementById('root'));