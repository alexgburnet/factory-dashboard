import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";

import { useLocation } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import { enGB } from "date-fns/locale";

import { DateContext } from "../../DateContext";

export const NavBar = () => {

    const {selectedDate, setSelectedDate} = useContext(DateContext);

    const location = useLocation();

    const getHeaderTitle = () => {
        if (location.pathname === "/") {
            return "Factory";
        } else {
            return `Machine ${location.pathname.split("/")[2]}`;
        }
    }

    return (
        <div className="header">
            <h1>{getHeaderTitle()} Overview for:</h1>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"  // British date format
                locale={enGB}            // British locale
            />
        </div>
    );
};