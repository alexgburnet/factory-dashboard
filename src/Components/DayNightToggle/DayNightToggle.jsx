import React, { useContext } from 'react';
import { ShiftContext } from '../../ShiftContext';

import './DayNightToggle.css';

export const DayNightToggle = () => {
  const { isDayShift, setDayShift } = useContext(ShiftContext);

  const handleChange = (event) => {
    setDayShift(event.target.value === 'day');
  };

  return (
    <div className="shift-toggle">
      <div className="radio-group">
        <label className="radio-label">
          <input
            type="radio"
            name="shift"
            value="day"
            checked={isDayShift}
            onChange={handleChange}
          />
          Day Shift
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="shift"
            value="night"
            checked={!isDayShift}
            onChange={handleChange}
          />
          Night Shift
        </label>
      </div>
    </div>
  );
};
