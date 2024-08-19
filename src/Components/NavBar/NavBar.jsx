import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enGB } from "date-fns/locale";

import { DateContext } from "../../DateContext";
import { DayNightToggle } from "../DayNightToggle/DayNightToggle";
import HamBurgerMenu from "../HamBurgerMenu/HamBurgerMenu";

import "./NavBar.css";


export const NavBar = () => {
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const location = useLocation();

    const getHeaderTitle = () => {
        if (location.pathname === "/") {
            return "Factory";
        } else {
            return `Machine ${location.pathname.split("/")[2]}`;
        }
    };

    return (
        <div className="header">
            <img src="/AburnetLogo.jpg" alt="ABurnet Logo" className="logo" />
            <div className="center-container">
                <h1>{getHeaderTitle()} Overview for</h1>
                <DatePicker
                    className="date-picker"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    locale={enGB}
                />
                <DayNightToggle />
            </div>
            <HamBurgerMenu className="hamburger-menu" />
        </div>
    );
};
