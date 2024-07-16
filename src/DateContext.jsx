import React, { createContext, useState } from "react";

export const DateContext = createContext();

const getPrevWorkDay = () => {
    const today = new Date();
    let day = today.getDay();
    const diff = day === 0 ? 2 : (day === 1 ? 3 : 1); 
    const prevWorkDay = new Date(today.setDate(today.getDate() - diff));
    return prevWorkDay;
}

export const DateProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(getPrevWorkDay());

    return (
        <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
            {children}
        </DateContext.Provider>
    );
};