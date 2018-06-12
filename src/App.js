import React, { Component } from 'react'
import './App.css'
import { Input, Label, Divider, Button, Header, Image } from 'semantic-ui-react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import transperantLogo from './assets/1024 trans.png'
import throttle from 'lodash/throttle'

class App extends Component {
  state = {
    aspectRatio: 16 / 9,
    widthValue: 1,
    distanceValue: 1,
    metricSystem: true,
    heightOnFocus: false
  }

  componentDidMount() {
    this.getStateFromLocalStorage()
  }

  componentDidUpdate = () => {
    this.saveStateToLocalStorage()
  }

  saveStateToLocalStorage = throttle(() => {
    try {
      localStorage.setItem('state', JSON.stringify(this.state))
    } catch (error) {
      console.error(error)
    }
  }, 1000)

  getStateFromLocalStorage = () => {
    try {
      const localStorageState = localStorage.getItem('state')
      localStorageState && this.setState(JSON.parse(localStorageState))
    } catch (error) {
      console.error(error)
    }
  }
  // round helper method for all values:
  round = num => (Math.round(num * 10) / 10).toString()

  handleWidthChange = e => {
    this.setState({
      ...this.state,
      widthValue: e.target.value
    })
  }

  handleHeightChange = e => {
    this.setState({
      ...this.state,
      widthValue: e.target.value * this.state.aspectRatio,
      heightOnFocus: false
    })
  }
  handleDistanceChange = e => {
    this.setState({
      ...this.state,
      distanceValue: e.target.value
    })
  }
  handleWHSliderChange = val => {
    this.setState({
      ...this.state,
      widthValue: val
    })
  }
  handleDistanceSliderChange = val => {
    this.setState({
      ...this.state,
      distanceValue: val
    })
  }

  handleFocuse = e => {
    switch (e.target.name) {
      case 'width': {
        this.setState({ ...this.state, widthValue: '' })
        break
      }
      case 'height': {
        this.setState({ ...this.state, heightOnFocus: true })
        break
      }
      case 'distance': {
        this.setState({ ...this.state, distanceValue: '' })
        break
      }
      default: {
        break
      }
    }
  }
  handleBlur = e => {
    switch (e.target.name) {
      case 'height': {
        this.setState({
          ...this.state,
          heightOnFocus: false
        })
        break
      }
      default: {
        break
      }
    }
  }
  handle16By9Click = () => {
    this.setState({
      ...this.state,
      aspectRatio: 16 / 9
    })
  }
  handle4By3Click = () => {
    this.setState({
      ...this.state,
      aspectRatio: 4 / 3
    })
  }
  handleChangeToFeetClick = () => {
    this.setState({
      ...this.state,
      metricSystem: !this.state.metricSystem,
      widthValue: this.state.metricSystem
        ? this.state.widthValue * 3.28084
        : this.state.widthValue / 3.28084,
      distanceValue: this.state.metricSystem
        ? this.state.distanceValue * 3.28084
        : this.state.distanceValue / 3.28084
    })
  }
  render() {
    const width = this.round(this.state.widthValue)
    const height = this.state.heightOnFocus
      ? ''
      : this.round(this.state.widthValue / this.state.aspectRatio)
    const distance = this.round(this.state.distanceValue)
    const lens = isFinite(Number(this.round(distance / width)))
      ? this.round(distance / width)
      : '0'
    return (
      <div className="App">
        <div id="calc">
          <Header color="green" size="huge">
            LENS IT
          </Header>
          <Image centered circular size="mini" src={transperantLogo} />
          <Divider />
          <Input
            type="number"
            min="1"
            max={this.state.metricSystem ? '60' : `${60 * 3.28084}`}
            label={{ content: 'Screen Width:', color: 'green' }}
            name="width"
            placeholder=""
            value={width}
            onChange={this.handleWidthChange}
            onFocus={this.handleFocuse}
          />
          <Slider
            min={1}
            max={this.state.metricSystem ? 60 : 60 * 3.28084}
            step={0.01}
            value={Number(width)}
            onChange={this.handleWHSliderChange}
            tooltip={false}
          />
          <Input
            type="number"
            min="1"
            max={this.state.metricSystem ? '60' : `${60 * 3.28084}`}
            label={{ content: 'Screen Height:', color: 'green' }}
            name="height"
            placeholder=""
            value={height}
            onChange={this.handleHeightChange}
            onFocus={this.handleFocuse}
            onBlur={this.handleBlur}
          />
          <Divider />
          <Input
            type="number"
            min="1"
            max={this.state.metricSystem ? '60' : `${60 * 3.28084}`}
            label={{ content: 'Distance:', color: 'green' }}
            name="distance"
            placeholder=""
            value={distance}
            onChange={this.handleDistanceChange}
            onFocus={this.handleFocuse}
          />
          <Slider
            type="range"
            min={1}
            max={this.state.metricSystem ? 60 : 60 * 3.28084}
            step={0.01}
            value={Number(distance)}
            onChange={this.handleDistanceSliderChange}
            tooltip={false}
          />
          <Label size="big" color="green">
            Lens Factor: {lens}
          </Label>
          <Divider />
          <Button
            basic
            color="green"
            fluid
            onClick={
              this.state.aspectRatio === 4 / 3
                ? this.handle16By9Click
                : this.handle4By3Click
            }
          >
            {this.state.aspectRatio === 4 / 3 ? 'Change To 16/9' : 'Change To 4/3'}
          </Button>
          <Button
            basic
            color="green"
            fluid
            onClick={this.handleChangeToFeetClick}
          >
            {this.state.metricSystem ? 'Change To Feet' : 'Change To Meters'}
          </Button>
        </div>
      </div>
    )
  }
}

export default App
