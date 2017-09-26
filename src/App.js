import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
      < LanguageCheck />
      </div>
    );
  }
}

class LanguageCheck extends Component {
constructor(props) {
  super(props);
  this.state = {
      fetchURLbase: "http://apilayer.net/api/detect?access_key=babbf1a73a8d200ea665dcacea15f9c9&query=",
      fetchSentence: "",
      fetchData: [{"success":true,
       "results":[{"language_code":"en","language_name":"English",
                   "probability":14.178885720285129,"percentage":100,
                   "reliable_result":true}]
  }]
}
  this.handleSubmit = this.handleSubmit.bind(this);
  console.log(this.state.fetchData);
}

componentDidMount(){
  this.setState({fetchSentence: "I really like oreos."});
  this.setState({fetchData: [
                  {"success":true,
                   "results":[{"language_code":"en","language_name":"English",
                               "probability":14.178885720285129,"percentage":100,
                               "reliable_result":true}]}
                             ]
                })
}


handleSubmit(e) {
  e.preventDefault();
  this.setState({fetchSentence: this.refs.inputNewSentence.value});
  var fetchURL = `${this.state.fetchURLbase}${this.refs.inputNewSentence.value}`
  fetch(fetchURL)
    .then(response => response.json())
        .then(data => {
          var newdata = [data];
          this.setState({fetchData: newdata});
          console.log(this.state.fetchData);
        })
    .catch(function(err) {
     console.log('Uhhh something went wrong...', err);
    });
}

  render() {
    return(
      <div>
          <h3>The string "{this.state.fetchSentence}" is in {this.state.fetchData[0].results[0].language_name}.</h3>
          <p>Do you wanna try?</p>
          <form onSubmit={this.handleSubmit}>
              <input className="form-input" ref="inputNewSentence" type="text"/>
              <input type="submit" value="Submit" onChange={this.handleSubmit} />
          </form>
      </div>
    )
  }

}

export default App;
