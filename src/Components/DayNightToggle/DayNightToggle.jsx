import React, { useState, useContext } from 'react';
import './DayNightToggle.css'; // Import CSS file for styles
import { ShiftContext } from '../../ShiftContext';

export const DayNightToggle = () => {
  const {isDayShift, setDayShift} = useContext(ShiftContext);

  const toggleMode = () => {
    setDayShift(!isDayShift);
  };

  return (
    <div className="day-night-toggle">
      <p className="toggle-label">{isDayShift ? 'Days' : 'Nights'}</p>
      <label className="switch">
        <input type="checkbox" onChange={toggleMode} checked={!isDayShift} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
