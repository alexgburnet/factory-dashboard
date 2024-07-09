import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { enGB } from "date-fns/locale";

import { DateContext } from "../../DateContext";

export const NavBar = () => {

    const {selectedDate, setSelectedDate} = useContext(DateContext);
    return (
        <div className="header">
            <h1>Factory Overview for </h1>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"  // British date format
                locale={enGB}            // British locale
            />
        </div>
    );
};