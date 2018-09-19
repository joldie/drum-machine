import React from 'react';
import './stylesheet.css';

const drums = [{
  keyCode: 81,
  keyTrigger: 'Q',
  id: 'Heater-1',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
  keyCode: 87,
  keyTrigger: 'W',
  id: 'Heater-2',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
  keyCode: 69,
  keyTrigger: 'E',
  id: 'Heater-3',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
  keyCode: 65,
  keyTrigger: 'A',
  id: 'Heater-4',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
  keyCode: 83,
  keyTrigger: 'S',
  id: 'Clap',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
  keyCode: 68,
  keyTrigger: 'D',
  id: 'Open-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
  keyCode: 90,
  keyTrigger: 'Z',
  id: "Kick-n'-Hat",
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
  keyCode: 88,
  keyTrigger: 'X',
  id: 'Kick',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
  keyCode: 67,
  keyTrigger: 'C',
  id: 'Closed-HH',
  url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
},
];

const activeStyle = {
  backgroundColor: 'orange',
  animationName: 'bounce',
  animationDuration: '100ms'
}

const inactiveStyle = {
  backgroundColor: 'grey'
}

class Drum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    }
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    this.state.padStyle.backgroundColor === 'orange' ?
      this.setState({
        padStyle: inactiveStyle
      }) :
      this.setState({
        padStyle: activeStyle
      });
  }
  playSound(e) {
    const sound = document.getElementById(this.props.keyTrigger);
    // Play sound from start
    sound.currentTime = 0;
    sound.play();
    // Change drum styling for set number of milliseconds, before changing back
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    // Format clip name for display
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return (
      <div id={this.props.clipId}
        onClick={this.playSound}
        className="drum-pad"
        style={this.state.padStyle} >
        <audio className='clip' id={this.props.keyTrigger} src={this.props.clip}></audio>
        <h2>{this.props.keyTrigger}</h2>
      </div>
    )
  }
}

class DrumSet extends React.Component {
  render() {
    let drumSet = drums.map((drumObj, i, drumSetArray) => {
      return (
        <Drum
          clipId={drumSetArray[i].id}
          clip={drumSetArray[i].url}
          keyTrigger={drumSetArray[i].keyTrigger}
          keyCode={drumSetArray[i].keyCode}
          updateDisplay={this.props.updateDisplay} />
      )
    });
    return (
      <div className="drum-set" >
        {drumSet}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Whitespace text holder
      display: String.fromCharCode(160)
    }
    this.displayClipName = this.displayClipName.bind(this);
  }
  displayClipName(name) {
    this.setState({
      display: name
    });
  }
  render() {
    return (
      <div className="page-wrapper">
        <header>
          <h1>Drum Machine</h1>
        </header>
        <div id="drum-machine">
          <div className="drum-set-wrapper">
            <DrumSet
              updateDisplay={this.displayClipName}
            />
          </div>
          <div className="drum-text">
            <p id="display">
              {this.state.display}
            </p>
          </div>
        </div>
        <footer>
          <div>
            Made by <a href=" https://github.com/joldie/ " target="_blank ">joldie</a> as a project for the <a href="https://learn.freecodecamp.org/ " target="_blank ">freeCodeCamp</a> Front End Libraries course
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
