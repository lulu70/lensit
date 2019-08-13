import React, { Component } from 'react'
import './App.css'
import { Divider } from 'semantic-ui-react'
// import 'react-rangeslider/lib/index.css'
import { mainColor, secondColor } from './colors'
// import transperantLogo from './assets/1024 trans.png'
import throttle from 'lodash/throttle'
import MySlider from './MySlider'

class App extends Component {
  state = {
    aspectRatioMode: 'sBN',
    aspectRatio: 16 / 9,
    widthValue: 1,
    distanceValue: 1,
    metricSystem: true,
    heightOnFocus: false,
    customForm: {
      fields: {
        costumWidth: '1920',
        costumHeight: '1200'
      }
    }
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
  handle16By9Click = () => {
    this.setState({
      ...this.state,
      aspectRatio: 16 / 9,
      aspectRatioMode: 'sBN'
    })
  }
  handle4By3Click = () => {
    this.setState({
      ...this.state,
      aspectRatio: 4 / 3,
      aspectRatioMode: 'fBT'
    })
  }
  handleChangeSystem = system => {
    this.setState({
      ...this.state,
      metricSystem: system === 'meters',
      widthValue:
        system === 'feet'
          ? this.state.widthValue * 3.28084
          : this.state.widthValue / 3.28084,
      distanceValue:
        system === 'feet'
          ? this.state.distanceValue * 3.28084
          : this.state.distanceValue / 3.28084
    })
  }
  handleWidthUpClick = () => {
    this.setState({
      widthValue: this.state.widthValue + 0.1
    })
  }
  handleWidthDownClick = () => {
    this.setState({
      widthValue: this.state.widthValue - 0.1
    })
  }
  handleDistanceUpClick = () => {
    this.setState({
      distanceValue: this.state.distanceValue + 0.1
    })
  }
  handleDistanceDownClick = () => {
    this.setState({
      distanceValue: this.state.distanceValue - 0.1
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
      <div className='App'>
        <div id='calc'>
          {/* <Divider hidden /> */}
          <div className='styledRow'>
            <span>LENS</span>
            {lens}
          </div>
          <Divider hidden />
          <div className='styledRow'>
            <span>WIDTH</span> {width}
          </div>
          <Divider hidden />
          <div className='styledRow'>
            <span> HEIGHT</span> {height}
          </div>
          <Divider hidden />
          <div className='styledRow'>
            <span>DISTANCE</span> {distance}
          </div>
          <Divider hidden />
          <div className='buttonsContainer'>
            <button
              className='button'
              style={{
                color:
                  this.state.aspectRatioMode === 'fBT' ? mainColor : secondColor
              }}
              onClick={this.handle4By3Click}
            >
              4:3
            </button>
            <div className='verticalDivider' />
            <button
              className='button'
              style={{
                color:
                  this.state.aspectRatioMode === 'sBN' ? mainColor : secondColor
              }}
              onClick={this.handle16By9Click}
            >
              16:9
            </button>
          </div>
          <Divider hidden />
          <div className='buttonsContainer'>
            <button
              className='button'
              onClick={() => this.handleChangeSystem('meters')}
              style={{
                color: this.state.metricSystem ? mainColor : secondColor
              }}
            >
              Meters
            </button>
            <div className='verticalDivider' />
            <button
              className='button'
              style={{
                color: !this.state.metricSystem ? mainColor : secondColor
              }}
              onClick={() => this.handleChangeSystem('feet')}
            >
              Feet
            </button>
          </div>
          <Divider hidden />
          <MySlider
            title='Width/Height'
            max={this.state.metricSystem ? 60 : 60 * 3.28084}
            value={Number(width)}
            onChange={this.handleWHSliderChange}
            onUpClick={this.handleWidthUpClick}
            onDownClick={this.handleWidthDownClick}
          />
          <MySlider
            title='Distance'
            max={this.state.metricSystem ? 60 : 60 * 3.28084}
            value={Number(distance)}
            onChange={this.handleDistanceSliderChange}
            onUpClick={this.handleDistanceUpClick}
            onDownClick={this.handleDistanceDownClick}
          />
        </div>
      </div>
    )
  }
}

export default App
