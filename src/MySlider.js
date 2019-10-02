import React from 'react'
import { mainColor, secondColor } from './colors'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import Slider from 'react-rangeslider'
import './mySliderStyles.css'
const MySlider = ({ title, max, value, onChange, onUpClick, onDownClick }) => {
  return (
    <div>
      <div style={{ color: mainColor }}>{title}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <IoIosArrowBack
          color={value > 1 ? mainColor : secondColor}
          size={60}
          style={{ cursor: value > 1 && 'pointer' }}
          onClick={value > 1 ? onDownClick : undefined}
        />
        <div style={{ flex: 1 }}>
          <Slider
            type='range'
            min={1}
            max={max}
            step={1}
            value={value}
            onChange={onChange}
            tooltip={false}
          />
        </div>
        <IoIosArrowForward
          color={value < max ? mainColor : secondColor}
          size={60}
          style={{ cursor: value < max && 'pointer' }}
          onClick={value < max ? onUpClick : undefined}
        />
      </div>
    </div>
  )
}

export default MySlider
